import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { Coins } from 'lucide-react';
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

// Dynamic node components for conversation flow
const ConversationNode = ({ data }: { data: any }) => {
  const getNodeStyle = () => {
    switch (data.type) {
      case 'user':
        return 'bg-blue-500 border-blue-600 text-white';
      case 'team':
        return 'bg-purple-500 border-purple-600 text-white';
      case 'agent':
        return 'bg-green-500 border-green-600 text-white';
      default:
        return 'bg-gray-500 border-gray-600 text-white';
    }
  };

  const getIcon = () => {
    switch (data.type) {
      case 'user':
        return '👤';
      case 'team':
        return '🏢';
      case 'agent':
        return '🤖';
      default:
        return '⚡';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[200px] transition-all duration-300 ${getNodeStyle()}`}>
      <div className="flex items-center gap-2 justify-center mb-2">
        <span className="text-lg">{getIcon()}</span>
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      
      {data.description && (
        <div className="bg-white/10 rounded p-2 mb-2">
          <p className="text-xs text-center">{data.description}</p>
        </div>
      )}
      
      {data.confidence && (
        <div className="flex items-center justify-center mt-2">
          <div className={`w-2 h-2 rounded-full ${data.confidence > 0.7 ? 'bg-green-300' : data.confidence > 0.4 ? 'bg-yellow-300' : 'bg-red-300'}`} />
          <span className="text-xs ml-1">{Math.round(data.confidence * 100)}% confidence</span>
        </div>
      )}
      
      {data.agents && data.agents.length > 0 && (
        <div className="mt-2 text-xs">
          <div className="text-center opacity-75">Agents: {data.agents.length}</div>
          <div className="flex flex-wrap gap-1 mt-1 justify-center">
            {data.agents.slice(0, 3).map((agent: any, idx: number) => (
              <span key={idx} className="bg-white/20 px-1 rounded text-xs">
                {agent.name}
              </span>
            ))}
            {data.agents.length > 3 && (
              <span className="bg-white/20 px-1 rounded text-xs">
                +{data.agents.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  conversation: ConversationNode,
};

// Custom hook for resizable functionality
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
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState<'initial' | 'team_identified' | 'agents_emerging' | 'structure_complete'>('initial');
  const [teamStructure, setTeamStructure] = useState<TeamStructure | null>(null);
  const [progressiveElements, setProgressiveElements] = useState<any>({});
  
  const windowRef = useRef<HTMLDivElement>(null);
  const { size, isResizing } = useResizable(windowRef);
  const { fitView } = useReactFlow();

  // Reset state when conversation ID changes
  useEffect(() => {
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
      
      console.log('✅ Visualizer state reset for new conversation');
    }
  }, [conversationId, currentConversationId, setNodes, setEdges]);

  // Progressive conversation analysis
  useEffect(() => {
    const performProgressiveAnalysis = async () => {
      // Skip if no new messages or already analyzing
      if (messages.length === 0 || messages.length === lastMessageCount || isAnalyzing) return;
      
      console.log('🔍 Starting progressive conversation analysis...', {
        messageCount: messages.length,
        lastCount: lastMessageCount,
        conversationId,
        currentStage: analysisStage
      });
      
      setIsAnalyzing(true);
      
      try {
        // Prepare conversation messages for analysis
        const conversationMessages = messages.map(m => `${m.role}: ${m.content}`);
        
        console.log('🤖 Calling Anthropic for progressive analysis...');
        
        // Call Anthropic for progressive analysis
        const analysis = await analyzeConversationProgressive(
          conversationMessages,
          teamStructure
        );
        
        console.log('✅ Anthropic progressive analysis completed:', analysis);
        
        // Update state based on analysis
        setAnalysisStage(analysis.analysisStage);
        setProgressiveElements(analysis.progressiveElements);
        
        if (analysis.teamStructure) {
          setTeamStructure(analysis.teamStructure);
        }
        
        setLastMessageCount(messages.length);
        
      } catch (error) {
        console.error('❌ Progressive analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    // Debounce analysis
    const timeoutId = setTimeout(performProgressiveAnalysis, 2000);
    return () => clearTimeout(timeoutId);
  }, [messages, lastMessageCount, isAnalyzing, conversationId, analysisStage, teamStructure]);

  // Generate dynamic flow based on conversation progress
  const generateProgressiveFlow = useCallback(() => {
    console.log('🎨 Generating progressive flow visualization:', {
      stage: analysisStage,
      hasTeamStructure: !!teamStructure,
      progressiveElements,
      conversationState
    });
    
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yPosition = 50;

    // Stage 1: User Input (only show when team is identified)
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
          teamType: progressiveElements.teamType,
          agents: progressiveElements.identifiedAgents || []
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      newNodes.push(teamNode);

      // Connect user input to team
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
    }

    // Stage 3: Agent Nodes (when agents are emerging)
    if (analysisStage === 'agents_emerging' || analysisStage === 'structure_complete') {
      const agents = progressiveElements.identifiedAgents || [];
      
      agents.forEach((agent: any, index: number) => {
        const agentNode: Node = {
          id: `agent-${index}`,
          type: 'conversation',
          position: { 
            x: 200 + (index * 250), 
            y: yPosition 
          },
          data: {
            type: 'agent',
            label: agent.name,
            description: agent.description,
            confidence: agent.confidence || 0.6,
            role: agent.role
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };
        newNodes.push(agentNode);

        // Connect team to agent
        if (newNodes.find(n => n.id === 'team')) {
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
        }
      });
    }

    console.log('🎨 Generated progressive flow:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length,
      stage: analysisStage
    });
    
    return { nodes: newNodes, edges: newEdges };
  }, [analysisStage, progressiveElements, teamStructure, conversationState, isAnalyzing, messages]);

  // Update flow when analysis changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateProgressiveFlow();
    console.log('🔄 Updating ReactFlow with progressive nodes/edges:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length 
    });
    setNodes(newNodes);
    setEdges(newEdges);
    
    // Auto-fit view when nodes change
    if (newNodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 800 });
      }, 100);
    }
  }, [generateProgressiveFlow, setNodes, setEdges, fitView]);

  const handleExportStructure = () => {
    if (teamStructure) {
      const dataStr = JSON.stringify(teamStructure, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `autogen_structure_${conversationId || 'conversation'}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  if (!isVisible) return null;

  const getStageDisplay = () => {
    switch (analysisStage) {
      case 'initial':
        return '🎯 Listening...';
      case 'team_identified':
        return '🏢 Team Identified';
      case 'agents_emerging':
        return '🤖 Agents Emerging';
      case 'structure_complete':
        return '✅ Structure Complete';
      default:
        return '⚡ Analyzing...';
    }
  };

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
            isAnalyzing ? 'bg-orange-500 animate-pulse' :
            analysisStage === 'structure_complete' ? 'bg-green-500' :
            analysisStage !== 'initial' ? 'bg-blue-500' :
            'bg-gray-500'
          }`} />
          <h3 className="text-sm font-medium text-white">Smart Visualizer</h3>
          <span className="text-xs text-gray-400">
            {getStageDisplay()}
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
          >
            <Background color="#374151" gap={20} />
            <Controls 
              className="bg-dark-surface border border-dark-border rounded"
              showInteractive={false}
            />
            <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Stage: {analysisStage}</span>
                {progressiveElements.teamType && (
                  <>
                    <span>•</span>
                    <span>Type: {progressiveElements.teamType}</span>
                  </>
                )}
              </div>
              {progressiveElements.identifiedAgents && progressiveElements.identifiedAgents.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  Agents: {progressiveElements.identifiedAgents.length}
                </div>
              )}
            </Panel>
          </ReactFlow>
        </div>
      )}

      {/* Minimized status */}
      {isMinimized && (
        <div className="p-2 text-center">
          <p className="text-xs text-gray-400">
            {getStageDisplay()}
            {progressiveElements.identifiedAgents && progressiveElements.identifiedAgents.length > 0 && (
              <span className="ml-2">• {progressiveElements.identifiedAgents.length} agents</span>
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