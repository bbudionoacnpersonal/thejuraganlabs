import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import Button from '@/components/ui/Button';
import { XMarkIcon, BoltIcon } from '@heroicons/react/24/outline';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarTeam from './navbar/NavbarTeam';
import NavbarActions from './navbar/NavbarActions';
import NavbarUser from './navbar/NavbarUser';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  
  return (
    <nav className="bg-dark-surface border-b border-dark-border backdrop-filter backdrop-blur-lg bg-opacity-80 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <NavbarLogo />
          </div>

          <NavbarTeam />
          
          <div className="hidden md:flex items-center">
            <NavbarActions />
            <NavbarUser />
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-dark-400 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-500 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <BoltIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-surface">
            {user ? (
              <div className="px-3 py-3 flex flex-col gap-3">
                <div className="text-white font-medium">{user.name}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-3 py-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" fullWidth>
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;