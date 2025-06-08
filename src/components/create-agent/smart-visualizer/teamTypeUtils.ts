import { Users, Zap, Network, Target, RotateCcw, GitBranch, ArrowRight, Podcast as Broadcast, Bot } from 'lucide-react';
import { TeamTypeInfo } from './types';

// Enhanced team type information with new types
export const getTeamTypeInfo = (teamType?: string): TeamTypeInfo => {
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
  
  if (type.includes('broadcast')) {
    return { 
      icon: Broadcast, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      label: 'Broadcast',
      description: 'All agents receive same message'
    };
  }
  
  if (type.includes('concurrent')) {
    return { 
      icon: Users, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50',
      label: 'Concurrent',
      description: 'Agents work in parallel'
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

const formatTeamTypeName = (teamType: string): string => {
  return teamType
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
    .replace(/Group Chat$/, 'Group')
    .replace(/Chat$/, '')
    .trim();
};