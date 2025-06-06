import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlowProvider,
  MarkerType,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Bot, User, Users, Zap, Clock, Wrench, Database } from 'lucide-react';
import { ConversationState, AgentFlowStep, Team, Agent, Model, Tool } from '@/types';

interface ConversationFlowVisualizerProps {
  isVisible: boolean;
  onClose: () => void;
  conversationState: ConversationState['state'];
  agentFlow: AgentFlowStep[];
  currentTeam?: Team;
  activeAgents?: Agent[];
  usedModels?: Model[];
  usedTools?: Tool[];
}

// Custom node components
const UserNode = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[140px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-blue-500 border-blue-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-blue-400 border-blue-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center">
      <User className="h-5 w-5" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.description && (
      <p className="text-xs mt-2 opacity-90 text-center">{data.description}</p>
    )}
    {data.timestamp && (
      <p className="text-xs mt-1 opacity-70 text-center">
        {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    )}
  </div>
);

const TeamNode = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[200px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-purple-500 border-purple-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-purple-400 border-purple-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center">
      <Users className="h-5 w-5" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.aiTeamType && (
      <p className="text-xs mt-1 opacity-90 text-center font-mono">{data.aiTeamType}</p>
    )}
    {data.description && (
      <p className="text-xs mt-1 opacity-80 text-center">{data.description}</p>
    )}
    {data.agentCount && (
      <p className="text-xs mt-1 opacity-70 text-center">{data.agentCount} agents</p>
    )}
  </div>
);

