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

  const handleTaskGenerator = async (input: any) => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/convai/tools/task_generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_23315796af0e04dca2d364ac3da923dc1f385c4e375a249c'
        },
        body: JSON.stringify({
          conversation_id: input.conversation_id,
          message: input.message,
          examples: [
            {
              input: "Create an AI agent that can analyze customer support tickets",
              output: "task: Create a customer support analysis agent\nComponents:\n- NLP for ticket analysis\n- Priority classification\n- Department routing"
            },
            {
              input: "I need an AI team for processing loan applications",
              output: "task: Build loan processing AI team\nComponents:\n- Document analysis\n- Risk assessment\n- Credit scoring"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate task');
      }

      const data = await response.json();
      return data;
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
      onMessage({
        id: Math.random().toString(),
        role: message.source === 'ai' ? 'assistant' : 'user',
        content: message.message,
        timestamp: Date.now()
      });
    },
    clientTools: [
      {
        name: 'task_generator',
        description: 'Generates task information from conversation',
        parameters: {
          type: 'object',
          properties: {
            conversation_id: {
              type: 'string',
              description: 'The ID of the conversation'
            },
            message: {
              type: 'string',
              description: 'The task to generate'
            }
          },
          required: ['conversation_id', 'task']
        },
        handler: handleTaskGenerator
      }
    ]
  });

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      setError("No microphone permission");
      return;
    }
    
    try {
      const sessionId = await conversation.startSession();
      setConversationId(sessionId);
      console.log('ConversationID: ', sessionId);
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

              {/* Analysis Link - Always visible */}
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

          <ConversationAnalysis
            isVisible={showAnalysis}
            onClose={() => setShowAnalysis(false)}
            conversationId={conversationId || ''}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceSDKOverlay;