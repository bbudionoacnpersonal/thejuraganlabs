import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card, { CardBody } from '@/components/ui/Card';
import { UserGroupIcon, CircleStackIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const AdminSettings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardBody className="flex flex-col items-center text-center p-8">
          <h2 className="text-2xl font-bold text-white mb-4">System Settings</h2>
          <p className="text-gray-400 mb-8">
            Configure and manage your AI platform settings
          </p>

          <div className="w-full bg-dark-background rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="flex items-center py-2 px-3 rounded-md bg-dark-surface border border-dark-border hover:border-secondary-400 cursor-pointer transition-colors duration-200"
                onClick={() => navigate('/settings/users')}
              >
                <div className="flex-shrink-0 mr-3">
                  <UserGroupIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-white text-sm font-medium">User Management</div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Manage users and roles
                  </p>
                </div>
              </div>

              <div className="flex items-center py-2 px-3 rounded-md bg-dark-surface border border-dark-border hover:border-secondary-400 cursor-pointer transition-colors duration-200">
                <div className="flex-shrink-0 mr-3">
                  <CircleStackIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-white text-sm font-medium">Model Configuration</div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Configure AI models
                  </p>
                </div>
              </div>

              <div className="flex items-center py-2 px-3 rounded-md bg-dark-surface border border-dark-border hover:border-secondary-400 cursor-pointer transition-colors duration-200">
                <div className="flex-shrink-0 mr-3">
                  <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-white text-sm font-medium">Security Settings</div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Manage security policies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default AdminSettings;