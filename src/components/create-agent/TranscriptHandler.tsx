import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { XMarkIcon, DocumentTextIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface TranscriptHandlerProps {
  isVisible: boolean;
  onClose: () => void;
  conversationId: string;
  transcript: string;
  taskData: string;
}

const TranscriptHandler: React.FC<TranscriptHandlerProps> = ({
  isVisible,
  onClose,
  conversationId,
  transcript,
  taskData
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(null);
  const [isInputParamsExpanded, setIsInputParamsExpanded] = useState(true);

  const handleSubmitTranscript = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: transcript,
          task: taskData
        })
      };

      const response = await fetch('https://autogen-json-generator-432934902994.asia-southeast2.run.app/generate-autogen-config/', options);

      if (!response.ok) {
        throw new Error('Failed to generate autogen config');
      }

      const configData = await response.json();
      setConfig(configData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-dark-surface border border-dark-border rounded-xl shadow-xl w-[600px] max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-4 w-4 text-primary-400" />
                <h2 className="text-lg font-semibold text-white">Generate Autogen Config</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
              {error && (
                <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Input Parameters Preview */}
              <div className="bg-dark-400 rounded-lg">
                <button
                  onClick={() => setIsInputParamsExpanded(!isInputParamsExpanded)}
                  className="w-full p-4 flex items-center justify-between text-white"
                >
                  <h3 className="text-sm font-medium">API Input Parameters</h3>
                  {isInputParamsExpanded ? (
                    <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {isInputParamsExpanded && (
                  <div className="px-4 pb-4 space-y-2">
                    <div>
                      <div className="text-xs text-gray-400">Prompt (Transcript):</div>
                      <pre className="text-sm text-white bg-dark-surface p-2 rounded mt-1 overflow-x-auto">
                        {transcript}
                      </pre>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Task:</div>
                      <pre className="text-sm text-white bg-dark-surface p-2 rounded mt-1 overflow-x-auto">
                        {taskData}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Generated Config */}
              {config ? (
                <div className="bg-dark-400 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white mb-2">Generated Configuration</h3>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(config, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    Generate Autogen configuration from the conversation transcript?
                  </p>
                  <Button
                    onClick={handleSubmitTranscript}
                    isLoading={isLoading}
                    className="items-center"
                  >
                    Generate AI Agent Code
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TranscriptHandler;
