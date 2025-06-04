import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { XMarkIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface TranscriptHandlerProps {
  isVisible: boolean;
  onClose: () => void;
  conversationId: string;
}

const TranscriptHandler: React.FC<TranscriptHandlerProps> = ({
  isVisible,
  onClose,
  conversationId
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(null);
  const [toolResults, setToolResults] = useState<any[]>([]);

  const handleSubmitTranscript = async () => {
    setIsLoading(true);
    setError(null);
    setToolResults([]);

    try {
      // Internal task generation
      console.log('Generating task for conversation:', conversationId);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing

      const taskData = {
        task: "Create AI agent team configuration",
        components: [
          {
            name: "Natural Language Processing",
            purpose: "Process and understand user requirements"
          },
          {
            name: "Task Analysis",
            purpose: "Break down complex requirements into actionable tasks"
          },
          {
            name: "Configuration Generator",
            purpose: "Generate appropriate agent configurations"
          }
        ],
        description: "AI agent team configuration generated based on conversation analysis"
      };

      setToolResults(prev => [...prev, {
        name: 'task_generator',
        input: { conversation_id: conversationId },
        output: taskData,
        status: 'success'
      }]);

      // Then, submit to autogen config generator with task
      const configResponse = await fetch('https://autogen-json-generator-432934902994.asia-southeast2.run.app/generate-autogen-config/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: conversationId,
          task: taskData.task
        })
      });

      if (!configResponse.ok) {
        throw new Error('Failed to generate autogen config');
      }

      const configData = await configResponse.json();
      setConfig(configData);
      setToolResults(prev => [...prev, {
        name: 'autogen_config_generator',
        input: { conversation_id: conversationId, task: taskData.task },
        output: configData,
        status: 'success'
      }]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setToolResults(prev => [...prev, {
        name: 'error',
        error: err instanceof Error ? err.message : 'An error occurred',
        status: 'error'
      }]);
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
            <div className="p-4 space-y-4">
              {error && (
                <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Tool Results */}
              {toolResults.length > 0 && (
                <div className="space-y-4">
                  {toolResults.map((result, index) => (
                    <div key={index} className="bg-dark-400 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-white">{result.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          result.status === 'success' ? 'bg-success-500/20 text-success-300' :
                          result.status === 'error' ? 'bg-error-500/20 text-error-300' :
                          'bg-warning-500/20 text-warning-300'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      
                      {result.input && (
                        <div className="mb-2">
                          <div className="text-xs text-gray-400 mb-1">Input:</div>
                          <pre className="text-xs text-gray-300 bg-dark-surface p-2 rounded overflow-x-auto">
                            {JSON.stringify(result.input, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {result.output && (
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Output:</div>
                          <pre className="text-xs text-gray-300 bg-dark-surface p-2 rounded overflow-x-auto">
                            {JSON.stringify(result.output, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      {result.error && (
                        <div className="text-xs text-error-400">
                          Error: {result.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

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