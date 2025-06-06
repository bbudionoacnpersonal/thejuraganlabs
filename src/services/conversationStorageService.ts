// Service for managing conversation data in localStorage with ElevenLabs conversation ID
import { TeamStructure } from '@/types';
import { ConversationFlowState } from '@/mockdata/temp_conv_agentflow';

export interface StoredConversationData {
  conversationId: string;
  timestamp: number;
  lastUpdated: number;
  status: 'active' | 'completed' | 'archived';
  userIndustry?: string;
  userFocusAreas?: string[];
  flowState: ConversationFlowState;
  autogenStructure?: TeamStructure;
  messages: Array<{
    role: string;
    content: string;
    timestamp: number;
  }>;
  metadata: {
    totalMessages: number;
    analysisCount: number;
    confidence: number;
    stage: string;
  };
}

const STORAGE_PREFIX = 'juragan_conversation_';
const MAX_STORED_CONVERSATIONS = 50; // Limit to prevent localStorage bloat

// Store conversation data with ElevenLabs conversation ID
export const storeConversationData = (
  conversationId: string,
  flowState: ConversationFlowState,
  messages: Array<{ role: string; content: string; timestamp: number }>,
  autogenStructure?: TeamStructure
): void => {
  try {
    const userIndustry = localStorage.getItem('user_industry') || undefined;
    const userFocusAreas = JSON.parse(localStorage.getItem('user_focus_areas') || '[]');
    
    const conversationData: StoredConversationData = {
      conversationId,
      timestamp: Date.now(),
      lastUpdated: Date.now(),
      status: flowState.conversationStage === 'finalization' ? 'completed' : 'active',
      userIndustry,
      userFocusAreas,
      flowState,
      autogenStructure,
      messages,
      metadata: {
        totalMessages: messages.length,
        analysisCount: flowState.lastAnalysis > 0 ? 1 : 0,
        confidence: autogenStructure ? 0.9 : (flowState.team?.confidence || 0.5),
        stage: flowState.conversationStage
      }
    };
    
    const storageKey = `${STORAGE_PREFIX}${conversationId}`;
    localStorage.setItem(storageKey, JSON.stringify(conversationData));
    
    // Update conversation index
    updateConversationIndex(conversationId, conversationData);
    
    console.log(`💾 Stored conversation data for ID: ${conversationId}`, {
      messageCount: messages.length,
      hasAutogen: !!autogenStructure,
      stage: flowState.conversationStage
    });
    
  } catch (error) {
    console.error('❌ Error storing conversation data:', error);
  }
};

// Retrieve conversation data by ElevenLabs conversation ID
export const getConversationData = (conversationId: string): StoredConversationData | null => {
  try {
    const storageKey = `${STORAGE_PREFIX}${conversationId}`;
    const storedData = localStorage.getItem(storageKey);
    
    if (!storedData) {
      console.log(`📭 No stored data found for conversation ID: ${conversationId}`);
      return null;
    }
    
    const conversationData: StoredConversationData = JSON.parse(storedData);
    
    console.log(`📂 Retrieved conversation data for ID: ${conversationId}`, {
      messageCount: conversationData.messages.length,
      hasAutogen: !!conversationData.autogenStructure,
      stage: conversationData.metadata.stage,
      lastUpdated: new Date(conversationData.lastUpdated).toLocaleString()
    });
    
    return conversationData;
    
  } catch (error) {
    console.error('❌ Error retrieving conversation data:', error);
    return null;
  }
};

