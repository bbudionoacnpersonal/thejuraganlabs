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
import { Bot, User, MessageSquare, Zap, Clock, CheckCircle } from 'lucide-react';

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
  <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg border-2 border-blue-600 min-w-[120px]">
    <div className="flex items-center gap-2">
      <User className="h-4 w-4" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.description && (
      <p className="text-xs mt-1 opacity-90">{data.description}</p>
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
    <div className="flex items-center gap-2">
      <Bot className="h-4 w-4" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.description && (
      <p className="text-xs mt-1 opacity-90">{data.description}</p>
    )}
    {data.duration && (
      <div className="flex items-center gap-1 mt-1">
        <Clock className="h-3 w-3" />
        <span className="text-xs">{data.duration}ms</span>
      </div>
    )}
  </div>
);

const ToolNode = ({ data }: { data: any }) => (
  <div className={`p-3 rounded-lg shadow-lg border-2 min-w-[120px] ${
    data.status === 'active' 
      ? 'bg-purple-500 border-purple-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-purple-400 border-purple-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2">
      <Zap className="h-4 w-4" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.description && (
      <p className="text-xs mt-1 opacity-90">{data.description}</p>
    )}
  </div>
);

const OutputNode = ({ data }: { data: any }) => (
  <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg border-2 border-orange-600 min-w-[120px]">
    <div className="flex items-center gap-2">
      <MessageSquare className="h-4 w-4" />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
    {data.description && (
      <p className="text-xs mt-1 opacity-90">{data.description}</p>
    )}
    <div className="flex items-center gap-1 mt-1">
      <CheckCircle className="h-3 w-3" />
      <span className="text-xs">Response Ready</span>
    </div>
  </div>
);

const nodeTypes = {
  userNode: UserNode,
  agentNode: AgentNode,
  toolNode: ToolNode,
  outputNode: OutputNode,
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

  // Generate flow based on conversation state and agent flow
  const generateFlow = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yPosition = 0;
    const nodeSpacing = 150;

    // Always start with user input
    newNodes.push({
      id: 'user-input',
      type: 'userNode',
      position: { x: 0, y: yPosition },
      data: {
        label: 'User Input',
        description: conversationState === 'listening' ? 'Speaking...' : 'Voice input received',
        status: conversationState === 'listening' ? 'active' : 'completed'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    });

    if (conversationState !== 'idle') {
      yPosition += nodeSpacing;

      // Add processing steps based on agent flow or default flow
      if (agentFlow.length > 0) {
        agentFlow.forEach((step, index) => {
          const nodeId = `step-${step.id}`;
          let nodeType = 'agentNode';
          
          if (step.type === 'tool') nodeType = 'toolNode';
          else if (step.type === 'output') nodeType = 'outputNode';

          newNodes.push({
            id: nodeId,
            type: nodeType,
            position: { x: (index % 2) * 200, y: yPosition },
            data: {
              label: step.label,
              description: step.description,
              status: step.status,
              duration: step.duration
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          });

          // Add edge from previous node
          const sourceId = index === 0 ? 'user-input' : `step-${agentFlow[index - 1].id}`;
          newEdges.push({
            id: `edge-${sourceId}-${nodeId}`,
            source: sourceId,
            target: nodeId,
            type: 'smoothstep',
            animated: step.status === 'active',
            style: { 
              stroke: step.status === 'completed' ? '#10b981' : step.status === 'active' ? '#3b82f6' : '#6b7280',
              strokeWidth: 2 
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: step.status === 'completed' ? '#10b981' : step.status === 'active' ? '#3b82f6' : '#6b7280',
            },
          });

          if (index < agentFlow.length - 1) {
            yPosition += nodeSpacing;
          }
        });
      } else {
        // Default flow when no specific agent flow is provided
        const defaultSteps = [
          { id: 'analyze', label: 'Analyzing Input', type: 'agent', status: conversationState === 'processing' ? 'active' : conversationState === 'responding' ? 'completed' : 'pending' },
          { id: 'generate', label: 'Generating Response', type: 'agent', status: conversationState === 'responding' ? 'active' : 'pending' },
          { id: 'output', label: 'AI Response', type: 'output', status: 'pending' }
        ];

        defaultSteps.forEach((step, index) => {
          const nodeId = `default-${step.id}`;
          newNodes.push({
            id: nodeId,
            type: step.type === 'output' ? 'outputNode' : 'agentNode',
            position: { x: 0, y: yPosition },
            data: {
              label: step.label,
              status: step.status
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          });

          // Add edge from previous node
          const sourceId = index === 0 ? 'user-input' : `default-${defaultSteps[index - 1].id}`;
          newEdges.push({
            id: `edge-${sourceId}-${nodeId}`,
            source: sourceId,
            target: nodeId,
            type: 'smoothstep',
            animated: step.status === 'active',
            style: { 
              stroke: step.status === 'completed' ? '#10b981' : step.status === 'active' ? '#3b82f6' : '#6b7280',
              strokeWidth: 2 
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: step.status === 'completed' ? '#10b981' : step.status === 'active' ? '#3b82f6' : '#6b7280',
            },
          });

          yPosition += nodeSpacing;
        });
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [conversationState, agentFlow, setNodes, setEdges]);

  useEffect(() => {
    generateFlow();
  }, [generateFlow]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed top-4 right-4 bg-dark-surface border border-dark-border rounded-lg shadow-xl z-40 ${
          isMinimized ? 'w-64 h-16' : 'w-80 h-96'
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
            <h3 className="text-sm font-medium text-white">Agent Flow</h3>
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
          <div className="h-80 bg-dark-background">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
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
            <p className="text-xs text-gray-400 capitalize">{conversationState}</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
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