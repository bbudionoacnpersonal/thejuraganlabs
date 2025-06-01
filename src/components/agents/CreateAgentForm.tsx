import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select, { SelectOption } from '@/components/ui/Select';
import useAgentStore from '@/store/agentStore';
import useTeamStore from '@/store/teamStore';
import useAuthStore from '@/store/authStore';

const CreateAgentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teamId, setTeamId] = useState('');
  const [modelId, setModelId] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [terminationConfig, setTerminationConfig] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    description?: string; 
    teamId?: string;
    modelId?: string;
    tools?: string;
    termination?: string;
  }>({});
  
  const navigate = useNavigate();
  const { createAgent, fetchGalleryItems, models, tools, terminations, isLoading, error: agentError } = useAgentStore();
  const { teams, fetchTeams } = useTeamStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    fetchTeams();
    fetchGalleryItems();
  }, [fetchTeams, fetchGalleryItems]);
  
  // Convert teams to options
  const teamOptions: SelectOption[] = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));
  
  // Convert models to options
  const modelOptions: SelectOption[] = models.map((model) => ({
    value: model.id,
    label: `${model.name} (${model.provider})`,
  }));
  
  // Convert terminations to options
  const terminationOptions: SelectOption[] = terminations.map((termination) => ({
    value: termination.id,
    label: termination.name,
  }));
  
  const validate = () => {
    const newErrors: { 
      name?: string; 
      description?: string; 
      teamId?: string;
      modelId?: string;
      tools?: string;
      termination?: string;
    } = {};
    let isValid = true;
    
    if (!name) {
      newErrors.name = 'Agent name is required';
      isValid = false;
    }
    
    if (!description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (!teamId) {
      newErrors.teamId = 'Team is required';
      isValid = false;
    }
    
    if (!modelId) {
      newErrors.modelId = 'Model is required';
      isValid = false;
    }
    
    if (selectedTools.length === 0) {
      newErrors.tools = 'At least one tool is required';
      isValid = false;
    }
    
    if (!terminationConfig) {
      newErrors.termination = 'Termination configuration is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate() || !user) {
      return;
    }
    
    try {
      await createAgent(
        name,
        description,
        teamId,
        user.id,
        modelId,
        selectedTools,
        terminationConfig
      );
      navigate('/agents');
    } catch (err) {
      // Error is handled in the store
    }
  };
  
  const handleToolChange = (toolId: string) => {
    setSelectedTools((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };
  
  if (teams.length === 0 || models.length === 0 || tools.length === 0 || terminations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {agentError && (
        <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded relative\" role="alert">
          <span className="block sm:inline">{agentError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Agent Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter an agent name"
          error={errors.name}
        />
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="block w-full rounded-md shadow-sm focus:ring-1 transition duration-150 ease-in-out bg-dark-400 border-dark-border text-white focus:border-primary-500 focus:ring-primary-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this agent's purpose?"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error-500">{errors.description}</p>
          )}
        </div>
        
        <Select
          label="Team"
          options={teamOptions}
          value={teamId}
          onChange={(value) => setTeamId(value as string)}
          error={errors.teamId}
        />
        
        <Select
          label="Model"
          options={modelOptions}
          value={modelId}
          onChange={(value) => setModelId(value as string)}
          error={errors.modelId}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Tools
          </label>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center">
                <input
                  id={`tool-${tool.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-border rounded bg-dark-400"
                  checked={selectedTools.includes(tool.id)}
                  onChange={() => handleToolChange(tool.id)}
                />
                <label
                  htmlFor={`tool-${tool.id}`}
                  className="ml-2 block text-sm text-gray-300"
                >
                  {tool.name}
                </label>
              </div>
            ))}
          </div>
          {errors.tools && (
            <p className="mt-1 text-sm text-error-500">{errors.tools}</p>
          )}
        </div>
        
        <Select
          label="Termination Configuration"
          options={terminationOptions}
          value={terminationConfig}
          onChange={(value) => setTerminationConfig(value as string)}
          error={errors.termination}
        />
        
        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/agents')}
          >
            Cancel
          </Button>
          
          <Button type="submit" isLoading={isLoading}>
            Create Agent
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgentForm;