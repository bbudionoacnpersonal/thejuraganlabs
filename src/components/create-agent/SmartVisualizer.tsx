import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { XMarkIcon, EyeIcon, EyeSlashIcon, SparklesIcon, DocumentArrowDownIcon, CheckCircleIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { Bot, User, Users, Zap, Clock, Wrench, Brain, Target, ArrowRight } from 'lucide-react';
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
  getCurrentAutogenStructure,
  resetFlowState
} from '@/mockdata/temp_conv_agentflow';
import { analyzeConversationForAutogenStructure } from '@/services/anthropicService';
import { 
  getConversationData, 
  updateConversationData,
  exportConversationAsJSON 
} from '@/services/conversationStorageService';
import AutogenNode from './AutogenNode';

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

// Enhanced custom node components for conversation flow
const UserInputNode = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[200px] transition-all duration-300 ${
    data.status === 'active' 
      ? 'bg-blue-500 border-blue-600 text-white animate-pulse' 
      : data.status === 'completed'
      ? 'bg-blue-400 border-blue-500 text-white'
      : 'bg-gray-400 border-gray-500 text-white'
  }`}>
    <div className="flex items-center gap-2 justify-center mb-2">
      <User className="h-5 w-5" />
      <span className="text-sm font-medium">User Input</span>
    </div>
    <div className="bg-white/10 rounded p-2 mb-2">
      <p className="text-xs text-center">{data.content || 'Voice input...'}</p>
    </div>
    {data.timestamp && (
      <p className="text-xs opacity-70 text-center">
        {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    )}
    <div className="flex items-center justify-center mt-2">
      <div className={`w-2 h-2 rounded-full ${data.processed ? 'bg-green-300' : 'bg-yellow-300'}`} />
      <span className="text-xs ml-1">{data.processed ? 'Analyzed' : 'Processing'}</span>
    </div>
  </div>
);

const ExpectedOutputNode = ({ data }: { data: any }) => (
  <div className="p-4 rounded-lg shadow-lg border-2 min-w-[200px] bg-green-500 border-green-600 text-white">
    <div className="flex items-center gap-2 justify-center mb-2">
      <Target className="h-5 w-5" />
      <span className="text-sm font-medium">Expected Output</span>
    </div>
    <div className="bg-white/10 rounded p-2 mb-2">
      <p className="text-xs text-center">{data.description}</p>
    </div>
    <div className="flex items-center justify-center mt-2">
      <CheckCircleIcon className="h-4 w-4 text-green-300" />
      <span className="text-xs ml-1">Ready</span>
    </div>
  </div>
);

const nodeTypes = {
  userInput: UserInputNode,
  expectedOutput: ExpectedOutputNode,
  custom: AutogenNode,
};

// Custom hook for resizable functionality only
const useResizable = (ref: React.RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 800, height: 600 });
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
        newWidth = Math.max(600, e.clientX - rect.left);
      }
      if (resizeDirection.includes('left')) {
        newWidth = Math.max(600, rect.right - e.clientX);
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(400, e.clientY - rect.top);
      }
      if (resizeDirection.includes('top')) {
        newHeight = Math.max(400, rect.bottom - e.clientY);
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
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
  }, [isResizing, size, resizeDirection, ref]);

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
  const [taskGenerated, setTaskGenerated] = useState(false);
  const [generatedTask, setGeneratedTask] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [hasInitialStructure, setHasInitialStructure] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const { size, isResizing } = useResizable(windowRef);

  // 🔄 CRITICAL: Reset flow state when conversation ID changes (new conversation)
  useEffect(() => {
    if (conversationId && conversationId !== currentConversationId) {
      console.log('🆕 NEW CONVERSATION DETECTED - Resetting flow state:', {
        oldId: currentConversationId,
        newId: conversationId
      });
      
      // Reset all state for new conversation
      resetFlowState();
      setHasInitialStructure(false);
      setTaskGenerated(false);
      setGeneratedTask('');
      setExpectedOutput('');
      setLastMessageCount(0);
      setIsAnalyzing(false);
      setCurrentConversationId(conversationId);
      
      // Clear nodes and edges for fresh start
      setNodes([]);
      setEdges([]);
      
      console.log('✅ Flow state reset complete for new conversation');
    }
  }, [conversationId, currentConversationId, setNodes, setEdges]);

  // 📂 Load conversation data from localStorage ONLY if it exists (for resuming)
  useEffect(() => {
    if (conversationId && conversationId === currentConversationId) {
      const storedData = getConversationData(conversationId);
      if (storedData && storedData.autogenStructure) {
        console.log('📂 RESUMING existing conversation with stored data:', {
          conversationId,
          messageCount: storedData.messages.length,
          hasAutogen: !!storedData.autogenStructure,
          stage: storedData.metadata.stage
        });
        
        // Only restore if we have meaningful structure (not just empty state)
        if (storedData.autogenStructure.config.participants.length > 0) {
          setHasInitialStructure(true);
          
          // Check if task was already generated
          if (storedData.metadata.stage === 'finalization') {
            setTaskGenerated(true);
            setGeneratedTask(storedData.autogenStructure?.description || 'AI agents team task');
            setExpectedOutput(`The AI agents team will process user inputs through ${storedData.autogenStructure?.config.participants.length || 0} specialized agents.`);
          }
        } else {
          console.log('📭 Stored data exists but has no meaningful structure - starting fresh');
        }
      } else {
        console.log('🆕 No stored data found - starting with blank structure for conversation:', conversationId);
      }
    }
  }, [conversationId, currentConversationId]);

  // Update conversation state in flow data
  useEffect(() => {
    updateConversationState(conversationState);
  }, [conversationState]);

  // 🤖 Enhanced AI analysis with Anthropic service - ONLY from current conversation messages
  useEffect(() => {
    const performAnalysis = async () => {
      // Skip if no new messages or already analyzing
      if (messages.length === 0 || messages.length === lastMessageCount || isAnalyzing) return;
      
      console.log('🔍 Checking if analysis should be triggered...', {
        messageCount: messages.length,
        lastCount: lastMessageCount,
        shouldTrigger: shouldTriggerAnalysis(),
        conversationId
      });
      
      // Check if analysis should be triggered
      if (!shouldTriggerAnalysis()) {
        // Still update user input for display
        if (messages.length > 0) {
          const userMessages = messages.filter(m => m.role === 'user');
          if (userMessages.length > 0) {
            const lastUserMessage = userMessages[userMessages.length - 1];
            updateUserInput(lastUserMessage.content);
          }
        }
        return;
      }
      
      setIsAnalyzing(true);
      setAnalysisInProgress(true);
      
      try {
        // Get user context
        const userIndustry = localStorage.getItem('user_industry') || undefined;
        const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');
        
        // 🚨 CRITICAL: Do NOT use stored structure as context for new conversations
        // Only use current conversation messages for analysis
        const analysisData = getAnalysisReadyData();
        
        // For NEW conversations, explicitly pass null as existing structure
        // Only use existing structure if we're resuming a conversation with meaningful data
        let existingStructure = null;
        if (hasInitialStructure && analysisData.autogenStructure) {
          existingStructure = analysisData.autogenStructure;
          console.log('📂 Using existing structure for analysis context (resuming conversation)');
        } else {
          console.log('🆕 Starting fresh analysis - no existing structure context');
        }
        
        // Prepare messages for analysis
        const messageTexts = messages.map(m => `${m.role}: ${m.content}`);
        
        console.log('🤖 Starting Anthropic AI analysis with context:', {
          messageCount: messages.length,
          userIndustry,
          userFocusAreas,
          hasExistingStructure: !!existingStructure,
          conversationId,
          isNewConversation: !hasInitialStructure
        });
        
        // 🎯 Perform contextual analysis to get Autogen structure FROM SCRATCH
        const analysis = await analyzeConversationForAutogenStructure(
          messageTexts,
          existingStructure, // null for new conversations
          userIndustry,
          userFocusAreas
        );
        
        console.log('✅ Anthropic AI Analysis completed:', analysis);
        
        // Update flow state with NEW Autogen structure
        if (analysis.teamStructure) {
          updateFromAutogenStructure(analysis.teamStructure, analysis);
          setHasInitialStructure(true);
          
          // Update localStorage with new analysis
          if (conversationId) {
            updateConversationData(conversationId, {
              autogenStructure: analysis.teamStructure,
              flowState: getFlowState(),
              metadata: {
                totalMessages: messages.length,
                analysisCount: 1,
                confidence: analysis.confidence,
                stage: analysis.conversationStage
              }
            });
            
            console.log(`💾 Updated localStorage with NEW analysis for ${conversationId}`);
          }
          
          // Check if conversation is in finalization stage
          if (analysis.conversationStage === 'finalization') {
            setTaskGenerated(true);
            setGeneratedTask(analysis.teamStructure.description || 'AI agents team task');
            setExpectedOutput(`The AI agents team will process user inputs through ${analysis.teamStructure.config.participants.length} specialized agents using ${analysis.teamStructure.provider.split('.').pop()} coordination pattern to deliver structured responses.`);
          }
        }
        
        setLastMessageCount(messages.length);
        
      } catch (error) {
        console.error('❌ Error in Anthropic AI analysis:', error);
        
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
  }, [messages, lastMessageCount, isAnalyzing, conversationId, hasInitialStructure]);

  // Check for task generator trigger from agentFlow
  useEffect(() => {
    const hasTaskGenerator = agentFlow.some(step => 
      step.type === 'tool' && 
      step.label === 'Task Generator' && 
      step.status === 'completed'
    );
    
    if (hasTaskGenerator && !taskGenerated) {
      setTaskGenerated(true);
      const flowState = getFlowState();
      if (flowState.team) {
        setGeneratedTask(`Create ${flowState.team.name} for ${flowState.team.description}`);
        setExpectedOutput(`The system will generate a structured AI agents team with ${flowState.agents.length} agents working in ${flowState.team.type} pattern to handle user requests efficiently.`);
      }
      
      // Update localStorage with task generation
      if (conversationId) {
        updateConversationData(conversationId, {
          status: 'completed',
          metadata: {
            totalMessages: messages.length,
            analysisCount: 1,
            confidence: 0.9,
            stage: 'finalization'
          }
        });
      }
    }
  }, [agentFlow, taskGenerated, conversationId, messages.length]);

  // Generate ReactFlow visualization from CURRENT Autogen structure (not mockdata)
  const generateAutogenFlow = useCallback(() => {
    const autogenStructure = getCurrentAutogenStructure();
    const flowState = getFlowState();
    
    console.log('🎨 Generating flow visualization:', {
      hasStructure: !!autogenStructure,
      hasUserInput: flowState.userInput.shown,
      conversationState,
      taskGenerated,
      conversationId,
      participantCount: autogenStructure?.config.participants.length || 0
    });
    
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yPosition = 50;

    // 🎯 CRITICAL: Only show user input node when team structure exists
    if (autogenStructure && autogenStructure.config.participants.length > 0 && flowState.userInput.shown) {
      newNodes.push({
        id: 'user-input',
        type: 'userInput',
        position: { x: 400, y: yPosition },
        data: {
          content: flowState.userInput.content || 'Starting conversation...',
          status: conversationState === 'listening' ? 'active' : 
                  flowState.userInput.shown ? 'completed' : 'pending',
          timestamp: flowState.userInput.timestamp,
          processed: flowState.userInput.processed
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
      yPosition += 150;
    }

    // 2. Team Node (ONLY from current conversation analysis, not mockdata)
    if (autogenStructure && autogenStructure.config.participants.length > 0) {
      // 🎯 CRITICAL: Extract team type from provider attribute
      const teamType = extractTeamTypeFromProvider(autogenStructure.provider);
      
      const teamNode: Node = {
        id: 'team',
        type: 'custom',
        position: { x: 300, y: yPosition },
        data: {
          label: autogenStructure.label,
          type: 'team',
          teamType: teamType, // Pass extracted team type for enhanced display
          description: autogenStructure.description,
          model: autogenStructure.config.model_client?.config.model || 'gpt-4o-mini',
          agents: autogenStructure.config.participants.map(p => ({
            name: p.label,
            description: p.description,
            model: {
              name: p.config.model_client?.config.model || 'gpt-4o-mini',
              provider: p.config.model_client?.provider.split('.').pop() || 'OpenAI'
            },
            tools: p.config.tools?.map(t => ({
              name: t.config.name,
              description: t.description
            })) || []
          })),
          terminations: autogenStructure.config.termination_condition.config.conditions.map(c => ({
            name: c.label
          })),
          onEdit: (nodeData: any) => console.log('Edit team:', nodeData),
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      newNodes.push(teamNode);

      // Edge from user input to team (only if user input node exists)
      if (newNodes.find(n => n.id === 'user-input')) {
        newEdges.push({
          id: 'edge-user-team',
          source: 'user-input',
          target: 'team',
          type: 'smoothstep',
          animated: conversationState === 'processing' || isAnalyzing,
          style: { 
            stroke: isAnalyzing ? '#f59e0b' : conversationState === 'processing' ? '#3b82f6' : '#6b7280',
            strokeWidth: 3 
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isAnalyzing ? '#f59e0b' : conversationState === 'processing' ? '#3b82f6' : '#6b7280',
          },
        });
      }

      yPosition += 250;

      // 3. Individual Agent Nodes (from current conversation analysis)
      const participants = autogenStructure.config.participants;
      if (participants.length > 0) {
        const agentPositions = generateAgentPositions(
          teamType,
          participants.length
        );

        participants.forEach((participant, index) => {
          const agentNode: Node = {
            id: `agent-${index}`,
            type: 'custom',
            position: { 
              x: 300 + agentPositions[index].x, 
              y: yPosition + agentPositions[index].y 
            },
            data: {
              label: participant.label,
              type: 'agent',
              description: participant.description,
              model: participant.config.model_client?.config.model || 'gpt-4o-mini',
              tools: participant.config.tools?.length || 0,
              onEdit: (nodeData: any) => console.log('Edit agent:', nodeData),
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          };
          newNodes.push(agentNode);

          // Edge from team to agent
          newEdges.push({
            id: `edge-team-agent-${index}`,
            source: 'team',
            target: `agent-${index}`,
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
        });
      }

      // 4. Task Generator Output Nodes (if task is generated)
      if (taskGenerated) {
        yPosition += 200;
        
        // Generated Task Node
        newNodes.push({
          id: 'generated-task',
          type: 'userInput',
          position: { x: 150, y: yPosition },
          data: {
            content: generatedTask,
            status: 'completed',
            timestamp: Date.now(),
            processed: true
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        });

        // Expected Output Node
        newNodes.push({
          id: 'expected-output',
          type: 'expectedOutput',
          position: { x: 450, y: yPosition },
          data: {
            description: expectedOutput,
            status: 'completed'
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        });

        // Edges from agents to output nodes
        participants.forEach((_, index) => {
          newEdges.push({
            id: `edge-agent-task-${index}`,
            source: `agent-${index}`,
            target: 'generated-task',
            type: 'smoothstep',
            animated: false,
            style: { 
              stroke: '#22c55e',
              strokeWidth: 2,
              strokeDasharray: '5,5'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#22c55e',
            },
          });

          newEdges.push({
            id: `edge-agent-output-${index}`,
            source: `agent-${index}`,
            target: 'expected-output',
            type: 'smoothstep',
            animated: false,
            style: { 
              stroke: '#22c55e',
              strokeWidth: 2,
              strokeDasharray: '5,5'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#22c55e',
            },
          });
        });
      }
    }

    console.log('🎨 Generated flow:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length,
      hasStructure: !!autogenStructure,
      participantCount: autogenStructure?.config.participants.length || 0
    });
    return { nodes: newNodes, edges: newEdges };
  }, [conversationState, isAnalyzing, taskGenerated, generatedTask, expectedOutput, hasInitialStructure]);

  // 🎯 CRITICAL: Extract team type from provider attribute
  const extractTeamTypeFromProvider = (provider: string): string => {
    if (!provider || typeof provider !== 'string') {
      console.log('⚠️ No provider found, using default RoundRobinGroupChat');
      return 'RoundRobinGroupChat';
    }
    
    // Match pattern: *.teams.<TeamType>
    const teamTypeMatch = provider.match(/\.teams\.([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm)?)/);
    if (teamTypeMatch) {
      console.log('✅ Extracted team type from provider:', teamTypeMatch[1]);
      return teamTypeMatch[1];
    }
    
    // Alternative patterns for different naming conventions
    const alternativeMatch = provider.match(/([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm))$/);
    if (alternativeMatch) {
      console.log('✅ Extracted team type (alternative pattern):', alternativeMatch[1]);
      return alternativeMatch[1];
    }
    
    console.log('❌ No team type found in provider, using default:', provider);
    return 'RoundRobinGroupChat';
  };

  // Generate agent positions based on team type
  const generateAgentPositions = (teamType: string, agentCount: number) => {
    const positions = [];
    const spacing = 200;

    switch (teamType) {
      case 'RoundRobinGroupChat':
        // Circular arrangement
        const radius = Math.max(100, agentCount * 25);
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * 2 * Math.PI) / agentCount;
          positions.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }
        break;
      
      case 'SelectorGroupChat':
        // Star pattern with central selector
        const selectorRadius = Math.max(120, agentCount * 20);
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * 2 * Math.PI) / agentCount;
          positions.push({
            x: Math.cos(angle) * selectorRadius,
            y: Math.sin(angle) * selectorRadius
          });
        }
        break;
      
      case 'MagenticOneGroupChat':
        // Magnetic field pattern
        const magneticRadius = Math.max(100, agentCount * 30);
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * Math.PI) / (agentCount - 1);
          positions.push({
            x: Math.cos(angle) * magneticRadius,
            y: Math.sin(angle) * magneticRadius - magneticRadius / 2
          });
        }
        break;
      
      case 'Swarm':
        // Swarm clustering pattern
        for (let i = 0; i < agentCount; i++) {
          const cluster = Math.floor(i / 3);
          const inCluster = i % 3;
          positions.push({
            x: cluster * 150 + (inCluster - 1) * 50,
            y: inCluster * 40 - 40
          });
        }
        break;
      
      case 'GraphFlow':
        // Graph-like network pattern
        const cols = Math.ceil(Math.sqrt(agentCount));
        for (let i = 0; i < agentCount; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          positions.push({
            x: (col - (cols - 1) / 2) * spacing,
            y: row * 100
          });
        }
        break;
      
      case 'HierarchicalGroupChat':
        // Tree structure
        positions.push({ x: 0, y: 0 }); // Main agent at center
        for (let i = 1; i < agentCount; i++) {
          const row = Math.floor((i - 1) / 3) + 1;
          const col = (i - 1) % 3;
          positions.push({
            x: (col - 1) * spacing,
            y: row * 100
          });
        }
        break;
      
      case 'CascadingGroupChat':
        // Linear cascade
        for (let i = 0; i < agentCount; i++) {
          positions.push({
            x: i * spacing - ((agentCount - 1) * spacing) / 2,
            y: i * 20
          });
        }
        break;
      
      case 'BroadcastGroupChat':
        // Star pattern
        const starRadius = Math.max(120, agentCount * 20);
        for (let i = 0; i < agentCount; i++) {
          const angle = (i * 2 * Math.PI) / agentCount;
          positions.push({
            x: Math.cos(angle) * starRadius,
            y: Math.sin(angle) * starRadius
          });
        }
        break;
      
      default:
        // Default horizontal layout
        for (let i = 0; i < agentCount; i++) {
          positions.push({
            x: i * spacing - ((agentCount - 1) * spacing) / 2,
            y: 0
          });
        }
    }

    return positions;
  };

  // Update flow when structure changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateAutogenFlow();
    console.log('🔄 Updating ReactFlow with new nodes/edges:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length 
    });
    setNodes(newNodes);
    setEdges(newEdges);
  }, [generateAutogenFlow, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleExportAutogen = () => {
    const autogenStructure = getCurrentAutogenStructure();
    if (autogenStructure) {
      const dataStr = JSON.stringify(autogenStructure, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `autogen_team_structure_${conversationId || 'unknown'}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const handleExportConversation = () => {
    if (conversationId) {
      exportConversationAsJSON(conversationId);
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

      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isAnalyzing ? 'bg-orange-500 animate-pulse' :
            conversationState === 'listening' ? 'bg-blue-500 animate-pulse' :
            conversationState === 'processing' ? 'bg-yellow-500 animate-pulse' :
            conversationState === 'responding' ? 'bg-green-500 animate-pulse' :
            'bg-gray-500'
          }`} />
          <h3 className="text-sm font-medium text-white">Smart Visualizer</h3>
          <span className="text-xs text-gray-400 capitalize">
            ({isAnalyzing ? 'analyzing' : conversationState})
          </span>
          {flowState.team?.type && (
            <span className="text-xs text-gray-500">• {flowState.team.type}</span>
          )}
          {conversationId && (
            <span className="text-xs text-gray-500">• {conversationId.slice(-8)}</span>
          )}
          {isAnalyzing && (
            <SparklesIcon className="h-3 w-3 text-orange-500 animate-spin" />
          )}
          {taskGenerated && (
            <CheckCircleIcon className="h-3 w-3 text-green-500" />
          )}
        </div>
        <div className="flex items-center gap-1">
          {conversationId && (
            <button
              onClick={handleExportConversation}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Export Full Conversation Data"
            >
              <FolderOpenIcon className="h-4 w-4" />
            </button>
          )}
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
            minZoom={0.3}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
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
             taskGenerated ? '✅ Task Generated' :
             teamProgress.readyForDeployment ? '🚀 Ready for deployment' :
             `${flowState.conversationStage} • ${flowState.agents.length} agents`}
            {teamProgress.averageAgentConfidence > 0 && (
              <span className="ml-2">• {Math.round(teamProgress.averageAgentConfidence * 100)}% confidence</span>
            )}
            {teamProgress.hasAutogenStructure && (
              <span className="ml-2">• Autogen Ready</span>
            )}
            {conversationId && (
              <span className="ml-2">• Stored</span>
            )}
          </p>
        </div>
      )}
    </motion.div>
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