import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Split from 'react-split';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { teamStructure } from '@/mockdata/teamStructure';
import Tooltip from '@/components/ui/Tooltip';
import { mockMessages, mockVersions, generateVersionResponse } from '@/mockdata/playMessages';
import { 
  XMarkIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline';
import { Coins, Bot, Users, Wrench, Zap, Network, Target, RotateCcw, GitBranch, ArrowRight, Podcast as Broadcast } from 'lucide-react';
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
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { analyzeConversationProgressive } from '@/services/geminiService';
import { TeamStructure } from '@/types';
import { getAutoLayout, relayoutNodes } from '@/utils/dagreLayout';

interface SmartVisualizerProps {
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
  conversationId?: string | null;
}

// Enhanced error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('SmartVisualizer Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full bg-dark-surface rounded-xl border border-dark-border">
          <div className="text-center p-6">
            <ExclamationTriangleIcon className="h-12 w-12 text-warning-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Visualization Error</h3>
            <p className="text-gray-400 text-sm mb-4">
              {this.state.error?.message || 'An error occurred while rendering the visualization'}
            </p>
            <Button
              size="sm"
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced node components for conversation flow with error handling
const ConversationNode = ({ data }: { data: any }) => {
  const [hasError, setHasError] = useState(false);

  try {
    const getNodeStyle = () => {
      switch (data.type) {
        case 'user':
          return 'bg-blue-500 border-blue-600 text-white';
        case 'final_task':
          return 'bg-green-600 border-green-700 text-white';
        case 'team':
          return 'bg-green-500 border-green-600 text-white';
        case 'agent':
          return 'bg-blue-400 border-blue-500 text-white';
        default:
          return 'bg-gray-500 border-gray-600 text-white';
      }
    };

    const getIcon = () => {
      switch (data.type) {
        case 'user':
          return '👤';
        case 'final_task':
          return '🎯';
        case 'team':
          return getTeamTypeIcon(data.teamType);
        case 'agent':
          return '🤖';
        default:
          return '⚡';
      }
    };

    const getTeamTypeIcon = (teamType?: string) => {
      if (!teamType) return '🏢';
      
      const type = teamType.toLowerCase();
      if (type.includes('roundrobin')) return <RotateCcw className="w-4 h-4 text-white" />;
      if (type.includes('selector')) return <Target className="w-4 h-4 text-white" />;
      if (type.includes('magneticone') || type.includes('magenticone')) return <Zap className="w-4 h-4 text-white" />;
      if (type.includes('swarm')) return <Network className="w-4 h-4 text-white" />;
      if (type.includes('graphflow') || type.includes('graph')) return <GitBranch className="w-4 h-4 text-white" />;
      if (type.includes('broadcast')) return <Broadcast className="w-4 h-4 text-white" />;
      return <Users className="w-4 h-4 text-white" />;
    };

    const getTeamTypeName = (teamType?: string) => {
      if (!teamType) return 'Team';
      
      const type = teamType.toLowerCase();
      if (type.includes('roundrobin')) return 'Round Robin';
      if (type.includes('selector')) return 'Selector';
      if (type.includes('magneticone') || type.includes('magenticone')) return 'Magnetic One';
      if (type.includes('swarm')) return 'Swarm';
      if (type.includes('graphflow') || type.includes('graph')) return 'Graph Flow';
      if (type.includes('broadcast')) return 'Broadcast';
      return 'Custom';
    };

    const getAgentTypeName = (agentType?: string) => {
      if (!agentType) return 'Agent';
      
      const type = agentType.toLowerCase();
      if (type.includes('assistant')) return 'Assistant Agent';
      if (type.includes('userproxy')) return 'User Proxy Agent';
      if (type.includes('codeinterpreter')) return 'Code Interpreter Agent';
      if (type.includes('websearch')) return 'Web Search Agent';
      if (type.includes('retrieval')) return 'Retrieval Agent';
      return agentType.split('.').pop() || 'Agent';
    };

    const renderIcon = () => {
      const icon = getIcon();
      if (typeof icon === 'string') {
        return <span className="text-lg">{icon}</span>;
      }
      return icon;
    };

    if (hasError) {
      return (
        <div className="p-4 rounded-lg shadow-lg border-2 min-w-[250px] bg-red-500 border-red-600 text-white">
          <div className="flex items-center gap-2 justify-center">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span className="text-sm">Node Error</span>
          </div>
        </div>
      );
    }

    return (
      <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[280px] transition-all duration-300 ${getNodeStyle()}`}>
        <div className="flex items-center gap-2 justify-center mb-3">
          {renderIcon()}
          <span className="text-sm font-medium">{data.label || 'Unnamed'}</span>
        </div>
        
        {/* Team Type Display */}
        {data.type === 'team' && data.teamType && (
          <div className="bg-white/20 rounded p-2 mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              {getTeamTypeIcon(data.teamType)}
              <span className="text-xs font-semibold text-white">{getTeamTypeName(data.teamType)}</span>
            </div>
            <p className="text-xs text-center opacity-90 text-white">
              {data.teamType.includes('roundrobin') && 'Agents take turns in sequence'}
              {data.teamType.includes('selector') && 'LLM selects next speaker dynamically'}
              {(data.teamType.includes('magneticone') || data.teamType.includes('magenticone')) && 'Generalist multi-agent for web/file tasks'}
              {data.teamType.includes('swarm') && 'HandoffMessage for explicit transitions'}
              {(data.teamType.includes('graphflow') || data.teamType.includes('graph')) && 'Complex workflows with branches & loops'}
              {data.teamType.includes('broadcast') && 'All agents receive same message'}
              {!data.teamType.includes('roundrobin') && !data.teamType.includes('selector') && 
               !data.teamType.includes('magneticone') && !data.teamType.includes('magenticone') &&
               !data.teamType.includes('swarm') && !data.teamType.includes('graphflow') && 
               !data.teamType.includes('graph') && !data.teamType.includes('broadcast') && 'Custom team configuration'}
            </p>
          </div>
        )}

        {/* Agent Details Display */}
        {data.type === 'agent' && (
          <div className="space-y-2">
            {/* Agent Type */}
            {data.agentType && (
              <div className="bg-white/20 rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-white" />
                  <span className="text-xs font-semibold text-white">Agent Type</span>
                </div>
                <p className="text-xs text-white">{getAgentTypeName(data.agentType)}</p>
              </div>
            )}

            {/* LLM Model */}
            {data.llmModel && (
              <div className="bg-white/20 rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <SparklesIcon className="w-3 h-3 text-white" />
                  <span className="text-xs font-semibold text-white">LLM Model</span>
                </div>
                <p className="text-xs text-white">{data.llmModel}</p>
                {data.llmProvider && (
                  <p className="text-xs opacity-75 text-white">Provider: {data.llmProvider}</p>
                )}
              </div>
            )}

            {/* Tools */}
            {data.tools && Array.isArray(data.tools) && data.tools.length > 0 && (
              <div className="bg-white/20 rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-3 h-3 text-white" />
                  <span className="text-xs font-semibold text-white">Tools ({data.tools.length})</span>
                </div>
                <div className="space-y-1">
                  {data.tools.slice(0, 3).map((tool: any, idx: number) => (
                    <div key={idx} className="text-xs">
                      <span className="font-medium text-white">{tool.name || `Tool ${idx + 1}`}</span>
                      {tool.description && (
                        <p className="opacity-75 truncate text-white">{tool.description}</p>
                      )}
                    </div>
                  ))}
                  {data.tools.length > 3 && (
                    <p className="text-xs opacity-75 text-white">+{data.tools.length - 3} more tools</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {data.description && (
          <div className="bg-white/10 rounded p-2 mb-2">
            <p className="text-xs text-center text-white">{data.description}</p>
          </div>
        )}
        
        {data.confidence && (
          <div className="flex items-center justify-center mt-2">
            <div className={`w-2 h-2 rounded-full ${data.confidence > 0.7 ? 'bg-green-300' : data.confidence > 0.4 ? 'bg-yellow-300' : 'bg-red-300'}`} />
            <span className="text-xs ml-1 text-white">{Math.round(data.confidence * 100)}% confidence</span>
          </div>
        )}
        
        {data.agents && Array.isArray(data.agents) && data.agents.length > 0 && (
          <div className="mt-2 text-xs">
            <div className="text-center opacity-75 text-white">Agents: {data.agents.length}</div>
            <div className="flex flex-wrap gap-1 mt-1 justify-center">
              {data.agents.slice(0, 3).map((agent: any, idx: number) => (
                <span key={idx} className="bg-white/20 px-1 rounded text-xs text-white">
                  {agent.name || `Agent ${idx + 1}`}
                </span>
              ))}
              {data.agents.length > 3 && (
                <span className="bg-white/20 px-1 rounded text-xs text-white">
                  +{data.agents.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering ConversationNode:', error);
    setHasError(true);
    return null;
  }
};

const nodeTypes = {
  conversation: ConversationNode,
};

// Custom hook for resizable functionality with error handling
const useResizable = (ref: React.RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 600, height: 800 }); // 🎯 INCREASED HEIGHT

  useEffect(() => {
    try {
      const element = ref.current;
      if (!element) return;

      const handleMouseDown = (e: MouseEvent) => {
        try {
          const target = e.target as HTMLElement;
          const direction = target.getAttribute('data-resize-direction');
          if (!direction) return;

          setIsResizing(true);
          e.preventDefault();
          e.stopPropagation();
        } catch (error) {
          console.error('Error in handleMouseDown:', error);
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        try {
          if (!isResizing || !element) return;

          const rect = element.getBoundingClientRect();
          let newWidth = size.width;
          let newHeight = size.height;

          newWidth = Math.max(800, e.clientX - rect.left);
          newHeight = Math.max(600, e.clientY - rect.top);

          setSize({ width: newWidth, height: newHeight });
        } catch (error) {
          console.error('Error in handleMouseMove:', error);
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

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
    } catch (error) {
      console.error('Error in useResizable effect:', error);
    }
  }, [isResizing, size, ref]);

  return { size, isResizing };
};

const SmartVisualizerContent: React.FC<SmartVisualizerProps> = ({
  isVisible,
  onClose,
  conversationState,
  agentFlow = [],
  messages = [],
  conversationId = null
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState<'initial' | 'team_identified' | 'agents_emerging' | 'structure_complete'>('initial');
  const [teamStructure, setTeamStructure] = useState<TeamStructure | null>(null);
  const [progressiveElements, setProgressiveElements] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [hasGeneratedTask, setHasGeneratedTask] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const { size, isResizing } = useResizable(windowRef);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Reset state when conversation ID changes with error handling
  useEffect(() => {
    try {
      if (conversationId && conversationId !== currentConversationId) {
        console.log('🆕 NEW CONVERSATION - Resetting visualizer state:', {
          oldId: currentConversationId,
          newId: conversationId
        });
        
        setLastMessageCount(0);
        setIsAnalyzing(false);
        setCurrentConversationId(conversationId);
        setAnalysisStage('initial');
        setTeamStructure(null);
        setProgressiveElements({});
        setNodes([]);
        setEdges([]);
        setError(null);
        setHasGeneratedTask(false);
        setConversationEnded(false);
        
        console.log('✅ Visualizer state reset for new conversation');
      }
    } catch (error) {
      console.error('Error resetting conversation state:', error);
      setError('Failed to reset conversation state');
    }
  }, [conversationId, currentConversationId, setNodes, setEdges]);

  // Detect conversation end
  useEffect(() => {
    try {
      if (conversationState === 'idle' && 
          analysisStage === 'structure_complete' && 
          hasGeneratedTask && 
          messages.length > 0) {
        setConversationEnded(true);
        console.log('🏁 Conversation ended - will replace user input with final task');
      }
    } catch (error) {
      console.error('Error detecting conversation end:', error);
    }
  }, [conversationState, analysisStage, hasGeneratedTask, messages.length]);

  // Progressive conversation analysis with enhanced error handling
  useEffect(() => {
    const performProgressiveAnalysis = async () => {
      try {
        // Skip if no new messages or already analyzing
        if (messages.length === 0 || messages.length === lastMessageCount || isAnalyzing) return;
        
        console.log('🔍 Starting progressive conversation analysis...', {
          messageCount: messages.length,
          lastCount: lastMessageCount,
          conversationId,
          currentStage: analysisStage
        });
        
        setIsAnalyzing(true);
        setError(null);
        
        // Prepare conversation messages for analysis
        const conversationMessages = messages.map(m => `${m.role}: ${m.content}`);
        
        console.log('🤖 Calling Gemini for progressive analysis...');
        
        // Call Gemini for progressive analysis
        const analysis = await analyzeConversationProgressive(
          conversationMessages,
          teamStructure
        );
        
        console.log('✅ Gemini progressive analysis completed:', analysis);
        
        // Update state based on analysis
        setAnalysisStage(analysis.analysisStage);
        setProgressiveElements(analysis.progressiveElements || {});
        
        if (analysis.teamStructure) {
          setTeamStructure(analysis.teamStructure);
        }

        // Check if we should generate the final task
        if (analysis.analysisStage === 'structure_complete' && !hasGeneratedTask) {
          setHasGeneratedTask(true);
        }
        
        setLastMessageCount(messages.length);
        
      } catch (error) {
        console.error('❌ Progressive analysis failed:', error);
        setError(error instanceof Error ? error.message : 'Analysis failed');
      } finally {
        setIsAnalyzing(false);
      }
    };

    // Debounce analysis with error handling
    const timeoutId = setTimeout(() => {
      performProgressiveAnalysis().catch(error => {
        console.error('Error in debounced analysis:', error);
        setError('Analysis timeout error');
        setIsAnalyzing(false);
      });
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [messages, lastMessageCount, isAnalyzing, conversationId, analysisStage, teamStructure, hasGeneratedTask]);

  // Generate dynamic flow based on conversation progress with error handling
  const generateProgressiveFlow = useCallback(() => {
    try {
      console.log('🎨 Generating progressive flow visualization:', {
        stage: analysisStage,
        hasTeamStructure: !!teamStructure,
        progressiveElements,
        conversationState,
        conversationEnded,
        hasGeneratedTask
      });
      
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      let yPosition = 50;

      // 🎯 CRITICAL FIX: Replace user input with final task when conversation ends
      if (conversationEnded && hasGeneratedTask) {
        // Stage 1: Final Task Node (replaces user input)
        const finalTaskExample = generateFinalTaskExample(progressiveElements);
        
        newNodes.push({
          id: 'final-task-input',
          type: 'conversation',
          position: { x: 400, y: yPosition },
          data: {
            type: 'final_task',
            label: 'Final Task Generated',
            description: finalTaskExample,
            confidence: 1.0
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        });
        yPosition += 200;
      } else {
        // Stage 1: User Input (show original user input when conversation is active)
        if (analysisStage !== 'initial' && messages.length > 0) {
          const userMessages = messages.filter(m => m.role === 'user');
          if (userMessages.length > 0) {
            const lastUserMessage = userMessages[userMessages.length - 1];
            
            newNodes.push({
              id: 'user-input',
              type: 'conversation',
              position: { x: 400, y: yPosition },
              data: {
                type: 'user',
                label: 'User Input',
                description: lastUserMessage.content.substring(0, 100) + (lastUserMessage.content.length > 100 ? '...' : ''),
                confidence: 1.0
              },
              sourcePosition: Position.Bottom,
              targetPosition: Position.Top,
            });
            yPosition += 200;
          }
        }
      }

      // Stage 2: Team Node (when team is identified)
      if (analysisStage !== 'initial' && progressiveElements.teamName) {
        const teamNode: Node = {
          id: 'team',
          type: 'conversation',
          position: { x: 300, y: yPosition },
          data: {
            type: 'team',
            label: progressiveElements.teamName,
            description: progressiveElements.teamDescription || 'AI agents team',
            confidence: analysisStage === 'structure_complete' ? 0.9 : 0.7,
            teamType: progressiveElements.teamType || 'RoundRobinGroupChat',
            agents: progressiveElements.identifiedAgents || []
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };
        newNodes.push(teamNode);

        // Connect input (user or final task) to team with enhanced animated edge
        const sourceNodeId = conversationEnded ? 'final-task-input' : 'user-input';
        if (newNodes.find(n => n.id === sourceNodeId)) {
          newEdges.push({
            id: `edge-${sourceNodeId}-team`,
            source: sourceNodeId,
            target: 'team',
            type: 'smoothstep',
            animated: true, // 🎯 CRITICAL: ALWAYS animated like FlowVisualizer
            style: { 
              stroke: isAnalyzing ? '#f59e0b' : conversationState === 'processing' ? '#3b82f6' : '#4D9CFF',
              strokeWidth: 2 // 🎯 CONSISTENT: Match Visual Editor stroke width
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 12,
              height: 12,
              color: isAnalyzing ? '#f59e0b' : conversationState === 'processing' ? '#3b82f6' : '#4D9CFF',
            },
            label: 'Team Coordination',
            labelStyle: { fontSize: 12, fontWeight: 600, fill: '#ffffff' },
            labelBgStyle: { fill: '#1e1e1e', fillOpacity: 0.8 },
          });
        }

        yPosition += 280;
      }

      // Stage 3: Agent Nodes (when agents are emerging)
      if (analysisStage === 'agents_emerging' || analysisStage === 'structure_complete') {
        const agents = progressiveElements.identifiedAgents || [];
        
        agents.forEach((agent: any, index: number) => {
          // Extract LLM and tools info from team structure if available
          let llmModel = 'gpt-4o-mini';
          let llmProvider = 'OpenAI';
          let agentType = 'AssistantAgent';
          let tools: any[] = [];

          if (teamStructure?.config?.participants && teamStructure.config.participants[index]) {
            const participant = teamStructure.config.participants[index];
            llmModel = participant.config.model_client?.config.model || 'gpt-4o-mini';
            llmProvider = participant.config.model_client?.provider.split('.').pop() || 'OpenAI';
            agentType = participant.provider.split('.').pop() || 'AssistantAgent';
            tools = participant.config.tools?.map(tool => ({
              name: tool.config?.name || tool.label,
              description: tool.description
            })) || [];
          }

          const agentNode: Node = {
            id: `agent-${index}`,
            type: 'conversation',
            position: { 
              x: 200 + (index * 280), 
              y: yPosition 
            },
            data: {
              type: 'agent',
              label: agent.name,
              description: agent.description,
              confidence: agent.confidence || 0.6,
              role: agent.role,
              agentType,
              llmModel,
              llmProvider,
              tools
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          };
          newNodes.push(agentNode);

          // Connect team to agent with enhanced animated edge
          if (newNodes.find(n => n.id === 'team')) {
            newEdges.push({
              id: `edge-team-agent-${index}`,
              source: 'team',
              target: `agent-${index}`,
              type: 'smoothstep',
              animated: true, // 🎯 CRITICAL: ALWAYS animated like FlowVisualizer
              style: { 
                stroke: conversationState === 'responding' ? '#10b981' : '#4D9CFF',
                strokeWidth: 2 // 🎯 CONSISTENT: Match Visual Editor stroke width
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 12,
                height: 12,
                color: conversationState === 'responding' ? '#10b981' : '#4D9CFF',
              },
              label: `Agent ${index + 1}`,
              labelStyle: { fontSize: 10, fontWeight: 500, fill: '#ffffff' },
              labelBgStyle: { fill: '#1e1e1e', fillOpacity: 0.7 },
            });
          }
        });

        yPosition += 280;
      }

      console.log('🎨 Generated progressive flow:', { 
        nodeCount: newNodes.length, 
        edgeCount: newEdges.length,
        stage: analysisStage,
        conversationEnded,
        hasGeneratedTask
      });
      
      return { nodes: newNodes, edges: newEdges };
    } catch (error) {
      console.error('Error generating progressive flow:', error);
      setError('Failed to generate flow visualization');
      return { nodes: [], edges: [] };
    }
  }, [analysisStage, progressiveElements, teamStructure, conversationState, isAnalyzing, messages, hasGeneratedTask, conversationEnded]);

  // Generate final task example based on progressive elements
  const generateFinalTaskExample = (elements: any) => {
    try {
      if (elements.teamName && elements.identifiedAgents && Array.isArray(elements.identifiedAgents)) {
        const agentNames = elements.identifiedAgents.map((a: any) => a.name || 'Agent').join(', ');
        const teamType = elements.teamType || 'RoundRobinGroupChat';
        const teamTypeName = teamType.split('GroupChat')[0].replace(/([A-Z])/g, ' $1').trim();
        
        return `Deploy ${elements.teamName} using ${teamTypeName} coordination with specialized agents: ${agentNames}. The team will process user requests efficiently through coordinated agent collaboration.`;
      }
      if (elements.teamName) {
        return `Deploy ${elements.teamName} for coordinated AI task processing with intelligent agent collaboration.`;
      }
      return 'Deploy AI agents team to handle complex user requests through intelligent multi-agent coordination and task distribution.';
    } catch (error) {
      console.error('Error generating final task example:', error);
      return 'Deploy AI agents team to handle complex user requests through intelligent multi-agent coordination.';
    }
  };

  // Update flow when analysis changes with error handling
  useEffect(() => {
    try {
      const { nodes: newNodes, edges: newEdges } = generateProgressiveFlow();
      console.log('🔄 Updating ReactFlow with progressive nodes/edges:', { 
        nodeCount: newNodes.length, 
        edgeCount: newEdges.length 
      });
      
      // 🎯 CRITICAL: Apply Dagre layout for optimal positioning
      if (newNodes.length > 0) {
        const teamType = progressiveElements.teamType || 'RoundRobinGroupChat';
        const layoutedElements = getAutoLayout(newNodes, newEdges, teamType);
        
        console.log('✅ Applied Dagre layout to Smart Visualizer:', {
          originalNodes: newNodes.length,
          layoutedNodes: layoutedElements.nodes.length,
          teamType
        });
        
        setNodes(layoutedElements.nodes);
        setEdges(layoutedElements.edges);
      } else {
        setNodes(newNodes);
        setEdges(newEdges);
      }
      
      // Auto-fit view when nodes change
      if (newNodes.length > 0) {
        setTimeout(() => {
          try {
            fitView({ padding: 0.2, duration: 800 });
          } catch (error) {
            console.error('Error fitting view:', error);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error updating flow:', error);
      setError('Failed to update flow visualization');
    }
  }, [generateProgressiveFlow, setNodes, setEdges, fitView, progressiveElements.teamType]);

  // 🎯 NEW: Auto-layout function using Dagre
  const handleAutoLayout = useCallback(() => {
    try {
      const teamType = progressiveElements.teamType || 'RoundRobinGroupChat';
      const layouted = relayoutNodes(nodes, edges, teamType);
      
      setNodes(layouted.nodes);
      setEdges(layouted.edges);
      
      // Fit view after layout
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 800 });
      }, 100);
      
      console.log('🔄 Smart Visualizer auto-layout applied:', {
        nodeCount: layouted.nodes.length,
        teamType
      });
    } catch (error) {
      console.error('Error applying auto-layout:', error);
      setError('Failed to apply auto-layout');
    }
  }, [nodes, edges, progressiveElements.teamType, setNodes, setEdges, fitView]);

  // 🎯 NEW: Fit view function
  const handleFitView = useCallback(() => {
    try {
      fitView({ padding: 0.2, duration: 800 });
    } catch (error) {
      console.error('Error fitting view:', error);
    }
  }, [fitView]);

  const handleExportStructure = () => {
    try {
      if (teamStructure) {
        const dataStr = JSON.stringify(teamStructure, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `autogen_structure_${conversationId || 'conversation'}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    } catch (error) {
      console.error('Error exporting structure:', error);
      setError('Failed to export structure');
    }
  };

  if (!isVisible) return null;

  const getStageDisplay = () => {
    if (conversationEnded) {
      return '🎯 Task Generated';
    }
    switch (analysisStage) {
      case 'initial':
        return '🎯 Listening...';
      case 'team_identified':
        return '🏢 Team Identified';
      case 'agents_emerging':
        return '🤖 Agents Emerging';
      case 'structure_complete':
        return hasGeneratedTask ? '✅ Task Generated' : '✅ Structure Complete';
      default:
        return '⚡ Analyzing...';
    }
  };

  return (
    <ErrorBoundary>
      <motion.div
        ref={windowRef}
        initial={{ scale: 0.9, x: 50 }}
        animate={{ scale: 1, x: 0 }}
        exit={{ scale: 0.9, x: 50 }}
        className={`bg-dark-surface border border-dark-border rounded-xl shadow-xl transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : ''
        } ${isResizing ? 'cursor-nw-resize' : ''}`}
        style={{
          width: isMinimized ? 320 : size.width,
          height: isMinimized ? 64 : size.height,
          userSelect: isResizing ? 'none' : 'auto'
        }}
      >
        {/* Resize handles */}
        {!isMinimized && (
          <>
            <div 
              data-resize-direction="bottom-right"
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize bg-gray-600 opacity-50 hover:opacity-100"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
            />
            <div 
              data-resize-direction="right"
              className="absolute top-4 bottom-4 right-0 w-2 cursor-ew-resize bg-gray-600 opacity-0 hover:opacity-50"
            />
            <div 
              data-resize-direction="bottom"
              className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize bg-gray-600 opacity-0 hover:opacity-50"
            />
          </>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              error ? 'bg-red-500' :
              isAnalyzing ? 'bg-orange-500 animate-pulse' :
              conversationEnded ? 'bg-green-500' :
              analysisStage === 'structure_complete' ? 'bg-green-500' :
              analysisStage !== 'initial' ? 'bg-blue-500' :
              'bg-gray-500'
            }`} />
            <h3 className="text-sm font-medium text-white">Smart Visualizer</h3>
            <span className="text-xs text-gray-400">
              {error ? '❌ Error' : getStageDisplay()}
            </span>
            {conversationId && (
              <span className="text-xs text-gray-500">• {conversationId.slice(-8)}</span>
            )}
            {isAnalyzing && (
              <SparklesIcon className="h-3 w-3 text-orange-500 animate-spin" />
            )}
          </div>
          <div className="flex items-center gap-1">
            {teamStructure && (
              <button
                onClick={handleExportStructure}
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
            {error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <ExclamationTriangleIcon className="h-12 w-12 text-warning-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Visualization Error</h3>
                  <p className="text-gray-400 text-sm mb-4">{error}</p>
                  <Button
                    size="sm"
                    onClick={() => setError(null)}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.3}
                maxZoom={1.5}
                defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
                proOptions={{ hideAttribution: true }}
                // 🎯 CRITICAL: Ensure ReactFlow properly handles animated edges
                defaultEdgeOptions={{
                  animated: true,
                  style: { strokeWidth: 2 }
                }}
              >
                <Background color="#374151" gap={20} />
                <Controls 
                  className="bg-dark-surface border border-dark-border rounded"
                  showInteractive={false}
                />
                
                {/* 🎯 NEW: Enhanced Control Panel with Dagre Layout Controls */}
                <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>Stage: {analysisStage}</span>
                    {progressiveElements.teamType && (
                      <>
                        <span>•</span>
                        <span>Type: {progressiveElements.teamType}</span>
                      </>
                    )}
                    {conversationEnded && (
                      <>
                        <span>•</span>
                        <span className="text-green-400">Completed</span>
                      </>
                    )}
                  </div>
                  {progressiveElements.identifiedAgents && Array.isArray(progressiveElements.identifiedAgents) && progressiveElements.identifiedAgents.length > 0 && (
                    <div className="text-xs text-gray-500 mb-3">
                      Agents: {progressiveElements.identifiedAgents.length}
                    </div>
                  )}
                  {hasGeneratedTask && (
                    <div className="text-xs text-green-500 mb-3">
                      ✅ Final Task Generated
                    </div>
                  )}
                  
                  {/* Layout Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={handleAutoLayout}
                      className="text-xs px-2 py-1 border border-dark-border hover:bg-dark-400"
                      leftIcon={<ArrowPathIcon className="h-3 w-3" />}
                    >
                      Auto Layout
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={handleFitView}
                      className="text-xs px-2 py-1 border border-dark-border hover:bg-dark-400"
                    >
                      Fit View
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => zoomIn({ duration: 300 })}
                      className="text-xs px-1 py-1 border border-dark-border hover:bg-dark-400"
                    >
                      <MagnifyingGlassPlusIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => zoomOut({ duration: 300 })}
                      className="text-xs px-1 py-1 border border-dark-border hover:bg-dark-400"
                    >
                      <MagnifyingGlassMinusIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </Panel>
                
                {/* 🎯 NEW: Status Panel */}
                <Panel position="top-right" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Dagre Layout: Active</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Nodes: {nodes.length} | Edges: {edges.length}
                  </div>
                </Panel>
              </ReactFlow>
            )}
          </div>
        )}

        {/* Minimized status */}
        {isMinimized && (
          <div className="p-2 text-center">
            <p className="text-xs text-gray-400">
              {error ? '❌ Error' : getStageDisplay()}
              {progressiveElements.identifiedAgents && Array.isArray(progressiveElements.identifiedAgents) && progressiveElements.identifiedAgents.length > 0 && (
                <span className="ml-2">• {progressiveElements.identifiedAgents.length} agents</span>
              )}
              {conversationId && (
                <span className="ml-2">• Stored</span>
              )}
            </p>
          </div>
        )}
      </motion.div>
    </ErrorBoundary>
  );
};

const SmartVisualizer: React.FC<SmartVisualizerProps> = (props) => {
  return (
    <ReactFlowProvider>
      <SmartVisualizerContent {...props} />
    </ReactFlowProvider>
  );
};

export default SmartVisualizer;