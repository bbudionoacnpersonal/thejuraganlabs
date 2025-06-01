import React from 'react';
import { motion } from 'framer-motion';
import {
  BoltIcon,
  UsersIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Create Custom AI Agents',
    description: 'Build specialized AI agents tailored to your business needs without writing a single line of code.',
    icon: BoltIcon,
    color: 'text-primary-400',
  },
  {
    name: 'Team Collaboration',
    description: 'Create teams and collaborate on AI agent development with different roles and permissions.',
    icon: UsersIcon,
    color: 'text-secondary-400',
  },
  {
    name: 'Advanced Models',
    description: 'Choose from a wide range of cutting-edge language models to power your AI agents.',
    icon: CircleStackIcon,
    color: 'text-accent-400',
  },
  {
    name: 'Integration Tools',
    description: 'Connect your AI agents to your existing tools and data sources with pre-built integrations.',
    icon: WrenchScrewdriverIcon,
    color: 'text-success-400',
  },
  {
    name: 'Automated Testing',
    description: 'Test your AI agents with automated workflows to ensure they perform as expected.',
    icon: BeakerIcon,
    color: 'text-warning-400',
  },
  {
    name: 'One-Click Deployment',
    description: 'Deploy your AI agents to production with a single click and monitor their performance.',
    icon: ArrowTopRightOnSquareIcon,
    color: 'text-error-400',
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-dark-surface py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4"
          >
            Everything you need to build and manage AI agents for your business.
          </motion.p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="relative bg-dark-background rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-dark-border"
              >
                <div>
                  <div className={`absolute h-12 w-12 rounded-md flex items-center justify-center ${feature.color} bg-dark-surface`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                </div>
                <div className="mt-6 ml-16 text-base text-gray-400">
                  {feature.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;