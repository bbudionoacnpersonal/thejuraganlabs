import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import {Library, Bot} from 'lucide-react';
import { 
  SparklesIcon, 
  ClockIcon, 
  StarIcon,
  TagIcon,
  DocumentArrowDownIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { 
  getUseCasesByIndustryAndFunction, 
  getPopularUseCases,
  UseCaseTemplate 
} from '@/mockdata/industryFunctionGallery';
import { industries, focusAreas } from '@/mockdata/industry_functions';

interface IndustryGalleryProps {
  userIndustry: string;
  userFocusAreas: string[];
}

const IndustryGallery: React.FC<IndustryGalleryProps> = ({ userIndustry, userFocusAreas }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<'recommended' | 'popular' | 'all'>('recommended');

  // Get industry and focus area details
  const industryDetails = industries.find(i => i.value === userIndustry);
  const focusAreaDetails = focusAreas.filter(f => userFocusAreas.includes(f.value));

  // Get use cases based on user's industry and focus areas
  const recommendedUseCases = getUseCasesByIndustryAndFunction(userIndustry, userFocusAreas);
  const popularUseCases = getPopularUseCases();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success-600 bg-success-100';
      case 'intermediate': return 'text-warning-600 bg-warning-100';
      case 'advanced': return 'text-error-600 bg-error-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleUseCaseSelect = (useCase: UseCaseTemplate) => {
    setSelectedUseCase(useCase);
  };

  const handleUseTemplate = (useCase: UseCaseTemplate) => {
    // Here you would typically navigate to create agent page with the template
    console.log('Using template:', useCase.title);
    // You could also copy the autogen structure to clipboard or pass it to the create agent page
    setSelectedUseCase(null);
    setShowGallery(false);
  };

  const exportTemplate = (useCase: UseCaseTemplate) => {
    const dataStr = JSON.stringify(useCase.autogenStructure, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${useCase.id}_template.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getDisplayUseCases = () => {
    switch (activeTab) {
      case 'recommended': return recommendedUseCases;
      case 'popular': return popularUseCases;
      case 'all': return [...recommendedUseCases, ...popularUseCases].filter((useCase, index, self) => 
        index === self.findIndex(u => u.id === useCase.id)
      );
      default: return recommendedUseCases;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="h-full">
          <CardBody className="flex flex-col items-center text-center p-2">
            <h2 className="text-2xl font-bold text-white mb-2">Industry Use Case Gallery</h2>
            <p className="text-gray-400 mb-4">
              Explore pre-built AI agents templates tailored for {industryDetails?.label} industry
              {focusAreaDetails.length > 0 && (
                <span> focusing on {focusAreaDetails.map(f => f.label).join(', ')}</span>
              )}
            </p>

            <div className="w-full bg-dark-background rounded-lg p-4">
                
              <Button
                size="sm"
                leftIcon={<Library className="h-4 w-4" />}
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
        title="Industry and Functional Use Case Gallery"
        size="xl"
      >
        <div className="space-y-4">

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {getDisplayUseCases().map((useCase) => (
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
                
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">{useCase.description}</p>
                
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
                    <span key={tag} className="text-xs bg-dark-background text-gray-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {useCase.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{useCase.tags.length - 2}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {getDisplayUseCases().length === 0 && (
            <div className="text-center py-8">
              <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
              <p className="text-gray-400">Try selecting a different tab or check back later for new templates.</p>
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={getDifficultyColor(selectedUseCase.difficulty)}>
                  {selectedUseCase.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <ClockIcon className="h-4 w-4" />
                  <span>{selectedUseCase.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <StarIcon className="h-4 w-4" />
                  <span>{selectedUseCase.rating}/5</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<DocumentArrowDownIcon className="h-4 w-4" />}
                  onClick={() => exportTemplate(selectedUseCase)}
                >
                  Export JSON
                </Button>
                <Button
                  size="sm"
                  leftIcon={<PlayIcon className="h-4 w-4" />}
                  onClick={() => handleUseTemplate(selectedUseCase)}
                >
                  Use Template
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-gray-400 text-sm">{selectedUseCase.description}</p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Function Areas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUseCase.functionAreas.map((area) => {
                  const areaDetails = focusAreas.find(f => f.value === area);
                  return (
                    <Badge key={area} variant="secondary" size="sm">
                      {areaDetails?.label || area}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUseCase.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-dark-background text-gray-400 px-2 py-1 rounded">
                    <TagIcon className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">AI Agents Team Structure</h4>
              <div className="bg-dark-background rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <UserGroupIcon className="h-5 w-5 text-secondary-600" />
                  <span className="text-white font-medium">{selectedUseCase.autogenStructure.label}</span>
                  <Badge size="sm">{selectedUseCase.autogenStructure.provider.split('.').pop()}</Badge>
                </div>
                <p className="text-gray-400 text-sm mb-3">{selectedUseCase.autogenStructure.description}</p>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-300">Agents ({selectedUseCase.autogenStructure.config.participants.length})</h5>
                  {selectedUseCase.autogenStructure.config.participants.map((participant, index) => (
                    <div key={index} className="flex items-center justify-between bg-dark-surface rounded p-2">
                      <div>
                        <span className="text-white text-sm">{participant.label}</span>
                        <p className="text-gray-400 text-xs">{participant.description}</p>
                      </div>
                      <Badge size="sm">{participant.config.tools?.length || 0} tools</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Created by {selectedUseCase.createdBy}</span>
              <span>Last updated: {selectedUseCase.lastUpdated}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IndustryGallery;