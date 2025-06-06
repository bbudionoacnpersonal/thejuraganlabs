import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useConversation } from '@elevenlabs/react';
import ConversationAnalysis from './ConversationAnalysis';
import { Message } from '@/types';
import { industries, focusAreas } from '@/mockdata/industry_functions';

interface VoiceSDKOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onMessage: (message: Message) => void;
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
  onMessage
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Get industry and focus area from localStorage
  const userIndustry = localStorage.getItem('user_industry') || '';
  const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');

  const createSystemPrompt = (industryValue: string, focusAreaValues: string[]): string => {
    const industryConfig = industries.find(i => i.value === industryValue);
    const focusAreaConfigs = focusAreas.filter(fa => focusAreaValues.includes(fa.value));
    
    if (!industryConfig) {
      return 'You are an AI agent development expert. Help users create effective AI agent teams.';
    }

    let prompt = industryConfig.keyPrompts.systemInstructions;

    if (focusAreaConfigs.length > 0) {
      prompt += '\n\nAdditional focus areas to consider:';
      focusAreaConfigs.forEach(fa => {
        prompt += `\n${fa.label}:\n- ${fa.keyConsiderations.join('\n- ')}`;
      });
    }

    prompt += '\n\nKey agent considerations:\n- ';
    prompt += industryConfig.keyPrompts.agentConsiderations.join('\n- ');

    prompt += '\n\nRecommended tools:\n- ';
    prompt += industryConfig.keyPrompts.toolPriorities.join('\n- ');

    return prompt;
  };

  const handleTaskGenerator = async (input: any): Promise<void> => {
    try {
      console.log('Simulating task generation for input:', input);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Task Generator error:', error);
      throw error;
    }
  };

  const conversation = useConversation({
    agentId: 'agent_01jvw7ms1jfbe8c3ptec0na5z9',
    onConnect: () => {
      console.log("connected");
      setIsSessionActive(true);
    },
    onDisconnect: () => {
      console.log("disconnected");
      setIsSessionActive(false);
    },
    onError: error => {
      console.log(error);
      setError("An error occurred during the conversation");
      setIsSessionActive(false);
    },
    onMessage: message => {
      console.log(message);
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: message.source === 'ai' ? 'assistant' : 'user',
        content: message.message,
        timestamp: Date.now()
      };
      
      onMessage(newMessage);
    }
  });

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      setError("No microphone permission");
      return;
    }
    
    try {
      const systemPrompt = createSystemPrompt(userIndustry, userFocusAreas);

      // ========== CHANGE #2: Simplified Payload in startSession ==========
      // The context object now only contains simple identifiers, not large config objects.
      const sessionId = await conversation.startSession({
        /*context: {
          industry: userIndustry,
          focus_areas: userFocusAreas,
        },
        prompt: {
          preamble: systemPrompt,
        },*/
        clientTools: {
          task_generator: handleTaskGenerator
        }
      });

      setConversationId(sessionId);
      console.log('ConversationID with context:', sessionId);

      // ========== CHANGE #3: Removed Redundant State Update ==========
      // We no longer set `setIsSessionActive(true)` here.
      // The `onConnect` callback is the single source of truth for an active session.

    } catch (err) {
      setError("Failed to start conversation");
      console.error(err);
    }
  }

  const stopConversation = async () => {
    try {
      await conversation.endSession();
      setIsSessionActive(false); // Let onDisconnect handle this for consistency, but good for immediate UI feedback
      setConversationId(null);
    } catch (err) {
      console.error("Error ending conversation:", err);
    }
  };

  const handleClose = async () => {
    if (isSessionActive) {
      await stopConversation();
    }
    onClose();
  };

  const handleAnalysisClick = () => {
    if (!conversationId) {
      setError("No conversation data available yet");
      return;
    }
    setShowAnalysis(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative bg-dark-surface/80 backdrop-blur-md p-4 border border-dark-border rounded-xl shadow-xl w-[300px]"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center justify-center p-2">
              <h3 className="text-lg font-medium text-white text-center mb-2">
                {isSessionActive
                  ? conversation.isSpeaking
                    ? "Speaking..."
                    : "Listening..."
                  : "Disconnected"}
              </h3>

              {error && (
                <span className="text-error-500 text-sm mb-2">{error}</span>
              )}

              <motion.div
                animate={isSessionActive ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative my-8"
              >
                {isSessionActive && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 2],
                        opacity: [0.5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute inset-0 rounded-full bg-secondary-600/20"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5
                      }}
                      className="absolute inset-0 rounded-full bg-secondary-600/20"
                    />
                  </>
                )}
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isSessionActive && conversation.isSpeaking
                      ? "bg-secondary-600"
                      : isSessionActive
                      ? "bg-primary-400"
                      : "bg-dark-400"
                  }`}
                >
                  <img 
                    src="/juragan-logo.svg" 
                    alt="Juragan Logo"
                    className="w-12 h-12" // Adjusted size for better fit
                    style={{ 
                      filter: 'invert(1) drop-shadow(0 0 2px #fff)' // Simplified filter for white logo
                    }}
                  />
                </div>
              </motion.div>

              <div className="flex flex-col gap-2 w-full">
                <button
                  onClick={startConversation}
                  disabled={isSessionActive}
                  className={
                    isSessionActive
                      ? "px-2 py-2 rounded-lg text-white text-sm bg-gray-600 cursor-not-allowed"
                      : "px-2 py-2 rounded-lg text-white text-sm bg-secondary-600 hover:bg-primary-400 transition-colors"
                  }
                >
                  Start conversation
                </button>

                <button
                  onClick={stopConversation}
                  disabled={!isSessionActive}
                  className={
                    !isSessionActive
                      ? "px-2 py-2 rounded-lg text-white text-sm bg-gray-600 cursor-not-allowed"
                      : "px-2 py-2 rounded-lg text-white text-sm bg-error-600 hover:bg-error-500 transition-colors"
                  }
                >
                  End conversation
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex justify-center"
              >
                <button
                  onClick={handleAnalysisClick}
                  className={`flex items-center gap-2 text-sm border rounded-lg p-1 border-dark-border ${
                    conversationId 
                      ? 'text-gray-100 hover:text-secondary-600 cursor-pointer'
                      : 'text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!conversationId}
                >
                  <ChartBarIcon className="h-3 w-3" />
                  Conversation Analysis
                </button>
              </motion.div>
            </div>
          </motion.div>

          {showAnalysis && conversationId && (
            <ConversationAnalysis
              isVisible={showAnalysis}
              onClose={() => setShowAnalysis(false)}
              conversationId={conversationId}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceSDKOverlay;