// src/components/dashboard/IndustryGallery.tsx

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import { Library, FilterX } from 'lucide-react';
import {
  SparklesIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  TagIcon,
  DocumentArrowDownIcon,
  PlayIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon, // Import search icon
} from '@heroicons/react/24/outline';
import {
  filterUseCases,
  UseCaseTemplate,
} from '@/mockdata/industryFunctionGallery';
import { industries, focusAreas } from '@/mockdata/industry_functions';

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

  // State for the filters
  const [currentFilterIndustry, setCurrentFilterIndustry] = useState(userIndustry);
  const [currentFilterFunctionAreas, setCurrentFilterFunctionAreas] = useState<string[]>(
    userFocusAreas
  );
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  // Memoize the filtered list to include the new search term
  const displayedUseCases = useMemo(
    () =>
      filterUseCases({
        industry: currentFilterIndustry,
        functionAreas: currentFilterFunctionAreas,
        searchTerm: searchTerm, // Pass search term to filter function
      }),
    [currentFilterIndustry, currentFilterFunctionAreas, searchTerm] // Add searchTerm to dependency array
  );

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="h-full">
          <CardBody className="flex flex-col items-center text-center p-4">
            <h2 className="text-xl font-bold text-white mb-2">Industry Use Case Gallery</h2>
            <p className="text-gray-400 mb-4 text-sm px-4">
              Explore pre-built AI agent templates tailored for your industry and focus areas.
            </p>
            <div className="w-full bg-dark-background rounded-lg p-4">
              <Button
                size="sm"
                leftIcon={<Library className="h-4 w-4 " />}
                onClick={() => setShowGallery(true)}
                className="w-full"
              >
                Explore Use Case Gallery
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-surface p-4 rounded-lg border border-dark-border"
        >
          <div className="flex flex-wrap items-end gap-4">
            {/* Industry Select */}
            <div className="flex-1 min-w-[200px]">
              <Select
                label="Industry"
                size="sm"
                options={[{ value: '', label: 'All Industries' }, ...industries]}
                value={currentFilterIndustry}
                onChange={(value) => setCurrentFilterIndustry(value as string)}
              />
            </div>
        
            {/* Function Areas Select */}
            <div className="flex-1 min-w-[200px]">
              <Select
                label="Function Areas"
                size="sm"
                options={focusAreas} // "All" is handled by clearing the filter
                value={currentFilterFunctionAreas}
                onChange={(value) => setCurrentFilterFunctionAreas(value as string[])}
              />
            </div>
        
            {/* Search Input */}
            <div className="relative flex-grow min-w-[250px] min-h-[100px]">
              <label htmlFor="gallery-search" className="block text-sm font-medium text-gray-300 mb-1">
                Search
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-7">
                <MagnifyingGlassIcon className="h-2 w-2 text-gray-400" />
              </div>
              <input
                id="gallery-search"
                type="text"
                placeholder="Search by title, description, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-md py-2 pl-12 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-secondary-600"
              />
            </div>
        
            {/* Clear Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="border border-dark-border"
                onClick={() => {
                  setCurrentFilterIndustry('');
                  setCurrentFilterFunctionAreas([]);
                  setSearchTerm(''); // Also clear the search term
                }}
                leftIcon={<FilterX className="h-2 w-2" />}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </motion.div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto p-1">
            {displayedUseCases.map((useCase) => {
              const industryLabel =
                industries.find((i) => i.value === useCase.industry)?.label ||
                useCase.industry;
              return (
                <div
                  key={useCase.id}
                  className="bg-dark-surface rounded-lg p-4 border border-dark-border hover:border-secondary-600 cursor-pointer transition-colors"
                  onClick={() => handleUseCaseSelect(useCase)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-medium text-sm pr-2">{useCase.title}</h3>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <Badge className="text-primary-700 bg-primary-100" size="sm">
                        <div className="flex items-center gap-1">
                          <BuildingOffice2Icon className="h-3 w-3" />
                          {industryLabel}
                        </div>
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                    {useCase.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-3 w-3" />
                      <span>{useCase.estimatedTime}</span>
                      <Badge className={getDifficultyColor(useCase.difficulty)} size="sm">
                        {useCase.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="h-3 w-3" />
                      <span>{useCase.usage} uses</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {useCase.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-dark-background text-gray-400 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {useCase.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{useCase.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results Message */}
          {displayedUseCases.length === 0 && (
            <div className="text-center py-8">
              <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Templates Found</h3>
              <p className="text-gray-400 text-sm">
                Try adjusting or clearing your filters to find a use case.
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Use Case Detail Modal */}
      {selectedUseCase && (
        <Modal
          isOpen={!!selectedUseCase}
          onClose={() => setSelectedUseCase(null)}
          title={selectedUseCase.title}
          size="xl"
        >
          {/* ... modal content (assumed to be complete) ... */}
        </Modal>
      )}
    </>
  );
};

export default IndustryGallery;