const AgentNode = ({ data }: { data: any }) => (
  <div className={`p-3 rounded-lg shadow-lg border-2 min-w-[140px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-green-500 border-green-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-green-400 border-green-500 text-white'
      : data.status === 'pending'
      ? 'bg-yellow-400 border-yellow-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center">
      <Bot className="h-4 w-4" />
      <span className="text-xs font-medium">{data.label}</span>
    </div>
    {data.agentType && (
      <p className="text-xs mt-1 opacity-90 text-center">{data.agentType}</p>
    )}
    {data.modelName && (
      <p className="text-xs mt-1 opacity-80 text-center">{data.modelName}</p>
    )}
    {data.toolCount && (
      <div className="flex items-center gap-1 mt-1 justify-center">
        <Wrench className="h-3 w-3" />
        <span className="text-xs">{data.toolCount} tools</span>
      </div>
    )}
    {data.duration && (
      <div className="flex items-center gap-1 mt-1 justify-center">
        <Clock className="h-3 w-3" />
        <span className="text-xs">{data.duration}ms</span>
      </div>
    )}
  </div>
);

const ModelNode = ({ data }: { data: any }) => (
  <div className={`p-2 rounded-lg shadow-lg border-2 min-w-[100px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-orange-500 border-orange-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-orange-400 border-orange-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center">
      <Zap className="h-4 w-4" />
      <span className="text-xs font-medium">{data.label}</span>
    </div>
    {data.provider && (
      <p className="text-xs mt-1 opacity-90 text-center">{data.provider}</p>
    )}
  </div>
);

const ToolNode = ({ data }: { data: any }) => (
  <div className={`p-2 rounded-lg shadow-lg border-2 min-w-[100px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-cyan-500 border-cyan-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-cyan-400 border-cyan-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center">
      <Wrench className="h-4 w-4" />
      <span className="text-xs font-medium">{data.label}</span>
    </div>
    {data.category && (
      <p className="text-xs mt-1 opacity-90 text-center">{data.category}</p>
    )}
  </div>
);

const nodeTypes = {
  userNode: UserNode,
  teamNode: TeamNode,
  agentNode: AgentNode,
  modelNode: ModelNode,
  toolNode: ToolNode,
};

const ConversationFlowVisualizerContent: React.FC<ConversationFlowVisualizerProps> = ({
  isVisible,
  onClose,
  conversationState,
  agentFlow = [],
  currentTeam,
  activeAgents = [],
  usedModels = [],
  usedTools = []
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Mock data for demonstration - in real implementation, this would come from conversation analysis
  const mockTeam: Team = currentTeam || {
    id: 'team-1',
    name: 'Customer Service Team',
    description: 'AI agents team for customer support',
    aiTeamType: 'RoundRobinGroupChat',
    members: [],
    ownerId: '1',
    createdAt: new Date().toISOString(),
    agents: ['agent-1', 'agent-2']
  };

  const mockAgents: Agent[] = activeAgents.length > 0 ? activeAgents : [
    {
      id: 'agent-1',
      name: 'Assistant Agent',
      description: 'Main assistant for customer queries',
      status: 'deployed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '1',
      teamId: 'team-1',
      modelId: 'model-1',
      toolIds: ['tool-1', 'tool-2'],
      terminationConfig: 'auto'
    },
    {
      id: 'agent-2',
      name: 'User Proxy Agent',
      description: 'Human-in-the-loop agent',
      status: 'deployed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: '1',
      teamId: 'team-1',
      modelId: 'model-2',
      toolIds: ['tool-1'],
      terminationConfig: 'manual'
    }
  ];

  const mockModels: Model[] = usedModels.length > 0 ? usedModels : [
    {
      id: 'model-1',
      name: 'GPT-4o-mini',
      description: 'OpenAI GPT-4 optimized mini',
      provider: 'OpenAI',
      type: 'LLM',
      version: '4'
    },
    {
      id: 'model-2',
      name: 'Claude-3',
      description: 'Anthropic Claude 3',
      provider: 'Anthropic',
      type: 'LLM',
      version: '3'
    }
  ];

  const mockTools: Tool[] = usedTools.length > 0 ? usedTools : [
    {
      id: 'tool-1',
      name: 'Calculator',
      description: 'Mathematical calculations',
      category: 'Math',
      provider: 'Built-in'
    },
    {
      id: 'tool-2',
      name: 'Web Search',
      description: 'Search the internet',
      category: 'Information',
      provider: 'External'
    }
  ];

  // Generate flow based on team type and conversation progress
  const generateFlow = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yOffset = 50;

    // 1. User Input Node
    const userStep = agentFlow.find(step => step.type === 'user');
    newNodes.push({
      id: 'user-input',
      type: 'userNode',
      position: { x: 300, y: yOffset },
      data: {
        label: 'User Input',
        description: conversationState === 'listening' ? 'Speaking...' : 
                    conversationState === 'processing' ? 'Processing voice...' : 
                    userStep ? 'Voice input received' : 'Ready to listen',
        status: conversationState === 'listening' ? 'active' : 
                userStep ? 'completed' : 'pending',
        timestamp: userStep?.timestamp
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    });

    yOffset += 150;

    // 2. AI Team Node
    const teamStep = agentFlow.find(step => step.type === 'agent' || step.type === 'decision');
    newNodes.push({
      id: 'agent-team',
      type: 'teamNode',
      position: { x: 250, y: yOffset },
      data: {
        label: mockTeam.name,
        aiTeamType: mockTeam.aiTeamType,
        description: mockTeam.description,
        agentCount: mockAgents.length,
        status: conversationState === 'processing' || conversationState === 'responding' ? 'active' : 
                teamStep ? 'completed' : 'pending'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    });

    // Edge from user to team
    newEdges.push({
      id: 'edge-user-team',
      source: 'user-input',
      target: 'agent-team',
      type: 'smoothstep',
      animated: conversationState === 'processing',
      style: { 
        stroke: conversationState === 'processing' || conversationState === 'responding' ? '#3b82f6' : '#6b7280',
        strokeWidth: 2 
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: conversationState === 'processing' || conversationState === 'responding' ? '#3b82f6' : '#6b7280',
      },
    });

    yOffset += 150;

    // 3. Individual Agent Nodes with team-type specific layout
    const agentPositions = generateAgentPositions(mockTeam.aiTeamType, mockAgents.length);
    
    mockAgents.forEach((agent, index) => {
      const agentStep = agentFlow.find(step => step.type === 'agent' && step.label.includes(agent.name));
      const model = mockModels.find(m => m.id === agent.modelId);
      const agentTools = mockTools.filter(t => agent.toolIds.includes(t.id));

      newNodes.push({
        id: agent.id,
        type: 'agentNode',
        position: { x: agentPositions[index].x, y: yOffset },
        data: {
          label: agent.name,
          agentType: getAgentTypeFromName(agent.name),
          modelName: model?.name,
          toolCount: agentTools.length,
          status: conversationState === 'responding' && agentStep ? 'active' : 
                  agentStep ? 'completed' : 'pending',
          duration: agentStep?.duration
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });

      // Edge from team to agent
      newEdges.push({
        id: `edge-team-${agent.id}`,
        source: 'agent-team',
        target: agent.id,
        type: 'smoothstep',
        animated: conversationState === 'responding',
        style: { 
          stroke: conversationState === 'responding' ? '#10b981' : '#6b7280',
          strokeWidth: 2 
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: conversationState === 'responding' ? '#10b981' : '#6b7280',
        },
      });

      // Add model nodes
      if (model) {
        newNodes.push({
          id: `model-${agent.id}`,
          type: 'modelNode',
          position: { x: agentPositions[index].x - 80, y: yOffset + 100 },
          data: {
            label: model.name,
            provider: model.provider,
            status: agentStep ? 'completed' : 'pending'
          },
          sourcePosition: Position.Top,
          targetPosition: Position.Bottom,
        });

        newEdges.push({
          id: `edge-agent-model-${agent.id}`,
          source: agent.id,
          target: `model-${agent.id}`,
          type: 'straight',
          style: { stroke: '#f59e0b', strokeWidth: 1 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#f59e0b',
          },
        });
      }

      // Add tool nodes
      agentTools.forEach((tool, toolIndex) => {
        const toolStep = agentFlow.find(step => step.type === 'tool' && step.label.includes(tool.name));
        
        newNodes.push({
          id: `tool-${agent.id}-${tool.id}`,
          type: 'toolNode',
          position: { x: agentPositions[index].x + 80 + (toolIndex * 60), y: yOffset + 100 },
          data: {
            label: tool.name,
            category: tool.category,
            status: toolStep ? 'completed' : 'pending'
          },
          sourcePosition: Position.Top,
          targetPosition: Position.Bottom,
        });

        newEdges.push({
          id: `edge-agent-tool-${agent.id}-${tool.id}`,
          source: agent.id,
          target: `tool-${agent.id}-${tool.id}`,
          type: 'straight',
          animated: toolStep?.status === 'active',
          style: { stroke: '#06b6d4', strokeWidth: 1 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#06b6d4',
          },
        });
      });
    });

    // Add team-type specific inter-agent connections
    addTeamTypeConnections(mockTeam.aiTeamType, mockAgents, newEdges, conversationState);

    setNodes(newNodes);
    setEdges(newEdges);
  }, [conversationState, agentFlow, setNodes, setEdges]);

  // Generate agent positions based on team type
  const generateAgentPositions = (teamType: string, agentCount: number) => {
    const positions = [];
    const baseX = 300;
    const spacing = 200;

    switch (teamType) {
      case 'RoundRobinGroupChat':
        // Circular arrangement for round-robin
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * 2 * Math.PI) / agentCount;
          positions.push({
            x: baseX + Math.cos(angle) * 100,
            y: 0 // Will be offset by yOffset
          });
        }
        break;
      
      case 'HierarchicalGroupChat':
        // Hierarchical tree structure
        positions.push({ x: baseX, y: 0 }); // Main agent
        for (let i = 1; i < agentCount; i++) {
          positions.push({
            x: baseX + (i - 1) * spacing - ((agentCount - 2) * spacing) / 2,
            y: 80
          });
        }
        break;
      
      case 'CascadingGroupChat':
        // Linear cascade
        for (let i = 0; i < agentCount; i++) {
          positions.push({
            x: baseX + i * spacing - ((agentCount - 1) * spacing) / 2,
            y: i * 40
          });
        }
        break;
      
      default:
        // Default horizontal layout
        for (let i = 0; i < agentCount; i++) {
          positions.push({
            x: baseX + i * spacing - ((agentCount - 1) * spacing) / 2,
            y: 0
          });
        }
    }

    return positions;
  };

  // Add team-type specific connections between agents
  const addTeamTypeConnections = (teamType: string, agents: Agent[], edges: Edge[], state: string) => {
    switch (teamType) {
      case 'RoundRobinGroupChat':
        // Connect agents in a circle
        for (let i = 0; i < agents.length; i++) {
          const nextIndex = (i + 1) % agents.length;
          edges.push({
            id: `edge-round-${i}`,
            source: agents[i].id,
            target: agents[nextIndex].id,
            type: 'smoothstep',
            animated: state === 'responding',
            style: { 
              stroke: '#f59e0b',
              strokeWidth: 1,
              strokeDasharray: '5,5'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#f59e0b',
            },
          });
        }
        break;
      
      case 'HierarchicalGroupChat':
        // Connect main agent to all others
        if (agents.length > 1) {
          for (let i = 1; i < agents.length; i++) {
            edges.push({
              id: `edge-hierarchy-${i}`,
              source: agents[0].id,
              target: agents[i].id,
              type: 'smoothstep',
              animated: state === 'responding',
              style: { 
                stroke: '#8b5cf6',
                strokeWidth: 1,
                strokeDasharray: '3,3'
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#8b5cf6',
              },
            });
          }
        }
        break;
      
      case 'CascadingGroupChat':
        // Connect agents in sequence
        for (let i = 0; i < agents.length - 1; i++) {
          edges.push({
            id: `edge-cascade-${i}`,
            source: agents[i].id,
            target: agents[i + 1].id,
            type: 'smoothstep',
            animated: state === 'responding',
            style: { 
              stroke: '#ef4444',
              strokeWidth: 1,
              strokeDasharray: '4,4'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#ef4444',
            },
          });
        }
        break;
    }
  };

  // Helper function to determine agent type from name
  const getAgentTypeFromName = (name: string): string => {
    if (name.toLowerCase().includes('assistant')) return 'AssistantAgent';
    if (name.toLowerCase().includes('proxy')) return 'UserProxyAgent';
    if (name.toLowerCase().includes('code')) return 'CodeInterpreterAgent';
    return 'AssistantAgent';
  };

  useEffect(() => {
    generateFlow();
  }, [generateFlow]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, x: 50 }}
      animate={{ scale: 1, x: 0 }}
      exit={{ scale: 0.9, x: 50 }}
      className={`bg-dark-surface border border-dark-border rounded-xl shadow-xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-[600px] h-[500px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            conversationState === 'listening' ? 'bg-blue-500 animate-pulse' :
            conversationState === 'processing' ? 'bg-yellow-500 animate-pulse' :
            conversationState === 'responding' ? 'bg-green-500 animate-pulse' :
            'bg-gray-500'
          }`} />
          <h3 className="text-sm font-medium text-white">Agent Team Flow</h3>
          <span className="text-xs text-gray-400 capitalize">({conversationState})</span>
          <span className="text-xs text-gray-500">• {mockTeam.aiTeamType}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="h-[440px] bg-dark-background">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            minZoom={0.3}
            maxZoom={1.2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#374151" gap={16} />
            <Controls 
              className="bg-dark-surface border border-dark-border rounded"
              showInteractive={false}
            />
          </ReactFlow>
        </div>
      )}

      {/* Status indicator when minimized */}
      {isMinimized && (
        <div className="p-2 text-center">
          <p className="text-xs text-gray-400 capitalize">
            {conversationState === 'idle' ? 'Ready' : conversationState} • {agentFlow.length} steps
          </p>
        </div>
      )}
    </motion.div>
  );
};

const ConversationFlowVisualizer: React.FC<ConversationFlowVisualizerProps> = (props) => {
  return (
    <ReactFlowProvider>
      <ConversationFlowVisualizerContent {...props} />
    </ReactFlowProvider>
  );
};

export default ConversationFlowVisualizer;