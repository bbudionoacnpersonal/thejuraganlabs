import React from 'react';
import { Handle, Position } from 'reactflow';
import { ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Bot, Wrench, SquarePen } from 'lucide-react';

interface AutogenNodeProps {
  data: {
    label: string;
    type: 'team' | 'agent';
    model?: string;
    tools?: number;
    description?: string;
    agents?: { 
      name: string;
      description?: string;
      model?: {
        name: string;
        provider: string;
      };
      tools?: {
        name: string;
        description: string;
      }[];
    }[];
    terminations?: { name: string }[];
    onEdit?: (nodeData: any) => void;
  };
}

const AutogenNode: React.FC<AutogenNodeProps> = ({ data }) => {
  const handleNodeEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onEdit) {
      data.onEdit(data);
    }
  };

  if (data.type === 'agent') {
    return (
      <>
        <div className="bg-white rounded-md border border-gray-200 w-[200px]">
          <div className="p-1.5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Bot className="w-2 h-2 text-gray-500" />
                <span className="text-[11px] font-medium text-gray-900">{data.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">agent</span>
                <button 
                  onClick={handleNodeEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SquarePen className="h-2 w-2" />
                </button>
              </div>
            </div>
            <p className="mt-1 text-[9px] text-gray-600">
              {data.description || 'An agent that provides assistance with tool use.'}
            </p>
          </div>

          <div className="px-1.5 py-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-gray-500 uppercase">MODEL</span>
              <span className="text-[9px] text-green-600">{data.model && data.model.length > 0 ? 1 : 0} Model</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <SparklesIcon className="w-2 h-2 text-gray-500" />
              <span className="text-[10px] text-gray-700">{data.model || `-`}</span>
            </div>
            <div className="mt-1.5 border border-dashed border-gray-200 rounded p-1.5 text-[9px] text-gray-400">
              Drop model here
            </div>
          </div>

          <div className="px-1.5 py-1 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-gray-500 uppercase">TOOLS</span>
              <span className="text-[9px] text-green-600">{data.tools} Tools</span>
            </div>
            {data.tools && data.tools > 0 && (
              <div className="mt-1 flex items-center gap-1.5">
                <Wrench className="w-2 h-2 text-gray-500" />
                <span className="text-[10px] text-gray-700">calculator</span>
              </div>
            )}
            <div className="mt-1.5 border border-dashed border-gray-200 rounded p-1.5 text-[9px] text-gray-400">
              Drop tools here
            </div>
          </div>
        </div>

        <Handle 
          type="target" 
          position={Position.Top} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-md border border-gray-200 w-[200px]">
        <div className="p-1.5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-gray-900">{data.label}</span>
            <div className="flex items-center gap-2"> 
              <span className="text-[9px] text-gray-500">{data.type}</span>
              <button 
                onClick={handleNodeEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <SquarePen className="h-2 w-2" />
              </button>
            </div>
          </div>
          
          {data.type === 'team' && (
            <div className="mt-0.5 flex items-center gap-1">
              <span className="text-[10px] text-gray-700">Model:</span>
              <span className="px-1 py-0.5 text-[9px] bg-green-50 text-green-700 rounded">
                {data.agents?.length || 0} Agent{(data.agents?.length || 0) !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
        
        {data.description && (
          <div className="p-1.5 text-[9px] text-gray-600">
            {data.description}
          </div>
        )}

        <div className="px-1.5 py-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium text-gray-500 uppercase">MODEL</span>
            <span className="text-[9px] text-green-600">{data.model && data.model.length > 0 ? 1 : 0} Model</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <SparklesIcon className="w-2 h-2 text-gray-500" />
            <span className="text-[10px] text-gray-700">{data.model || `-`}</span>
          </div>
          <div className="mt-1.5 border border-dashed border-gray-200 rounded p-1.5 text-[9px] text-gray-400">
            Drop model here
          </div>
        </div>
      
        <div className="px-1.5 py-1">
          <div className="text-[9px] font-medium text-gray-500 uppercase">
            AGENTS ({data.agents?.length || 0})
          </div>
          {data.agents?.map((agent, index) => (
            <div key={index} className="mt-2">
              <div className="flex items-center gap-1.5">
                <Bot className="w-2 h-2 text-gray-500" />
                <span className="text-[10px] font-medium text-gray-700">{agent.name}</span>
              </div>
              {agent.description && (
                <p className="ml-4 mt-0.5 text-[9px] text-gray-500">{agent.description}</p>
              )}
              {agent.model && (
                <div className="ml-4 mt-0.5 flex items-center gap-1">
                  <SparklesIcon className="w-2 h-2 text-gray-500" />
                  <span className="text-[9px] text-gray-600">{agent.model.name}</span>
                </div>
              )}
              {agent.tools && agent.tools.length > 0 && (
                <div className="ml-4 mt-0.5 flex items-center gap-1">
                  <Wrench className="w-2 h-2 text-gray-500" />
                  <span className="text-[9px] text-gray-600">{agent.tools.length} tools</span>
                </div>
              )}
            </div>
          ))}
          <div className="mt-1.5 border border-dashed border-gray-200 rounded p-1.5 text-[9px] text-gray-400">
            Drop agents here
          </div>
        </div>
      
        <div className="px-1.5 py-1 border-t border-gray-100">
          <div className="text-[9px] font-medium text-gray-500 uppercase">
            TERMINATIONS
          </div>
          {data.terminations?.map((termination, index) => (
            <div key={index} className="mt-0.5 flex items-center gap-1.5">
              <ClockIcon className="w-2 h-2 text-gray-500" />
              <span className="text-[10px] text-gray-700">{termination.name}</span>
            </div>
          ))}
          <div className="mt-1.5 border border-dashed border-gray-200 rounded p-1.5 text-[9px] text-gray-400">
            Drop termination here
          </div>
        </div>
      </div>

      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
      />
    </>
  );
};

export default AutogenNode;