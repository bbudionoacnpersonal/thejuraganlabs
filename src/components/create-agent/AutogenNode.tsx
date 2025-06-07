import React from 'react';
import { Handle, Position } from 'reactflow';
import { ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Bot, Wrench, SquarePen, Users, GitBranch, ArrowRight, Zap, Network, Target, RotateCcw } from 'lucide-react';

interface AutogenNodeProps {
  data: {
    label: string;
    type: 'team' | 'agent';
    teamType?: string; // Enhanced team type support
    model?: string;
    tools?: number;
    toolNames?: string[]; // 🎯 NEW: Array of actual tool names
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

// Enhanced team type information with new types
const getTeamTypeInfo = (teamType?: string) => {
  if (!teamType) return { 
    icon: Users, 
    color: 'text-gray-500', 
    bgColor: 'bg-gray-100',
    label: 'Team',
    description: 'AI agents team'
  };
  
  const type = teamType.toLowerCase();
  
  // RoundRobinGroupChat (Default)
  if (type.includes('roundrobin')) {
    return { 
      icon: RotateCcw, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      label: 'Round Robin',
      description: 'Agents take turns in sequence'
    };
  }
  
  // SelectorGroupChat
  if (type.includes('selector')) {
    return { 
      icon: Target, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      label: 'Selector',
      description: 'LLM selects next speaker dynamically'
    };
  }
  
  // MagenticOneGroupChat
  if (type.includes('magneticone') || type.includes('magenticone')) {
    return { 
      icon: Zap, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50',
      label: 'Magnetic One',
      description: 'Generalist multi-agent for web/file tasks'
    };
  }
  
  // Swarm
  if (type.includes('swarm')) {
    return { 
      icon: Network, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      label: 'Swarm',
      description: 'HandoffMessage for explicit transitions'
    };
  }
  
  // GraphFlow
  if (type.includes('graphflow') || type.includes('graph')) {
    return { 
      icon: GitBranch, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50',
      label: 'Graph Flow',
      description: 'Complex workflows with branches & loops'
    };
  }
  
  // Legacy team types for backward compatibility
  if (type.includes('hierarchical')) {
    return { 
      icon: GitBranch, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      label: 'Hierarchical',
      description: 'Manager delegates to subordinates'
    };
  }
  
  if (type.includes('cascading')) {
    return { 
      icon: ArrowRight, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50',
      label: 'Cascading',
      description: 'Try agents in sequence until success'
    };
  }
  
  // Default fallback
  return { 
    icon: Users, 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-50',
    label: 'Custom',
    description: 'Custom team configuration'
  };
};

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
              <span className="text-[9px] text-green-600">{data.tools || 0} Tools</span>
            </div>
            {/* 🎯 FIXED: Display actual tool names instead of hardcoded "calculator" */}
            {data.toolNames && data.toolNames.length > 0 ? (
              <div className="mt-1 space-y-1">
                {data.toolNames.slice(0, 2).map((toolName, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <Wrench className="w-2 h-2 text-gray-500" />
                    <span className="text-[10px] text-gray-700">{toolName}</span>
                  </div>
                ))}
                {data.toolNames.length > 2 && (
                  <div className="text-[9px] text-gray-500 ml-3">
                    +{data.toolNames.length - 2} more tools
                  </div>
                )}
              </div>
            ) : data.tools && data.tools > 0 ? (
              <div className="mt-1 flex items-center gap-1.5">
                <Wrench className="w-2 h-2 text-gray-500" />
                <span className="text-[10px] text-gray-700">{data.tools} tool{data.tools > 1 ? 's' : ''}</span>
              </div>
            ) : null}
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

  // Team node with enhanced team type information
  const teamTypeInfo = getTeamTypeInfo(data.teamType);
  const TeamTypeIcon = teamTypeInfo.icon;

  return (
    <>
      <div className="bg-white rounded-md border border-gray-200 w-[240px]">
        {/* Header with team type */}
        <div className="p-2 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold text-gray-900">{data.label}</span>
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
          
          {/* Enhanced Team Type Badge */}
          <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${teamTypeInfo.bgColor} mb-2`}>
            <TeamTypeIcon className={`w-3 h-3 ${teamTypeInfo.color}`} />
            <div className="flex-1">
              <span className={`text-[10px] font-semibold ${teamTypeInfo.color} block`}>
                {teamTypeInfo.label}
              </span>
              <span className="text-[8px] text-gray-600 leading-tight">
                {teamTypeInfo.description}
              </span>
            </div>
          </div>
          
          {data.type === 'team' && (
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] text-gray-700">Coordination:</span>
              <span className="px-1.5 py-0.5 text-[9px] bg-green-50 text-green-700 rounded">
                {data.agents?.length || 0} Agent{(data.agents?.length || 0) !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
        
        {data.description && (
          <div className="p-2 text-[9px] text-gray-600 border-b border-gray-100">
            {data.description}
          </div>
        )}

        <div className="px-2 py-1.5">
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
      
        <div className="px-2 py-1.5">
          <div className="text-[9px] font-medium text-gray-500 uppercase">
            AGENTS ({data.agents?.length || 0})
          </div>
          {data.agents?.map((agent, index) => (
            <div key={index} className="mt-1">
              <div className="flex items-center gap-1.5">
                <Bot className="w-2 h-2 text-gray-500" />
                <span className="text-[10px] font-medium text-gray-700">{agent.name}</span>
              </div>
            </div>
          ))}
          <div className="mt-1.5 border border-dashed border-gray-200 rounded p-1.5 text-[9px] text-gray-400">
            Drop agents here
          </div>
        </div>
      
        <div className="px-2 py-1.5 border-t border-gray-100">
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