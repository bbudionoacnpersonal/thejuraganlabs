// src/components/GalleryFlowVisualizer.tsx

import React, { useEffect } from 'react';
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
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import AutogenNode from '../create-agent/AutogenNode'; // <-- Updated Import
import { extractTeamTypeFromProvider } from '@/utils/visualEditorUtils'; // Your utility function

interface GalleryFlowVisualizerProps {
  autogenStructure: any; // Structure from the selected use case
}

// Custom Node Types
const nodeTypes = {
  custom: AutogenNode,
};

// Dagre Graph Config
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 300;
const NODE_HEIGHT = 200;

dagreGraph.setGraph({
  rankdir: 'TB',   // Top to Bottom
  ranksep: 100,    // Vertical separation
  nodesep: 80,     // Horizontal separation
});

const GalleryFlowVisualizerContent: React.FC<GalleryFlowVisualizerProps> = ({ autogenStructure }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (!autogenStructure) return;

    const generatedNodes: Node[] = [];
    const generatedEdges: Edge[] = [];

    const teamLabel = autogenStructure.label || 'AI Team';
    const teamType = extractTeamTypeFromProvider(autogenStructure.provider);

    // Team Node
    const teamNode: Node = {
      id: 'team',
      type: 'custom',
      data: {
        type: 'team',
        label: teamLabel,
        teamType: teamType,
        model: '',
        agents: (autogenStructure.config?.participants || []).map((participant: any) => ({
          name: participant.label || '',
          model: participant.config?.model_client?.model_name || '',
          tools: participant.config?.tools?.map((tool: any) => ({
            name: tool.config?.name || '',
          })) || [],
        })),
        terminations: autogenStructure.config?.termination_condition ? [{ name: autogenStructure.config?.termination_condition?.description }] : [],
        description: autogenStructure.description || '',
      },
      position: { x: 0, y: 0 },
    };

    generatedNodes.push(teamNode);

    // Agent Nodes
    const participants = autogenStructure.config?.participants || [];
    participants.forEach((participant: any, idx: number) => {
      generatedNodes.push({
        id: `agent-${idx}`,
        type: 'custom',
        data: {
          type: 'agent',
          label: participant.label || `Agent ${idx + 1}`,
          model: participant.config?.model_client?.model_name || '',
          tools: participant.config?.tools?.length || 0,
          toolNames: participant.config?.tools?.map((tool: any) => tool.config?.name) || [],
          description: participant.description || '',
        },
        position: { x: 0, y: 0 },
      });

      generatedEdges.push({
        id: `edge-team-agent-${idx}`,
        source: 'team',
        target: `agent-${idx}`,
        animated: true,
        style: { stroke: '#4D9CFF', strokeWidth: 2 },
        markerEnd: { type: 'arrowclosed', width: 12, height: 12, color: '#4D9CFF' },
      });
    });

    // Layout with Dagre
    const dagreLayout = (nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } => {
      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
      });
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position = {
          x: nodeWithPosition.x - NODE_WIDTH / 2,
          y: nodeWithPosition.y - NODE_HEIGHT / 2,
        };
      });

      return { nodes, edges };
    };

    const layouted = dagreLayout(generatedNodes, generatedEdges);

    setNodes(layouted.nodes);
    setEdges(layouted.edges);

    setTimeout(() => {
      fitView({ padding: 0.4, duration: 800 });
    }, 300);
  }, [autogenStructure, fitView, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.4 }}
      defaultViewport={{ x: 0, y: 0, zoom: 0.4 }}
      minZoom={0.2}
      maxZoom={1}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#333" gap={16} />
      <Controls className="bg-dark-surface border border-dark-border rounded-md" showInteractive={false} />
      <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Flow - {extractTeamTypeFromProvider(autogenStructure?.provider)}</span>
        </div>
      </Panel>
    </ReactFlow>
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
