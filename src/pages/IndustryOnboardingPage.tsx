import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import useAuthStore from '@/store/authStore';
import { industries, focusAreas } from '@/mockdata/industry_functions';

type GroupedOption = {
  label: string;
  options: { value: string; label: string }[];
};

const IndustryOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // State will now hold the simple string values.
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  
  const [error, setError] = useState<string | null>(null);

  // Set initial state from localStorage only once when the component mounts
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

  // Group focus areas for the dropdown's visual presentation
  const groupedFocusAreaOptions: GroupedOption[] = useMemo(() => {
    const groups: Record<string, { value: string; label: string }[]> = {};
    for (const area of focusAreas) {
      const groupName = area.function_group || 'Other';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({ value: area.value, label: area.label });
    }
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
                <Select
                  label="What industry are you in?"
                  options={industries}
                  // Use defaultValue to set the initial visible state
                  defaultValue={industries.find(i => i.value === selectedIndustry)}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                />

                {/* --- UPDATED Grouped Select Dropdown --- */}
                <Select
                  label="What are your key focus areas?"
                  options={groupedFocusAreaOptions}
                  isMulti
                  helperText="Select all that apply"
                  // 🎯 Use defaultValue for initial render based on localStorage
                  defaultValue={focusAreas.filter(area => selectedFocusAreas.includes(area.value))}
                  // ===============================================
                  // 🎯 THIS IS THE FIX 
                  // The `value` prop is removed. The `onChange` handler is now much simpler
                  // and more resilient. It just receives the new selection and updates state.
                  // ===============================================
                  onChange={(selectedOptions) => {
                    // This defensive check ensures we always have an array
                    const newValues = Array.isArray(selectedOptions)
                      ? selectedOptions.map(opt => opt.value)
                      : [];
                    setSelectedFocusAreas(newValues);
                  }}
                />
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