import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { XMarkIcon, EyeIcon, EyeSlashIcon, SparklesIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Bot, User, Users, Zap, Clock, Wrench, Brain } from 'lucide-react';
import { 
  conversationFlowState, 
  updateUserInput, 
  updateFromAutogenStructure,
  updateConversationState,
  getFlowState,
  setAnalysisInProgress,
  shouldTriggerAnalysis,
  getAnalysisReadyData,
  getTeamProgress,
  TempTeamData,
  TempAgentData,
  getCurrentAutogenStructure
} from '@/mockdata/temp_conv_agentflow';
import { analyzeConversationForAutogenStructure } from '@/services/anthropicService';
import { transformTeamStructureToFlow } from '@/utils/visualEditorUtils';

interface ConversationFlowVisualizerProps {
  isVisible: boolean;
  onClose: () => void;
  conversationState: 'idle' | 'listening' | 'processing' | 'responding';
  agentFlow: Array<{
    id: string;
    type: 'user' | 'agent' | 'tool' | 'decision' | 'output';
    label: string;
    status: 'pending' | 'active' | 'completed' | 'error';
    description?: string;
    timestamp?: number;
    duration?: number;
  }>;
  messages?: Array<{ role: string; content: string; timestamp: number }>;
}

// Enhanced custom node components with confidence indicators
const UserNode = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[160px] transition-all duration-300 ${
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
    {data.processed !== undefined && (
      <div className="flex items-center justify-center mt-2">
        <div className={`w-2 h-2 rounded-full ${data.processed ? 'bg-green-300' : 'bg-yellow-300'}`} />
        <span className="text-xs ml-1">{data.processed ? 'Analyzed' : 'Pending'}</span>
      </div>
    )}
  </div>
);

const TeamNode = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[220px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-purple-500 border-purple-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-purple-400 border-purple-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center mb-2">
      <Users className="h-5 w-5" />
      <span className="text-sm font-medium">{data.label}</span>
      {data.confidence && (
        <div className="flex items-center gap-1">
          <Brain className="h-3 w-3" />
          <span className="text-xs">{Math.round(data.confidence * 100)}%</span>
        </div>
      )}
    </div>
    {data.teamType && (
      <div className="text-center mb-2">
        <span className="text-xs bg-white/20 px-2 py-1 rounded font-mono">{data.teamType}</span>
      </div>
    )}
    {data.description && (
      <p className="text-xs opacity-80 text-center mb-2">{data.description}</p>
    )}
    {data.agentCount !== undefined && (
      <p className="text-xs opacity-70 text-center">{data.agentCount} agents configured</p>
    )}
    {data.source && (
      <div className="text-center mt-2">
        <span className="text-xs bg-white/10 px-2 py-1 rounded">
          {data.source === 'ai_analysis' ? '🤖 AI Detected' : '👤 User Input'}
        </span>
      </div>
    )}
  </div>
);

