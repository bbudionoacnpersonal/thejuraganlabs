import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useConversation } from '@elevenlabs/react';
import ConversationAnalysis from './ConversationAnalysis';
import ConversationList from './ConversationList';
import SmartVisualizer from './SmartVisualizer';
import { Message, TeamStructure } from '@/types';
import { industries, focusAreas } from '@/mockdata/industry_functions';
import { resetFlowState, updateUserInput, getFlowState } from '@/mockdata/temp_conv_agentflow';
import { 
  storeConversationData, 
  getConversationData, 
  updateConversationData 
} from '@/services/conversationStorageService';

interface VoiceSDKOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onMessage: (message: Message) => void;
  onJsonGenerated?: (json: TeamStructure) => void; // 🎯 NEW: Callback for JSON generation
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

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

const VoiceSDKOverlay: React.FC<VoiceSDKOverlayProps> = ({
  isVisible,
  onClose,
  onMessage,
  onJsonGenerated // 🎯 NEW: Receive callback prop
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showConversationList, setShowConversationList] = useState(false);
  const [showSmartVisualizer, setShowSmartVisualizer] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversationState, setConversationState] = useState<'idle' | 'listening' | 'processing' | 'responding'>('idle');
  const [agentFlow, setAgentFlow] = useState<AgentFlowStep[]>([]);
  const [conversationMessages, setConversationMessages] = useState<Array<{ role: string; content: string; timestamp: number }>>([]);

  // Get user's industry and focus areas from localStorage
  const userIndustry = localStorage.getItem('user_industry') || '';
  const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');

  // Get industry and focus area details
  const industryDetails = industries.find(i => i.value === userIndustry);
  const focusAreaDetails = focusAreas.filter(f => userFocusAreas.includes(f.value));

  // Load existing conversation data when conversation ID is set
  useEffect(() => {
    if (conversationId) {
      const existingData = getConversationData(conversationId);
      if (existingData) {
        console.log('📂 Loading existing conversation data:', existingData);
        
        // Restore conversation messages
        setConversationMessages(existingData.messages);
        
        // Restore flow state
        // Note: The flow state will be updated by SmartVisualizer when it processes the messages
        
        console.log(`🔄 Restored conversation ${conversationId} with ${existingData.messages.length} messages`);
      } else {
        console.log(`🆕 Starting new conversation: ${conversationId}`);
      }
    }
  }, [conversationId]);

  // Store conversation data whenever messages or flow state changes
  useEffect(() => {
    if (conversationId && conversationMessages.length > 0) {
      const flowState = getFlowState();
      
      // Store/update conversation data in localStorage
      storeConversationData(
        conversationId,
        flowState,
        conversationMessages,
        flowState.autogenStructure
      );
      
      console.log(`💾 Stored conversation data for ${conversationId}:`, {
        messageCount: conversationMessages.length,
        hasAutogen: !!flowState.autogenStructure,
        stage: flowState.conversationStage
      });
    }
  }, [conversationId, conversationMessages]);

  // 🎯 NEW: Listen for resume conversation events
  useEffect(() => {
    const handleResumeConversation = (event: CustomEvent) => {
      const { conversationId: resumeId } = event.detail;
      console.log('▶️ Resuming conversation from analysis:', resumeId);
      
      // Resume the conversation with ElevenLabs using the same ID
      resumeConversationWithId(resumeId);
    };

    window.addEventListener('resume-conversation', handleResumeConversation as EventListener);
    
    return () => {
      window.removeEventListener('resume-conversation', handleResumeConversation as EventListener);
    };
  }, []);

  const handleTaskGenerator = async (input: any): Promise<void> => {
    try {
      console.log('Simulating task generation for input:', input);
      
      // Update flow to show tool usage
      setAgentFlow(prev => [
        ...prev,
        {
          id: `tool-${Date.now()}`,
          type: 'tool',
          label: 'Task Generator',
          status: 'active',
          description: 'Generating task structure',
          timestamp: Date.now()
        }
      ]);

      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Mark tool as completed
      setAgentFlow(prev => prev.map(step => 
        step.type === 'tool' && step.status === 'active' 
          ? { ...step, status: 'completed', duration: 500 }
          : step
      ));

      // Update conversation data with task generation
      if (conversationId) {
        updateConversationData(conversationId, {
          status: 'completed',
          metadata: {
            totalMessages: conversationMessages.length,
            analysisCount: 1,
            confidence: 0.9,
            stage: 'finalization'
          }
        });
      }
    } catch (error) {
      console.error('Task Generator error:', error);
      setAgentFlow(prev => prev.map(step => 
        step.type === 'tool' && step.status === 'active' 
          ? { ...step, status: 'error' }
          : step
      ));
      throw error;
    }
  };

  const conversation = useConversation({
    agentId: 'agent_01jvw7ms1jfbe8c3ptec0na5z9',
    onConnect: () => {
      console.log("connected");
      setConversationState('idle');
    },
    onDisconnect: () => {
      console.log("disconnected");
      setConversationState('idle');
      setAgentFlow([]);
      
      // Final save before disconnecting
      if (conversationId && conversationMessages.length > 0) {
        const flowState = getFlowState();
        updateConversationData(conversationId, {
          status: 'completed',
          flowState,
          messages: conversationMessages
        });
        console.log(`💾 Final save for conversation ${conversationId} before disconnect`);
      }
      
      setConversationMessages([]);
      // 🎯 FIXED: Don't auto-close SmartVisualizer on disconnect
      // setShowSmartVisualizer(false);
      resetFlowState(); // Reset the flow state when disconnecting
      setConversationId(null); // Clear conversation ID
    },
    onError: error => {
      console.log(error);
      setError("An error occurred during the conversation");
      setConversationState('idle');
    },
    onMessage: message => {
      console.log(message);
      
      // Store conversation messages for analysis
      const newMessage = {
        role: message.source === 'ai' ? 'assistant' : 'user',
        content: message.message,
        timestamp: Date.now()
      };
      setConversationMessages(prev => {
        const updated = [...prev, newMessage];
        
        // Update user input in flow state for user messages
        if (message.source === 'user') {
          updateUserInput(message.message);
        }
        
        return updated;
      });
      
      // Update conversation state based on message source
      if (message.source === 'user') {
        setConversationState('processing');
        // Add user input to flow
        setAgentFlow([{
          id: `user-${Date.now()}`,
          type: 'user',
          label: 'User Input',
          status: 'completed',
          description: 'Voice input received',
          timestamp: Date.now()
        }]);
      } else if (message.source === 'ai') {
        setConversationState('responding');
        // Add AI response to flow
        setAgentFlow(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            type: 'agent',
            label: 'AI Agent',
            status: 'active',
            description: 'Generating response',
            timestamp: Date.now()
          }
        ]);
        
        // Mark as completed after a short delay
        setTimeout(() => {
          setAgentFlow(prev => prev.map(step => 
            step.type === 'agent' && step.status === 'active' 
              ? { ...step, status: 'completed', duration: 1000 }
              : step
          ));
          setConversationState('idle');
        }, 1000);
      }
      
      const messageForCallback: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: message.source === 'ai' ? 'assistant' : 'user',
        content: message.message,
        timestamp: Date.now()
      };
      
      onMessage(messageForCallback);
    }
  });

  // Listen for recording events to update conversation state
  useEffect(() => {
    const handleRecordingStart = () => {
      setConversationState('listening');
      setAgentFlow([]);
    };

    const handleRecordingEnd = () => {
      setConversationState('processing');
    };

    window.addEventListener('elevenlabs-convai:recording-start', handleRecordingStart);
    window.addEventListener('elevenlabs-convai:recording-end', handleRecordingEnd);

    return () => {
      window.removeEventListener('elevenlabs-convai:recording-start', handleRecordingStart);
      window.removeEventListener('elevenlabs-convai:recording-end', handleRecordingEnd);
    };
  }, []);

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      setError("No microphone permission");
      return;
    }
    
    try {
      // Reset flow state when starting new conversation
      resetFlowState();
      setConversationMessages([]);
      
      const sessionId = await conversation.startSession({
        dynamicVariables: {
          industry: userIndustry,
          function_focus: userFocusAreas.join(', '),
          agentConsiderations: industryDetails?.keyPrompts.agentConsiderations.join(', ') || '',
          functionConsiderations: focusAreaDetails.map(f => f.keyConsiderations.join(', ')).join(' | ')
        },
        clientTools: {
          task_generator: handleTaskGenerator
        }
      });
      
      setConversationId(sessionId);
      setShowSmartVisualizer(true);
      
      console.log('🎙️ Started new conversation with ID:', sessionId);
      
      // Check if this conversation already exists in storage
      const existingData = getConversationData(sessionId);
      if (existingData) {
        console.log('📂 Found existing conversation data, will restore state');
      } else {
        console.log('🆕 New conversation, will create fresh storage');
      }
      
    } catch (err) {
      setError("Failed to start conversation");
      console.error(err);
    }
  }

  // 🎯 NEW: Function to resume conversation with specific ID
  const resumeConversationWithId = async (resumeId: string) => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      setError("No microphone permission");
      return;
    }
    
    try {
      console.log('▶️ Resuming conversation with ID:', resumeId);
      
      // Load existing conversation data
      const existingData = getConversationData(resumeId);
      if (existingData) {
        setConversationMessages(existingData.messages);
        console.log(`📂 Loaded ${existingData.messages.length} messages for resume`);
      }
      
      // Resume session with ElevenLabs using the same conversation ID
      const sessionId = await conversation.startSession({
        conversationId: resumeId, // 🎯 CRITICAL: Pass the conversation ID to resume
        dynamicVariables: {
          industry: userIndustry,
          function_focus: userFocusAreas.join(', '),
          agentConsiderations: industryDetails?.keyPrompts.agentConsiderations.join(', ') || '',
          functionConsiderations: focusAreaDetails.map(f => f.keyConsiderations.join(', ')).join(' | ')
        },
        clientTools: {
          task_generator: handleTaskGenerator
        }
      });
      
      setConversationId(sessionId);
      setShowSmartVisualizer(true);
      
      console.log('✅ Successfully resumed conversation:', sessionId);
      
    } catch (err) {
      setError("Failed to resume conversation");
      console.error('❌ Resume conversation error:', err);
    }
  };

  const stopConversation = async () => {
    try {
      // Final save before stopping
      if (conversationId && conversationMessages.length > 0) {
        const flowState = getFlowState();
        updateConversationData(conversationId, {
          status: 'completed',
          flowState,
          messages: conversationMessages
        });
        console.log(`💾 Final save for conversation ${conversationId} before stopping`);
      }
      
      await conversation.endSession();
      // 🎯 FIXED: Don't auto-close SmartVisualizer when stopping conversation
      // setShowSmartVisualizer(false);
      setAgentFlow([]);
      setConversationMessages([]);
      setConversationState('idle');
      resetFlowState();
      setConversationId(null);
    } catch (err) {
      console.error("Error ending conversation:", err);
    }
  };

  const handleClose = async () => {
    await stopConversation();
    // 🎯 FIXED: Close SmartVisualizer when main overlay closes
    setShowSmartVisualizer(false);
    onClose();
  };

  const handleAnalysisClick = () => {
    // Show conversation list first
    setShowConversationList(true);
  };

  const handleConversationSelect = (conversationId: string) => {
    console.log('🔍 Selected conversation for analysis:', conversationId);
    setSelectedConversationId(conversationId);
    setShowConversationList(false);
    setShowAnalysis(true);
  };

  // 🎯 FIXED: Store last conversation ID for analysis access
  useEffect(() => {
    if (conversationId) {
      localStorage.setItem('last_conversation_id', conversationId);
    }
  }, [conversationId]);

  // 🎯 NEW: Handle JSON generation from Smart Visualizer
  const handleJsonGenerated = (json: TeamStructure) => {
    console.log('🎯 JSON generated from Smart Visualizer, forwarding to parent:', json);
    if (onJsonGenerated) {
      onJsonGenerated(json);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
          />

          {/* Centered container for both components */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-8 pointer-events-auto">
              {/* Voice SDK Component - 25% width (400px) */}
              <motion.div
                initial={{ scale: 0.9, x: -50 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0.9, x: -50 }}
                className="relative bg-dark-surface/90 backdrop-blur-md p-6 border border-dark-border rounded-xl shadow-xl w-[400px]"
              >
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xl font-medium text-white text-center mb-3">
                    {conversation.status === "connected"
                      ? conversation.isSpeaking
                        ? "Speaking..."
                        : "Listening..."
                      : "Voice Assistant"}
                  </h3>

                  {/* Show conversation ID when connected */}
                  {conversationId && (
                    <div className="mb-2 px-2 py-1 bg-dark-background/50 rounded text-xs text-gray-400">
                      ID: {conversationId.slice(-8)}
                    </div>
                  )}

                  {error && (
                    <span className="text-error-500 text-sm mb-3 text-center">{error}</span>
                  )}

                  <motion.div
                    animate={conversation.status === "connected" ? {
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative my-8"
                  >
                    {conversation.status === "connected" && (
                      <>
                        <motion.div
                          animate={{
                            scale: [1, 2.5],
                            opacity: [0.3, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                          className="absolute inset-0 rounded-full bg-secondary-600/30"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 2],
                            opacity: [0.4, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.5
                          }}
                          className="absolute inset-0 rounded-full bg-secondary-600/40"
                        />
                      </>
                    )}
                    <div 
                      className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                        conversation.status === "connected" && conversation.isSpeaking
                          ? "bg-secondary-600 shadow-lg"
                          : conversation.status === "connected"
                          ? "bg-primary-400 shadow-md"
                          : "bg-dark-400"
                      }`}
                    >
                      <img 
                        src="/juragan-logo.svg" 
                        alt="Juragan Logo"
                        className="w-17 h-17"
                        style={{ 
                          filter: 'invert(100%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)'
                        }}
                      />
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={startConversation}
                      disabled={conversation.status === "connected"}
                      className={`px-4 py-3 rounded-lg text-white text-sm font-medium transition-colors ${
                        conversation.status === "connected"
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-secondary-600 hover:bg-primary-400"
                      }`}
                    >
                      Start Conversation
                    </button>

                    <button
                      onClick={stopConversation}
                      disabled={conversation.status !== "connected"}
                      className={`px-4 py-3 rounded-lg text-white text-sm font-medium transition-colors ${
                        conversation.status !== "connected"
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-error-600 hover:bg-error-500"
                      }`}
                    >
                      End Conversation
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex justify-center"
                  >
                    <button
                      onClick={handleAnalysisClick}
                      className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 border-dark-border transition-colors text-gray-100 hover:text-secondary-600 hover:border-secondary-600 cursor-pointer"
                    >
                      <ChartBarIcon className="h-4 w-4" />
                      Conversation Analysis
                    </button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Smart Visualizer Component - 65% width (800px), bigger and better positioned */}
              {showSmartVisualizer && (
                <SmartVisualizer
                  isVisible={showSmartVisualizer}
                  onClose={() => setShowSmartVisualizer(false)} // 🎯 FIXED: Allow manual close
                  conversationState={conversationState}
                  agentFlow={agentFlow}
                  messages={conversationMessages}
                  conversationId={conversationId} // Pass conversation ID for storage access
                  onJsonGenerated={handleJsonGenerated} // 🎯 NEW: Pass JSON generation callback
                />
              )}
            </div>
          </div>

          {/* Conversation List Modal */}
          {showConversationList && (
            <ConversationList
              isVisible={showConversationList}
              onClose={() => setShowConversationList(false)}
              onSelectConversation={handleConversationSelect}
            />
          )}

          {/* Analysis Modal */}
          {showAnalysis && selectedConversationId && (
            <ConversationAnalysis
              isVisible={showAnalysis}
              onClose={() => {
                setShowAnalysis(false);
                setSelectedConversationId(null);
              }}
              conversationId={selectedConversationId}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default VoiceSDKOverlay;