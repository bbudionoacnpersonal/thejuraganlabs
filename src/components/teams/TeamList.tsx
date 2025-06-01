import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useTeamStore from '@/store/teamStore';
import Card, { CardBody } from '@/components/ui/Card';
import { UsersIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const TeamList: React.FC = () => {
  const { teams, fetchTeams, isLoading } = useTeamStore();
  
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (teams.length === 0) {
    return (
      <div className="text-center py-10">
        <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-300">No teams</h3>
        <p className="mt-1 text-sm text-gray-400">Get started by creating a new team.</p>
        <div className="mt-6">
          <Link
            to="/teams/create"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <UsersIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Team
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team, index) => (
        <motion.div
          key={team.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link to={`/teams/${team.id}`}>
            <Card hover className="h-full">
              <CardBody>
                <h3 className="text-lg font-medium text-white mb-2">{team.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{team.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-1" />
                    <span>{team.members.length} members</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(team.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex -space-x-2">
                  {team.members.slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className="inline-block h-8 w-8 rounded-full bg-primary-600 ring-2 ring-dark-surface overflow-hidden"
                    >
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {member.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  {team.members.length > 5 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-dark-400 ring-2 ring-dark-surface text-xs font-medium text-white">
                      +{team.members.length - 5}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamList;