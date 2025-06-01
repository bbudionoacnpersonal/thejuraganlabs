import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import useTeamStore from '@/store/teamStore';
import useAuthStore from '@/store/authStore';

const CreateTeamForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  
  const navigate = useNavigate();
  const { createTeam, isLoading, error: teamError } = useTeamStore();
  const { user } = useAuthStore();
  
  const validate = () => {
    const newErrors: { name?: string; description?: string } = {};
    let isValid = true;
    
    if (!name) {
      newErrors.name = 'Team name is required';
      isValid = false;
    }
    
    if (!description) {
      newErrors.description = 'Description is required';
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
      await createTeam(name, description, user.id);
      navigate('/teams');
    } catch (err) {
      // Error is handled in the store
    }
  };
  
  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {teamError && (
        <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{teamError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Team Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a team name"
          error={errors.name}
        />
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block w-full rounded-md shadow-sm focus:ring-1 transition duration-150 ease-in-out bg-dark-400 border-dark-border text-white focus:border-primary-500 focus:ring-primary-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this team's purpose?"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error-500">{errors.description}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/teams')}
          >
            Cancel
          </Button>
          
          <Button type="submit" isLoading={isLoading}>
            Create Team
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;