import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import useAuthStore from '@/store/authStore';
import { industries, focusAreas } from '@/mockdata/industry_functions';

const IndustryOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Group focus areas by their 'function_group' property
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

  const handleFocusAreaChange = (value: string) => {
    setSelectedFocusAreas((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (!selectedIndustry) {
      setError('Please select your industry');
      return;
    }

    if (selectedFocusAreas.length === 0) {
      setError('Please select at least one focus area');
      return;
    }

    // Save preferences
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
        className="w-full max-w-3xl" // Increased max-width for better layout
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
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="mb-8" // Add more margin to separate from the next section
                />

                {/* --- NEW Grouped Focus Area Selection --- */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    What are your key focus areas?
                  </label>
                  <p className="text-sm text-gray-500 mb-4">Select all that apply.</p>
                  
                  <div className="space-y-4">
                    {Object.entries(groupedFocusAreas).map(([groupName, areas]) => (
                      <div key={groupName}>
                        <h4 className="text-base font-semibold text-gray-300 mb-3 border-b border-dark-border pb-2">
                          {groupName}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                          {areas.map((area) => (
                            <label
                              key={area.value}
                              className="flex items-center space-x-3 p-2 rounded-md hover:bg-dark-surface cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded bg-dark-surface border-dark-border text-primary-500 focus:ring-primary-500"
                                checked={selectedFocusAreas.includes(area.value)}
                                onChange={() => handleFocusAreaChange(area.value)}
                              />
                              <span className="text-sm text-gray-300">{area.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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