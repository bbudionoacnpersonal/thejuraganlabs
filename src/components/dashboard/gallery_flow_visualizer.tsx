import React, { useEffect, useCallback } from 'react';
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
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AutogenNode from '../create-agent/AutogenNode'; // your custom node
import dagre from 'dagre';
import Button from '@/components/ui/Button'; // 🧩 Your existing Button component
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface GalleryFlowVisualizerProps {
  autogenStructure: any; // This comes from useCase.autogenStructure
}

const nodeTypes = {
  custom: AutogenNode,
};

const g = new dagre.graphlib.Graph();
g.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 240;
const nodeHeight = 300; // make this bigger, close to real node height

const applyDagreLayout = (nodes: Node[], edges: Edge[]) => {
  g.setGraph({ 
    rankdir: 'LR',   // Top to Bottom
    nodesep: 120,     // more separation between nodes horizontally
    ranksep: 120     // more separation vertically
  });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
          },
        };
      });
    };

const GalleryFlowVisualizerContent: React.FC<GalleryFlowVisualizerProps> = ({ autogenStructure }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();

  const initializeFlow = useCallback(() => {
    if (!autogenStructure) return;

    const generatedNodes: Node[] = [];
    const generatedEdges: Edge[] = [];

    // Team node
    generatedNodes.push({
      id: 'team',
      type: 'custom',
      data: {
        type: 'team',
        label: autogenStructure.label || 'AI Team',
        teamType: extractTeamType(autogenStructure?.provider),
        description: autogenStructure.description,
        model: '',
        agents: autogenStructure.config?.participants?.map((p: any) => ({
          name: p.label || 'Unnamed Agent',
        })),
        terminations: autogenStructure.config?.termination_condition
          ? [{ name: autogenStructure.config.termination_condition.description }]
          : [],
      },
      position: { x: 0, y: 0 },
    });

    const participants = autogenStructure.config?.participants || [];

    participants.forEach((participant: any, idx: number) => {
      const id = `agent-${idx}`;

      generatedNodes.push({
        id,
        type: 'custom',
        data: {
          type: 'agent',
          label: participant.label || `Agent ${idx + 1}`,
          description: participant.description,
          model: participant.config?.model_client?.model_name || '',
          tools: participant.config?.tools?.length || 0,
          toolNames: participant.config?.tools?.map((tool: any) => tool.config?.name) || [],
        },
        position: { x: 0, y: 0 },
      });

      generatedEdges.push({
        id: `edge-team-${id}`,
        source: 'team',
        target: id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#4D9CFF', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 12,
          height: 12,
          color: '#4D9CFF',
        },
      });
    });

    const layoutedNodes = applyDagreLayout(generatedNodes, generatedEdges);

    setNodes(layoutedNodes);
    setEdges(generatedEdges);

    setTimeout(() => {
      fitView({ padding: 0.3, duration: 800 });
    }, 100);
  }, [autogenStructure, setNodes, setEdges, fitView]);

  useEffect(() => {
    initializeFlow();
  }, [initializeFlow]);

  const handleAutoLayout = () => {
    const layoutedNodes = applyDagreLayout(nodes, edges);
    setNodes(layoutedNodes);
    setTimeout(() => {
      fitView({ padding: 0.3, duration: 800 });
    }, 100);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
      minZoom={0.3}
      maxZoom={1.2}
      fitViewOptions={{ padding: 0.2 }}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#333" gap={16} />
      <Controls
        className="bg-dark-surface border border-dark-border rounded-md"
        showInteractive={false}
      />
      {/* Panel with Auto Layout button */}
      <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Flow - {extractTeamType(autogenStructure?.provider)}</span>
        </div>
        <Button
          size="xs"
          variant="ghost"
          onClick={handleAutoLayout}
          className="text-xs px-2 py-1 border border-dark-border hover:bg-dark-400"
          leftIcon={<ArrowPathIcon className="h-3 w-3" />}
        >
          Auto Layout
        </Button>
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

// Helper to extract team type name
const extractTeamType = (provider: string) => {
  if (!provider) return 'Unknown Team';
  const parts = provider.split('.');
  return parts[parts.length - 1];
};
