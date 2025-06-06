import React, { useState } from 'react';
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
  const [dontAskAgain, setDontAskAgain] = useState(false);
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

    // Save preferences
    localStorage.setItem('user_industry', selectedIndustry);
    localStorage.setItem('user_focus_areas', JSON.stringify(selectedFocusAreas));
    
    // Save the "don't ask again" preference if checked
    if (dontAskAgain) {
      localStorage.setItem('skip_industry_confirmation', 'true');
    } else {
      localStorage.removeItem('skip_industry_confirmation');
    }

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

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="dontAskAgain"
                  checked={dontAskAgain}
                  onChange={(e) => setDontAskAgain(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-border rounded bg-dark-400"
                />
                <label htmlFor="dontAskAgain" className="ml-2 block text-sm text-gray-300">
                  Don't ask this question again
                </label>
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