const AgentNode = ({ data }: { data: any }) => (
  <div className={`p-3 rounded-lg shadow-lg border-2 min-w-[180px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-green-500 border-green-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-green-400 border-green-500 text-white'
      : data.status === 'pending'
      ? 'bg-yellow-400 border-yellow-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center mb-2">
      <Bot className="h-4 w-4" />
      <span className="text-sm font-medium">{data.label}</span>
      {data.confidence && (
        <div className="flex items-center gap-1">
          <Brain className="h-3 w-3" />
          <span className="text-xs">{Math.round(data.confidence * 100)}%</span>
        </div>
      )}
    </div>
    
    {data.agentType && (
      <p className="text-xs opacity-90 text-center mb-1">{data.agentType}</p>
    )}
    
    {/* Embedded Model Info */}
    {data.modelName && (
      <div className="bg-white/10 rounded p-2 mb-2">
        <div className="flex items-center gap-1 justify-center mb-1">
          <Zap className="h-3 w-3" />
          <span className="text-xs font-medium">Model</span>
        </div>
        <p className="text-xs text-center">{data.modelName}</p>
        {data.modelProvider && (
          <p className="text-xs opacity-80 text-center">{data.modelProvider}</p>
        )}
      </div>
    )}
    
    {/* Embedded Tools Info */}
    {data.tools && data.tools.length > 0 && (
      <div className="bg-white/10 rounded p-2 mb-2">
        <div className="flex items-center gap-1 justify-center mb-1">
          <Wrench className="h-3 w-3" />
          <span className="text-xs font-medium">Tools ({data.tools.length})</span>
        </div>
        <div className="space-y-1">
          {data.tools.slice(0, 2).map((tool: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between">
              <p className="text-xs text-center opacity-90">{tool.name}</p>
              {tool.confidence && (
                <span className="text-xs opacity-70">{Math.round(tool.confidence * 100)}%</span>
              )}
            </div>
          ))}
          {data.tools.length > 2 && (
            <p className="text-xs text-center opacity-70">+{data.tools.length - 2} more</p>
          )}
        </div>
      </div>
    )}
    
    {data.source && (
      <div className="text-center mt-2">
        <span className="text-xs bg-white/10 px-2 py-1 rounded">
          {data.source === 'ai_analysis' ? '🤖 AI Detected' : '👤 User Input'}
        </span>
      </div>
    )}
    
    {data.duration && (
      <div className="flex items-center gap-1 mt-2 justify-center">
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

// Custom hook for draggable functionality
const useDraggable = (ref: React.RefObject<HTMLDivElement>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Only allow dragging from header area
      const target = e.target as HTMLElement;
      const header = element.querySelector('[data-drag-handle]');
      if (!header?.contains(target)) return;

      setIsDragging(true);
      const rect = element.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Constrain to viewport
      const maxX = window.innerWidth - element.offsetWidth;
      const maxY = window.innerHeight - element.offsetHeight;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, ref]);

  return { position, isDragging };
};

// Custom hook for resizable functionality
const useResizable = (ref: React.RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [resizeDirection, setResizeDirection] = useState<string>('');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const direction = target.getAttribute('data-resize-direction');
      if (!direction) return;

      setIsResizing(true);
      setResizeDirection(direction);
      e.preventDefault();
      e.stopPropagation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !element) return;

      const rect = element.getBoundingClientRect();
      let newWidth = size.width;
      let newHeight = size.height;

      if (resizeDirection.includes('right')) {
        newWidth = Math.max(400, e.clientX - rect.left);
      }
      if (resizeDirection.includes('left')) {
        newWidth = Math.max(400, rect.right - e.clientX);
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(300, e.clientY - rect.top);
      }
      if (resizeDirection.includes('top')) {
        newHeight = Math.max(300, rect.bottom - e.clientY);
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
    };

    // Add resize handles
    const resizeHandles = element.querySelectorAll('[data-resize-direction]');
    resizeHandles.forEach(handle => {
      handle.addEventListener('mousedown', handleMouseDown);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      resizeHandles.forEach(handle => {
        handle.removeEventListener('mousedown', handleMouseDown);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, size, resizeDirection, ref]);

  return { size, isResizing };
};

const ConversationFlowVisualizerContent: React.FC<ConversationFlowVisualizerProps> = ({
  isVisible,
  onClose,
  conversationState,
  agentFlow = [],
  messages = []
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [useAutogenFlow, setUseAutogenFlow] = useState(false);
  
  // Refs for draggable and resizable functionality
  const windowRef = useRef<HTMLDivElement>(null);
  const { position, isDragging } = useDraggable(windowRef);
  const { size, isResizing } = useResizable(windowRef);

  // Update conversation state in flow data
  useEffect(() => {
    updateConversationState(conversationState);
  }, [conversationState]);

  // Enhanced AI analysis with Autogen structure generation
  useEffect(() => {
    const performAnalysis = async () => {
      if (messages.length === 0 || messages.length === lastMessageCount) return;
      
      // Check if analysis should be triggered
      if (!shouldTriggerAnalysis()) return;
      
      setIsAnalyzing(true);
      setAnalysisInProgress(true);
      
      try {
        // Get user context
        const userIndustry = localStorage.getItem('user_industry') || undefined;
        const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');
        
        // Get current state for context
        const analysisData = getAnalysisReadyData();
        
        // Prepare messages for analysis
        const messageTexts = messages.map(m => `${m.role}: ${m.content}`);
        
        console.log('Starting Autogen AI analysis with context:', {
          messageCount: messages.length,
          userIndustry,
          userFocusAreas,
          currentState: analysisData
        });
        
        // Perform contextual analysis to get Autogen structure
        const analysis = await analyzeConversationForAutogenStructure(
          messageTexts,
          analysisData.autogenStructure,
          userIndustry,
          userFocusAreas
        );
        
        console.log('Autogen AI Analysis completed:', analysis);
        
        // Update flow state with Autogen structure
        if (analysis.teamStructure) {
          updateFromAutogenStructure(analysis.teamStructure, analysis);
          setUseAutogenFlow(true); // Switch to Autogen-based flow
        }
        
        setLastMessageCount(messages.length);
        
      } catch (error) {
        console.error('Error in Autogen AI analysis:', error);
        
        // Fallback: Update user input manually if AI analysis fails
        if (messages.length > 0) {
          const userMessages = messages.filter(m => m.role === 'user');
          if (userMessages.length > 0) {
            const lastUserMessage = userMessages[userMessages.length - 1];
            updateUserInput(lastUserMessage.content);
          }
        }
      } finally {
        setIsAnalyzing(false);
        setAnalysisInProgress(false);
      }
    };

    // Debounce analysis
    const timeoutId = setTimeout(performAnalysis, 1500);
    return () => clearTimeout(timeoutId);
  }, [messages, lastMessageCount]);

  // Generate flow based on Autogen structure or progressive flow
  const generateFlow = useCallback(() => {
    const flowState = getFlowState();
    const autogenStructure = getCurrentAutogenStructure();
    
    if (useAutogenFlow && autogenStructure) {
      // Use Autogen structure to generate flow
      const { nodes: autogenNodes, edges: autogenEdges } = transformTeamStructureToFlow(
        autogenStructure,
        (nodeData) => console.log('Node edit:', nodeData)
      );
      
      // Convert to our node format with enhanced data
      const enhancedNodes = autogenNodes.map(node => ({
        ...node,
        type: node.data.type === 'team' ? 'teamNode' : 'agentNode',
        data: {
          ...node.data,
          status: conversationState === 'processing' || conversationState === 'responding' ? 'active' : 'completed',
          confidence: 0.9,
          source: 'ai_analysis'
        }
      }));
      
      // Add user input node
      const userNode: Node = {
        id: 'user-input',
        type: 'userNode',
        position: { x: 300, y: -150 },
        data: {
          label: 'User Input',
          description: conversationState === 'listening' ? 'Speaking...' : 
                      conversationState === 'processing' ? 'Processing voice...' : 
                      flowState.userInput.shown ? 'Voice input received' : 'Ready to listen',
          status: conversationState === 'listening' ? 'active' : 
                  flowState.userInput.shown ? 'completed' : 'pending',
          timestamp: flowState.userInput.timestamp,
          processed: flowState.userInput.processed
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      
      const allNodes = [userNode, ...enhancedNodes];
      
      // Add edge from user to team
      const teamNode = enhancedNodes.find(n => n.data.type === 'team');
      const userToTeamEdge: Edge = {
        id: 'edge-user-team',
        source: 'user-input',
        target: teamNode?.id || 'team',
        type: 'smoothstep',
        animated: conversationState === 'processing' || isAnalyzing,
        style: { 
          stroke: isAnalyzing ? '#f59e0b' : conversationState === 'processing' || conversationState === 'responding' ? '#3b82f6' : '#6b7280',
          strokeWidth: 3 
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isAnalyzing ? '#f59e0b' : conversationState === 'processing' || conversationState === 'responding' ? '#3b82f6' : '#6b7280',
        },
      };
      
      setNodes(allNodes);
      setEdges([userToTeamEdge, ...autogenEdges]);
      
    } else {
      // Use progressive flow generation
      generateProgressiveFlow();
    }
  }, [conversationState, isAnalyzing, useAutogenFlow, setNodes, setEdges]);

  // Generate progressive flow based on enhanced state
  const generateProgressiveFlow = useCallback(() => {
    const flowState = getFlowState();
    const teamProgress = getTeamProgress();
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yOffset = 50;

    // Step 1: Show user input with analysis status
    if (flowState.userInput.shown || conversationState !== 'idle') {
      newNodes.push({
        id: 'user-input',
        type: 'userNode',
        position: { x: 300, y: yOffset },
        data: {
          label: 'User Input',
          description: conversationState === 'listening' ? 'Speaking...' : 
                      conversationState === 'processing' ? 'Processing voice...' : 
                      flowState.userInput.shown ? 'Voice input received' : 'Ready to listen',
          status: conversationState === 'listening' ? 'active' : 
                  flowState.userInput.shown ? 'completed' : 'pending',
          timestamp: flowState.userInput.timestamp,
          processed: flowState.userInput.processed
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });

      yOffset += 180;
    }

    // Step 2: Show AI Team with enhanced data
    if (flowState.team) {
      newNodes.push({
        id: 'agent-team',
        type: 'teamNode',
        position: { x: 250, y: yOffset },
        data: {
          label: flowState.team.name,
          teamType: flowState.team.type,
          description: flowState.team.description,
          agentCount: flowState.agents.length,
          confidence: flowState.team.confidence,
          source: flowState.team.source,
          status: conversationState === 'processing' || conversationState === 'responding' ? 'active' : 
                  flowState.team.status === 'identified' ? 'completed' : 'pending'
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });

      // Edge from user to team
      if (newNodes.find(n => n.id === 'user-input')) {
        newEdges.push({
          id: 'edge-user-team',
          source: 'user-input',
          target: 'agent-team',
          type: 'smoothstep',
          animated: conversationState === 'processing' || isAnalyzing,
          style: { 
            stroke: isAnalyzing ? '#f59e0b' : conversationState === 'processing' || conversationState === 'responding' ? '#3b82f6' : '#6b7280',
            strokeWidth: 3 
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isAnalyzing ? '#f59e0b' : conversationState === 'processing' || conversationState === 'responding' ? '#3b82f6' : '#6b7280',
          },
        });
      }

      yOffset += 200;
    }

    // Step 3: Show individual agents with enhanced data
    if (flowState.agents.length > 0 && flowState.team) {
      const agentPositions = generateAgentPositions(flowState.team.type, flowState.agents.length);
      
      flowState.agents.forEach((agent, index) => {
        newNodes.push({
          id: agent.id,
          type: 'agentNode',
          position: { x: agentPositions[index].x, y: yOffset },
          data: {
            label: agent.name,
            agentType: agent.type,
            modelName: agent.modelName,
            modelProvider: agent.modelProvider,
            tools: agent.tools,
            confidence: agent.confidence,
            source: agent.source,
            status: conversationState === 'responding' ? 'active' : 
                    agent.status === 'identified' ? 'completed' : 'pending',
            duration: agent.timestamp ? Date.now() - agent.timestamp : undefined
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        });

        // Edge from team to agent
        if (newNodes.find(n => n.id === 'agent-team')) {
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
        }
      });

      // Add team-type specific inter-agent connections
      if (flowState.team) {
        addTeamTypeConnections(flowState.team.type, flowState.agents, newEdges, conversationState);
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [conversationState, isAnalyzing, setNodes, setEdges]);

  // Generate agent positions based on team type (enhanced)
  const generateAgentPositions = (teamType: string, agentCount: number) => {
    const positions = [];
    const baseX = 300;
    const spacing = 250;

    switch (teamType) {
      case 'RoundRobinGroupChat':
        // Circular arrangement for round-robin
        const radius = Math.max(120, agentCount * 30);
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * 2 * Math.PI) / agentCount;
          positions.push({
            x: baseX + Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }
        break;
      
      case 'HierarchicalGroupChat':
        // Hierarchical tree structure
        positions.push({ x: baseX, y: 0 }); // Main agent at center
        for (let i = 1; i < agentCount; i++) {
          const row = Math.floor((i - 1) / 3) + 1;
          const col = (i - 1) % 3;
          positions.push({
            x: baseX + (col - 1) * spacing,
            y: row * 120
          });
        }
        break;
      
      case 'CascadingGroupChat':
        // Linear cascade with slight stagger
        for (let i = 0; i < agentCount; i++) {
          positions.push({
            x: baseX + i * spacing - ((agentCount - 1) * spacing) / 2,
            y: i * 30 // Slight vertical stagger
          });
        }
        break;
      
      case 'BroadcastGroupChat':
        // Star pattern around center
        const starRadius = Math.max(150, agentCount * 25);
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * 2 * Math.PI) / agentCount;
          positions.push({
            x: baseX + Math.cos(angle) * starRadius,
            y: Math.sin(angle) * starRadius
          });
        }
        break;
      
      case 'ConcurrentGroupChat':
        // Parallel arrangement
        const cols = Math.ceil(Math.sqrt(agentCount));
        for (let i = 0; i < agentCount; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          positions.push({
            x: baseX + (col - (cols - 1) / 2) * spacing,
            y: row * 120
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

  // Enhanced team-type specific connections
  const addTeamTypeConnections = (teamType: string, agents: TempAgentData[], edges: Edge[], state: string) => {
    const isActive = state === 'responding';
    
    switch (teamType) {
      case 'RoundRobinGroupChat':
        // Connect agents in a circle for round-robin communication
        for (let i = 0; i < agents.length; i++) {
          const nextIndex = (i + 1) % agents.length;
          edges.push({
            id: `edge-round-${i}`,
            source: agents[i].id,
            target: agents[nextIndex].id,
            type: 'smoothstep',
            animated: isActive,
            style: { 
              stroke: '#f59e0b',
              strokeWidth: 2,
              strokeDasharray: '8,4'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#f59e0b',
            },
            label: `Round ${i + 1}`,
          });
        }
        break;
      
      case 'HierarchicalGroupChat':
        // Connect main agent to all subordinates
        if (agents.length > 1) {
          for (let i = 1; i < agents.length; i++) {
            edges.push({
              id: `edge-hierarchy-${i}`,
              source: agents[0].id,
              target: agents[i].id,
              type: 'smoothstep',
              animated: isActive,
              style: { 
                stroke: '#8b5cf6',
                strokeWidth: 2,
                strokeDasharray: '6,3'
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#8b5cf6',
              },
              label: 'Delegate',
            });
          }
        }
        break;
      
      case 'CascadingGroupChat':
        // Connect agents in sequence for cascading flow
        for (let i = 0; i < agents.length - 1; i++) {
          edges.push({
            id: `edge-cascade-${i}`,
            source: agents[i].id,
            target: agents[i + 1].id,
            type: 'smoothstep',
            animated: isActive,
            style: { 
              stroke: '#ef4444',
              strokeWidth: 2,
              strokeDasharray: '5,5'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#ef4444',
            },
            label: 'Fallback',
          });
        }
        break;
        
      case 'BroadcastGroupChat':
        // No inter-agent connections needed - all receive same message
        break;
        
      case 'ConcurrentGroupChat':
        // Add aggregation connections if needed
        break;
    }
  };

  useEffect(() => {
    generateFlow();
  }, [generateFlow]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleExportAutogen = () => {
    const autogenStructure = getCurrentAutogenStructure();
    if (autogenStructure) {
      const dataStr = JSON.stringify(autogenStructure, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'autogen_team_structure.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  if (!isVisible) return null;

  const flowState = getFlowState();
  const teamProgress = getTeamProgress();

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.9, x: 50 }}
      animate={{ scale: 1, x: 0 }}
      exit={{ scale: 0.9, x: 50 }}
      className={`bg-dark-surface border border-dark-border rounded-xl shadow-xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : ''
      } ${isDragging ? 'cursor-grabbing' : ''} ${isResizing ? 'cursor-nw-resize' : ''}`}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: isMinimized ? 320 : size.width,
        height: isMinimized ? 64 : size.height,
        zIndex: 1000,
        userSelect: isDragging || isResizing ? 'none' : 'auto'
      }}
    >
      {/* Resize handles */}
      {!isMinimized && (
        <>
          {/* Corner handles */}
          <div 
            data-resize-direction="bottom-right"
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize bg-gray-600 opacity-50 hover:opacity-100"
            style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
          />
          <div 
            data-resize-direction="bottom-left"
            className="absolute bottom-0 left-0 w-4 h-4 cursor-ne-resize bg-gray-600 opacity-50 hover:opacity-100"
            style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
          />
          <div 
            data-resize-direction="top-right"
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize bg-gray-600 opacity-50 hover:opacity-100"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
          />
          <div 
            data-resize-direction="top-left"
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-gray-600 opacity-50 hover:opacity-100"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          />
          
          {/* Edge handles */}
          <div 
            data-resize-direction="right"
            className="absolute top-4 bottom-4 right-0 w-2 cursor-ew-resize bg-gray-600 opacity-0 hover:opacity-50"
          />
          <div 
            data-resize-direction="left"
            className="absolute top-4 bottom-4 left-0 w-2 cursor-ew-resize bg-gray-600 opacity-0 hover:opacity-50"
          />
          <div 
            data-resize-direction="bottom"
            className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize bg-gray-600 opacity-0 hover:opacity-50"
          />
          <div 
            data-resize-direction="top"
            className="absolute top-0 left-4 right-4 h-2 cursor-ns-resize bg-gray-600 opacity-0 hover:opacity-50"
          />
        </>
      )}

      {/* Enhanced Header with drag handle */}
      <div 
        data-drag-handle
        className={`flex items-center justify-between p-3 border-b border-dark-border ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isAnalyzing ? 'bg-orange-500 animate-pulse' :
            conversationState === 'listening' ? 'bg-blue-500 animate-pulse' :
            conversationState === 'processing' ? 'bg-yellow-500 animate-pulse' :
            conversationState === 'responding' ? 'bg-green-500 animate-pulse' :
            'bg-gray-500'
          }`} />
          <h3 className="text-sm font-medium text-white">Agent Team Flow</h3>
          <span className="text-xs text-gray-400 capitalize">
            ({isAnalyzing ? 'analyzing' : conversationState})
          </span>
          {flowState.team?.type && (
            <span className="text-xs text-gray-500">• {flowState.team.type}</span>
          )}
          {isAnalyzing && (
            <SparklesIcon className="h-3 w-3 text-orange-500 animate-spin" />
          )}
        </div>
        <div className="flex items-center gap-1">
          {teamProgress.hasAutogenStructure && (
            <button
              onClick={handleExportAutogen}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Export Autogen Structure"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
            </button>
          )}
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
        <div className="bg-dark-background" style={{ height: size.height - 64 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.4}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#374151" gap={20} />
            <Controls 
              className="bg-dark-surface border border-dark-border rounded"
              showInteractive={false}
            />
          </ReactFlow>
        </div>
      )}

      {/* Enhanced status indicator when minimized */}
      {isMinimized && (
        <div className="p-2 text-center">
          <p className="text-xs text-gray-400">
            {isAnalyzing ? '🤖 AI Analyzing...' : 
             teamProgress.readyForDeployment ? '✅ Ready for deployment' :
             `${flowState.conversationStage} • ${flowState.agents.length} agents`}
            {teamProgress.averageAgentConfidence > 0 && (
              <span className="ml-2">• {Math.round(teamProgress.averageAgentConfidence * 100)}% confidence</span>
            )}
            {teamProgress.hasAutogenStructure && (
              <span className="ml-2">• Autogen Ready</span>
            )}
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