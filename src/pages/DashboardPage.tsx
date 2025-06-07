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
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Admin Settings Section */}
        {isAdmin && dashboardItems.includes('settings') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <AdminSettings />
          </motion.div>
        )}

        <div className={`grid grid-cols-1 ${hasIndustryAndFocus ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-8`}>
          {/* Create AI agents Team Card */}
          {dashboardItems.includes('createTeam') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Create Your AI Agents Team</h2>
                  <p className="text-gray-400 mb-8">
                    Describe your use case and let us help you create your AI agents team.
                  </p>
                  
                  <Button
                    size="lg"
                    leftIcon={<ChatBubbleLeftRightIcon className="h-6 w-6" />}
                    onClick={() => navigate('/agents/create')}
                  >
                    Start Creating Team
                  </Button>

                  <div className="mt-8 bg-dark-background rounded-lg p-6 w-full text-left">
                    <h3 className="text-lg font-semibold text-[#4D9CFF] mb-4">How it works</h3>
                    <ol className="space-y-3 text-gray-300">
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
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Modify Your AI Agents Team</h2>
                  <p className="text-gray-400 mb-8">
                    Double click one of your team and modify it to suite you.
                  </p>

                  <div className="w-full bg-dark-background rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-2 w-2 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Find team name"
                          className="w-full bg-dark-surface border border-dark-border rounded-md py-1 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
                        />
                      </div>
                      <Button 
                        variant="secondary" 
                        className="!h-[38px]"
                      >
                        Search
                      </Button>
                    </div>

                    <div className="overflow-y-auto max-h-[315px] space-y-1 pr-2">
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
                              <span className="text-white text-medium font-medium truncate">{team.name}</span>  
                              <span className="text-gray-600 text-xs ml-2">{team.lastModified}</span>
                            </div>

                            <div className="flex items-center">
                              <Tooltip content={team.description}>
                                <p className="truncate text-gray-400 text-ellipsis text-sm max-w-[300px] whitespace-nowrap overflow-hidden">
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

          {/* Industry Gallery Card - Only show if user has selected industry and focus areas */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-8">
          {hasIndustryAndFocus && (
            <IndustryGallery 
              userIndustry={userIndustry}
              userFocusAreas={userFocusAreas}
            />
          )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;