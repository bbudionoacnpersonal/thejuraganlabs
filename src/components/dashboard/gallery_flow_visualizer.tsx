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
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Bot, SparklesIcon, Wrench } from 'lucide-react';

interface GalleryFlowVisualizerProps {
  autogenStructure: any; // This comes from useCase.autogenStructure
}

const nodeTypes = {
  default: ({ data }: any) => (
    <div className="p-2 bg-dark-surface border border-dark-border rounded-lg text-white text-xs">
      <div className="flex items-center gap-2 mb-1">
        <Bot className="h-4 w-4" />
        <span className="font-semibold">{data.label}</span>
      </div>
      {data.model && (
        <div className="flex items-center gap-1 text-blue-400 mb-1">
          <SparklesIcon className="h-3 w-3" />
          {data.model}
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {data.tools?.map((tool: string, idx: number) => (
          <div key={idx} className="bg-blue-700 text-white rounded px-2 py-0.5 text-xs inline-flex items-center gap-1">
            <Wrench className="h-3 w-3" />
            {tool}
          </div>
        ))}
      </div>
    </div>
  ),
};

const GalleryFlowVisualizerContent: React.FC<GalleryFlowVisualizerProps> = ({ autogenStructure }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (!autogenStructure) return;

    const generatedNodes: Node[] = [];
    const generatedEdges: Edge[] = [];

    const participants = autogenStructure.config?.participants || [];

    const startX = 0;
    const startY = 0;
    const horizontalSpacing = 250;

    participants.forEach((participant: any, idx: number) => {
      generatedNodes.push({
        id: `agent-${idx}`,
        type: 'default',
        data: {
          label: participant.label || `Agent ${idx + 1}`,
          model: participant.config?.model_client?.model_name || '',
          tools: participant.config?.tools?.map((tool: any) => tool.config?.name || 'Unnamed Tool') || [],
        },
        position: { x: startX + idx * horizontalSpacing, y: startY },
      });

      if (idx > 0) {
        generatedEdges.push({
          id: `edge-${idx - 1}-${idx}`,
          source: `agent-${idx - 1}`,
          target: `agent-${idx}`,
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
      }
    });

    setNodes(generatedNodes);
    setEdges(generatedEdges);

    setTimeout(() => {
      fitView({ padding: 0.3, duration: 800 });
    }, 100);
  }, [autogenStructure, fitView, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      minZoom={0.3}
      maxZoom={1}
      fitViewOptions={{ padding: 0.2 }}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#333" gap={16} />
      <Controls 
        className="bg-dark-surface border border-dark-border rounded-md"
        showInteractive={false}
      />
      <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Flow - {extractTeamType(autogenStructure?.provider)}</span>
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

// Helper to extract team type name
const extractTeamType = (provider: string) => {
  if (!provider) return 'Unknown Team';
  const parts = provider.split('.');
  return parts[parts.length - 1]; // e.g., RoundRobinGroupChat
};
