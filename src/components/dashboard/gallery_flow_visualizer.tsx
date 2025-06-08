// src/components/GalleryFlowVisualizer.tsx
import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  ReactFlowProvider,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AutogenNode from '../create-agent/AutogenNode'; // Your custom node
import dagre from 'dagre';

interface GalleryFlowVisualizerProps {
  autogenStructure: any; // from useCase.autogenStructure
  title: string;
  onApplyTemplate: (structure: any) => void; // 🎯 callback to parent
}

const nodeTypes = {
  custom: AutogenNode,
};

const GalleryFlowVisualizerContent: React.FC<GalleryFlowVisualizerProps> = ({ autogenStructure, title, onApplyTemplate }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();
  const [showConfirm, setShowConfirm] = useState(false); // 🎯 Confirmation State

  const buildInitialFlow = useCallback(() => {
    if (!autogenStructure) return;

    const participants = autogenStructure.config?.participants || [];
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: 'team',
      type: 'custom',
      data: {
        type: 'team',
        label: autogenStructure.label || 'AI Team',
        teamType: extractTeamType(autogenStructure?.provider),
        description: autogenStructure.description || '',
        model: '',
        agents: participants.map((p: any) => ({
          name: p.label,
          description: p.description,
          model: {
            name: p.config?.model_client?.model_name || '',
            provider: '',
          },
          tools: (p.config?.tools || []).map((tool: any) => ({
            name: tool.config?.name,
            description: tool.config?.description || '',
          })),
        })),
        terminations: autogenStructure.config?.termination_condition
          ? [{ name: autogenStructure.config.termination_condition.description }]
          : [],
      },
      position: { x: 0, y: 0 },
    });

    participants.forEach((participant: any, idx: number) => {
      nodes.push({
        id: `agent-${idx}`,
        type: 'custom',
        data: {
          type: 'agent',
          label: participant.label || `Agent ${idx + 1}`,
          description: participant.description || '',
          model: participant.config?.model_client?.model_name || '',
          tools: participant.config?.tools?.length || 0,
          toolNames: participant.config?.tools?.map((tool: any) => tool.config?.name || 'Unnamed Tool') || [],
        },
        position: { x: 0, y: 0 },
      });

      edges.push({
        id: `edge-team-agent-${idx}`,
        source: 'team',
        target: `agent-${idx}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#4D9CFF', strokeWidth: 2 },
      });
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = applyAutoLayout(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);
  }, [autogenStructure, setNodes, setEdges, fitView]);

  useEffect(() => {
    buildInitialFlow();
  }, [buildInitialFlow]);

  const handleApplyTemplate = () => {
    setShowConfirm(true); // 🎯 show confirmation popup
  };

  const confirmApplyTemplate = () => {
    setShowConfirm(false);
    onApplyTemplate(autogenStructure); // 🎯 pass to parent
  };

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#333" gap={16} />
        <Controls
          className="bg-dark-surface border border-dark-border rounded-md"
          showInteractive={false}
        />
        <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
          <div className="flex flex-col gap-2 text-xs text-white mb-2">
            {title}
          </div>
          <button
            onClick={buildInitialFlow}
            className="mt-2 bg-dark-400 text-white text-xs rounded-md px-3 py-1 hover:bg-dark-500 transition"
          >
            Auto Layout
          </button>
          <button
            onClick={handleApplyTemplate}
            className="mt-2 bg-primary-600 text-white text-xs rounded-md px-3 py-1 hover:bg-primary-700 transition"
          >
            Apply Template
          </button>
        </Panel>
      </ReactFlow>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg flex flex-col items-center gap-4">
            <div className="text-gray-800 text-center">
              Are you sure you want to apply this template?
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmApplyTemplate}
                className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryFlowVisualizer: React.FC<GalleryFlowVisualizerProps> = (props) => {
  return (
    <div className="h-[60vh] w-full bg-dark-background rounded-lg overflow-hidden">
      <ReactFlowProvider>
        <GalleryFlowVisualizerContent {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default GalleryFlowVisualizer;

// Helper to extract team type
const extractTeamType = (provider: string) => {
  if (!provider) return 'Unknown Team';
  const parts = provider.split('.');
  return parts[parts.length - 1]; // e.g., RoundRobinGroupChat
};

// DAGRE LAYOUT
const applyAutoLayout = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'LR', // Left to Right
    nodesep: 120,
    ranksep: 120,
  });

  const nodeWidth = 260;
  const nodeHeight = 280;

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
