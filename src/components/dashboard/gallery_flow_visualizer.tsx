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
import AutogenNode from '../create-agent/AutogenNode'; // ← your custom node
import { applyAutoLayout } from '@/utils/dagreLayout'; // ← dagre layout utility

interface GalleryFlowVisualizerProps {
  autogenStructure: any; // from useCase.autogenStructure
  title: string;
}

const nodeTypes = {
  custom: AutogenNode,
};

const GalleryFlowVisualizerContent: React.FC<GalleryFlowVisualizerProps> = ({ autogenStructure, title }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();

  const buildInitialFlow = useCallback(() => {
    if (!autogenStructure) return;

    const participants = autogenStructure.config?.participants || [];
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Team Node
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

    // Agent Nodes
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

  return (
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
        <div className="flex items-center justify-between text-xs text-white mb-2">
          {title}
        </div>
        <button
          onClick={buildInitialFlow}
          className="mt-2 bg-dark-400 text-white text-xs rounded-md px-3 py-1 hover:bg-dark-500 transition"
        >
          Auto Layout
        </button>
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

// Helper to extract team type
const extractTeamType = (provider: string) => {
  if (!provider) return 'Unknown Team';
  const parts = provider.split('.');
  return parts[parts.length - 1]; // e.g., RoundRobinGroupChat
};
