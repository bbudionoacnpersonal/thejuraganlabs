import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { 
  XMarkIcon, 
  MagnifyingGlassIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { getAllConversations, getStorageStats } from '@/services/conversationStorageService';
import type { StoredConversationData } from '@/services/conversationStorageService';

interface ConversationListProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  isVisible,
  onClose,
  onSelectConversation
}) => {
  const [conversations, setConversations] = useState<StoredConversationData[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<StoredConversationData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [storageStats, setStorageStats] = useState<any>(null);

  useEffect(() => {
    if (isVisible) {
      loadConversations();
    }
  }, [isVisible]);

  useEffect(() => {
    // Filter conversations based on search term
    if (searchTerm.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv => 
        conv.conversationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.flowState?.team?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.flowState?.team?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.userIndustry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchTerm, conversations]);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const allConversations = getAllConversations();
      const stats = getStorageStats();
      
      setConversations(allConversations);
      setFilteredConversations(allConversations);
      setStorageStats(stats);
      
      console.log('📂 Loaded conversations:', {
        count: allConversations.length,
        stats
      });
    } catch (error) {
      console.error('❌ Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-secondary-600" />;
      case 'active':
        return <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-500" />;
      case 'archived':
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
      default:
        return <ExclamationCircleIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-secondary-600 bg-secondary-600/10';
      case 'active':
        return 'text-blue-500 bg-blue-500/10';
      case 'archived':
        return 'text-gray-500 bg-gray-500/10';
      default:
        return 'text-yellow-500 bg-yellow-500/10';
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    console.log('🔍 Selected conversation for analysis:', conversationId);
    onSelectConversation(conversationId);
  };

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
            className="relative bg-dark-surface border border-dark-border rounded-xl shadow-xl w-[700px] max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Conversation History</h2>
                <p className="text-sm text-gray-400">Select a conversation to analyze</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-dark-border">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-dark-background border border-dark-border rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary-600"
                />
              </div>
            </div>

            {/* Storage Stats */}
            {storageStats && (
              <div className="px-4 py-2 bg-dark-background/50 border-b border-dark-border">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{storageStats.conversationCount} conversations stored</span>
                  <span>{storageStats.totalSizeKB} KB used</span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary-600"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-10">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    {searchTerm ? 'No matching conversations' : 'No conversations found'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {searchTerm 
                      ? 'Try adjusting your search terms' 
                      : 'Start a conversation with the voice assistant to see it here'
                    }
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {filteredConversations.map((conversation) => (
                    <motion.div
                      key={conversation.conversationId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-background rounded-lg border border-dark-border hover:border-secondary-600 cursor-pointer transition-colors duration-200 p-4"
                      onClick={() => handleConversationSelect(conversation.conversationId)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(conversation.status)}
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.status)}`}>
                            {conversation.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDate(conversation.lastUpdated)}
                        </span>
                      </div>

                      <div className="mb-3">
                        <h3 className="text-white font-medium mb-1">
                          {conversation.flowState?.team?.name || `Conversation ${conversation.conversationId.slice(-8)}`}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {conversation.flowState?.team?.description || 
                           `${conversation.metadata.totalMessages} messages • ${conversation.metadata.stage} stage`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>{conversation.metadata.totalMessages} messages</span>
                          {conversation.userIndustry && (
                            <span>{conversation.userIndustry}</span>
                          )}
                          {conversation.autogenStructure && (
                            <span className="text-secondary-600">• Has JSON</span>
                          )}
                        </div>
                        <span className="font-mono">
                          {conversation.conversationId.slice(-8)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationList;