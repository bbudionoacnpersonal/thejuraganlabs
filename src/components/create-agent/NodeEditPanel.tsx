import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface NodeEditPanelProps {
  isVisible: boolean;
  onClose: () => void;
  nodeData: {
    type: 'team' | 'agent';
    label: string;
    description?: string;
    model?: string;
    tools?: number;
  } | null;
  onSave: (data: any) => void;
}

const NodeEditPanel: React.FC<NodeEditPanelProps> = ({
  isVisible,
  onClose,
  nodeData,
  onSave
}) => {
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    model: '',
    tools: 0
  });

  useEffect(() => {
    if (nodeData) { 
      setFormData({
        label: nodeData.label,
        description: nodeData.description || '',
        model: nodeData.model || '',
        tools: nodeData.tools || 0
      });
    }
  }, [nodeData]);

  const modelOptions = [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'claude-3', label: 'Claude 3' },
    { value: 'gemini-pro', label: 'Gemini Pro' }
  ];

  const handleSave = () => {
    onSave(formData);
  };

  if (!isVisible || !nodeData) return null;

  return (
     <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", duration: 0.4, stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-screen w-[500px] bg-dark-surface border-l rounded-l-xl border-dark-border shadow-xl flex flex-col"
        >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="text-lg font-semibold text-white">
            Edit {nodeData.type === 'team' ? 'Team' : 'Agent'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <XMarkIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-4">
          <div className="space-y-4">
            <Input
              label="Name"
              size="sm"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="text-sm w-full bg-dark-400 border border-dark-border rounded-md p-2 text-white"
                rows={4}
              />
            </div>

            <Select
              label="Model"
              value={formData.model}
              options={modelOptions}
              selectClassName="text-sm"
              onChange={(value) => setFormData({ ...formData, model: value as string })}
            />

            {nodeData.type === 'agent' && (
              <Input
                label="Number of Tools"
                type="number"
                size="sm"
                value={formData.tools.toString()}
                onChange={(e) => setFormData({ ...formData, tools: parseInt(e.target.value) || 0 })}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-border">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NodeEditPanel;