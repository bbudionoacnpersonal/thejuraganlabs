import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

const NavbarActions: React.FC = () => {
  const location = useLocation();
  const isAgentCreate = location.pathname === '/agents/create';
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (integrationsRef.current && !integrationsRef.current.contains(event.target as Node)) {
        setIsIntegrationsOpen(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAgentCreate) return null;

  return (
    <div className="flex items-center space-x-1 border-r border-dark-border px-2">
      <div className="relative" ref={integrationsRef}>
        <Button
          variant="ghost"
          size="sm"
          className="items-center border border-dark-border"
          onClick={() => setIsIntegrationsOpen(!isIntegrationsOpen)}
        >
          <div className="inline-flex items-center space-x-1 text-xs !py-1.5 h-3">
            <CodeBracketIcon className="h-2 w-2" />
            <span>Integrations</span>
            <ChevronDownIcon className="h-2 w-2" />
          </div>
        </Button>

        {isIntegrationsOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-dark-surface border border-dark-border rounded-md shadow-lg">
            <div className="p-2">
              <div className="w-full flex items-center gap-2 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-dark-400 rounded text-left cursor-pointer">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-5 h-5 flex-shrink-0" alt="GitHub" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium truncate">GitHub</div>
                  <div className="text-[10px] text-gray-400 truncate">Manage versions of your project</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={exportRef}>
        <Button
          variant="ghost"
          size="sm"
          className="items-center border border-dark-border"
          onClick={() => setIsExportOpen(!isExportOpen)}
        >
          <div className="inline-flex items-center space-x-1 text-xs !py-1.5 h-3">
            <ArrowUpTrayIcon className="h-2 w-2" />
            <span>Export</span>
            <ChevronDownIcon className="h-2 w-2" />
          </div>
        </Button>

        {isExportOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-dark-surface border border-dark-border rounded-md shadow-lg">
            <div className="p-1">
              <div className="w-full flex items-center gap-2 px-1 py-1.5 text-gray-300 hover:text-white hover:bg-dark-400 rounded text-left text-xs cursor-pointer">
                <ArrowDownTrayIcon className="h-2 w-2 flex-shrink-0" />
                <span className="truncate">Download [JSON]</span>
              </div>
              <div className="w-full flex items-center gap-2 px-1 py-1.5 text-gray-300 hover:text-white hover:bg-dark-400 rounded text-left text-xs cursor-pointer">
                <ArrowTopRightOnSquareIcon className="h-2 w-2 flex-shrink-0" />
                <span className="truncate">Open in Autogen</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Button
        size="sm"
        variant="primary"
        leftIcon={<RocketLaunchIcon className="h-3" />}
        className="text-xs"
      >
        Deploy
      </Button>
    </div>
  );
};

export default NavbarActions;