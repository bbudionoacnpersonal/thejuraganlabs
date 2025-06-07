import React, { useState } from 'react'; import { SparklesIcon } from '@heroicons/react/24/outline'; import { Bot, Wrench } from 'lucide-react'; import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'; import { getTeamTypeInfo } from './teamTypeUtils';
interface ConversationNodeProps {
data: any;
}

const ConversationNode: React.FC = ({ data }) => {
const [hasError, setHasError] = useState(false);

try {
const getNodeStyle = () => {
switch (data.type) {
case 'user':
return 'bg-white border-gray-200 text-gray-900';
case 'completion':
return 'bg-white border-gray-200 text-gray-900';
case 'team':
return 'bg-white border-gray-200 text-gray-900';
case 'agent':
return 'bg-white border-gray-200 text-gray-900';
default:
return 'bg-white border-gray-200 text-gray-900';
}
};


const getIcon = () => {
  switch (data.type) {
    case 'user':
      return '👤';
    case 'completion':
      return '✅';
    case 'team':
      return getTeamTypeIcon(data.teamType);
    case 'agent':
      return '🤖';
    default:
      return '⚡';
  }
};

const getTeamTypeIcon = (teamType?: string) => {
  if (!teamType) return '🏢';
  
  const teamTypeInfo = getTeamTypeInfo(teamType);
  const TeamTypeIcon = teamTypeInfo.icon;
  return <TeamTypeIcon className={`w-4 h-4 ${teamTypeInfo.color}`} />;
};

const getTeamTypeName = (teamType?: string) => {
  if (!teamType) return 'Team';
  return getTeamTypeInfo(teamType).label;
};

const getAgentTypeName = (agentType?: string) => {
  if (!agentType) return 'Agent';
  
  const type = agentType.toLowerCase();
  if (type.includes('assistant')) return 'Assistant Agent';
  if (type.includes('userproxy')) return 'User Proxy Agent';
  if (type.includes('codeinterpreter')) return 'Code Interpreter Agent';
  if (type.includes('websearch')) return 'Web Search Agent';
  if (type.includes('retrieval')) return 'Retrieval Agent';
  return agentType.split('.').pop() || 'Agent';
};

const renderIcon = () => {
  const icon = getIcon();
  if (typeof icon === 'string') {
    return <span className="text-lg">{icon}</span>;
  }
  return icon;
};

if (hasError) {
  return (
    <div className="p-4 rounded-lg shadow-lg border-2 min-w-[250px] bg-red-500 border-red-600 text-white">
      <div className="flex items-center gap-2 justify-center">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <span className="text-sm">Node Error</span>
      </div>
    </div>
  );
}

return (
  <div className={`p-4 rounded-lg shadow-lg border-2 min-w-[280px] transition-all duration-300 ${getNodeStyle()}`}>
    <div className="flex items-center gap-2 justify-center mb-3">
      {renderIcon()}
      <span className="text-sm font-medium">{data.label || 'Unnamed'}</span>
    </div>
    
    {/* Team Type Display */}
    {data.type === 'team' && data.teamType && (
      <div className="bg-gray-100 rounded p-2 mb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          {getTeamTypeIcon(data.teamType)}
          <span className="text-xs font-semibold text-gray-900">{getTeamTypeName(data.teamType)}</span>
        </div>
        <p className="text-xs text-center opacity-90 text-gray-700">
          {getTeamTypeInfo(data.teamType).description}
        </p>
      </div>
    )}

    {/* Agent Details Display */}
    {data.type === 'agent' && (
      <div className="space-y-2">
        {/* Agent Type */}
        {data.agentType && (
          <div className="bg-gray-100 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-3 h-3 text-gray-700" />
              <span className="text-xs font-semibold text-gray-900">Agent Type</span>
            </div>
            <p className="text-xs text-gray-700">{getAgentTypeName(data.agentType)}</p>
          </div>
        )}

        {/* LLM Model */}
        {data.llmModel && (
          <div className="bg-gray-100 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <SparklesIcon className="w-3 h-3 text-gray-700" />
              <span className="text-xs font-semibold text-gray-900">LLM Model</span>
            </div>
            <p className="text-xs text-gray-700">{data.llmModel}</p>
            {data.llmProvider && (
              <p className="text-xs opacity-75 text-gray-600">Provider: {data.llmProvider}</p>
            )}
          </div>
        )}

        {/* 🎯 ENHANCED: Tools Display with Rich Information */}
        {data.tools && Array.isArray(data.tools) && data.tools.length > 0 && (
          <div className="bg-gray-100 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="w-3 h-3 text-gray-700" />
              <span className="text-xs font-semibold text-gray-900">Tools ({data.tools.length})</span>
            </div>
            <div className="space-y-1">
              {data.tools.slice(0, 3).map((tool: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-900">
                      {tool.name || `Tool ${idx + 1}`}
                    </span>
                    {tool.type && tool.type !== 'function' && (
                      <span className="text-xs bg-gray-200 px-1 rounded text-gray-600">
                        {tool.type}
                      </span>
                    )}
                    {tool.provider && tool.provider !== 'custom' && (
                      <span className="text-xs bg-blue-100 px-1 rounded text-blue-600">
                        {tool.provider}
                      </span>
                    )}
                  </div>
                  {tool.description && (
                    <p className="opacity-75 truncate text-gray-600 ml-1">{tool.description}</p>
                  )}
                </div>
              ))}
              {data.tools.length > 3 && (
                <p className="text-xs opacity-75 text-gray-600">+{data.tools.length - 3} more tools</p>
              )}
            </div>
          </div>
        )}
      </div>
    )}
    
    {data.description && (
      <div className="bg-gray-50 rounded p-2 mb-2">
        <p className="text-xs text-center text-gray-700">{data.description}</p>
      </div>
    )}
    
    {data.confidence && (
      <div className="flex items-center justify-center mt-2">
        <div className={`w-2 h-2 rounded-full ${data.confidence > 0.7 ? 'bg-secondary-600' : data.confidence > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`} />
        <span className="text-xs ml-1 text-gray-700">{Math.round(data.confidence * 100)}% confidence</span>
      </div>
    )}
    
    {data.agents && Array.isArray(data.agents) && data.agents.length > 0 && (
      <div className="mt-2 text-xs">
        <div className="text-center opacity-75 text-gray-700">Agents: {data.agents.length}</div>
        <div className="flex flex-wrap gap-1 mt-1 justify-center">
          {data.agents.slice(0, 3).map((agent: any, idx: number) => (
            <span key={idx} className="bg-gray-200 px-1 rounded text-xs text-gray-800">
              {agent.name || `Agent ${idx + 1}`}
            </span>
          ))}
          {data.agents.length > 3 && (
            <span className="bg-gray-200 px-1 rounded text-xs text-gray-800">
              +{data.agents.length - 3}
            </span>
          )}
        </div>
      </div>
    )}
  </div>
);
} catch (error) {
console.error('Error rendering ConversationNode:', error);
setHasError(true);
return null;
}
};

export default ConversationNode;