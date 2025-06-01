import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import { Agent } from '@/types';
import useAgentStore from '@/store/agentStore';
import {
  BoltIcon,
  WrenchScrewdriverIcon,
  CircleStackIcon,
  ArrowTopRightOnSquareIcon,
  BeakerIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface AgentDetailProps {
  agent: Agent;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const { updateAgentStatus, models, tools } = useAgentStore();
  
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
  
  const handleTest = async () => {
    setIsTesting(true);
    
    // Simulate testing process
    setTimeout(async () => {
      await updateAgentStatus(agent.id, 'testing');
      setIsTesting(false);
    }, 2000);
  };
  
  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(async () => {
      await updateAgentStatus(agent.id, 'deployed');
      setIsDeploying(false);
    }, 3000);
  };
  
  // Find model details
  const model = models.find(m => m.id === agent.modelId);
  
  // Find tool details
  const agentTools = tools.filter(t => agent.toolIds.includes(t.id));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BoltIcon className="h-6 w-6 text-primary-500" />
            {agent.name}
          </h1>
          <p className="text-gray-400 mt-1">{agent.description}</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          {getStatusBadge(agent.status)}
          
          {agent.status === 'development' && (
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<BeakerIcon className="h-4 w-4" />}
              isLoading={isTesting}
              onClick={handleTest}
            >
              Test Agent
            </Button>
          )}
          
          {agent.status === 'testing' && (
            <Button
              size="sm"
              variant="accent"
              leftIcon={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
              isLoading={isDeploying}
              onClick={handleDeploy}
            >
              Deploy Agent
            </Button>
          )}
          
          {agent.status === 'deployed' && (
            <Button
              size="sm"
              variant="accent"
              leftIcon={<ChatBubbleLeftRightIcon className="h-4 w-4" />}
            >
              Chat with Agent
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-white flex items-center">
                <CircleStackIcon className="h-5 w-5 mr-2 text-secondary-400" />
                Model
              </h3>
            </CardHeader>
            <CardBody>
              {model ? (
                <div>
                  <h4 className="font-medium text-white">{model.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{model.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge size="sm">{model.provider}</Badge>
                    <Badge size="sm">{model.type}</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Model information not found</p>
              )}
            </CardBody>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-white flex items-center">
                <WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-accent-400" />
                Tools ({agentTools.length})
              </h3>
            </CardHeader>
            <CardBody>
              {agentTools.length > 0 ? (
                <ul className="space-y-2">
                  {agentTools.map(tool => (
                    <li key={tool.id} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-success-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-white">{tool.name}</h4>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No tools assigned</p>
              )}
            </CardBody>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-white">Details</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Created</h4>
                  <p className="text-white">{new Date(agent.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Last Updated</h4>
                  <p className="text-white">{new Date(agent.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Team ID</h4>
                  <p className="text-white">{agent.teamId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Created By</h4>
                  <p className="text-white">User {agent.createdBy}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentDetail;