import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import useAuthStore from '@/store/authStore';
import { industries, focusAreas } from '@/mockdata/industry_functions';

// Define a type for the grouped options structure that the Select component will use
type GroupedOption = {
  label: string;
  options: { value: string; label: string }[];
};

const IndustryOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Memoize the transformation of the flat focusAreas array into a grouped structure
  // This is what the <Select> component will use to create the <optgroup> UI
  const groupedFocusAreaOptions: GroupedOption[] = useMemo(() => {
    const groups: Record<string, { value: string; label: string }[]> = {};
    
    // Create the groups from the flat array
    for (const area of focusAreas) {
      const groupName = area.function_group || 'Other';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({ value: area.value, label: area.label });
    }

    // Format into the final array structure that the Select component expects
    return Object.keys(groups).map(groupName => ({
      label: groupName,
      options: groups[groupName],
    }));
  }, []);
  
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
                {/* Industry Selection (unchanged) */}
                <Select
                  label="What industry are you in?"
                  options={industries}
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                />

                {/* Single, Grouped Multi-Select for Focus Areas */}
                <Select
                  label="What are your key focus areas?"
                  options={groupedFocusAreaOptions}
                  value={focusAreas.filter(area => selectedFocusAreas.includes(area.value))}
                  // ===============================================
                  // 🎯 THIS IS THE FIX 
                  // This robust handler prevents the error when clearing the selection.
                  // ===============================================
                  onChange={(selectedOptions) => {
                    // If selectedOptions is null or not an array, treat it as an empty array
                    const newValues = Array.isArray(selectedOptions)
                      ? selectedOptions.map(opt => opt.value)
                      : [];
                    setSelectedFocusAreas(newValues);
                  }}
                  isMulti
                  helperText="Select all that apply"
                />
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