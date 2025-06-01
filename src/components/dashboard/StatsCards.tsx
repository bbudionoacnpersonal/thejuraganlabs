import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardBody } from '@/components/ui/Card';
import {
  UsersIcon,
  BoltIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{title}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="p-3 bg-dark-400 rounded-md">
              {icon}
            </div>
          </div>
          
          {change && (
            <div className="mt-4 flex items-center">
              {change.trend === 'up' && (
                <ArrowUpIcon className="h-4 w-4 text-success-500 mr-1" />
              )}
              {change.trend === 'down' && (
                <ArrowDownIcon className="h-4 w-4 text-error-500 mr-1" />
              )}
              <span
                className={
                  change.trend === 'up'
                    ? 'text-success-500 text-sm'
                    : change.trend === 'down'
                    ? 'text-error-500 text-sm'
                    : 'text-gray-400 text-sm'
                }
              >
                {change.value} from previous period
              </span>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Teams',
      value: 5,
      icon: <UsersIcon className="h-6 w-6 text-secondary-500" />,
      change: {
        value: '15% increase',
        trend: 'up' as const,
      },
    },
    {
      title: 'AI Agents',
      value: 12,
      icon: <BoltIcon className="h-6 w-6 text-primary-500" />,
      change: {
        value: '25% increase',
        trend: 'up' as const,
      },
    },
    {
      title: 'Deployed Agents',
      value: 8,
      icon: <BoltIcon className="h-6 w-6 text-success-500" />,
      change: {
        value: '33% increase',
        trend: 'up' as const,
      },
    },
    {
      title: 'In Development',
      value: 4,
      icon: <BoltIcon className="h-6 w-6 text-warning-500" />,
      change: {
        value: '10% decrease',
        trend: 'down' as const,
      },
    },
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default StatsCards;