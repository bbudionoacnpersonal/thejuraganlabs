import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  BoltIcon,
  BeakerIcon,
  ArrowTopRightOnSquareIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

interface ActivityItem {
  id: string;
  type: 'create' | 'test' | 'deploy' | 'update';
  entity: 'agent' | 'team' | 'model';
  name: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
  };
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'create',
    entity: 'agent',
    name: 'Customer Support Assistant',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    user: {
      name: 'Business User',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    id: '2',
    type: 'deploy',
    entity: 'agent',
    name: 'Sales Lead Qualifier',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    user: {
      name: 'AI Engineer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: '3',
    type: 'test',
    entity: 'agent',
    name: 'Content Generator',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    user: {
      name: 'Business User',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    id: '4',
    type: 'create',
    entity: 'team',
    name: 'Marketing Team',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      name: 'AI Architect',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  },
  {
    id: '5',
    type: 'update',
    entity: 'agent',
    name: 'Data Analysis Agent',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      name: 'AI Engineer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
];

const getTypeIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'create':
      return <BoltIcon className="h-5 w-5 text-primary-500" />;
    case 'test':
      return <BeakerIcon className="h-5 w-5 text-warning-500" />;
    case 'deploy':
      return <ArrowTopRightOnSquareIcon className="h-5 w-5 text-success-500" />;
    case 'update':
      return <PencilIcon className="h-5 w-5 text-secondary-500" />;
    default:
      return <BoltIcon className="h-5 w-5 text-primary-500" />;
  }
};

const getTypeText = (type: ActivityItem['type'], entity: ActivityItem['entity'], name: string) => {
  switch (type) {
    case 'create':
      return `Created new ${entity}: ${name}`;
    case 'test':
      return `Started testing ${entity}: ${name}`;
    case 'deploy':
      return `Deployed ${entity}: ${name}`;
    case 'update':
      return `Updated ${entity}: ${name}`;
    default:
      return `Interacted with ${entity}: ${name}`;
  }
};

const getTypeColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'create':
      return <Badge variant="primary">Created</Badge>;
    case 'test':
      return <Badge variant="warning">Testing</Badge>;
    case 'deploy':
      return <Badge variant="success">Deployed</Badge>;
    case 'update':
      return <Badge variant="secondary">Updated</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
};

const RecentActivity: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-white">Recent Activity</h3>
        </CardHeader>
        <CardBody>
          <ul className="divide-y divide-dark-border">
            {activities.map((activity, index) => (
              <motion.li
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2 + index * 0.1 }}
                className="py-3 flex"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-dark-400 flex items-center justify-center">
                    {getTypeIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {getTypeText(activity.type, activity.entity, activity.name)}
                  </p>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {activity.user.avatar ? (
                        <img
                          className="inline-block h-5 w-5 rounded-full mr-1"
                          src={activity.user.avatar}
                          alt={activity.user.name}
                        />
                      ) : (
                        <div className="inline-block h-5 w-5 rounded-full mr-1 bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {activity.user.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      )}
                      <p className="text-sm text-gray-400 ml-1">{activity.user.name}</p>
                    </div>
                    <span className="mx-1 text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
                <div className="ml-2">
                  {getTypeColor(activity.type)}
                </div>
              </motion.li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;