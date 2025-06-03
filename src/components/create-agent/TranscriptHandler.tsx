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

  const handleSubmitTranscript = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // First, fetch the conversation transcript
      const transcriptResponse = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`, {
        method: 'GET',
        headers: {
          'xi-api-key': 'sk_23315796af0e04dca2d364ac3da923dc1f385c4e375a249c'
        }
      });

      if (!transcriptResponse.ok) {
        throw new Error('Failed to fetch conversation transcript');
      }

      const transcriptData = await transcriptResponse.json();
      const transcript = transcriptData.transcript.map((entry: any) => entry.message).join('\n');

      // Use task_generator tool
      const taskResponse = await fetch(`https://api.elevenlabs.io/v1/convai/tools/task_generator`, {
        method: 'POST',
        headers: {
          'xi-api-key': 'sk_23315796af0e04dca2d364ac3da923dc1f385c4e375a249c',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          transcript: transcript
        })
      });

      if (!taskResponse.ok) {
        throw new Error('Failed to generate task');
      }

      const taskData = await taskResponse.json();
      console.log('Task Generator Response:', taskData);

      // Then, submit to autogen config generator with task
      const configResponse = await fetch('https://autogen-json-generator-432934902994.asia-southeast2.run.app/generate-autogen-config/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: transcript,
          task: taskData.message
        })
      });

      if (!configResponse.ok) {
        throw new Error('Failed to generate autogen config');
      }

      const configData = await configResponse.json();
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
            <div className="p-4 space-y-4">
              {error && (
                <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {config ? (
                <div className="bg-dark-400 rounded-lg p-4">
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