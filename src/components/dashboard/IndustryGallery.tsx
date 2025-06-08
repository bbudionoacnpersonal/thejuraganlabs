import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import { Library, FilterX, Bot } from 'lucide-react';
import {
  SparklesIcon,
  CodeBracketIcon,
  UserGroupIcon,
  UsersIcon,
  TagIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { industries, focusAreas } from '@/mockdata/industry_functions';
import { industryFunctionGallery } from '@/mockdata/industryFunctionGallery';

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

  const [currentFilterIndustry, setCurrentFilterIndustry] = useState(userIndustry);
  const [currentFilterFunctionAreas, setCurrentFilterFunctionAreas] = useState<string[]>(userFocusAreas);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 🔥 Filtering Logic
  const filteredUseCases = useMemo(() => {
    return industryFunctionGallery.filter((useCase) => {
      const matchIndustry = !currentFilterIndustry || useCase.industry === currentFilterIndustry;
      const matchFunctionAreas =
        currentFilterFunctionAreas.length === 0 ||
        currentFilterFunctionAreas.some((area) => useCase.functionAreas.includes(area));
      const matchSearchTerm =
        searchTerm === '' ||
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchIndustry && matchFunctionAreas && matchSearchTerm;
    });
  }, [currentFilterIndustry, currentFilterFunctionAreas, searchTerm]);

  // Pagination
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

  const handleUseTemplate = (useCase: UseCaseTemplate) => {
    console.log('Using template:', useCase.title);
    setSelectedUseCase(null);
    setShowGallery(false);
  };

  const exportTemplate = (useCase: UseCaseTemplate) => {
    const dataStr = JSON.stringify(useCase.autogenStructure, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${useCase.id}_template.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const industryLabel = currentFilterIndustry
    ? industries.find((i) => i.value === currentFilterIndustry)?.label || 'All Industries'
    : 'All Industries';

  const functionAreasLabel = currentFilterFunctionAreas.length > 0
    ? `Function Areas (${currentFilterFunctionAreas.length} selected)`
    : 'All Functions';

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="h-full">
          <CardBody className="flex flex-col items-center text-center p-4">
            <h2 className="text-xl font-bold text-white mb-2">Industry Use Case Gallery</h2>
            <p className="text-gray-400 mb-4 text-sm px-4">
              Explore pre-built AI agent templates tailored for your industry and focus areas.
            </p>
            <div className="w-full bg-dark-background rounded-lg p-4">
              <Button size="sm" leftIcon={<Library className="h-4 w-4" />} onClick={() => setShowGallery(true)} className="w-full">
                Explore Use Case Gallery ({industryFunctionGallery.length} templates)
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-dark-background rounded-lg">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-surface border border-dark-border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
              />
            </div>
            
            <Select
              value={currentFilterIndustry}
              options={[
                { value: '', label: 'All Industries' },
                ...industries.map(industry => ({
                  value: industry.value,
                  label: industry.label
                }))
              ]}
              onChange={(value) => setCurrentFilterIndustry(value as string)}
              selectClassName="bg-dark-surface border-dark-border text-white"
            />
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {filteredUseCases.length} of {industryFunctionGallery.length} templates
              </span>
              {(currentFilterIndustry || currentFilterFunctionAreas.length > 0 || searchTerm) && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setCurrentFilterIndustry('');
                    setCurrentFilterFunctionAreas([]);
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  leftIcon={<FilterX className="h-3 w-3" />}
                >
                  Clear
                </Button>
              )}
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
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <BuildingOffice2Icon className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-500">
                      {industries.find(i => i.value === useCase.industry)?.label || useCase.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-500">{useCase.usage} uses</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {useCase.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-dark-surface px-2 py-1 rounded text-gray-400">
                      {tag}
                    </span>
                  ))}
                  {useCase.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{useCase.tags.length - 3}</span>
                  )}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center pt-4">
              <Button
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <span className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Modal for Selected Use Case */}
      {selectedUseCase && (
        <Modal isOpen={!!selectedUseCase} onClose={() => setSelectedUseCase(null)} title={selectedUseCase.title} size="xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(selectedUseCase.difficulty)}>
                  {selectedUseCase.difficulty}
                </Badge>
                <span className="text-sm text-gray-400">{selectedUseCase.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">⭐ {selectedUseCase.rating}/5</span>
                <span className="text-sm text-gray-400">({selectedUseCase.usage} uses)</span>
              </div>
            </div>
            
            <p className="text-gray-300">{selectedUseCase.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Industry</h4>
                <p className="text-sm text-gray-400">
                  {industries.find(i => i.value === selectedUseCase.industry)?.label || selectedUseCase.industry}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Function Areas</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedUseCase.functionAreas.map((area) => (
                    <span key={area} className="text-xs bg-dark-surface px-2 py-1 rounded text-gray-400">
                      {focusAreas.find(f => f.value === area)?.label || area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {selectedUseCase.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-dark-surface px-2 py-1 rounded text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleUseTemplate(selectedUseCase)} className="flex-1">
                Use This Template
              </Button>
              <Button variant="ghost" onClick={() => exportTemplate(selectedUseCase)}>
                <CodeBracketIcon className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IndustryGallery;