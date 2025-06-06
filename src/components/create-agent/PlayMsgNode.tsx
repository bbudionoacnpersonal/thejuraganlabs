import React from 'react';
import { Handle, Position } from 'reactflow';
import { UserIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Bot, Wrench, Users, GitBranch, ArrowRight, Zap, Network, Target, RotateCcw } from 'lucide-react';

interface PlayMsgNodeProps {
  data: {
    type: 'user' | 'agent' | 'step' | 'final' | 'team';
    content: string;
    agent?: string;
    agent_type?: string;
    version?: string;
    tokens?: number;
    duration?: number;
    timestamp?: number;
    tools?: any[];
    llmDetails?: any;
    // Team-specific properties
    teamType?: string;
    label?: string;
    description?: string;
    agents?: Array<{
      name: string;
      type: string;
    }>;
  };
}

// Enhanced team type information with icons and colors
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
  
  // Single agent
  if (type.includes('single')) {
    return { 
      icon: Bot, 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-50',
      label: 'Single Agent',
      description: 'Single agent processing'
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

const formatDuration = (ms: number) => {
  if (typeof ms !== 'number' || isNaN(ms)) return '0.0s';
  return `${(ms / 1000).toFixed(1)}s`;
};

const PlayMsgNode: React.FC<PlayMsgNodeProps> = ({ data }) => {
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

  if (data.type === 'team') {
    const teamTypeInfo = getTeamTypeInfo(data.teamType);
    const TeamTypeIcon = teamTypeInfo.icon;

    return (
      <>
        <Handle 
          type="target" 
          position={Position.Top} 
          className="!bg-[#4D9CFF] !w-1 !h-1 !min-w-[4px] !min-h-[4px]" 
        />
        <div className="bg-white rounded-md border border-gray-200 w-[240px]">
          {/* Header with team type */}
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-gray-900">{data.label || 'AI Team'}</span>
              <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">team</span>
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
            
            {/* Team Description */}
            {data.description && (
              <p className="text-[9px] text-gray-600 mb-2">
                {data.description}
              </p>
            )}
            
            {/* Agent Count */}
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] text-gray-700">Coordination:</span>
              <span className="px-1.5 py-0.5 text-[9px] bg-green-50 text-green-700 rounded">
                {data.agents?.length || 0} Agent{(data.agents?.length || 0) !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="px-2 py-1.5 border-t border-gray-100">
            <div className="flex items-center justify-between text-[9px] text-gray-500 mb-1">
              <div className="flex items-center gap-1">
                <SparklesIcon className="w-2 h-2" />
                <span>{data.tokens || 0} tokens</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-2 h-2" />
                <span>{formatDuration(data.duration || 0)}</span>
              </div>
            </div>
            
            {/* Agent List */}
            {data.agents && data.agents.length > 0 && (
              <div className="mt-2">
                <div className="text-[9px] font-medium text-gray-500 uppercase mb-1">
                  AGENTS ({data.agents.length})
                </div>
                <div className="space-y-1 max-h-[60px] overflow-y-auto">
                  {data.agents.slice(0, 3).map((agent, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Bot className="w-2 h-2 text-gray-500" />
                      <span className="text-[9px] text-gray-700 truncate">{agent.name}</span>
                    </div>
                  ))}
                  {data.agents.length > 3 && (
                    <div className="text-[8px] text-gray-500">
                      +{data.agents.length - 3} more agents
                    </div>
                  )}
                </div>
              </div>
            )}
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