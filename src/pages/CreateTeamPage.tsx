import React from 'react';
import Navbar from '@/components/common/Navbar';
import CreateTeamForm from '@/components/teams/CreateTeamForm';

const CreateTeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Create New Team</h1>
          <p className="text-gray-400 mt-1">Create a new team to collaborate on AI agents</p>
        </div>
        
        <CreateTeamForm />
      </main>
    </div>
  );
};

export default CreateTeamPage;