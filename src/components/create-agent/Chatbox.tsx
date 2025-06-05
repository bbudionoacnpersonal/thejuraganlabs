import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react';
import Tooltip from '@/components/ui/Tooltip';
import VoiceSDKOverlay from './VoiceSDKOverlay';
import {
  SparklesIcon,
  LinkIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import { ChatboxHandle, Message } from '@/types';

interface ChatboxProps {
  expanded?: boolean;
  onVoiceStart: () => void;
  prompt: string;
  setPrompt: (val: string) => void;
  isRecording?: boolean;
  setIsRecording?: (val: boolean) => void;
}

const Chatbox = forwardRef<ChatboxHandle, ChatboxProps>(({
  onVoiceStart,
  prompt,
  setPrompt,
}, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const micButtonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    triggerMicClick: () => {
      micButtonRef.current?.click();
    }
  }));

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { 
      id: Math.random().toString(),
      role: 'user', 
      content: prompt,
      timestamp: Date.now()
    }]);
    setMessages(prev => [...prev, {
      id: Math.random().toString(),
      role: 'assistant',
      content: "At this moment Juragan Labs only supports Voice Assistant in Bahasa. Please click the microphone button to interact.",
      timestamp: Date.now()
    }]);

    setPrompt('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
    }
  };

  const handleVoiceClick = () => {
    setShowVoiceOverlay(true);
    onVoiceStart();
  };

  const handleVoiceMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-full bg-dark-background border-l border-t border-b border-dark-border/60 rounded-l-lg">
      <div className="flex-1 overflow-y-auto mt-2 space-y-2 px-2 max-h-[calc(100vh-290px)] min-h-[calc(100vh-290px)] scrollbar-hidden relative">
        {/* Glass effect overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-dark-background via-dark-background/40 to-transparent backdrop-blur-sm pointer-events-none z-10" />
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-end' : ''}`}>
            <div className={`w-full p-2 rounded-lg text-sm ${
              message.role === 'assistant'
                ? 'bg-dark-border/50 text-white'
                : 'bg-dark-border/50 text-white'
            }`}>
              <div className="flex items-start gap-2">
                {message.role === 'user' && (
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-secondary-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">U</span>
                  </div>
                )}
                <p className="whitespace-pre-line leading-relaxed flex-1">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-2 pt-2 pb-1 mt-auto backdrop-blur-md bg-dark-surface/30 to-transparent backdrop-blur-sm ">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={handleTextareaChange}
            placeholder="Ask me ya Gan..."
            rows={1}
            className="w-full bg-dark-surface/50 backdrop-blur-sm rounded-md py-1 pl-2 pr-16 pb-10 text-sm text-white placeholder-gray-400 focus:outline-none border border-dark-border focus:ring-1 focus:ring-secondary-600 resize-none min-h-[100px] max-h-[100px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-2/3 flex gap-2">
            <button
              ref={micButtonRef}
              type="button"
              onClick={handleVoiceClick}
              className="p-2 rounded-md text-gray-300 bg-secondary-600 hover:bg-primary-600 transition-colors"
            >
              <MicrophoneIcon className="h-3 w-3" />
            </button>
          </div>
          <div className="absolute left-2 bottom-1 flex items-center gap-2">
            <Tooltip content="Upload file">
              <button type="button" className="text-gray-400 hover:text-white">
                <LinkIcon className="h-2 w-2" />
              </button>
            </Tooltip>
            <Tooltip content="Enhance prompt with AI">
              <button type="button" className="text-gray-400 hover:text-white">
                <SparklesIcon className="h-2 w-2" />
              </button>
            </Tooltip>
            <Tooltip content="Start a discussion thread">
              <button type="button" className="text-gray-400 hover:text-white">
                <ChatBubbleLeftRightIcon className="h-2 w-2" />
              </button>
            </Tooltip>
          </div>
        </form>
      </div>

      <VoiceSDKOverlay
        isVisible={showVoiceOverlay}
        onClose={() => setShowVoiceOverlay(false)}
        onMessage={handleVoiceMessage}
      />
    </div>
  );
});

Chatbox.displayName = 'Chatbox';

export default Chatbox;