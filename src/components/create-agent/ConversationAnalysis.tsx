import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { XMarkIcon, ChatBubbleLeftRightIcon, BeakerIcon, ClockIcon, SparklesIcon, DocumentTextIcon, LanguageIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Wrench } from 'lucide-react';
import TranscriptHandler from './TranscriptHandler';

interface ConversationAnalysisProps {
  isVisible: boolean;
  onClose: () => void;
  conversationId: string;
}

interface ToolResult {
  tool_name: string;
  result_value: string;
  type?: string;
  request_id?: string;
  params_as_json?: string | Record<string, any>;
  tool_has_been_called?: boolean;
  tool_details?: {
    type: string;
    parameters: string;
  };
}

interface TranscriptEntry {
  role: 'user' | 'agent';
  time_in_call_secs: number;
  message: string;
  tool_calls?: Array<{
    name: string;
    arguments: Record<string, any>;
    output?: any;
    params_as_json?: Record<string, any>;
  }>;
  tools?: Array<{
    type: string;
    request_id: string;
    tool_name: string;
    params_as_json: string;
    tool_has_been_called: boolean;
    tool_details: {
      type: string;
      parameters: string;
    };
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
    deletion_settings?: {
      time_to_live_secs?: number;
      auto_delete?: boolean;
      delete_after_secs?: number;
      delete_at_unix_secs?: number;
      delete_immediately?: boolean;
      never_delete?: boolean;
    };
    feedback?: {
      rating?: number;
      tags?: string[];
      comment?: string;
    };
    charging?: {
      charged: boolean;
      amount: number;
      currency: string;
      description: string;
    };
    termination_reason?: string;
    error?: {
      code: string;
      message: string;
    };
    main_language?: string;
    rag_usage?: {
      total_chunks: number;
      total_tokens: number;
    };
  };
  has_audio: boolean;
  has_user_audio: boolean;
  has_response_audio: boolean;
  analysis?: {
    call_successful: 'success' | 'failure' | 'unknown';
    transcript_summary: string;
    task?: {
      message: string;
      client: string;
      result: string;
      duration_ms: number;
      params_as_json?: Record<string, any>;
    };
    evaluation_criteria_results?: Record<string, {
      criteria_id: string;
      result: 'success' | 'failure' | 'unknown';
      rationale: string;
    }>;
    data_collection_results?: Record<string, {
      data_collection_id: string;
      rationale: string;
      value?: any;
      json_schema?: Record<string, any>;
    }>;
  };
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
  const [taskData, setTaskData] = useState<string | null>(null);

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

