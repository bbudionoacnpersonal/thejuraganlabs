import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface LLMDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  details: {
    call_id: string;
    system_message: string;
    user_message: string;
    response: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    duration: number;
  };
}

const LLMDetailsModal: React.FC<LLMDetailsModalProps> = ({
  isVisible,
  onClose,
  details
}) => {
  const formatDuration = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
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
                <SparklesIcon className="h-4 w-4 text-primary-400" />
                <h2 className="text-lg font-semibold text-white">LLM Call Details</h2>
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
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              {/* Call Info */}
              <div className="bg-dark-400 rounded-lg p-3">
                <h3 className="text-sm font-medium text-white mb-2">Call Information</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Call ID:</span>
                    <span className="text-white font-mono">{details.call_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span className="text-white">{details.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{formatDuration(details.duration)}</span>
                  </div>
                </div>
              </div>

              {/* Token Usage */}
              <div className="bg-dark-400 rounded-lg p-3">
                <h3 className="text-sm font-medium text-white mb-2">Token Usage</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prompt Tokens:</span>
                    <span className="text-white">{details.promptTokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completion Tokens:</span>
                    <span className="text-white">{details.completionTokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Tokens:</span>
                    <span className="text-white">{details.totalTokens}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                <div className="bg-dark-400 rounded-lg p-3">
                  <h3 className="text-sm font-medium text-white mb-2">System Message</h3>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-dark-surface p-2 rounded">
                    {details.system_message}
                  </pre>
                </div>

                <div className="bg-dark-400 rounded-lg p-3">
                  <h3 className="text-sm font-medium text-white mb-2">User Message</h3>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-dark-surface p-2 rounded">
                    {details.user_message}
                  </pre>
                </div>

                <div className="bg-dark-400 rounded-lg p-3">
                  <h3 className="text-sm font-medium text-white mb-2">Response</h3>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-dark-surface p-2 rounded">
                    {details.response}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LLMDetailsModal;