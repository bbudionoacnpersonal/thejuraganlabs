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
import { Bot, User, Users, Zap, Clock } from 'lucide-react';

interface ConversationFlowVisualizerProps {
  isVisible: boolean;
  onClose: () => void;
  conversationState: 'idle' | 'listening' | 'processing' | 'responding';
  currentStep?: string;
  agentFlow?: AgentFlowStep[];
}

interface AgentFlowStep {
  id: string;
  type: 'user' | 'agent' | 'tool' | 'decision' | 'output';
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  description?: string;
  timestamp?: number;
  duration?: number;
}

// Custom node components
const UserNode = ({ data }: { data: any }) => (
  <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg border-2 border-blue-600 min-w-[140px]">
    <div className="flex items-center gap-2 justify-center">
      <User className="h-5 w-5" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.description && (
      <p className="text-xs mt-2 opacity-90 text-center">{data.description}</p>
    )}
  </div>
);

const TeamNode = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[180px] ${
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
    {data.teamType && (
      <p className="text-xs mt-1 opacity-90 text-center">{data.teamType}</p>
    )}
    {data.description && (
      <p className="text-xs mt-1 opacity-80 text-center">{data.description}</p>
    )}
  </div>
);

const AgentNode = ({ data }: { data: any }) => (
  <div className={`p-3 rounded-lg shadow-lg border-2 min-w-[120px] ${
    data.status === 'active' 
      ? 'bg-green-500 border-green-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-green-400 border-green-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center">
      <Bot className="h-4 w-4" />
      <span className="text-xs font-medium">{data.label}</span>
    </div>
    {data.agentType && (
      <p className="text-xs mt-1 opacity-90 text-center">{data.agentType}</p>
    )}
    {data.llm && (
      <p className="text-xs mt-1 opacity-80 text-center">{data.llm}</p>
    )}
    {data.duration && (
      <div className="flex items-center gap-1 mt-1 justify-center">
        <Clock className="h-3 w-3" />
        <span className="text-xs">{data.duration}ms</span>
      </div>
    )}
  </div>
);

const nodeTypes = {
  userNode: UserNode,
  teamNode: TeamNode,
  agentNode: AgentNode,
};

const ConversationFlowVisualizerContent: React.FC<ConversationFlowVisualizerProps> = ({
  isVisible,
  onClose,
  conversationState,
  currentStep,
  agentFlow = []
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Generate flow based on conversation state
  const generateFlow = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // User Input Node
    newNodes.push({
      id: 'user-input',
      type: 'userNode',
      position: { x: 50, y: 50 },
      data: {
        label: 'User Input',
        description: conversationState === 'listening' ? 'Speaking...' : 
                    conversationState === 'processing' ? 'Processing voice...' : 
                    'Voice input received',
        status: conversationState === 'listening' ? 'active' : 'completed'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    });

    // AI Agent Team Node
    const teamStatus = conversationState === 'processing' || conversationState === 'responding' ? 'active' : 
                      conversationState === 'idle' ? 'pending' : 'completed';

    newNodes.push({
      id: 'agent-team',
      type: 'teamNode',
      position: { x: 50, y: 180 },
      data: {
        label: 'Customer Service Team',
        teamType: 'RoundRobin',
        description: 'AI agents team processing request',
        status: teamStatus
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

    // Individual Agent Nodes
    const agents = [
      { id: 'assistant-agent', label: 'Assistant Agent', type: 'AssistantAgent', llm: 'GPT-4o-mini', x: -80 },
      { id: 'user-proxy', label: 'User Proxy', type: 'UserProxyAgent', llm: 'N/A', x: 180 }
    ];

    agents.forEach((agent, index) => {
      const agentStatus = conversationState === 'responding' ? 'active' : 
                         conversationState === 'idle' ? 'pending' : 'pending';

      newNodes.push({
        id: agent.id,
        type: 'agentNode',
        position: { x: agent.x, y: 320 },
        data: {
          label: agent.label,
          agentType: agent.type,
          llm: agent.llm,
          status: agentStatus
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

      // Add communication edges between agents (for RoundRobin)
      if (index > 0) {
        newEdges.push({
          id: `edge-agent-${index}`,
          source: agents[index - 1].id,
          target: agent.id,
          type: 'smoothstep',
          animated: conversationState === 'responding',
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
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [conversationState, setNodes, setEdges]);

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
      className={`bg-dark-surface border border-dark-border rounded-xl shadow-xl ${
        isMinimized ? 'w-80 h-16' : 'w-[600px] h-[500px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            conversationState === 'listening' ? 'bg-blue-500 animate-pulse' :
            conversationState === 'processing' ? 'bg-yellow-500 animate-pulse' :
            conversationState === 'responding' ? 'bg-green-500 animate-pulse' :
            'bg-gray-500'
          }`} />
          <h3 className="text-sm font-medium text-white">Agent Team Flow</h3>
          <span className="text-xs text-gray-400 capitalize">({conversationState})</span>
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
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
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
            {conversationState === 'idle' ? 'Ready' : conversationState}
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