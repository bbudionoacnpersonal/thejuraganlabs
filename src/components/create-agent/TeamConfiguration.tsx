import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactFlowProvider } from 'reactflow';
import Button from '@/components/ui/Button';
import AgentTree from './AgentTree';
import CodeEditor from './CodeEditor';
import VisualEditor from './VisualEditor';
import ChatPlayground from './ChatPlayground';
import SessionSelectionModal from './SessionSelectionModal';
import { teamStructure } from '@/mockdata/teamStructure';
import { TeamStructure, Participant } from '@/types';
import { 
  BeakerIcon,
} from '@heroicons/react/24/outline';

interface TeamConfigurationProps {
  agentConfig?: any;
  viewMode: 'json' | 'visual';
  onViewModeChange: (mode: 'json' | 'visual') => void;
}

const TeamConfiguration: React.FC<TeamConfigurationProps> = ({ 
  viewMode,
  onViewModeChange
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedTermination, setSelectedTermination] = useState<any>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamStructure | null>(null);
  const [jsonContent, setJsonContent] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const getDisplayJson = () => {
    if (selectedTermination) {
      return selectedTermination;
    }
    if (selectedParticipant) {
      return selectedParticipant;
    }
    if (selectedTeam) {
      return selectedTeam;
    }
    if (selectedAgent) {
      return teamStructure.config.participants.find(agent => agent.label === selectedAgent);
    }
    return teamStructure;
  };

  const handleEditJson = () => {
    setJsonContent(JSON.stringify(getDisplayJson(), null, 2));
    setIsEditing(true);
    setJsonError(null);
  };

  const handleSaveJson = () => {
    try {
      JSON.parse(jsonContent);
      setIsEditing(false);
      setJsonError(null);
    } catch (error) {
      setJsonError('Invalid JSON format');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setJsonError(null);
  };

  const handleTerminationSelect = (termination: any) => {
    setSelectedTermination(termination);
    setSelectedAgent(null);
    setSelectedParticipant(null);
    setSelectedTeam(null);
  };

  const handleAgentSelect = (agentName: string | null) => {
    setSelectedAgent(agentName);
    setSelectedTermination(null);
    setSelectedParticipant(null);
    setSelectedTeam(null);
  };

  const handleParticipantSelect = (participant: Participant) => {
    setSelectedParticipant(participant);
    setSelectedTermination(null);
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team: TeamStructure) => {
    setSelectedTeam(team);
    setSelectedTermination(null);
    setSelectedParticipant(null);
    setSelectedAgent(null);
  };

  const handlePlaygroundClick = () => {
    setShowSessionModal(true);
  };

  const handleNewSession = () => {
    setShowPlayground(true);
  };

  const handleSelectSession = (sessionId: string) => {
    // Here you would load the selected session data
    console.log('Loading session:', sessionId);
    setShowPlayground(true);
  };

  return (
    <div className="bg-dark-surface h-full border border-dark-border overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b border-dark-border">
        <div className="flex items-center bg-dark-background rounded-md overflow-hidden border border-dark-border">
          <button
            onClick={() => onViewModeChange('json')}
            className={`px-3 py-1 text-xs ${
              viewMode === 'json' 
                ? 'text-secondary-600 bg-secondary-600/10' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Code
          </button>
          <button
            onClick={() => onViewModeChange('visual')}
            className={`px-3 py-1 text-xs ${
              viewMode === 'visual' 
                ? 'text-secondary-600 bg-secondary-600/10' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Preview
          </button>
        </div>

        <Button
          variant='secondary'
          size="sm"
          leftIcon={<BeakerIcon className="h-2 w-2" />}
          onClick={handlePlaygroundClick}
          className="text-xs border border-dark-border hover:bg-primary-600"
        >
          Playground
        </Button>
      </div>

      <div className="h-[calc(100%-3.5rem)] relative">
        {viewMode === 'json' ? (
          <div className="h-full flex">
            <AgentTree
              teamStructure={teamStructure}
              selectedAgent={selectedAgent}
              onSelect={handleAgentSelect}
              onTerminationSelect={handleTerminationSelect}
              onParticipantSelect={handleParticipantSelect}
              onTeamSelect={handleTeamSelect}
            />
            <div className="flex-1"> 
              <CodeEditor
                content={JSON.stringify(getDisplayJson(), null, 2)}
                isEditing={isEditing}
                onEdit={handleEditJson}
                onSave={handleSaveJson}
                onCancel={handleCancelEdit}
                onChange={setJsonContent}
                error={jsonError}
                title={selectedTermination?.label || selectedParticipant?.label || selectedTeam?.label || selectedAgent || teamStructure.label}
              />
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            <ReactFlowProvider>
              <VisualEditor teamStructure={teamStructure} />
            </ReactFlowProvider>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showPlayground && (
          <ChatPlayground
            isVisible={showPlayground}
            onClose={() => setShowPlayground(false)}
          />
        )}
      </AnimatePresence>

      <SessionSelectionModal
        isVisible={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        onNewSession={handleNewSession}
        onSelectSession={handleSelectSession}
      />
    </div>
  );
};

export default TeamConfiguration;