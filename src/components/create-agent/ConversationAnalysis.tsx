import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { 
  XMarkIcon, 
  ChatBubbleLeftRightIcon, 
  BeakerIcon, 
  ClockIcon, 
  SparklesIcon, 
  DocumentTextIcon, 
  LanguageIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';
import TranscriptHandler from './TranscriptHandler';

interface ConversationAnalysisProps {
  isVisible: boolean;
  onClose: () => void;
  conversationId: string;
}

interface ToolResult {
  tool_name: string;
  result_value: string;
  params_as_json?: string; // It’s string from API
  request_id?: string;
}

interface TranscriptEntry {
  role: 'user' | 'agent';
  time_in_call_secs: number;
  message: string;
  tool_calls?: Array<{
    name: string;
    arguments: Record<string, any>;
    output?: any;
    params_as_json?: string;
  }>;
  tool_results?: ToolResult[];
  feedback?: {
    rating: number;
    comment?: string;
  };
  llm_override?: string;
  source_medium?: 'audio' | 'text';
  conversation_turn_metrics?: {
    duration_ms: number;
  };
  rag_retrieval_info?: {
    query: string;
    results: any[];
    duration_ms: number;
    strategy: string;
  };
  llm_usage?: {
    model_usage?: Record<string, {
      input?: {
        tokens: number;
        price: number;
      };
      output_total?: {
        tokens: number;
        price: number;
      };
    }>;
  };
  interrupted?: boolean;
  original_message?: string;
}

interface ConversationData {
  agent_id: string;
  conversation_id: string;
  status: 'initiated' | 'in-progress' | 'processing' | 'done' | 'failed';
  transcript: TranscriptEntry[];
  metadata: {
    start_time_unix_secs: number;
    call_duration_secs: number;
    accepted_time_unix_secs?: number;
    cost?: number;
    main_language?: string;
  };
  has_audio: boolean;
  has_user_audio: boolean;
  has_response_audio: boolean;
  analysis?: {
    call_successful: 'success' | 'failure' | 'unknown';
    transcript_summary: string;
  };
  tool_calls?: Array<{
    name: string;
    arguments: Record<string, any>;
    output?: any;
    duration_ms?: number;
    status?: string;
  }>;
}

const ConversationAnalysis: React.FC<ConversationAnalysisProps> = ({
  isVisible,
  onClose,
  conversationId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ConversationData | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranscriptHandler, setShowTranscriptHandler] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [taskData, setTaskData] = useState<any>(null);

  useEffect(() => {
    if (!isVisible || !conversationId) return;

    const fetchConversationData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const transcriptResponse = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`, {
          method: 'GET',
          headers: {
            'xi-api-key': 'sk_23315796af0e04dca2d364ac3da923dc1f385c4e375a249c'
          }
        });

        if (!transcriptResponse.ok) {
          throw new Error('Failed to fetch conversation data');
        }

        const transcriptData = await transcriptResponse.json();
        setData(transcriptData);

        const fullTranscript = transcriptData.transcript
          .map((entry: any) => `${entry.role}: ${entry.message}`)
          .join('\n');
        setTranscript(fullTranscript);

        const taskValue = transcriptData.transcript
          .flatMap((entry: any) => entry.tool_calls || [])
          .find((tool: any) => tool.tool_name === 'task_generator' && tool.params_as_json);

        if (taskValue) {
          try {
            const parsed = JSON.parse(taskValue.params_as_json);
            if (parsed && parsed.task) {
              console.log('Task found:', parsed.task);
              setTaskData(parsed.task);
            }
          } catch (error) {
            console.error('Failed to parse params_as_json:', taskValue.params_as_json);
          }
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversationData();
  }, [isVisible, conversationId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (unixSeconds: number) => {
    return new Date(unixSeconds * 1000).toLocaleString();
  };

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
            className="relative bg-dark-surface border border-dark-border rounded-xl shadow-xl w-[800px] max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-secondary-600" />
                <h2 className="text-lg font-semibold text-white">Conversation Analysis</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowTranscriptHandler(true)}
                >
                  Generate AI Agent Code
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-error-500 p-2">
                  {error}
                </div>
              ) : data ? (
                <div className="space-y-2">
                  {/* Status and Overview */}
                  <div className="grid grid-cols-4 gap-2">
                    {/* Status, Duration, Messages, Language */}
                    {[
                      { icon: BeakerIcon, label: 'Status', value: data.status },
                      { icon: ClockIcon, label: 'Duration', value: formatTime(data.metadata.call_duration_secs) },
                      { icon: ChatBubbleLeftRightIcon, label: 'Messages', value: data.transcript.length },
                      { icon: LanguageIcon, label: 'Language', value: data.metadata.main_language || 'N/A' },
                    ].map(({ icon: Icon, label, value }, idx) => (
                      <div key={idx} className="bg-dark-400 rounded-lg p-2">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <Icon className="h-2 w-2" />
                          <span className="text-sm">{label}</span>
                        </div>
                        <p className="text-sm font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tool Calls Section */}
                  {data.tool_calls?.length > 0 && (
                    <div className="bg-dark-400 rounded-lg p-2">
                      <h3 className="text-sm font-medium text-white mb-2">Tool Calls</h3>
                      {data.tool_calls.map((tool, index) => (
                        <div key={index} className="bg-dark-surface/50 p-2 rounded mt-2">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <WrenchScrewdriverIcon className="h-3 w-3 text-secondary-600" />
                              <span className="text-sm font-medium text-white">{tool.name}</span>
                            </div>
                            {tool.status && (
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                tool.status === 'success' ? 'bg-success-500/20 text-success-300' :
                                tool.status === 'error' ? 'bg-error-500/20 text-error-300' :
                                'bg-warning-500/20 text-warning-300'
                              }`}>
                                {tool.status}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="bg-dark-400/50 p-2 rounded">
                              <div className="text-xs text-gray-400">Arguments:</div>
                              <pre className="text-xs text-gray-300 overflow-x-auto mt-1">
                                {JSON.stringify(tool.arguments, null, 2)}
                              </pre>
                            </div>
                            {tool.output && (
                              <div className="bg-dark-400/50 p-2 rounded">
                                <div className="text-xs text-gray-400">Output:</div>
                                <pre className="text-xs text-gray-300 overflow-x-auto mt-1">
                                  {JSON.stringify(tool.output, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Analysis Summary */}
                  {/* .... */}
                  
                  {/* Transcript and Tool Results (collapsed) */}
                  {/* .... */}
                </div>
              ) : null}
            </div>

            {/* Transcript Handler */}
            <TranscriptHandler
              isVisible={showTranscriptHandler}
              onClose={() => setShowTranscriptHandler(false)}
              conversationId={conversationId}
              transcript={transcript}
              taskData={taskData}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationAnalysis;
