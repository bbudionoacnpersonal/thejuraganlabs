import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, { 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';

import Button from '@/components/ui/Button';
import { 
  XMarkIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  CheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

import { SmartVisualizerProps, VisualizerState } from './types';
import { useResizable } from './useResizable';
import { generateProgressiveFlow, applyLayoutToFlow } from './flowGeneration';
import { relayoutNodes } from '@/utils/dagreLayout';
import { analyzeConversationProgressive } from '@/services/geminiService';
import ConversationNode from './ConversationNode';
import ErrorBoundary from './ErrorBoundary';

const nodeTypes = {
  conversation: ConversationNode,
};

const SmartVisualizerContent: React.FC<SmartVisualizerProps> = ({
  isVisible,
  onClose,
  conversationState,
  agentFlow = [],
  messages = [],
  conversationId = null,
  onJsonGenerated
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [state, setState] = useState<VisualizerState>({
    isMinimized: false,
    isAnalyzing: false,
    lastMessageCount: 0,
    currentConversationId: null,
    analysisStage: 'initial',
    teamStructure: null,
    progressiveElements: {},
    error: null,
    hasGeneratedTask: false,
    conversationEnded: false,
    pendingJsonUpdate: null,
    hasJsonReady: false,
  });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const { size, isResizing } = useResizable(windowRef);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Reset state when conversation ID changes
  useEffect(() => {
    try {
      if (conversationId && conversationId !== state.currentConversationId) {
        console.log('🆕 NEW CONVERSATION - Resetting visualizer state:', {
          oldId: state.currentConversationId,
          newId: conversationId
        });
        
        setState(prev => ({
          ...prev,
          lastMessageCount: 0,
          isAnalyzing: false,
          currentConversationId: conversationId,
          analysisStage: 'initial',
          teamStructure: null,
          progressiveElements: {},
          error: null,
          hasGeneratedTask: false,
          conversationEnded: false,
          pendingJsonUpdate: null,
          hasJsonReady: false,
        }));
        
        setNodes([]);
        setEdges([]);
        
        console.log('✅ Visualizer state reset for new conversation');
      }
    } catch (error) {
      console.error('Error resetting conversation state:', error);
      setState(prev => ({ ...prev, error: 'Failed to reset conversation state' }));
    }
  }, [conversationId, state.currentConversationId, setNodes, setEdges]);

  // Detect conversation end
  useEffect(() => {
    try {
      if (conversationState === 'idle' && 
          state.analysisStage === 'structure_complete' && 
          state.hasGeneratedTask && 
          messages.length > 0) {
        setState(prev => ({ ...prev, conversationEnded: true }));
        console.log('🏁 Conversation ended - will replace user input with final task');
      }
    } catch (error) {
      console.error('Error detecting conversation end:', error);
    }
  }, [conversationState, state.analysisStage, state.hasGeneratedTask, messages.length]);

  // Progressive conversation analysis
  useEffect(() => {
    const performProgressiveAnalysis = async () => {
      try {
        if (messages.length === 0 || messages.length === state.lastMessageCount || state.isAnalyzing) return;
        
        console.log('🔍 Starting progressive conversation analysis...', {
          messageCount: messages.length,
          lastCount: state.lastMessageCount,
          conversationId,
          currentStage: state.analysisStage
        });
        
        setState(prev => ({ ...prev, isAnalyzing: true, error: null }));
        
        const conversationMessages = messages.map(m => `${m.role}: ${m.content}`);
        
        console.log('🤖 Calling Gemini for progressive analysis...');
        
        const analysis = await analyzeConversationProgressive(
          conversationMessages,
          state.teamStructure
        );
        
        console.log('✅ Gemini progressive analysis completed:', analysis);
        
        setState(prev => ({
          ...prev,
          analysisStage: analysis.analysisStage,
          progressiveElements: analysis.progressiveElements || {},
          teamStructure: analysis.teamStructure || prev.teamStructure,
          lastMessageCount: messages.length,
          isAnalyzing: false,
        }));
        
        if (analysis.teamStructure) {
          if (analysis.analysisStage === 'structure_complete' && 
              (!state.pendingJsonUpdate || JSON.stringify(state.pendingJsonUpdate) !== JSON.stringify(analysis.teamStructure))) {
            console.log('🎯 JSON GENERATED - Storing for later use when window closes');
            setState(prev => ({
              ...prev,
              pendingJsonUpdate: analysis.teamStructure,
              hasJsonReady: true,
            }));
          }
        }

        if (analysis.analysisStage === 'structure_complete' && !state.hasGeneratedTask) {
          setState(prev => ({ ...prev, hasGeneratedTask: true }));
        }
        
      } catch (error) {
        console.error('❌ Progressive analysis failed:', error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Analysis failed',
          isAnalyzing: false,
        }));
      }
    };

    const timeoutId = setTimeout(() => {
      performProgressiveAnalysis().catch(error => {
        console.error('Error in debounced analysis:', error);
        setState(prev => ({
          ...prev,
          error: 'Analysis timeout error',
          isAnalyzing: false,
        }));
      });
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [messages, state.lastMessageCount, state.isAnalyzing, conversationId, state.analysisStage, state.teamStructure, state.hasGeneratedTask, state.pendingJsonUpdate]);

  // Generate and update flow visualization
  const updateFlowVisualization = useCallback(() => {
    try {
      const { nodes: newNodes, edges: newEdges } = generateProgressiveFlow({
        analysisStage: state.analysisStage,
        progressiveElements: state.progressiveElements,
        teamStructure: state.teamStructure,
        conversationState,
        isAnalyzing: state.isAnalyzing,
        messages,
        hasGeneratedTask: state.hasGeneratedTask,
        conversationEnded: state.conversationEnded,
      });
      
      console.log('🔄 Updating ReactFlow with progressive nodes/edges:', { 
        nodeCount: newNodes.length, 
        edgeCount: newEdges.length 
      });
      
      if (newNodes.length > 0) {
        const teamType = state.progressiveElements.teamType || 'RoundRobinGroupChat';
        const layoutedElements = applyLayoutToFlow(newNodes, newEdges, teamType);
        
        setNodes(layoutedElements.nodes);
        setTimeout(() => {
          setEdges(layoutedElements.edges);
        }, 50);
      } else {
        setNodes(newNodes);
        setEdges(newEdges);
      }
      
      if (newNodes.length > 0) {
        setTimeout(() => {
          try {
            fitView({ padding: 0.2, duration: 800 });
          } catch (error) {
            console.error('Error fitting view:', error);
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error updating flow:', error);
      setState(prev => ({ ...prev, error: 'Failed to update flow visualization' }));
    }
  }, [state, conversationState, messages, setNodes, setEdges, fitView]);

  useEffect(() => {
    updateFlowVisualization();
  }, [updateFlowVisualization]);

  // Auto-layout function using Dagre
  const handleAutoLayout = useCallback(() => {
    try {
      const teamType = state.progressiveElements.teamType || 'RoundRobinGroupChat';
      const layouted = relayoutNodes(nodes, edges, teamType);
      
      setNodes(layouted.nodes);
      setEdges(layouted.edges);
      
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 800 });
      }, 100);
      
      console.log('🔄 Smart Visualizer auto-layout applied:', {
        nodeCount: layouted.nodes.length,
        edgeCount: layouted.edges.length,
        teamType
      });
    } catch (error) {
      console.error('Error applying auto-layout:', error);
      setState(prev => ({ ...prev, error: 'Failed to apply auto-layout' }));
    }
  }, [nodes, edges, state.progressiveElements.teamType, setNodes, setEdges, fitView]);

  const handleFitView = useCallback(() => {
    try {
      fitView({ padding: 0.2, duration: 800 });
    } catch (error) {
      console.error('Error fitting view:', error);
    }
  }, [fitView]);

  const handleExportStructure = () => {
    try {
      if (state.teamStructure) {
        const dataStr = JSON.stringify(state.teamStructure, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `autogen_structure_${conversationId || 'conversation'}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    } catch (error) {
      console.error('Error exporting structure:', error);
      setState(prev => ({ ...prev, error: 'Failed to export structure' }));
    }
  };

  const handleClose = () => {
    try {
      if (state.conversationEnded && state.hasJsonReady && state.pendingJsonUpdate && onJsonGenerated) {
        console.log('🎯 CONVERSATION FINISHED - Updating editors with generated JSON on window close');
        onJsonGenerated(state.pendingJsonUpdate);
      }
      
      onClose();
    } catch (error) {
      console.error('Error handling window close:', error);
      onClose();
    }
  };

  const getStageDisplay = () => {
    if (state.conversationEnded) {
      return '🎯 Task Generated';
    }
    switch (state.analysisStage) {
      case 'initial':
        return '🎯 Listening...';
      case 'team_identified':
        return '🏢 Team Identified';
      case 'agents_emerging':
        return '🤖 Agents Emerging';
      case 'structure_complete':
        return state.hasGeneratedTask ? '✅ Task Generated' : '✅ Structure Complete';
      default:
        return '⚡ Analyzing...';
    }
  };

  if (!isVisible) return null;

  return (
    <ErrorBoundary>
      <motion.div
        ref={windowRef}
        initial={{ scale: 0.9, x: 50 }}
        animate={{ scale: 1, x: 0 }}
        exit={{ scale: 0.9, x: 50 }}
        className={`bg-dark-surface border border-dark-border rounded-xl shadow-xl transition-all duration-300 ${
          state.isMinimized ? 'w-80 h-16' : ''
        } ${isResizing ? 'cursor-nw-resize' : ''}`}
        style={{
          width: state.isMinimized ? 320 : size.width,
          height: state.isMinimized ? 64 : size.height,
          userSelect: isResizing ? 'none' : 'auto'
        }}
      >
        {/* Resize handles */}
        {!state.isMinimized && (
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
              state.error ? 'bg-red-500' :
              state.isAnalyzing ? 'bg-orange-500 animate-pulse' :
              state.conversationEnded ? 'bg-green-500' :
              state.analysisStage === 'structure_complete' ? 'bg-green-500' :
              state.analysisStage !== 'initial' ? 'bg-blue-500' :
              'bg-gray-500'
            }`} />
            <h3 className="text-sm font-medium text-white">Smart Visualizer</h3>
            <span className="text-xs text-gray-400">
              {state.error ? '❌ Error' : getStageDisplay()}
            </span>
            {conversationId && (
              <span className="text-xs text-gray-500">• {conversationId.slice(-8)}</span>
            )}
            {state.isAnalyzing && (
              <SparklesIcon className="h-3 w-3 text-orange-500 animate-spin" />
            )}
            {state.hasJsonReady && state.conversationEnded && (
              <span className="text-xs text-green-400 flex items-center gap-1">
                <CheckIcon className="h-3 w-3" />
                JSON Ready
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {state.teamStructure && (
              <button
                onClick={handleExportStructure}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Export Autogen Structure"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }))}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              {state.isMinimized ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!state.isMinimized && (
          <div className="bg-dark-background" style={{ height: size.height - 64 }}>
            {state.error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <ExclamationTriangleIcon className="h-12 w-12 text-warning-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Visualization Error</h3>
                  <p className="text-gray-400 text-sm mb-4">{state.error}</p>
                  <Button
                    size="sm"
                    onClick={() => setState(prev => ({ ...prev, error: null }))}
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
                defaultEdgeOptions={{
                  animated: true,
                  style: { strokeWidth: 2, stroke: '#4D9CFF' }
                }}
              >
                <Background color="#374151" gap={20} />
                <Controls 
                  className="bg-dark-surface border border-dark-border rounded"
                  showInteractive={false}
                />
                
                {/* Enhanced Control Panel */}
                <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>Stage: {state.analysisStage}</span>
                    {state.progressiveElements.teamType && (
                      <>
                        <span>•</span>
                        <span>Type: {state.progressiveElements.teamType}</span>
                      </>
                    )}
                    {state.conversationEnded && (
                      <>
                        <span>•</span>
                        <span className="text-green-400">Completed</span>
                      </>
                    )}
                  </div>
                  {state.progressiveElements.identifiedAgents && Array.isArray(state.progressiveElements.identifiedAgents) && state.progressiveElements.identifiedAgents.length > 0 && (
                    <div className="text-xs text-gray-500 mb-3">
                      Agents: {state.progressiveElements.identifiedAgents.length}
                    </div>
                  )}
                  {state.hasJsonReady && state.conversationEnded && (
                    <div className="text-xs text-green-500 mb-3">
                      📄 JSON Ready - Close to Update Editors
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
                
                {/* Status Panel */}
                <Panel position="top-right" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Dagre Layout: Active</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Nodes: {nodes.length} | Edges: {edges.length}
                  </div>
                  {state.hasJsonReady && state.conversationEnded && (
                    <div className="text-xs text-green-500 mt-1">
                      JSON: Ready for Export
                    </div>
                  )}
                </Panel>
              </ReactFlow>
            )}
          </div>
        )}

        {/* Minimized status */}
        {state.isMinimized && (
          <div className="p-2 text-center">
            <p className="text-xs text-gray-400">
              {state.error ? '❌ Error' : getStageDisplay()}
              {state.progressiveElements.identifiedAgents && Array.isArray(state.progressiveElements.identifiedAgents) && state.progressiveElements.identifiedAgents.length > 0 && (
                <span className="ml-2">• {state.progressiveElements.identifiedAgents.length} agents</span>
              )}
              {conversationId && (
                <span className="ml-2">• Stored</span>
              )}
              {state.hasJsonReady && state.conversationEnded && (
                <span className="ml-2 text-green-400">• JSON Ready</span>
              )}
            </p>
          </div>
        )}
      </motion.div>
    </ErrorBoundary>
  );
};

export default SmartVisualizerContent;