import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import TeamList from '@/components/teams/TeamList';
import Button from '@/components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

const TeamsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Teams</h1>
          <Link to="/teams/create">
            <Button leftIcon={<PlusIcon className="h-5 w-5" />}>
              New Team
            </Button>
          </Link>
        </div>
        
        <TeamList />
      </main>
    </div>
  );
};

export default TeamsPage;