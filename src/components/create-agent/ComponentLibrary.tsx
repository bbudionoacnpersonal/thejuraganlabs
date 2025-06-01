import React, { useState } from 'react';
import { 
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Bot, GripVertical, Wrench } from 'lucide-react';
import { prebuiltAgents } from '@/mockdata/agents';
import Tooltip from '@/components/ui/Tooltip';
import { autogenConfig } from '@/mockdata/autogenConfig';

interface ComponentLibraryProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ isCollapsed, onToggle }) => {
  const [openSection, setOpenSection] = useState<'agents' | 'models' | 'tools' | 'terminations'>('models');
  
  const agents = prebuiltAgents.map(agent => ({
    id: agent.id,
    name: agent.name,
    icon: Bot,
    description: agent.description
  }));

  const models = autogenConfig.models.map(model => ({
    id: model.id,
    name: model.name,
    icon: SparklesIcon,
    description: model.description
  }));

  const tools = autogenConfig.tools.map(tool => ({
    id: tool.id,
    name: tool.name,
    icon: Wrench,
    description: tool.desc
  }));

  const terminations = autogenConfig.terminationTypes.map(term => ({
    id: term.id,
    name: term.name,
    icon: ClockIcon,
    description: term.desc
  }));

  const renderSection = (
    title: string, 
    items: { id: string; name: string; icon: any; description: string }[], 
    section: 'agents' | 'models' | 'tools' | 'terminations',
    count: number
  ) => (
    <div className="mb-1">
      <button
        className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white text-sm font-medium border-t border-gray-800"
        onClick={() => setOpenSection(openSection === section ? 'models' : section)}
      >
        <div className="flex items-center gap-2">
          {section === 'agents' && <Bot className="h-2 w-2" />}
          {section === 'models' && <SparklesIcon className="h-2 w-2" />}
          {section === 'tools' && <Wrench className="h-2 w-2" />}
          {section === 'terminations' && <ClockIcon className="h-2 w-2" />}
          {!isCollapsed && (
            <>
              <span>{title}</span>
              <span className="text-[11px] text-gray-500">({count})</span>
            </>
          )}
        </div>
        {!isCollapsed && (
          openSection === section ? (
            <ChevronUpIcon className="h-2 w-2" />
          ) : (
            <ChevronDownIcon className="h-2 w-2" />
          )
        )}
      </button>
      
      {openSection === section && !isCollapsed && (
        <div className="mt-1 space-y-1 bg-gray-800/30 max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-dark-surface">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1 px-1 py-2 text-sm border-gray-500 text-gray-300 hover:text-white hover:bg-dark-400 rounded-md cursor-move transition-colors duration-200"
              draggable
            >
               
            <GripVertical className="h-2 w-2" />
            <item.icon className="h-2 w-2" />
             
             <Tooltip content={item.description}>
                <span className="text-xs font-medium text-white">{item.name}</span>
              </Tooltip>
            </div>
          ))
          }
        </div>
      )}
    </div>
  );

  return (
    <div className={`h-full bg-dark-surface border-t border-r border-b border-dark-border rounded-tr-lg rounded-br-lg overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-full'}`}>
      {isCollapsed ? (
        <div className="h-full flex flex-col items-center py-2 space-y-4">
          <button 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onToggle}
          >
            <ChevronDoubleRightIcon className="h-2 w-2" />
          </button>

          <div className="relative mb-4">
            <MagnifyingGlassIcon className="h-2 w-2 text-gray-400" />
          </div>
          
          <div className="flex flex-col items-center space-y-6 w-full">
            <div className="flex items-center text-gray-400 hover:text-white px-2 py-1">
              <Bot className="h-2 w-2" />
              <span className="text-[10px]">({agents.length})</span>
            </div>
            <div className="flex items-center text-gray-400 hover:text-white px-2 py-1">
              <SparklesIcon className="h-2 w-2" />
              <span className="text-[10px]">({models.length})</span>
            </div>
            <div className="flex items-center text-gray-400 hover:text-white px-2 py-1">
              <Wrench className="h-2 w-2" />
              <span className="text-[10px]">({tools.length})</span>
            </div>
            <div className="flex items-center text-gray-400 hover:text-white px-2 py-1">
              <ClockIcon className="h-2 w-2" />
              <span className="text-[10px]">({terminations.length})</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm font-medium">Component Library</h3>
            <button 
              className="text-gray-400 hover:text-white"
              onClick={onToggle}
            >
              <ChevronDoubleLeftIcon className="h-2 w-2" />
            </button>
          </div>
          
          <div className="mb-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-2 w-2 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search components..."
                className="w-full bg-dark-surface border border-dark-border rounded-md py-1 pl-12 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
              />
            </div>
          </div>
          
          {renderSection('Agents', agents, 'agents', agents.length)}
          {renderSection('Models', models, 'models', models.length)}
          {renderSection('Tools', tools, 'tools', tools.length)}
          {renderSection('Terminations', terminations, 'terminations', terminations.length)}
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;