import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import AgentDetail from '@/components/agents/AgentDetail';
import Button from '@/components/ui/Button';
import useAgentStore from '@/store/agentStore';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agents, fetchAgents, fetchGalleryItems, isLoading } = useAgentStore();
  const [agent, setAgent] = useState(agents.find(a => a.id === id));
  
  useEffect(() => {
    fetchAgents();
    fetchGalleryItems();
  }, [fetchAgents, fetchGalleryItems]);
  
  useEffect(() => {
    setAgent(agents.find(a => a.id === id));
  }, [agents, id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-background">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!agent) {
    return (
      <div className="min-h-screen bg-dark-background">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-white">Agent not found</h3>
            <div className="mt-6">
              <Button onClick={() => navigate('/agents')}>
                Back to Agents
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeftIcon className="h-5 w-5" />}
            onClick={() => navigate('/agents')}
          >
            Back to Agents
          </Button>
        </div>
        
        <AgentDetail agent={agent} />
      </main>
    </div>
  );
};

export default AgentDetailPage;