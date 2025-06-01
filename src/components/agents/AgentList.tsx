import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAgentStore from '@/store/agentStore';
import Card, { CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { BoltIcon, ClockIcon } from '@heroicons/react/24/outline';

const AgentList: React.FC = () => {
  const { agents, fetchAgents, isLoading } = useAgentStore();
  
  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'development':
        return <Badge variant="warning">Development</Badge>;
      case 'testing':
        return <Badge variant="info">Testing</Badge>;
      case 'deployed':
        return <Badge variant="success">Deployed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (agents.length === 0) {
    return (
      <div className="text-center py-10">
        <BoltIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-300">No agents</h3>
        <p className="mt-1 text-sm text-gray-400">Get started by creating a new AI agent.</p>
        <div className="mt-6">
          <Link
            to="/agents/create"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <BoltIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Agent
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link to={`/agents/${agent.id}`}>
            <Card hover className="h-full">
              <CardBody>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-white">{agent.name}</h3>
                  {getStatusBadge(agent.status)}
                </div>
                <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center">
                    <BoltIcon className="h-4 w-4 mr-1" />
                    <span>Team {agent.teamId}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(agent.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default AgentList;