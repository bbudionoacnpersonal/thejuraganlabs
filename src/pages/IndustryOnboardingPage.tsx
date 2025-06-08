import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import useAuthStore from '@/store/authStore';
import { industries, focusAreas } from '@/mockdata/industry_functions';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const IndustryOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const savedIndustry = localStorage.getItem('user_industry');
    const savedFocusAreas = localStorage.getItem('user_focus_areas');
    if (savedIndustry) {
      setSelectedIndustry(savedIndustry);
    }
    if (savedFocusAreas) {
      setSelectedFocusAreas(JSON.parse(savedFocusAreas));
    }
  }, []);

  const groupedFocusAreas = useMemo(() => {
    return focusAreas.reduce((acc, area) => {
      const group = area.function_group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(area);
      return acc;
    }, {} as Record<string, typeof focusAreas>);
  }, []);

  const handleAccordionClick = (groupName: string) => {
    setActiveAccordion(prev => (prev === groupName ? null : groupName));
  };

  const handleFocusAreaChange = (value: string) => {
    if (error) setError(null);
    setSelectedFocusAreas((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (!selectedIndustry) {
      setError('Please select your industry.');
      return;
    }
    if (selectedFocusAreas.length === 0) {
      setError('Please select at least one focus area.');
      return;
    }
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
        className="w-full max-w-3xl"
      >
        <Card>
          <CardBody className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome, {user?.name}!</h1>
              <p className="text-gray-400">
                Help us personalize your experience by telling us about your industry and focus areas.
              </p>
            </div>

            <div className="space-y-8">
              {error && (
                <div className="bg-error-500/20 border border-error-500 text-error-100 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* 🎯 Corrected Industry Select */}
              <Select
                label="What industry are you in?"
                options={industries}
                value={selectedIndustry}
                onChange={(value) => {
                  setSelectedIndustry(value); // ✅ Direct value, not e.target.value
                  if (error) setError(null);
                }}
              />

              {/* Accordion UI for Focus Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  What are your key focus areas?
                </label>
                <p className="text-sm text-gray-500 mb-4">Select all that apply.</p>
                
                <div className="space-y-2 border border-dark-border rounded-lg p-2">
                  {Object.entries(groupedFocusAreas).map(([groupName, areas]) => (
                    <div key={groupName} className="border-b border-dark-border last:border-b-0">
                      <button
                        type="button"
                        className="w-full flex justify-between items-center p-2 hover:bg-dark-surface rounded-md"
                        onClick={() => handleAccordionClick(groupName)}
                      >
                        <span className="text-base font-semibold text-gray-300 text-left">
                          {groupName}
                        </span>
                        <ChevronDownIcon
                          className={`h-2 w-2 text-gray-400 transition-transform duration-300 ${
                            activeAccordion === groupName ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeAccordion === groupName && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 p-2">
                              {areas.map((area) => (
                                <label
                                  key={area.value}
                                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-dark-surface/50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="h-2 w-2 rounded bg-dark-surface border-dark-border text-primary-500 focus:ring-primary-500"
                                    checked={selectedFocusAreas.includes(area.value)}
                                    onChange={() => handleFocusAreaChange(area.value)}
                                  />
                                  <span className="text-sm text-gray-300">{area.label}</span>
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button variant="ghost" onClick={() => navigate('/dashboard')} fullWidth>
                  Skip for now
                </Button>
                <Button onClick={handleSubmit} fullWidth>
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
