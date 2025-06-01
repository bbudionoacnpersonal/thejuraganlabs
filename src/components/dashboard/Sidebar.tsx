import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import {
  HomeIcon,
  UsersIcon,
  BoltIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  
  // Define sidebar navigation items based on user role
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['business', 'engineer', 'architect'] },
    { name: 'Teams', href: '/teams', icon: UsersIcon, roles: ['business', 'engineer', 'architect'] },
    { name: 'AI Agents', href: '/agents', icon: BoltIcon, roles: ['business', 'engineer', 'architect'] },
    { name: 'Models', href: '/models', icon: CircleStackIcon, roles: ['engineer', 'architect'] },
    { name: 'Tools', href: '/tools', icon: WrenchScrewdriverIcon, roles: ['engineer', 'architect'] },
    { name: 'Templates', href: '/templates', icon: DocumentTextIcon, roles: ['business', 'engineer', 'architect'] },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, roles: ['engineer', 'architect'] },
  ];
  
  // Filter navigation items based on user role
  const filteredItems = navigationItems.filter((item) => 
    user && item.roles.includes(user.role)
  );
  
  return (
    <div className="flex flex-col w-64 bg-dark-surface border-r border-dark-border overflow-y-auto h-screen sticky top-0 pt-5">
      <div className="h-0 flex-1 flex flex-col">
        <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
          <span className="text-primary-400 text-2xl font-extrabold">Zeus</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'bg-dark-400 text-white'
                    : 'text-gray-300 hover:bg-dark-400 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex p-4 border-t border-dark-border">
        {user && (
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              {user.avatar ? (
                <img
                  className="h-9 w-9 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3 w-full truncate">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium text-white truncate"
              >
                {user.name}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xs text-gray-300 truncate capitalize"
              >
                {user.role === 'business' ? 'Business User' : user.role === 'engineer' ? 'AI Engineer' : 'AI Architect'}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;