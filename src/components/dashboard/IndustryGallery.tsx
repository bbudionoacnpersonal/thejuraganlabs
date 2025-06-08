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
          {/* (Your Filter Section here) */}

          {/* Use Cases Grid */}
          {/* (Your Grid Section here with displayedUseCases) */}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center pt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for Selected Use Case */}
      {selectedUseCase && (
        <Modal isOpen={!!selectedUseCase} onClose={() => setSelectedUseCase(null)} title={selectedUseCase.title} size="xl">
          {/* Modal Content here */}
        </Modal>
      )}
    </>
  );
};

export default IndustryGallery;