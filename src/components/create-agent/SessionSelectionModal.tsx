import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { mockSessions } from '@/mockdata/playSession';

interface SessionSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNewSession: () => void;
  onSelectSession: (sessionId: string) => void;
}

const SessionSelectionModal: React.FC<SessionSelectionModalProps> = ({
  isVisible,
  onClose,
  onNewSession,
  onSelectSession
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions] = useState(mockSessions);

  const filteredSessions = sessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-dark-surface border border-dark-border rounded-xl shadow-xl w-[500px] max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Select Session</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* New Session Button */}
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => {
                  onNewSession();
                  onClose();
                }}
                className="mb-4 flex items-center justify-center gap-2"
              >
                <span className="text-sm">Start New Session</span>
              </Button>

              {/* Search */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-2 w-2 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-dark-surface border border-dark-border rounded-md py-1 pl-12 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
                />
              </div>

              {/* Sessions List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session.id);
                      onClose();
                    }}
                    className="p-3 bg-dark-400 rounded-lg border border-dark-border hover:border-secondary-600 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-white">{session.name}</h3>
                      <span className="text-xs text-gray-400">
                        {session.lastModified}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{session.description}</p>
                    <div className="text-xs text-gray-400">
                      {session.messageCount} messages
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionSelectionModal;