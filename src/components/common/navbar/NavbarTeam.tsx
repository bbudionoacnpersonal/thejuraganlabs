import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { ChevronDownIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { teamStructure } from '@/mockdata/teamStructure';

interface TeamInfo {
  name: string;
  description: string;
}

const NavbarTeam: React.FC = () => {
  const location = useLocation();
  const isAgentPage = location.pathname.includes('/agents/');
  const [isOpen, setIsOpen] = useState(false);
  const [teamInfo] = useState<TeamInfo>({
    name: teamStructure.label,
    description: teamStructure.description
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAgentPage) return null;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="items-center"
      >
        <div className="inline-flex items-center space-x-1 text-xs !py-1.5">
          <UserGroupIcon className="h-2 w-2" />
          <span className="text-xs font-medium">{teamInfo.name}</span>
          <ChevronDownIcon className="h-2 w-2" />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-80 bg-dark-surface border border-dark-border rounded-md shadow-lg">
          <div className="p-3">
            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-1">Team Name</label>
              <div className="w-full bg-dark-400 border border-dark-border rounded px-2 py-1.5 text-sm text-white">
                {teamInfo.name}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1">Description</label>
              <div className="w-full bg-dark-400 border border-dark-border rounded px-2 py-1.5 text-sm text-white min-h-[4rem]">
                {teamInfo.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarTeam;