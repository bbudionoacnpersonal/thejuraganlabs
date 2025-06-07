import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { industries, focusAreas } from '@/mockdata/industry_functions';

const NavbarLogo: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const isCreateAgentPage = location.pathname === '/agents/create';

  // Get stored preferences
  const userIndustry = localStorage.getItem('user_industry');
  const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');
  
  const industryLabel = industries.find(i => i.value === userIndustry)?.label;
  const focusAreaLabels = userFocusAreas
    .map((area: string) => focusAreas.find(f => f.value === area)?.label)
    .filter(Boolean);
  
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isCreateAgentPage) {
      e.preventDefault();
      setShowConfirmation(true);
    }
  };

  const handleConfirm = (action: 'save' | 'discard' | 'cancel') => {
    setShowConfirmation(false);
    
    if (action === 'save') {
      // TODO: Save changes
      navigate(user ? '/dashboard' : '/');
    } else if (action === 'discard') {
      navigate(user ? '/dashboard' : '/');
    }
  };

  return (
    <>
      <Link 
        to={user ? "/dashboard" : "/"} 
        className="flex items-center gap-1"
        onClick={handleLogoClick}
      >
        {/* Logo Image */}
        <div className="flex items-center">
          <img 
            src="/juragan-logo.svg" 
            className="h-4 w-4 ml-1" 
            alt="Juragan Logo"
            style={{ filter: 'invert(100%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)' }}
          />
        </div>

        {/* Right Texts */}
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-xl font-extrabold bg-gradient-to-r from-[#4DACFF] via-[#774DFF] to-[#FF73FF] bg-clip-text text-transparent ml-1">Juragan Labs</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-600 ml-1">Powered by Accenture Indonesia</span>
            {user && userIndustry && (
              <>
                <span className="text-[10px] text-gray-400">|</span>
                <Link to="/onboarding" className="group flex items-center gap-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 hover:text-gray-300">{industryLabel}</span>
                    {focusAreaLabels.length > 0 && (
                      <span className="text-[10px] text-gray-500 group-hover:text-gray-400">
                        {focusAreaLabels.join(', ')}
                      </span>
                    )}
                  </div>
                  <ChevronDownIcon className="h-2 w-2 text-gray-500 group-hover:text-gray-400 transition-colors" />
                </Link>
              </>
            )}
          </div>
        </div>
      </Link>

      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Save Changes?"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            You have unsaved changes in your AI agents team configuration. What would you like to do?
          </p>
          
          <div className="flex justify-start gap-2">
            <Button
              variant="primary"
              size="sm"
              className="px-1 py-1"
              onClick={() => handleConfirm('save')}
            >
              Save Changes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleConfirm('discard')}
            >
              Discard Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NavbarLogo;