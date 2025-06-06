import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import useAuthStore from '@/store/authStore';

const industries = [
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare & Life Sciences' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing & Supply Chain' },
  { value: 'technology', label: 'Technology & Software' },
  { value: 'telecom', label: 'Telecommunications' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'education', label: 'Education & Training' },
  { value: 'government', label: 'Government & Public Sector' },
  { value: 'consulting', label: 'Professional Services & Consulting' }
];

const focusAreas = [
  { value: 'customer_service', label: 'Customer Service & Support' },
  { value: 'sales', label: 'Sales & Revenue Growth' },
  { value: 'marketing', label: 'Marketing & Brand Management' },
  { value: 'operations', label: 'Operations & Process Optimization' },
  { value: 'hr', label: 'HR & Talent Management' },
  { value: 'finance', label: 'Financial Planning & Analysis' },
  { value: 'risk', label: 'Risk Management & Compliance' },
  { value: 'innovation', label: 'Innovation & R&D' },
  { value: 'data', label: 'Data Analytics & Business Intelligence' },
  { value: 'digital', label: 'Digital Transformation' }
];

const IndustryOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedIndustry) {
      setError('Please select your industry');
      return;
    }

    if (selectedFocusAreas.length === 0) {
      setError('Please select at least one focus area');
      return;
    }

    // Here you would typically save these preferences to your backend
    // For now, we'll just store them in localStorage
    localStorage.setItem('user_industry', selectedIndustry);
    localStorage.setItem('user_focus_areas', JSON.stringify(selectedFocusAreas));

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardBody className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome, {user?.name}!</h1>
              <p className="text-gray-400">
                Help us personalize your experience by telling us about your industry and focus areas.
              </p>
            </div>

            <div className="space-y-6">
              {error && (
                <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <Select
                  label="What industry are you in?"
                  options={industries}
                  value={selectedIndustry}
                  onChange={(value) => setSelectedIndustry(value as string)}
                  className="mb-6"
                />

                <Select
                  label="What are your key focus areas?"
                  options={focusAreas}
                  value={selectedFocusAreas}
                  onChange={(value) => setSelectedFocusAreas(Array.isArray(value) ? value : [value as string])}
                  isMulti
                  helperText="Select all that apply"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  fullWidth
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default IndustryOnboardingPage;