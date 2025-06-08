import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select'; // <-- assumes it's from your UI components
import { Library, Bot } from 'lucide-react';
import {
  BuildingOffice2Icon,
  UsersIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { industries, focusAreas } from '@/mockdata/industry_functions';
import { industryFunctionGallery } from '@/mockdata/industryFunctionGallery'; // <-- make sure this is not undefined

interface UseCaseTemplate {
  id: string;
  title: string;
  description: string;
  industry: string;
  functionAreas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  isPopular?: boolean;
  autogenStructure: any;
  usage: number;
  rating: number;
  createdBy: string;
  lastUpdated: string;
  agents: string[];
}

interface IndustryGalleryProps {
  userIndustry: string;
  userFocusAreas: string[];
}

const IndustryGallery: React.FC<IndustryGalleryProps> = ({
  userIndustry,
  userFocusAreas,
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseTemplate | null>(null);

  const [currentFilterIndustry, setCurrentFilterIndustry] = useState('');
  const [currentFilterFunctionArea, setCurrentFilterFunctionArea] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState({ industry: '', functionArea: '', term: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredUseCases = useMemo(() => {
    return (industryFunctionGallery || []).filter((useCase) => {
      const matchIndustry = !submittedSearch.industry || useCase.industry === submittedSearch.industry;
      const matchFunctionArea = !submittedSearch.functionArea || useCase.functionAreas.includes(submittedSearch.functionArea);
      const matchSearchTerm =
        submittedSearch.term === '' ||
        useCase.title.toLowerCase().includes(submittedSearch.term.toLowerCase()) ||
        useCase.description.toLowerCase().includes(submittedSearch.term.toLowerCase()) ||
        useCase.tags.some((tag) => tag.toLowerCase().includes(submittedSearch.term.toLowerCase()));

      return matchIndustry && matchFunctionArea && matchSearchTerm;
    });
  }, [submittedSearch]);

  const totalPages = Math.ceil(filteredUseCases.length / pageSize);
  const displayedUseCases = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredUseCases.slice(startIdx, startIdx + pageSize);
  }, [filteredUseCases, currentPage]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success-600 bg-success-100';
      case 'intermediate':
        return 'text-warning-600 bg-warning-100';
      case 'advanced':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleUseCaseSelect = (useCase: UseCaseTemplate) => {
    setSelectedUseCase(useCase);
  };

  const handleSearch = () => {
    setSubmittedSearch({
      industry: currentFilterIndustry,
      functionArea: currentFilterFunctionArea,
      term: searchTerm,
    });
    setCurrentPage(1);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="h-full">
          <CardBody className="flex flex-col items-center text-center p-4">
            <h2 className="text-xl font-bold text-white mb-2">Use Case Gallery</h2>
            <p className="text-gray-400 mb-4 text-sm px-4">
              Explore AI agent templates by industry and function.
            </p>
            <div className="w-full bg-dark-background rounded-lg p-4">
              <Button size="sm" leftIcon={<Library className="h-4 w-4" />} onClick={() => setShowGallery(true)} className="w-full">
                Explore Gallery ({industryFunctionGallery?.length || 0} templates)
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Gallery Modal */}
      <Modal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        title="Industry & Functional Use Case Gallery"
        size="3xl"
      >
        <div className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-dark-background rounded-lg items-end">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry</label>
              <Select
                value={currentFilterIndustry}
                size="sm"
                options={[
                  { value: '', label: 'All Industries' },
                  ...(industries?.map?.((industry) => ({
                    value: industry.value,
                    label: industry.label
                  })) || [])
                ]}
                onChange={(value) => setCurrentFilterIndustry(value as string)}
                selectClassName="bg-dark-surface border-dark-border text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Function Area</label>
              <Select
                value={currentFilterFunctionArea}
                size="sm"
                options={[
                  { value: '', label: 'All Functions' },
                  ...(focusAreas?.map?.((focus) => ({
                    value: focus.value,
                    label: focus.label
                  })) || [])
                ]}
                onChange={(value) => setCurrentFilterFunctionArea(value as string)}
                selectClassName="bg-dark-surface border-dark-border text-white"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-400 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm pl-3 pr-4 py-[0.5rem] bg-dark-surface border border-dark-border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
              />
            </div>

            <div>
              <Button size="sm" leftIcon={  <MagnifyingGlassIcon className="h-2 w-2 mr-2" />} onClick={handleSearch} className="w-full">
              
                Search
              </Button>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {displayedUseCases.map((useCase) => (
              <div
                key={useCase.id}
                className="bg-dark-background p-4 rounded-lg border border-dark-border hover:border-secondary-600 cursor-pointer transition-colors"
                onClick={() => handleUseCaseSelect(useCase)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium text-sm">{useCase.title}</h3>
                  <div className="flex items-center gap-1">
                    {useCase.isPopular && (
                      <Badge size="sm" variant="accent">Popular</Badge>
                    )}
                    <Badge size="sm" className={getDifficultyColor(useCase.difficulty)}>
                      {useCase.difficulty}
                    </Badge>
                  </div>
                </div>
          
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">{useCase.description}</p>
          
                {/* Industry and Usage */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <BuildingOffice2Icon className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-500">
                      {industries?.find(i => i.value === useCase.industry)?.label || useCase.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-500">{useCase.usage} uses</span>
                  </div>
                </div>
          
                {/* Provider */}
                {useCase.autogenStructure?.provider && (
                  <div className="text-xs text-gray-500 mb-2">
                    Team Type: {useCase.autogenStructure.provider}
                  </div>
                )}
          
                {/* Agents */}
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {(useCase.autogenStructure?.participants || []).map((participant: any, idx: number) => (
                    <Badge key={idx} size="sm" className="bg-primary-600 text-white">
                      {participants.label}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {filteredUseCases.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default IndustryGallery;