// Update existing conversation data
export const updateConversationData = (
  conversationId: string,
  updates: Partial<StoredConversationData>
): void => {
  try {
    const existingData = getConversationData(conversationId);
    if (!existingData) {
      console.warn(`⚠️ Cannot update non-existent conversation: ${conversationId}`);
      return;
    }
    
    const updatedData: StoredConversationData = {
      ...existingData,
      ...updates,
      lastUpdated: Date.now()
    };
    
    const storageKey = `${STORAGE_PREFIX}${conversationId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
    
    // Update conversation index
    updateConversationIndex(conversationId, updatedData);
    
    console.log(`🔄 Updated conversation data for ID: ${conversationId}`);
    
  } catch (error) {
    console.error('❌ Error updating conversation data:', error);
  }
};

// Get all stored conversations (for listing/management)
export const getAllConversations = (): StoredConversationData[] => {
  try {
    const conversations: StoredConversationData[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const conversationData: StoredConversationData = JSON.parse(data);
            conversations.push(conversationData);
          } catch (parseError) {
            console.warn(`⚠️ Invalid conversation data for key: ${key}`);
          }
        }
      }
    }
    
    // Sort by last updated (most recent first)
    return conversations.sort((a, b) => b.lastUpdated - a.lastUpdated);
    
  } catch (error) {
    console.error('❌ Error retrieving all conversations:', error);
    return [];
  }
};

// Delete conversation data
export const deleteConversationData = (conversationId: string): boolean => {
  try {
    const storageKey = `${STORAGE_PREFIX}${conversationId}`;
    const indexKey = 'juragan_conversation_index';
    
    // Remove from localStorage
    localStorage.removeItem(storageKey);
    
    // Update index
    const indexData = localStorage.getItem(indexKey);
    if (indexData) {
      const index = JSON.parse(indexData);
      delete index[conversationId];
      localStorage.setItem(indexKey, JSON.stringify(index));
    }
    
    console.log(`🗑️ Deleted conversation data for ID: ${conversationId}`);
    return true;
    
  } catch (error) {
    console.error('❌ Error deleting conversation data:', error);
    return false;
  }
};

// Conversation index management for quick access
interface ConversationIndex {
  [conversationId: string]: {
    timestamp: number;
    lastUpdated: number;
    status: string;
    messageCount: number;
    stage: string;
    hasAutogen: boolean;
  };
}

const updateConversationIndex = (conversationId: string, data: StoredConversationData): void => {
  try {
    const indexKey = 'juragan_conversation_index';
    const existingIndex = localStorage.getItem(indexKey);
    const index: ConversationIndex = existingIndex ? JSON.parse(existingIndex) : {};
    
    index[conversationId] = {
      timestamp: data.timestamp,
      lastUpdated: data.lastUpdated,
      status: data.status,
      messageCount: data.metadata.totalMessages,
      stage: data.metadata.stage,
      hasAutogen: !!data.autogenStructure
    };
    
    // Cleanup old conversations if we exceed the limit
    const conversationIds = Object.keys(index);
    if (conversationIds.length > MAX_STORED_CONVERSATIONS) {
      const sortedIds = conversationIds.sort((a, b) => index[b].lastUpdated - index[a].lastUpdated);
      const toDelete = sortedIds.slice(MAX_STORED_CONVERSATIONS);
      
      toDelete.forEach(id => {
        delete index[id];
        localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
      });
      
      console.log(`🧹 Cleaned up ${toDelete.length} old conversations`);
    }
    
    localStorage.setItem(indexKey, JSON.stringify(index));
    
  } catch (error) {
    console.error('❌ Error updating conversation index:', error);
  }
};

// Get conversation summary from index (faster than loading full data)
export const getConversationSummary = (conversationId: string) => {
  try {
    const indexKey = 'juragan_conversation_index';
    const indexData = localStorage.getItem(indexKey);
    
    if (indexData) {
      const index: ConversationIndex = JSON.parse(indexData);
      return index[conversationId] || null;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error getting conversation summary:', error);
    return null;
  }
};

// Export conversation data as JSON file
export const exportConversationAsJSON = (conversationId: string): void => {
  try {
    const conversationData = getConversationData(conversationId);
    if (!conversationData) {
      console.error('❌ No conversation data found for export');
      return;
    }
    
    const exportData = {
      conversationId,
      exportedAt: new Date().toISOString(),
      autogenStructure: conversationData.autogenStructure,
      flowState: conversationData.flowState,
      messages: conversationData.messages,
      metadata: conversationData.metadata
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `juragan_conversation_${conversationId}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log(`📤 Exported conversation data for ID: ${conversationId}`);
    
  } catch (error) {
    console.error('❌ Error exporting conversation data:', error);
  }
};

// Import conversation data from JSON file
export const importConversationFromJSON = (jsonData: string): boolean => {
  try {
    const importedData = JSON.parse(jsonData);
    
    if (!importedData.conversationId || !importedData.autogenStructure) {
      throw new Error('Invalid conversation data format');
    }
    
    const conversationData: StoredConversationData = {
      conversationId: importedData.conversationId,
      timestamp: Date.now(),
      lastUpdated: Date.now(),
      status: 'archived',
      flowState: importedData.flowState,
      autogenStructure: importedData.autogenStructure,
      messages: importedData.messages || [],
      metadata: importedData.metadata || {
        totalMessages: 0,
        analysisCount: 0,
        confidence: 0.5,
        stage: 'initial'
      }
    };
    
    const storageKey = `${STORAGE_PREFIX}${importedData.conversationId}`;
    localStorage.setItem(storageKey, JSON.stringify(conversationData));
    
    updateConversationIndex(importedData.conversationId, conversationData);
    
    console.log(`📥 Imported conversation data for ID: ${importedData.conversationId}`);
    return true;
    
  } catch (error) {
    console.error('❌ Error importing conversation data:', error);
    return false;
  }
};

// Clear all conversation data (for cleanup/reset)
export const clearAllConversationData = (): void => {
  try {
    const keysToDelete: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith(STORAGE_PREFIX) || key === 'juragan_conversation_index')) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => localStorage.removeItem(key));
    
    console.log(`🧹 Cleared all conversation data (${keysToDelete.length} items)`);
    
  } catch (error) {
    console.error('❌ Error clearing conversation data:', error);
  }
};

// Get storage usage statistics
export const getStorageStats = () => {
  try {
    const conversations = getAllConversations();
    const totalSize = conversations.reduce((size, conv) => {
      const dataStr = JSON.stringify(conv);
      return size + new Blob([dataStr]).size;
    }, 0);
    
    return {
      conversationCount: conversations.length,
      totalSizeBytes: totalSize,
      totalSizeKB: Math.round(totalSize / 1024),
      averageSizeKB: conversations.length > 0 ? Math.round(totalSize / 1024 / conversations.length) : 0,
      oldestConversation: conversations.length > 0 ? 
        new Date(Math.min(...conversations.map(c => c.timestamp))).toLocaleDateString() : null,
      newestConversation: conversations.length > 0 ? 
        new Date(Math.max(...conversations.map(c => c.timestamp))).toLocaleDateString() : null
    };
  } catch (error) {
    console.error('❌ Error getting storage stats:', error);
    return null;
  }
};