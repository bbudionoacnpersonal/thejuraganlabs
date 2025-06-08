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
  
  // State for the cascading selection
  const [selectedFunctionGroup, setSelectedFunctionGroup] = useState<string>('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  
  const [error, setError] = useState<string | null>(null);

  // Memoize the list of unique function groups for the first dropdown
  const functionGroupOptions = useMemo(() => {
    const groups = new Set(focusAreas.map(area => area.function_group));
    return Array.from(groups).map(group => ({ value: group, label: group }));
  }, []);

  // Memoize the available focus areas based on the selected group
  const availableFocusAreas = useMemo(() => {
    if (!selectedFunctionGroup) return [];
    return focusAreas.filter(area => area.function_group === selectedFunctionGroup);
  }, [selectedFunctionGroup]);

  // Handler for when the function group changes
  const handleGroupChange = (groupValue: string) => {
    setSelectedFunctionGroup(groupValue);
    setSelectedFocusAreas([]); 
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

              <div className="space-y-6">
                {/* Step 1: Industry Selection */}
                <Select
                  label="What industry are you in?"
                  options={industries}
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                />

                {/* Step 2: Function Group Selection */}
                <Select
                  label="First, select a Function Group"
                  options={functionGroupOptions}
                  value={selectedFunctionGroup}
                  onChange={(e) => handleGroupChange(e.target.value)}
                />

                {/* Step 3: Focus Area Selection (appears after a group is chosen) */}
                {selectedFunctionGroup && (
                    <motion.div
                        key="focus-area-select"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Select
                            label="Now, select your key focus areas"
                            options={availableFocusAreas}
                            value={focusAreas.filter(area => selectedFocusAreas.includes(area.value))}
                            // ===============================================
                            // 🎯 THIS IS THE FIX 
                            // ===============================================
                            onChange={(selectedOptions) => {
                                // Ensure selectedOptions is an array before mapping
                                const validOptions = Array.isArray(selectedOptions) ? selectedOptions : [];
                                
                                // Filter out any potential null/undefined items before mapping
                                const newValues = validOptions
                                    .filter(opt => opt && typeof opt.value !== 'undefined')
                                    .map(opt => opt.value);
                                    
                                setSelectedFocusAreas(newValues);
                            }}
                            isMulti
                            helperText="Select all that apply from the chosen group"
                        />
                    </motion.div>
                )}
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