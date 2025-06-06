import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Chatbox from '@/components/create-agent/Chatbox';
import TeamConfiguration from '@/components/create-agent/TeamConfiguration';
import ComponentLibrary from '@/components/create-agent/ComponentLibrary';
import OnboardingGuide from '@/components/create-agent/OnboardingGuide';
import Footer from '@/components/common/Footer';
import { teamStructure } from '@/mockdata/teamStructure';
import useAuthStore from '@/store/authStore';
import { ChatboxHandle } from '@/types';

const CreateAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'json' | 'visual'>(teamStructure ? 'visual' : 'json');
  const [showGuide, setShowGuide] = useState(user?.role !== 'engineer');
  const [currentStep, setCurrentStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  // Create ref for Chatbox
  const chatboxRef = useRef<ChatboxHandle>(null);
  
  const [agentConfig] = useState({
    name: "Customer Support Assistant",
    type: "HierarchicalGroupChat",
    description: "An AI agents team for handling customer support queries",
    agents: [
      {
        name: "Coordinator",
        role: "orchestrator",
        model: "gpt-4",
        description: "Coordinates and delegates tasks to specialized agents"
      },
      {
        name: "Technical Support",
        role: "specialist",
        model: "gpt-4",
        description: "Handles technical product queries"
      },
      {
        name: "Billing Support",
        role: "specialist",
        model: "gpt-4",
        description: "Handles billing and payment queries"
      }
    ]
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVoiceInput = () => {
    setViewMode('visual');
  };

  const handleSubmitChat = (message: string) => {
    // Handle chat submission
    console.log("Chat submitted:", message);
  };

  return (
    <div className="min-h-screen bg-dark-background flex flex-col">
      <Navbar />
      <div className="flex-grow p-4">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
            {/* Chat Interface - Expands when library is collapsed */}
            <div className={`${isLibraryCollapsed ? 'col-span-4' : 'col-span-3'} bg-dark-background transition-all duration-300`}>
              <Chatbox 
                ref={chatboxRef}
                expanded={isLibraryCollapsed} 
                onVoiceStart={handleVoiceInput}
                prompt={prompt}
                setPrompt={setPrompt}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />
            </div>
            {/* Configuration Editor */}
            <div className="col-span-7">
              <TeamConfiguration 
                agentConfig={agentConfig} 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>

            {/* Component Library - Collapsible */}
            <div className={`${isLibraryCollapsed ? 'col-span-1' : 'col-span-2'} transition-all duration-300`}>
              <ComponentLibrary 
                isCollapsed={isLibraryCollapsed}
                onToggle={() => setIsLibraryCollapsed(!isLibraryCollapsed)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Guide */}
      {showGuide && (
        <OnboardingGuide
          isVisible={showGuide}
          onClose={() => setShowGuide(false)}
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          onVoiceInput={handleVoiceInput}
          onSubmitChat={handleSubmitChat}
          prompt={prompt}
          setPrompt={setPrompt}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          chatboxRef={chatboxRef}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default CreateAgentPage;