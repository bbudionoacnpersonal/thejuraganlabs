import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useConversation } from '@elevenlabs/react';
import ConversationAnalysis from './ConversationAnalysis';
import { Message } from '@/types';

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

  // Get industry and focus area from localStorage
  const industry = localStorage.getItem('user_industry') || '';
  const focusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');

  const createSystemPrompt = (industry: string, focusAreas: string[]): string => {
    let prompt = `You are an AI agent development expert for the ${industry} industry`;
    
    if (focusAreas.length > 0) {
      prompt += `, specializing in ${focusAreas.join(', ')}`;
    }
    
    prompt += `. Your goal is to help users create effective AI agent teams that solve specific business problems. 
    Consider the following aspects when providing assistance:
    - Industry-specific requirements and challenges
    - Best practices for ${industry} sector
    - Compliance and regulatory considerations
    - Integration with existing systems
    - Scalability and performance requirements`;

    if (industry === 'finance') {
      prompt += `\nPay special attention to security, compliance (SOX, Basel), and real-time processing capabilities.`;
    } else if (industry === 'healthcare') {
      prompt += `\nEnsure HIPAA compliance and patient data privacy in all agent configurations.`;
    } else if (industry === 'retail') {
      prompt += `\nFocus on customer experience, inventory management, and omnichannel capabilities.`;
    }

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
    },
    onDisconnect: () => {
      console.log("disconnected");
    },
    onError: error => {
      console.log(error);
      setError("An error occurred during the conversation");
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
      // Create system prompt based on industry and focus areas
      const systemPrompt = createSystemPrompt(industry, focusAreas);

      const sessionId = await conversation.startSession({
        context: {
          industry: industry,
          focus_areas: focusAreas,
        },
        prompt: {
          preamble: systemPrompt,
        },
        clientTools: {
          task_generator: handleTaskGenerator
        }
      });
      setConversationId(sessionId);
      console.log('ConversationID with context:', sessionId);
    } catch (err) {
      setError("Failed to start conversation");
      console.error(err);
    }
  }

  const stopConversation = async () => {
    try {
      await conversation.endSession();
    } catch (err) {
      console.error("Error ending conversation:", err);
    }
  };

  const handleClose = async () => {
    await stopConversation();
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
                {conversation.status === "connected"
                  ? conversation.isSpeaking
                    ? "Speaking..."
                    : "Listening..."
                  : "Disconnected"}
              </h3>

              {error && (
                <span className="text-error-500 text-sm mb-2">{error}</span>
              )}

              <motion.div
                animate={conversation.status === "connected" ? {
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
                {conversation.status === "connected" && (
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
                  className={`w-20 h-30 rounded-full flex items-center justify-center ${
                    conversation.status === "connected" && conversation.isSpeaking
                      ? "bg-secondary-600"
                      : conversation.status === "connected"
                      ? "bg-primary-400"
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

              <div className="flex flex-col gap-2 w-full">
                <button
                  onClick={startConversation}
                  disabled={conversation.status === "connected"}
                  className={
                    conversation.status === "connected"
                      ? "px-2 py-2 rounded-lg text-white text-sm bg-gray-600 cursor-not-allowed"
                      : "px-2 py-2 rounded-lg text-white text-sm bg-secondary-600 hover:bg-primary-400 transition-colors"
                  }
                >
                  Start conversation
                </button>

                <button
                  onClick={stopConversation}
                  disabled={conversation.status !== "connected"}
                  className={
                    conversation.status !== "connected"
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