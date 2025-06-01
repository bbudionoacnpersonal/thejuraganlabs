import React from 'react';
import { Handle, Position } from 'reactflow';
import { UserIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Bot, Wrench } from 'lucide-react';

interface PlayMsgNodeProps {
  data: {
    type: 'user' | 'agent' | 'step' | 'final';
    content: string;
    agent?: string;
    agent_type?: string;
    version?: string;
    tokens?: number;
    duration?: number;
    timestamp?: number;
    tools?: any[];
    llmDetails?: any;
  };
}

const PlayMsgNode: React.FC<PlayMsgNodeProps> = ({ data }) => {
  const formatDuration = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  if (data.type === 'user') {
    return (
      <>
        <div className="bg-white rounded-md border border-gray-200 w-[200px]">
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <UserIcon className="w-2 h-2 text-secondary-600" />
                <span className="text-[11px] font-medium text-secondary-600">User Input</span>
              </div>
            </div>
            <p className="mt-1 text-[9px] text-gray-600 line-clamp-2">
              {data.content}
            </p>
          </div>
        </div>
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
      </>
    );
  }

  if (data.type === 'step') {
    return (
      <>
        <Handle 
          type="target" 
          position={Position.Top} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
        <div className="bg-white rounded-md border border-gray-200 w-[200px]">
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Bot className="w-2 h-2 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-900">{data.agent}</span>
              </div>
              <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                v{data.version}
              </span>
            </div>
            <p className="mt-1 text-[9px] text-gray-600 line-clamp-2">
              {data.content}
            </p>
          </div>

          <div className="px-2 py-1 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-gray-500">DETAILS</span>
            </div>
            <div className="mt-1 space-y-1">
              {data.llmDetails && (
                <div className="flex items-center gap-1.5">
                  <SparklesIcon className="w-2 h-2 text-gray-500" />
                  <span className="text-[10px] text-gray-700">
                    {data.llmDetails.model} ({data.llmDetails.totalTokens} tokens)
                  </span>
                </div>
              )}
              {data.tools && data.tools.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-2 h-2 text-gray-500" />
                  <span className="text-[10px] text-gray-700">
                    {data.tools.length} tools used
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <ClockIcon className="w-2 h-2 text-gray-500" />
                <span className="text-[10px] text-gray-700">
                  {formatDuration(data.duration || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
      </>
    );
  }

  if (data.type === 'final') {
    return (
      <>
        <Handle 
          type="target" 
          position={Position.Top} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
        <div className="bg-white rounded-md border border-gray-200 w-[200px]">
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Bot className="w-2 h-2 text-secondary-600 items-center" />
                <span className="text-[11px] font-medium text-secondary-600">Final Response</span>
              </div>
            </div>
            <p className="text-[9px] text-gray-600">
              {data.content}
            </p>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-[9px] text-gray-500">
                <div className="flex items-center gap-1">
                  <SparklesIcon className="w-2 h-2" />
                  <span>{data.tokens} tokens</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-2 h-2" />
                  <span>{formatDuration(data.duration || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default PlayMsgNode;