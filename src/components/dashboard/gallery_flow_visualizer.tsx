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
import 'reactflow/dist/style.css';
import dagre from 'dagre'; // 🚀 Dagre imported
import AutogenNode from '../create-agent/AutogenNode'; // <-- use your custom AutogenNode

interface GalleryFlowVisualizerProps {
  autogenStructure: any; // This comes from useCase.autogenStructure
}

const nodeTypes = {
  custom: AutogenNode,
};

// Layout Settings
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const NODE_WIDTH = 240;
const NODE_HEIGHT = 160;

// 🎯 Function to transform autogenStructure to nodes and edges
const transformAutogenStructureToFlow = (autogenStructure: any) => {
  if (!autogenStructure?.config?.participants) return { nodes: [], edges: [] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const participants = autogenStructure.config.participants;
  const teamProvider = autogenStructure.provider;

  const TEAM_ID = 'team-node';

  // Add Team Node
  nodes.push({
    id: TEAM_ID,
    type: 'custom',
    data: {
      label: autogenStructure.label || 'AI Team',
      type: 'team',
      teamType: extractTeamType(teamProvider),
      description: autogenStructure.description,
      model: '', 
      agents: participants.map((p: any) => ({
        name: p.label,
        model: { name: p.config?.model_client?.model_name, provider: 'LLM' },
        tools: (p.config?.tools || []).map((tool: any) => ({
          name: tool.config?.name || 'Unnamed Tool',
          description: tool.config?.description || '',
        })),
      })),
      terminations: autogenStructure.config.termination_condition ? [{ name: autogenStructure.config.termination_condition.description }] : [],
    },
    position: { x: 0, y: 0 }, // Temporary, Dagre will fix
  });

  // Add Agent Nodes
  participants.forEach((participant: any, index: number) => {
    const agentId = `agent-${index}`;

    nodes.push({
      id: agentId,
      type: 'custom',
      data: {
        label: participant.label || `Agent ${index + 1}`,
        type: 'agent',
        model: participant.config?.model_client?.model_name || '',
        tools: participant.config?.tools?.length || 0,
        toolNames: (participant.config?.tools || []).map((tool: any) => tool.config?.name || 'Unnamed Tool'),
        description: participant.description,
      },
      position: { x: 0, y: 0 }, // Temporary, Dagre will fix
    });

    edges.push({
      id: `e-team-${agentId}`,
      source: TEAM_ID,
      target: agentId,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#4D9CFF', strokeWidth: 2 },
    });
  });

  // 🧩 Dagre Layout
  dagreGraph.setGraph({ rankdir: 'TB' }); // Top-Bottom layout

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

const GalleryFlowVisualizerContent: React.FC<GalleryFlowVisualizerProps> = ({ autogenStructure }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (!autogenStructure) return;

    const { nodes: generatedNodes, edges: generatedEdges } = transformAutogenStructureToFlow(autogenStructure);

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
      fitView
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
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
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Team Type: {formatTeamTypeName(extractTeamType(autogenStructure?.provider))}</span>
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
  if (!provider) return 'Unknown';
  const parts = provider.split('.');
  return parts[parts.length - 1]; // e.g., RoundRobinGroupChat
};

const formatTeamTypeName = (teamType: string) => {
  if (!teamType) return 'Unknown';
  return teamType
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/Group Chat$/, 'Group')
    .replace(/Chat$/, '')
    .trim();
};
