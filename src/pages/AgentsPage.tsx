import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import AgentList from '@/components/agents/AgentList';
import Button from '@/components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

const AgentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <Link to="/agents/create">
            <Button leftIcon={<PlusIcon className="h-5 w-5" />}>
              New Agent
            </Button>
          </Link>
        </div>
        
        <AgentList />
      </main>
    </div>
  );
};

export default AgentsPage;