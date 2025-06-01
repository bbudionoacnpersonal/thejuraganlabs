import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { autogenConfig } from '@/mockdata/autogenConfig';
import { 
  XMarkIcon, 
  BookOpenIcon, 
  CheckIcon, 
  SparklesIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import {MailWarning, Wrench} from 'lucide-react';
import VoiceSDKOverlay from './VoiceSDKOverlay';

interface OnboardingGuideProps {
  isVisible: boolean;
  onClose: () => void;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep?: () => void;
  onVoiceInput?: () => void;
  onSubmitChat?: (message: string) => void;
  prompt: string;
  setPrompt: (val: string) => void;
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
}

const steps = [
  {
    title: "AI Team Name & Description",
    description: "Give your AI team a clear, descriptive name and explain its purpose.",
    example: "Example: 'Customer Support Team' - A team of AI agents that handle customer inquiries and support tickets.",
    fields: [
      { id: 'name', label: 'Team Name', type: 'text' },
      { id: 'description', label: 'Description', type: 'textarea' }
    ]
  },
  {
    title: "Choose Team Type",
    description: "Select how your AI agents will collaborate:",
    items: autogenConfig.teamTypes
  },
  {
    title: "Select AI Agents & Configure",
    description: "Choose the agents for your team and configure their models and tools:",
    items: autogenConfig.agentTypes
  }
];

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  isVisible,
  onClose,
  currentStep,
  onNextStep,
  onPrevStep,
}) => {
  const [mode, setMode] = useState<'select' | 'guided' | 'voice'>('select');
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showVoiceMessage, setShowVoiceMessage] = useState(false);
  const [selections, setSelections] = useState<Record<string, any>>({
    name: '',
    description: '',
    teamType: '',
    agents: [],
    agentModels: {},
    agentTools: {}
  });

  const handleSelection = (field: string, value: any) => {
    setSelections(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgentSelection = (agentId: string) => {
    const isSelected = selections.agents.includes(agentId);
    let newAgents = isSelected
      ? selections.agents.filter((id: string) => id !== agentId)
      : [...selections.agents, agentId];
    
    let newAgentModels = { ...selections.agentModels };
    let newAgentTools = { ...selections.agentTools };
    
    if (!isSelected) {
      // Find the agent in the config
      const agent = autogenConfig.agentTypes.find(item => item.id === agentId);
      
      // Check if agent exists and has requiresLLM property set to true
      if (agent && 'requiresLLM' in agent && agent.requiresLLM) {
        // Check if agent has recommendedModel property
        if ('recommendedModel' in agent && agent.recommendedModel) {
          newAgentModels[agentId] = agent.recommendedModel;
        }
      }
    } else {
      delete newAgentModels[agentId];
      delete newAgentTools[agentId];
    }
    
    setSelections(prev => ({
      ...prev,
      agents: newAgents,
      agentModels: newAgentModels,
      agentTools: newAgentTools
    }));
  };

  const handleModelChange = (agentId: string, modelId: string) => {
    setSelections(prev => ({
      ...prev,
      agentModels: {
        ...prev.agentModels,
        [agentId]: modelId
      }
    }));
  };

  const handleToolSelection = (agentId: string, toolIds: string[]) => {
    setSelections(prev => ({
      ...prev,
      agentTools: {
        ...prev.agentTools,
        [agentId]: toolIds
      }
    }));
  };

  const handleSubmit = () => {
    setShowVoiceMessage(true);
    setTimeout(() => {
      setShowVoiceMessage(false);
      onClose();
    }, 5000);
  };

  const handleModeSelect = (selectedMode: 'guided' | 'voice') => {
    setMode(selectedMode);
    if (selectedMode === 'voice') {
      setShowVoiceOverlay(true);
    }
  };

  const handleBackStep = () => {
    if (currentStep === 1) {
      setMode('select');
    } else if (onPrevStep) {
      onPrevStep();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <AnimatePresence>
      {showVoiceOverlay && (
        <VoiceSDKOverlay 
          isVisible={showVoiceOverlay} 
          onClose={() => {
            setShowVoiceOverlay(false);
            onClose();
          }}
          onMessage={() => {}}
        />
      )}
      
      {isVisible && !showVoiceOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative bg-dark-surface/95 backdrop-blur-lg border border-dark-border rounded-xl shadow-xl w-[600px] max-h-[80vh] overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors z-50"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>

            {showVoiceMessage ? (
              <div className="p-8 text-center">
                <h3 className="text-lg font-bold text-white mb-4">Thanks for trying! </h3>
                  <div className="flex justify-center items-center mb-4">
                    <MailWarning className="h-4 w-4 text-secondary-600"/>
                  </div>
                <p className="text-gray-400">Juragan Labs currently only supports voice interaction in Bahasa.</p>
              </div>
            ) : mode === 'select' ? (
              <div className="p-8 text-center">
                <h3 className="text-lg font-bold text-white mt-4 mb-4">How would you like to create your AI agents team?</h3>
                <p className="text-gray-400 mb-8">Choose your preferred method</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-dark-background rounded-lg border border-dark-border cursor-pointer hover:border-secondary-600"
                    onClick={() => handleModeSelect('guided')}
                  >
                    <BookOpenIcon className="h-8 w-8 text-secondary-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-white mb-2">Guided Steps</h4>
                    <p className="text-sm text-gray-400">Create your AI agents team through our step-by-step guide</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-dark-background rounded-lg border border-dark-border cursor-pointer hover:border-secondary-600"
                    onClick={() => handleModeSelect('voice')}
                  >
                    <MicrophoneIcon className="h-8 w-8 text-secondary-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-white mb-2">Voice Assistant</h4>
                    <p className="text-sm text-gray-400">Create your AI agents team by talking to our voice assistant</p>
                  </motion.div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-dark-border flex items-center justify-between">
                  <div>
                    <h3 className="text-medium font-semibold text-white">Step {currentStep} of {steps.length}</h3>
                    <p className="text-sm text-gray-400">Creating your AI agents team</p>
                  </div>
                </div>

                <motion.div
                  key={currentStep}
                  custom={currentStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="p-4 overflow-y-auto max-h-[calc(80vh-180px)]"
                >
                  <p className="text-gray-300 mb-3 font-bold text-sm">{steps[currentStep - 1].description}</p>

                  {steps[currentStep - 1].fields && (
                    <div className="space-y-1">
                      {steps[currentStep - 1].fields!.map(field => (
                        <div key={field.id} className="space-y-1">
                          <label className="block text-sm font-medium text-gray-300">
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              value={selections[field.id]}
                              onChange={(e) => handleSelection(field.id, e.target.value)}
                              className="w-full bg-dark-background border border-dark-border rounded-md p-1 text-white text-sm"
                              rows={2}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={selections[field.id]}
                              onChange={(e) => handleSelection(field.id, e.target.value)}
                              className="w-full bg-dark-background border border-dark-border rounded-md p-1 text-white text-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {steps[currentStep - 1].items && (
                    <div className="space-y-1">
                      {steps[currentStep - 1].items!.map((item: any) => {
                        const isSelected = currentStep === 2 
                          ? selections.teamType === item.id
                          : selections.agents.includes(item.id);

                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              if (currentStep === 2) {
                                handleSelection('teamType', item.id);
                              } else if (currentStep === 3) {
                                handleAgentSelection(item.id);
                              }
                            }}
                            className={`bg-dark-background p-3 rounded-lg border cursor-pointer transition-colors ${
                              isSelected
                                ? 'border-secondary-600'
                                : 'border-dark-border hover:border-secondary-600/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="text-white font-medium text-medium">{item.name}</h5>
                              {isSelected && (
                                <CheckIcon className="h-3 w-3 text-secondary-600" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                            
                            {currentStep === 3 && isSelected && item.requiresLLM && (
                              <div className="mt-4 space-y-4">
                                {/* Model Selection */}
                                <div className="pl-4 border-l-2 border-secondary-600/30">
                                  <div className="flex items-center gap-2 mb-2">
                                    <SparklesIcon className="h-3 w-3 text-secondary-600" />
                                    <span className="text-xs text-secondary-600">Model Selection</span>
                                  </div>
                                  <Select
                                    value={selections.agentModels[item.id] || (item.recommendedModel || '')}
                                    options={autogenConfig.models.map(m => ({
                                      value: m.id,
                                      label: m.name
                                    }))}
                                    onChange={(value) => handleModelChange(item.id, value as string)}
                                    selectClassName="focus:ring-2 focus:ring-secondary-600"
                                    size="sm"
                                  />
                                </div>

                                {/* Tools Selection */}
                                {item.requiresTools && (
                                  <div className="pl-4 border-l-2 border-secondary-600/30">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Wrench className="h-3 w-3 text-secondary-600" />
                                      <span className="text-xs text-secondary-600">Tools Selection</span>
                                    </div>
                                    <Select
                                      value={selections.agentTools[item.id] || []}
                                      options={autogenConfig.tools.map(t => ({
                                        value: t.id,
                                        label: t.name
                                      }))}
                                      onChange={(value) => handleToolSelection(item.id, Array.isArray(value) ? value : [value as string])}
                                      isMulti={true}
                                      selectClassName="focus:ring-2 focus:ring-secondary-600"
                                      size="sm"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>

                <div className="p-2 border-t border-dark-border bg-dark-background/50">
                  <div className="flex items-center">
                    <div className="w-24">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleBackStep}
                        className="flex items-center gap-1"
                      >
                        Back
                      </Button>
                    </div>

                    <div className="flex-1 flex justify-center">
                      <div className="flex space-x-1">
                        {steps.map((_, index) => (
                          <div
                            key={index}
                            className={`h-1 w-6 rounded-full ${
                              index + 1 === currentStep
                                ? 'bg-secondary-600'
                                : index + 1 < currentStep
                                ? 'bg-success-600'
                                : 'bg-dark-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-24 flex justify-end">
                      {currentStep < steps.length ? (
                        <Button
                          size="sm"
                          onClick={onNextStep}
                          className="flex items-center gap-1 bg-secondary-600 hover:bg-secondary-600/90 focus:ring-secondary-600"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={handleSubmit}
                          className="flex items-center gap-1 bg-secondary-600 hover:bg-secondary-600/90 focus:ring-secondary-600"
                        >
                          Create
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingGuide;