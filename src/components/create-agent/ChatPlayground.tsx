import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Split from 'react-split';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { teamStructure } from '@/mockdata/teamStructure';
import Tooltip from '@/components/ui/Tooltip';
import { mockMessages, mockVersions, generateVersionResponse } from '@/mockdata/playMessages';
import { 
  XMarkIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Coins } from 'lucide-react';
import FlowVisualizer from './FlowVisualizer';
import LLMDetailsModal from './LLMDetailsModal';
import { Message, StepDetail } from '@/types';

interface ChatPlaygroundProps {
  isVisible: boolean;
  onClose: () => void;
}

// Assuming the structure of a step from generateVersionResponse might look like this:
// This is for clarity; TypeScript will infer it, but the fix handles the variations.
type InputStep = {
  agent: string;
  agent_type?: string; // Optional
  type?: string;       // Optional alternative
  version: number | string; // Source might be number
  content: string;
  tokens: number;
  duration: number;
  timestamp: number;
  llmDetails: any; // Replace 'any' with a proper type if available
  toolCalls: any[];  // Replace 'any' with a proper type if available
};


const generateSessionId = () => {
  return uuidv4();
};

const ChatPlayground: React.FC<ChatPlaygroundProps> = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [prompt, setPrompt] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [selectedCurrentVersion, setSelectedCurrentVersion] = useState('v1.1.0');
  const [selectedPrevVersion, setSelectedPrevVersion] = useState('v1.0.0');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, Record<string, boolean>>>({});
  const [selectedLLMDetails, setSelectedLLMDetails] = useState<any>(null);
  const [sessionId] = useState(generateSessionId());
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const messagesEndRefLeft = useRef<HTMLDivElement>(null);
  const messagesEndRefRight = useRef<HTMLDivElement>(null);

  const handleCopySessionId = async () => {
    try {
      await navigator.clipboard.writeText(sessionId);
      setShowCopiedTooltip(true);
      setTimeout(() => setShowCopiedTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy session ID:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRefLeft.current?.scrollIntoView({ behavior: "smooth" });
    if (isComparing) {
      messagesEndRefRight.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isComparing]);

  const toggleSteps = (messageId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const toggleSection = (messageId: string, stepIndex: number, section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [`${messageId}-${stepIndex}`]: {
        ...prev[`${messageId}-${stepIndex}`],
        [section]: !prev[`${messageId}-${stepIndex}`]?.[section]
      }
    }));
  };

  const handleSendMessage = () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: prompt,
      timestamp: Date.now(),
      tokens: Math.floor(prompt.length * 1.3),
      cost: Math.random() * 0.01,
      version: selectedCurrentVersion
    };

    if (isComparing) {
      const currentUserMessage = { ...userMessage };
      const prevUserMessage = { 
        ...userMessage, 
        id: uuidv4(),
        version: selectedPrevVersion 
      };
      setMessages([...messages, currentUserMessage, prevUserMessage]);
    } else {
      setMessages([...messages, userMessage]);
    }
    
    setPrompt('');

    setTimeout(() => {
      const startTime = Date.now();
      
      const currentVersionResponse = generateVersionResponse(prompt, selectedCurrentVersion, startTime);
      
      const mapInputStepToMessageStep = (inputStep: InputStep): StepDetail => {
        let determinedAgentType = '';
        if ('agent_type' in inputStep && typeof inputStep.agent_type === 'string' && inputStep.agent_type) {
          determinedAgentType = inputStep.agent_type;
        } else if ('type' in inputStep && typeof inputStep.type === 'string' && inputStep.type) {
          determinedAgentType = inputStep.type;
        }
        return {
          agent: inputStep.agent,
          agent_type: determinedAgentType,
          version: String(inputStep.version), // Ensure version is string
          content: inputStep.content,
          tokens: inputStep.tokens,
          duration: inputStep.duration,
          timestamp: inputStep.timestamp,
          llmDetails: inputStep.llmDetails, // Assuming llmDetails structure matches
          toolCalls: inputStep.toolCalls   // Assuming toolCalls structure matches
        };
      };

      const currentResponse: Message = {
        id: uuidv4(),
        role: 'assistant',
        version: selectedCurrentVersion,
        content: 'Processing complete', 
        timestamp: startTime,
        tokens: currentVersionResponse.steps.reduce((sum, step) => sum + step.tokens, 0) + currentVersionResponse.finalResponse.tokens,
        cost: 0.015, 
        duration: currentVersionResponse.steps.reduce((sum, step) => sum + step.duration, 0) + currentVersionResponse.finalResponse.duration,
        steps: currentVersionResponse.steps.map(mapInputStepToMessageStep),
        finalResponse: currentVersionResponse.finalResponse
      };

      if (isComparing) {
        const prevVersionResponse = generateVersionResponse(prompt, selectedPrevVersion, startTime);
        const prevResponse: Message = {
          id: uuidv4(),
          role: 'assistant',
          version: selectedPrevVersion,
          content: 'Legacy processing complete',
          timestamp: startTime,
          tokens: prevVersionResponse.steps.reduce((sum, step) => sum + step.tokens, 0) + prevVersionResponse.finalResponse.tokens,
          cost: 0.02,
          duration: prevVersionResponse.steps.reduce((sum, step) => sum + step.duration, 0) + prevVersionResponse.finalResponse.duration,
          steps: prevVersionResponse.steps.map(mapInputStepToMessageStep),
          finalResponse: prevVersionResponse.finalResponse
        };
        setMessages(prev => [...prev, currentResponse, prevResponse]);
      } else {
        setMessages(prev => [...prev, currentResponse]);
      }
    }, 1000);
  };

  const getWindowStats = (version: string) => {
    const windowMessages = messages.filter(m => m.version === version);
    const tokens = windowMessages.reduce((sum, m) => sum + (m.tokens || 0), 0);
    const cost = windowMessages.reduce((sum, m) => sum + (m.cost || 0), 0);
    return { messages: windowMessages.length, tokens, cost };
  };

  const renderAgentBubble = (agent: string) => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-400 flex items-center justify-center">
      <span className="text-white text-sm font-bold">
        {agent.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );

  const formatDuration = (ms: number) => {
    if (typeof ms !== 'number' || isNaN(ms)) return '0.0s';
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const renderMessage = (message: Message) => (
    <div key={message.id} className="space-y-2">
      <div className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'} gap-2`}> {/* Reduced gap */}
        {message.role === 'user' && (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
        )}
        
        <div className="w-full max-w-2xl">
          {message.role === 'assistant' ? (
            <div className="space-y-1">
              {/* Final Response */}
              {message.finalResponse && (
                <div className="bg-dark-400 rounded-lg p-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-2">
                      <span>{new Date(message.finalResponse.timestamp).toLocaleTimeString()}</span>
                      <div className="flex items-center gap-1"> 
                        <Coins className="h-3 w-3 text-gray-400" /> 
                        <span>{message.finalResponse.tokens} tokens (${(message.cost || 0).toFixed(4)})</span>
                      </div>
                    </div>
                    <span>{formatDuration(message.finalResponse.duration)}</span>
                  </div>
                  <p className="text-sm text-white">{message.finalResponse.content}</p>
                </div>
              )}

              {/* Agent Steps */}
              {message.steps && message.steps.length > 0 && (
                <div className="bg-dark-surface rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSteps(message.id)}
                    className="w-full flex items-center justify-between p-1 hover:bg-dark-400/50 transition-colors"
                  >
                    <span className="text-xs text-gray-400">Agent Workflow ({message.steps.length} steps)</span> 
                    {expandedSteps[message.id] ? (
                      <ChevronUpIcon className="h-3 w-3 text-gray-400" /> 
                    ) : (
                      <ChevronDownIcon className="h-3 w-3 text-gray-400" /> 
                    )}
                  </button>

                  {expandedSteps[message.id] && (
                    <div className="p-2 space-y-1 bg-dark-background/50 max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-dark-surface">
                      {message.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2"> 
                          {renderAgentBubble(step.agent)}
                          <div className="flex-1 bg-dark-border/50 rounded-lg p-2">
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                              <div className="flex items-center gap-2">
                                <span>{new Date(step.timestamp).toLocaleTimeString()}</span>
                                <div className="flex items-center gap-1"> 
                                  <Coins className="h-3 w-3 text-gray-400" />
                                  <span>{step.tokens} tokens</span>
                                </div>
                              </div>
                              <span>{formatDuration(step.duration)}</span>
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-300 font-medium">{step.agent}</span> 
                                <span className="text-xs text-gray-500">
                                  {(step.agent_type || step.type) && `(${step.agent_type || step.type}) `}v{step.version}
                                </span>
                              </div>
                              <p className="text-sm text-white">{step.content}</p>

                              {/* LLM Call Details */}
                              {step.llmDetails && (
                                <div className="mt-2">
                                  <button
                                    onClick={() => toggleSection(message.id, stepIndex, 'llm')}
                                    className="flex items-center gap-1 w-full text-left rounded-tl-lg rounded-tr-lg py-0.5 px-1 border-t border-gray-700 hover:bg-dark-400/30" // Adjusted styles
                                  >
                                    <SparklesIcon className="h-3 w-3 text-gray-500" /> 
                                    <span className="text-xs w-full text-gray-500">LLM Call</span> 
                                    {expandedSections[`${message.id}-${stepIndex}`]?.llm ? (
                                      <ChevronUpIcon className="h-3 w-3 text-gray-500" />
                                    ) : (
                                      <ChevronDownIcon className="h-3 w-3 text-gray-500" />
                                    )}
                                  </button>
                                  {expandedSections[`${message.id}-${stepIndex}`]?.llm && (
                                    <div className="bg-dark-surface/50 p-1.5 text-xs space-y-0.5 text-gray-400"> 
                                      <div>Duration: {formatDuration(step.llmDetails.duration)}</div>
                                      <div>Model: {step.llmDetails.model}</div>
                                      <div>Input: {step.llmDetails.promptTokens} tokens</div>
                                      <div>Output: {step.llmDetails.completionTokens} tokens</div>
                                      <div>Total: {step.llmDetails.totalTokens} tokens</div>
                                      <Button    
                                        variant="ghost"
                                        size="xs"
                                        onClick={() => setSelectedLLMDetails(step.llmDetails)} 
                                        className="w-full mt-1 py-0.5 border border-dark-border text-gray-400 hover:bg-dark-border" // Adjusted styles
                                      >
                                        Details
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Tool Functions & Results */}
                              {step.toolCalls && step.toolCalls.length > 0 && (
                                <div className="mt-2">
                                  <button
                                    onClick={() => toggleSection(message.id, stepIndex, 'tools')}
                                    className="flex items-center gap-1 w-full text-left py-0.5 px-1 border-t border-gray-700 hover:bg-dark-400/30" // Adjusted styles
                                  >
                                    <CodeBracketIcon className="h-3 w-3 text-gray-500" /> 
                                    <span className="text-xs w-full text-gray-500">Tool Calls ({step.toolCalls.length})</span> 
                                    {expandedSections[`${message.id}-${stepIndex}`]?.tools ? (
                                      <ChevronUpIcon className="h-3 w-3 text-gray-500" />
                                    ) : (
                                      <ChevronDownIcon className="h-3 w-3 text-gray-500" />
                                    )}
                                  </button>
                                  {expandedSections[`${message.id}-${stepIndex}`]?.tools && (
                                    <div className="space-y-1.5 mt-1"> 
                                      {step.toolCalls.map((call, idx) => (
                                        <div key={idx} className="bg-dark-surface/50 p-1.5 text-xs space-y-0.5 text-gray-400 rounded"> 
                                          <div>Tool: <span className="text-gray-300">{call.name}</span></div>
                                          <div>Duration: {formatDuration(call.duration)}</div>
                                          <div className="truncate">Input: <span className="text-gray-300">{JSON.stringify(call.input)}</span></div>
                                          {call.code && <div>Code: <span className="text-gray-300">{call.code}</span></div>}
                                          <div className="truncate">Output: <span className="text-gray-300">{JSON.stringify(call.output)}</span></div>
                                          
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : ( // User message
            <div className="rounded-lg p-2 bg-dark-400">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
            </div>
          )}
        </div>
        
        {message.role === 'assistant' && (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-400 flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderChatWindow = (version: string, isPrevious: boolean = false) => {
    const stats = getWindowStats(version);
    
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-dark-background"> 
      
        <div className="p-2 border-b border-l border-dark-border bg-dark-surface/50"> 
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-400"> 
              <div className="flex items-center gap-1"> 
                <Coins className="h-3 w-3 text-gray-400" />
                <span>{stats.tokens} tokens</span>
              </div>
              <div className="flex items-center gap-1">
                <span>${stats.cost.toFixed(4)} cost</span>
              </div>
            </div>
            
            <div className="w-auto"> 
              <Select
                value={isPrevious ? selectedPrevVersion : selectedCurrentVersion}
                options={mockVersions}
                onChange={(value) => isPrevious ? setSelectedPrevVersion(value as string) : setSelectedCurrentVersion(value as string)}
                selectClassName="text-xs border-dark-border/50 hover:bg-dark-border focus:ring-secondary-600" 
                size="sm"
              />
            </div>
          </div>
        </div>
          
      
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-dark-surface p-2"> 
          <div className="flex flex-col space-y-3"> 
            {messages
              .filter(m => m.version === version)
              .map(renderMessage)}
            <div ref={isPrevious ? messagesEndRefRight : messagesEndRefLeft} />
          </div>
        </div>
      </div>
    );
  };


return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="chat-playground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 w-[90%] max-w-[1600px] h-screen bg-dark-surface border-l border-dark-border shadow-xl flex flex-col" // Added max-w, removed rounded-l-xl
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-dark-border"> {/* Adjusted padding */}
              <div>
                <h2 className="text-lg font-semibold text-white">{teamStructure.label}</h2> {/* Adjusted size */}
                <p className="text-xs text-gray-400">{teamStructure.description}</p> {/* Adjusted size */}
                <div className="flex items-center gap-2 py-1">
                  <span className="text-xs text-gray-500">Session ID:</span>
                  <code className="text-xs bg-dark-background px-1.5 py-0.5 rounded text-gray-300">{sessionId}</code> {/* Adjusted padding */}
                  <Tooltip content={showCopiedTooltip ? 'Copied!' : 'Copy ID'}> {/* Adjusted text */}
                    <button
                      onClick={handleCopySessionId}
                      className="text-gray-400 hover:text-white transition-colors p-0.5" // Added padding
                    >
                      {showCopiedTooltip ? (
                        <CheckIcon className="h-3 w-3 text-success-500" /> 
                      ) : (
                        <DocumentDuplicateIcon className="h-3 w-3" /> 
                      )}
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-dark-border text-xs" // Adjusted text size
                  onClick={() => setIsComparing(!isComparing)}
                >
                  {isComparing ? 'Hide Comparison' : 'Compare Versions'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-1.5" // Adjusted padding for square button
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* FlowVisualizer - fixed width */}
              <div className="w-[28%] min-w-[300px] border-r border-dark-border overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-dark-surface"> {/* Adjusted width & scrolling */}
                <FlowVisualizer 
                  messages={messages.filter(m => m.version === selectedCurrentVersion)}
                />
              </div>
            
              {/* Chats - remaining width */}
              <div className="flex-1 flex flex-col bg-dark-background/50"> {/* Renamed from w-3/4 */}
                <div className="flex-1 flex overflow-hidden"> {/* Added flex here */}
                  {isComparing ? (
                    <Split
                      sizes={[50, 50]}
                      minSize={100} // Min size for each pane
                      gutterSize={6} // Reduced gutter size
                      gutterStyle={() => ({
                        backgroundColor: '#2D3748', // Darker gutter
                        cursor: 'col-resize'
                      })}
                      className="flex w-full h-full"
                    >
                      {renderChatWindow(selectedCurrentVersion)}
                      {renderChatWindow(selectedPrevVersion, true)}
                    </Split>
                  ) : (
                    <div className="w-full h-full flex"> {/* Added flex for single window to fill */}
                      {renderChatWindow(selectedCurrentVersion)}
                    </div>
                  )}
                </div>
              
                {/* Input Area */}
                <div className="p-3 border-t border-dark-border bg-dark-surface"> {/* Matched header bg */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Type your message to the AI team..." // More specific placeholder
                      className="flex-1 bg-dark-background border border-dark-border rounded text-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-secondary-600" // Adjusted placeholder color
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="md" // Slightly larger button
                      onClick={handleSendMessage} 
                      className="bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-600 text-sm" // Darker hover
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <LLMDetailsModal
        isVisible={!!selectedLLMDetails}
        onClose={() => setSelectedLLMDetails(null)}
        details={selectedLLMDetails || { /* Default empty details */
          call_id: '', system_message: '', user_message: '', response: '',
          model: '', promptTokens: 0, completionTokens: 0, totalTokens: 0, duration: 0
        }}
      />
    </AnimatePresence>
  );
};

export default ChatPlayground;