        // Extract task data from tools array
     const taskGeneratingToolCall = transcriptData.transcript
  .flatMap((entry: TranscriptEntry) => entry.tool_calls || [])
  .find(toolCall => toolCall.name === 'task_generator' && toolCall.params_as_json);

if (taskGeneratingToolCall && taskGeneratingToolCall.params_as_json) {
  try {
    const params = JSON.parse(taskGeneratingToolCall.params_as_json); // <-- MUST PARSE here!
    if (params && typeof params.task === 'string') {
      console.log('Task found:', params.task);
      setTaskData(params.task);
    } else {
      console.warn('Task property not found or not a string in params_as_json of task_generator tool call:', params);
    }
  } catch (error) {
    console.error('Failed to parse params_as_json:', taskGeneratingToolCall.params_as_json, error);
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
                    <div className="bg-dark-400 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <BeakerIcon className="h-2 w-2" />
                        <span className="text-sm">Status</span>
                      </div>
                      <p className="text-sm font-semibold text-white capitalize">
                        {data.status}
                      </p>
                    </div>
                    
                    <div className="bg-dark-400 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <ClockIcon className="h-2 w-2" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {formatTime(data.metadata.call_duration_secs)}
                      </p>
                    </div>
                    
                    <div className="bg-dark-400 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <ChatBubbleLeftRightIcon className="h-2 w-2" />
                        <span className="text-sm">Messages</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {data.transcript.length}
                      </p>
                    </div>

                    <div className="bg-dark-400 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <LanguageIcon className="h-2 w-2" />
                        <span className="text-sm">Language</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {data.metadata.main_language || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="bg-dark-400 rounded-lg p-2">
                    <h3 className="text-sm font-medium text-white mb-2">Session Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Started:</span>
                        <span className="ml-2 text-white">
                          {formatDate(data.metadata.start_time_unix_secs)}
                        </span>
                      </div>
                      {data.metadata.cost !== undefined && (
                        <div>
                          <span className="text-gray-400">Credit:</span>
                          <span className="ml-2 text-white">{data.metadata.cost}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Analysis Summary */}
                  {data.analysis && (
                    <div className="bg-dark-400 rounded-lg p-2">
                      <h3 className="text-sm font-medium text-white mb-2">Analysis</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Status:</span>
                          <span className={`text-sm ${
                            data.analysis.call_successful === 'success' 
                              ? 'text-success-500' 
                              : data.analysis.call_successful === 'failure'
                              ? 'text-error-500'
                              : 'text-warning-500'
                          }`}>
                            {data.analysis.call_successful}
                          </span>
                        </div>
                        
                        {/* Transcript Summary */}
                        <div className="bg-dark-surface/50 p-2 rounded">
                          <h4 className="text-sm font-medium text-white mb-1">Transcript Summary</h4>
                          <p className="text-sm text-gray-300">{data.analysis.transcript_summary}</p>
                        </div>

                        {/* Tool Results */}
                        {data.transcript.map((entry, index) => (
                          entry.tool_results && entry.tool_results.length > 0 && (
                            <div key={index} className="bg-dark-surface/50 p-2 rounded mt-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Wrench className="h-2 w-2 text-secondary-600" />
                                <h4 className="text-sm font-medium text-white">Tool Results</h4>
                              </div>
                              <div className="space-y-2">
                                {entry.tool_results.map((tool, toolIndex) => (
                                  <div key={toolIndex} className="border-t border-dark-border pt-2 first:border-t-0 first:pt-0">
                                    <div className="text-sm font-medium text-gray-300">{tool.tool_name}</div>
                                    <div className="text-sm text-gray-400 mt-1">{tool.result_value}</div>
                                    {tool.params_as_json && (
                                      <div className="bg-dark-400/50 p-2 rounded mt-1">
                                        <div className="text-xs text-gray-400">Parameters:</div>
                                        <pre className="text-xs text-gray-300 mt-1 overflow-x-auto">
                                          {JSON.stringify(tool.params_as_json, null, 2)}
                                        </pre>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collapsible Transcript */}
                  <div className="bg-dark-400 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="w-full p-2 flex items-center justify-between text-white hover:bg-dark-500 bg-dark-400 transition-colors"
                    >
                      <span className="text-sm font-medium">Conversation Transcript</span>
                      {showTranscript ? (
                        <ChevronUpIcon className="h-2 w-2" />
                      ) : (
                        <ChevronDownIcon className="h-2 w-2" />
                      )}
                    </button>
                    
                    {showTranscript && (
                      <div className="p-4 space-y-4 border-t border-dark-border">
                        {data.transcript.map((entry, index) => (
                          <div
                            key={index}
                            className={`flex ${
                              entry.role === 'agent' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                entry.role === 'agent'
                                  ? 'bg-primary-500/40 text-white'
                                  : 'bg-dark-surface text-white'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-xs text-gray-400">
                                  {formatTime(entry.time_in_call_secs)}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {entry.source_medium || 'text'}
                                </span>
                              </div>
                              <p className="text-sm">{entry.message}</p>

                              {/* LLM Usage */}
                              {entry.llm_usage?.model_usage && (
                                <div className="mt-2 pt-2 border-t border-dark-border">
                                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                                    <SparklesIcon className="h-2 w-2" />
                                    <span>LLM Usage</span>
                                  </div>
                                  {Object.entries(entry.llm_usage.model_usage).map(([model, usage], idx) => (
                                    <div key={idx} className="text-xs text-gray-300 mt-1">
                                      <div className="text-primary-400">{model}</div>
                                      <div className="grid grid-cols-2 gap-2 mt-0.5">
                                        {usage.input && (
                                          <div>Input: {usage.input.tokens} tokens (${usage.input.price.toFixed(4)})</div>
                                        )}
                                        {usage.output_total && (
                                          <div>Output: {usage.output_total.tokens} tokens (${usage.output_total.price.toFixed(4)})</div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <TranscriptHandler
        isVisible={showTranscriptHandler}
        onClose={() => setShowTranscriptHandler(false)}
        conversationId={conversationId}
        transcript={transcript}
        taskData={taskData || ''}
      />
    </AnimatePresence>
  );
};

export default ConversationAnalysis;