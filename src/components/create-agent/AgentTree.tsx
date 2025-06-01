import React, { useState } from 'react';
import TreeView from 'react-treeview';
import { ChevronDownIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Bot, Wrench } from 'lucide-react';
import 'react-treeview/react-treeview.css';
import { TeamStructure, Participant } from '@/types';

interface AgentTreeProps {
  teamStructure: TeamStructure;
  selectedAgent: string | null;
  onSelect: (agentName: string | null) => void;
  onTerminationSelect?: (termination: any) => void;
  onParticipantSelect?: (participant: Participant) => void;
  onTeamSelect?: (team: TeamStructure) => void;
}

const AgentTree: React.FC<AgentTreeProps> = ({ 
  teamStructure, 
  selectedAgent, 
  onSelect,
  onTerminationSelect,
  onParticipantSelect,
  onTeamSelect
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [selectedTermination, setSelectedTermination] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const handleTerminationClick = (condition: any) => {
    setSelectedTermination(condition.label);
    onSelect(null); // Deselect any selected agent
    
    if (onTerminationSelect) {
      onTerminationSelect({
        provider: condition.provider,
        component_type: condition.component_type,
        version: condition.version,
        component_version: condition.component_version,
        description: condition.description,
        label: condition.label,
        config: condition.config
      });
    }
  };

  const renderAgent = (participant: Participant) => {
    const hasTools = participant.config.tools && participant.config.tools.length > 0;

    return (
      <div 
        key={participant.label}
        className={`py-1 px-1 ${selectedAgent === participant.label ? 'bg-secondary-600/20 border-l-2 border-secondary-600' : 'hover:bg-dark-400'}`}
        onClick={() => {
          onSelect(participant.label);
          if (onParticipantSelect) {
            onParticipantSelect(participant);
          }
        }}
      >
        <div className="flex items-center gap-1 px-1 cursor-pointer">
          <Bot className="h-2 w-2 text-gray-300" />
          <span className="text-sm font-medium text-gray-300">{participant.label}</span>
        </div>
        <div className="ml-4 mt-1">
          <p className="text-xs text-gray-500">{participant.description}</p>
          {hasTools && (
            <div className="flex items-center gap-1 mt-1">
              <Wrench className="h-2 w-2 text-gray-500" />
              <span className="text-xs text-gray-500">{participant.config.tools?.length} Tools</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTerminations = () => {
    const isExpanded = expandedNodes.includes('terminations');
    const conditions = teamStructure.config.termination_condition.config.conditions;

    return (
      <div className="py-1 px-1">
        <div 
          className="flex items-center gap-1 px-1 cursor-pointer"
          onClick={() => toggleNode('terminations')}
        >
          {isExpanded ? (
            <ChevronDownIcon className="h-2 w-2 text-gray-500" />
          ) : (
            <ChevronRightIcon className="h-2 w-2 text-gray-500" />
          )}
          <ClockIcon className="h-2 w-2 text-gray-300" />
          <span className="text-sm font-medium text-gray-300">Terminations</span>
        </div>
        {isExpanded && (
          <div className="ml-4 mt-1">
            {conditions.map((condition: any, index: number) => (
              <div 
                key={index} 
                className={`py-1 cursor-pointer hover:bg-dark-400 rounded px-1 ${
                  selectedTermination === condition.label ? 'bg-secondary-600/20 border-l-2 border-secondary-600' : ''
                }`}
                onClick={() => handleTerminationClick(condition)}
              >
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-2 w-2 text-gray-400" />
                  <span className="text-xs text-gray-400">{condition.label}</span>
                </div>
                <p className="text-[10px] text-gray-500 ml-3 mt-0.5">{condition.description}</p>
                {condition.config.text && (
                  <p className="text-[10px] text-gray-500 ml-3">Text: {condition.config.text}</p>
                )}
                {condition.config.max_messages && (
                  <p className="text-[10px] text-gray-500 ml-3">Max Messages: {condition.config.max_messages}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleTeamClick = () => {
    setIsCollapsed(!isCollapsed);
    onSelect(null);
    setSelectedTermination(null);
    if (onTeamSelect) {
      onTeamSelect(teamStructure);
    }
  };

  const teamLabel = (
    <div 
      className="flex items-center gap-2 py-1 px-1 cursor-pointer hover:bg-dark-400 transition-colors duration-200" 
      onClick={handleTeamClick}
    >
      {isCollapsed ? (
        <ChevronRightIcon className="h-2 w-2 text-secondary-600" />
      ) : (
        <ChevronDownIcon className="h-2 w-2 text-secondary-600" />
      )}
      <div>
        <p className="text-sm text-gray-300">{teamStructure.label}</p>
        <p className="text-xs text-gray-500">{teamStructure.provider.split('.').pop()}</p>
      </div>
    </div>
  );

  const participants = teamStructure?.config?.participants || [];

  return (
    <div className="w-[20%] min-w-[220px] border-r border-dark-border overflow-y-auto bg-dark-surface h-[700px]">
      <TreeView
        nodeLabel={teamLabel}
        defaultCollapsed={false}
        collapsed={isCollapsed}
        itemClassName="border-b border-dark-border last:border-b-0"
      >
        {participants.map((participant) => renderAgent(participant))}
        {renderTerminations()}
      </TreeView>

      <style>{`
        .tree-view {
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
        }
        .tree-view_item {
          margin: 0 !important;
        }
        .tree-view_children {
          margin: 0 !important;
          padding: 0 !important;
        }
        .tree-view_arrow {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default AgentTree;