import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useUserFeatures from '@/hooks/useUserFeatures';
import AdminSettings from '@/components/dashboard/AdminSettings';
import IndustryGallery from '@/components/dashboard/IndustryGallery';
import useAuthStore from '@/store/authStore';
import Button from '@/components/ui/Button';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Tooltip from '@/components/ui/Tooltip';
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ChartPieIcon,
  ArrowsPointingInIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import Card, { CardBody } from '@/components/ui/Card';

const DashboardPage: React.FC = () => {
  const { getDashboardItems } = useUserFeatures();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const dashboardItems = getDashboardItems();
  const isAdmin = user?.role === 'admin';

  // Get user's industry and focus areas
  const userIndustry = localStorage.getItem('user_industry') || '';
  const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');
  const hasIndustryAndFocus = userIndustry && userFocusAreas.length > 0;

  const teams = [
    {
      name: 'Procurement Analyst Team',
      description: 'AI agents team for analyzing procurement data and optimizing purchasing decisions',
      lastModified: 'last month',
      type: 'RoundRobinGroupChat'
    },
    {
      name: 'Performance Employee Team',
      description: 'Team of AI agents for employee performance tracking and insights',
      lastModified: '2 weeks ago',
      type: 'HierarchicalGroupChat'
    },
    {
      name: 'CFO Rev Analysis Team',
      description: 'Revenue analysis and forecasting AI team for financial planning',
      lastModified: '3 weeks ago',
      type: 'CascadingChat'
    },
    {
      name: 'Cashflow Analysis',
      description: 'AI agents specialized in cash flow monitoring and prediction',
      lastModified: '2 weeks ago',
      type: 'AutoGenFunctionCaller'
    },
    {
      name: 'Chargebility Analysis',
      description: 'Team focused on analyzing and optimizing billing efficiency',
      lastModified: 'last month',
      type: 'Custom'
    },
    {
      name: 'Loan Assistant Team',
      description: 'AI team for loan application processing and risk assessment',
      lastModified: '2 years ago',
      type: 'HierarchicalGroupChat'
    }
  ];

  const getTeamTypeIcon = (type: string) => {
    switch (type) {
      case 'RoundRobinGroupChat':
        return <UserGroupIcon className="h-3 w-3 text-secondary-600" />;
      case 'HierarchicalGroupChat':
        return <ChartPieIcon className="h-3 w-3 text-secondary-600" />;
      case 'CascadingChat':
        return <ArrowsPointingInIcon className="h-3 w-3 text-secondary-600" />;
      case 'AutoGenFunctionCaller':
        return <WrenchScrewdriverIcon className="h-3 w-3 text-secondary-600" />;
      default:
        return <PuzzlePieceIcon className="h-3 w-3 text-secondary-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-background flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Admin Settings Section */}
        {isAdmin && dashboardItems.includes('settings') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <AdminSettings />
          </motion.div>
        )}

        {/* Industry Gallery at the top */}
        {hasIndustryAndFocus && (
          <div className="mb-6">
            <IndustryGallery
              userIndustry={userIndustry}
              userFocusAreas={userFocusAreas}
            />
          </div>
        )}

        {/* Wrapper for the main action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create AI agents Team Card */}
          {dashboardItems.includes('createTeam') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <h2 className="text-xl font-bold text-white mb-3">Create Your AI Agents Team</h2>
                  <p className="text-gray-400 mb-6 text-sm">
                    Describe your use case and let our AI assistant build the optimal team for you.
                  </p>

                  <Button
                    size="sm"
                    leftIcon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
                    onClick={() => navigate('/agents/create')}
                  >
                    Start Creating Team
                  </Button>

                  <div className="mt-6 bg-dark-background rounded-lg p-4 w-full text-left">
                    <h3 className="text-base font-semibold text-[#4D9CFF] mb-3">How it works</h3>
                    <ol className="space-y-2 text-gray-300 text-sm">
                      <li>1. Describe your needs in natural language</li>
                      <li>2. The AI will suggest the optimal agent configuration</li>
                      <li>3. Review and customize the agent's capabilities</li>
                      <li>4. Deploy and start using your AI agents team</li>
                    </ol>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}

          {/* Modify AI Team Card */}
          {dashboardItems.includes('modifyTeam') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <h2 className="text-xl font-bold text-white mb-3">Modify Your AI Agents Team</h2>
                  <p className="text-gray-400 mb-6 text-sm">
                    Select one of your existing teams to view, modify, or test it.
                  </p>

                  <div className="w-full bg-dark-background rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Find AI team name"
                          className="w-full bg-dark-surface border border-dark-border rounded-md py-2 px-4 pl-9 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
                        />
                      </div>
                      <Button
                        variant="secondary"
                        className="!py-2"
                        size="sm"
                        
                      >
                        Search
                      </Button>
                    </div>

                    <div className="overflow-y-auto max-h-[280px] space-y-2 pr-2">
                      {teams.map((team) => (
                        <div
                          key={team.name}
                          className="flex items-center py-2 px-3 rounded-md bg-dark-surface border border-dark-border hover:border-secondary-600 cursor-pointer transition-colors duration-200"
                        >
                          <div className="flex-shrink-0 mr-3">
                            {getTeamTypeIcon(team.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-white text-sm font-medium truncate">{team.name}</span>
                              <span className="text-gray-500 text-xs ml-2">{team.lastModified}</span>
                            </div>

                            <div className="flex items-center">
                              <Tooltip content={team.description}>
                                <p className="truncate text-gray-400 text-ellipsis text-xs max-w-[300px] whitespace-nowrap overflow-hidden">
                                  {team.description}
                                </p>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;