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

  // State for the filters, initialized with the user's profile settings
  const [currentFilterIndustry, setCurrentFilterIndustry] = useState(userIndustry);
  const [currentFilterFunctionAreas, setCurrentFilterFunctionAreas] = useState<string[]>(
    userFocusAreas
  );

  // Memoize the filtered list to avoid re-calculating on every render
  const displayedUseCases = useMemo(
    () =>
      filterUseCases({
        industry: currentFilterIndustry,
        functionAreas: currentFilterFunctionAreas,
      }),
    [currentFilterIndustry, currentFilterFunctionAreas]
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-top">
              <Select
                label="Industry"
                size="sm"
                options={[{ value: '', label: 'All Industries' }, ...industries]}
                value={currentFilterIndustry}
                onChange={(e) => setCurrentFilterIndustry(e.target.value)}
              />
              <Select
                label="Function Areas"
                size="sm"
                options={[{ value: '', label: 'All Function Areas' }, ...focusAreas]}
                value={currentFilterFunctionAreas}
                onChange={(selectedOptions) =>
                  setCurrentFilterFunctionAreas(selectedOptions.map((opt: any) => opt.value))
                }
              />
              <Button
                variant="ghost"
                size="sm"
                className="border-dark-border"
                onClick={() => {
                  setCurrentFilterIndustry('');
                  setCurrentFilterFunctionAreas([]);
                }}
                leftIcon={<FilterX className="h-2 w-2" />}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto p-1">
            {displayedUseCases.map((useCase) => (
              <div
                key={useCase.id}
                className="bg-dark-surface rounded-lg p-4 border border-dark-border hover:border-secondary-600 cursor-pointer transition-colors"
                onClick={() => handleUseCaseSelect(useCase)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-medium text-sm">{useCase.title}</h3>
                  <Badge className={getDifficultyColor(useCase.difficulty)} size="sm">
                    {useCase.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {useCase.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-3 w-3" />
                    <span>{useCase.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="h-3 w-3" />
                    <span>{useCase.usage} uses</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {useCase.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-dark-background text-gray-400 px-2 py-1 rounded"
                    >
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
            ))}
          </div>

          {/* No Results Message */}
          {displayedUseCases.length === 0 && (
            <div className="text-center py-8">
              <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Templates Found</h3>
              <p className="text-gray-400 text-sm">
                Try adjusting or clearing your filters to see all available templates.
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Use Case Detail Modal (No changes needed here) */}
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