// Enhanced conversation agent flow data that follows Autogen structure format
// This will be populated progressively as the conversation develops based on AI insights

import { TeamStructure } from '@/types';

export interface TempTeamData {
  id: string;
  name: string;
  description: string;
  type: string; // roundrobin, hierarchical, cascading, etc.
  status: 'identified' | 'configured' | 'active';
  timestamp: number;
  confidence?: number; // AI confidence level (0-1)
  source: 'user_input' | 'ai_analysis' | 'manual'; // How this data was identified
  autogenStructure?: TeamStructure; // Full Autogen structure
}

export interface TempAgentData {
  id: string;
  name: string;
  description: string;
  type: string; // AssistantAgent, UserProxyAgent, etc.
  teamId: string;
  modelId?: string;
  modelName?: string;
  modelProvider?: string;
  toolIds: string[];
  tools: Array<{
    id: string;
    name: string;
    description: string;
    confidence?: number;
  }>;
  status: 'identified' | 'configured' | 'active';
  timestamp: number;
  confidence?: number; // AI confidence level (0-1)
  source: 'user_input' | 'ai_analysis' | 'manual'; // How this data was identified
  dependencies?: string[]; // Other agents this depends on
}

export interface ConversationFlowState {
  userInput: {
    shown: boolean;
    content: string;
    timestamp: number;
    processed: boolean; // Whether this input has been analyzed by AI
  };
  team?: TempTeamData;
  agents: TempAgentData[];
  conversationState: 'idle' | 'listening' | 'processing' | 'responding';
  conversationStage: 'initial' | 'team_discussion' | 'agent_configuration' | 'finalization';
  lastUpdate: number;
  lastAnalysis: number; // When the last AI analysis was performed
  analysisInProgress: boolean; // Whether AI analysis is currently running
  pendingUpdates: string[]; // Queue of updates waiting to be processed
  autogenStructure?: TeamStructure; // Current Autogen structure
}

// Initial empty state
export let conversationFlowState: ConversationFlowState = {
  userInput: {
    shown: false,
    content: '',
    timestamp: 0,
    processed: false
  },
  agents: [],
  conversationState: 'idle',
  conversationStage: 'initial',
  lastUpdate: Date.now(),
  lastAnalysis: 0,
  analysisInProgress: false,
  pendingUpdates: []
};

// Helper functions to update the flow state based on Anthropic analysis
export const updateUserInput = (content: string) => {
  conversationFlowState.userInput = {
    shown: true,
    content,
    timestamp: Date.now(),
    processed: false // Mark as unprocessed for AI analysis
  };
  conversationFlowState.lastUpdate = Date.now();
  conversationFlowState.pendingUpdates.push('user_input');
};

export const updateFromAutogenStructure = (autogenStructure: TeamStructure, analysis: any) => {
  const timestamp = Date.now();
  
  // Update conversation stage
  conversationFlowState.conversationStage = analysis.conversationStage;
  conversationFlowState.autogenStructure = autogenStructure;
  
  // Update team data from Autogen structure
  if (autogenStructure) {
    updateTeamData({
      name: autogenStructure.label,
      description: autogenStructure.description,
      type: autogenStructure.provider.split('.').pop() || 'RoundRobinGroupChat',
      status: 'identified',
      confidence: analysis.confidence || 0.8,
      source: 'ai_analysis',
      autogenStructure
    });
    
    // Update agents from participants
    autogenStructure.config.participants.forEach(participant => {
      const tools = participant.config.tools?.map((tool, index) => ({
        id: `tool-${participant.label}-${index}`,
        name: tool.config.name,
        description: tool.description,
        confidence: 0.8
      })) || [];
      
      addOrUpdateAgent({
        name: participant.label,
        description: participant.description,
        type: participant.provider.split('.').pop() || 'AssistantAgent',
        modelName: participant.config.model_client?.config.model,
        modelProvider: participant.config.model_client?.provider.split('.').pop(),
        tools,
        toolIds: tools.map(t => t.name),
        status: 'identified',
        confidence: 0.8,
        source: 'ai_analysis'
      });
    });
  }
  
  // Mark user input as processed
  conversationFlowState.userInput.processed = true;
  conversationFlowState.lastAnalysis = timestamp;
  conversationFlowState.analysisInProgress = false;
  conversationFlowState.lastUpdate = timestamp;
  conversationFlowState.pendingUpdates = []; // Clear pending updates
};

// Legacy function for backward compatibility
export const updateFromAnthropicAnalysis = (analysis: {
  teamIdentified: boolean;
  teamName?: string;
  teamDescription?: string;
  teamType?: string;
  agentsIdentified: Array<{
    name: string;
    description: string;
    type: string;
    modelName?: string;
    modelProvider?: string;
    tools?: Array<{
      name: string;
      description: string;
    }>;
  }>;
  conversationStage: 'initial' | 'team_discussion' | 'agent_configuration' | 'finalization';
}) => {
  const timestamp = Date.now();
  
  // Update conversation stage
  conversationFlowState.conversationStage = analysis.conversationStage;
  
  // Update team data if identified
  if (analysis.teamIdentified && analysis.teamName) {
    updateTeamData({
      name: analysis.teamName,
      description: analysis.teamDescription || '',
      type: analysis.teamType || 'RoundRobinGroupChat',
      status: 'identified',
      confidence: 0.8, // Default confidence from AI
      source: 'ai_analysis'
    });
  }
  
  // Update agents based on AI analysis
  analysis.agentsIdentified.forEach(agent => {
    addOrUpdateAgent({
      name: agent.name,
      description: agent.description,
      type: agent.type,
      modelName: agent.modelName,
      modelProvider: agent.modelProvider,
      tools: agent.tools?.map((tool, index) => ({
        id: `tool-${agent.name}-${index}`,
        name: tool.name,
        description: tool.description,
        confidence: 0.7
      })) || [],
      toolIds: agent.tools?.map(tool => tool.name) || [],
      status: 'identified',
      confidence: 0.8,
      source: 'ai_analysis'
    });
  });
  
  // Mark user input as processed
  conversationFlowState.userInput.processed = true;
  conversationFlowState.lastAnalysis = timestamp;
  conversationFlowState.analysisInProgress = false;
  conversationFlowState.lastUpdate = timestamp;
  conversationFlowState.pendingUpdates = []; // Clear pending updates
};

export const updateTeamData = (teamData: Partial<TempTeamData>) => {
  const timestamp = Date.now();
  
  if (!conversationFlowState.team) {
    conversationFlowState.team = {
      id: `team-${timestamp}`,
      name: '',
      description: '',
      type: 'RoundRobinGroupChat',
      status: 'identified',
      timestamp,
      confidence: 0.5,
      source: 'manual',
      ...teamData
    };
  } else {
    conversationFlowState.team = {
      ...conversationFlowState.team,
      ...teamData,
      timestamp
    };
  }
  conversationFlowState.lastUpdate = timestamp;
};

export const addOrUpdateAgent = (agentData: Partial<TempAgentData> & { name: string }) => {
  const timestamp = Date.now();
  const existingIndex = conversationFlowState.agents.findIndex(a => a.name === agentData.name);
  
  if (existingIndex >= 0) {
    // Update existing agent, merging data intelligently
    const existing = conversationFlowState.agents[existingIndex];
    conversationFlowState.agents[existingIndex] = {
      ...existing,
      ...agentData,
      timestamp,
      // Merge tools intelligently
      tools: agentData.tools ? 
        mergeTools(existing.tools, agentData.tools) : 
        existing.tools,
      // Update confidence if new data has higher confidence
      confidence: agentData.confidence && agentData.confidence > (existing.confidence || 0) ?
        agentData.confidence : existing.confidence
    };
  } else {
    // Add new agent
    const newAgent: TempAgentData = {
      id: `agent-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      name: agentData.name,
      description: agentData.description || '',
      type: agentData.type || 'AssistantAgent',
      teamId: conversationFlowState.team?.id || '',
      modelId: agentData.modelId,
      modelName: agentData.modelName,
      modelProvider: agentData.modelProvider,
      toolIds: agentData.toolIds || [],
      tools: agentData.tools || [],
      status: agentData.status || 'identified',
      timestamp,
      confidence: agentData.confidence || 0.5,
      source: agentData.source || 'manual',
      dependencies: agentData.dependencies || []
    };
    conversationFlowState.agents.push(newAgent);
  }
  conversationFlowState.lastUpdate = timestamp;
};

// Helper function to merge tools intelligently
const mergeTools = (
  existingTools: TempAgentData['tools'], 
  newTools: TempAgentData['tools']
): TempAgentData['tools'] => {
  const merged = [...existingTools];
  
  newTools.forEach(newTool => {
    const existingIndex = merged.findIndex(t => t.name === newTool.name);
    if (existingIndex >= 0) {
      // Update existing tool if new one has higher confidence
      if ((newTool.confidence || 0) > (merged[existingIndex].confidence || 0)) {
        merged[existingIndex] = newTool;
      }
    } else {
      // Add new tool
      merged.push(newTool);
    }
  });
  
  return merged;
};

export const updateConversationState = (state: ConversationFlowState['conversationState']) => {
  conversationFlowState.conversationState = state;
  conversationFlowState.lastUpdate = Date.now();
};

export const setAnalysisInProgress = (inProgress: boolean) => {
  conversationFlowState.analysisInProgress = inProgress;
  conversationFlowState.lastUpdate = Date.now();
};

export const addPendingUpdate = (updateType: string) => {
  if (!conversationFlowState.pendingUpdates.includes(updateType)) {
    conversationFlowState.pendingUpdates.push(updateType);
  }
};

export const hasPendingUpdates = (): boolean => {
  return conversationFlowState.pendingUpdates.length > 0 || 
         !conversationFlowState.userInput.processed;
};

export const shouldTriggerAnalysis = (): boolean => {
  const now = Date.now();
  const timeSinceLastAnalysis = now - conversationFlowState.lastAnalysis;
  const hasUnprocessedInput = !conversationFlowState.userInput.processed && 
                              conversationFlowState.userInput.content.length > 0;
  
  return hasUnprocessedInput && 
         timeSinceLastAnalysis > 2000 && // Debounce: wait 2 seconds
         !conversationFlowState.analysisInProgress;
};

export const getAnalysisReadyData = () => {
  return {
    userInput: conversationFlowState.userInput.content,
    currentTeam: conversationFlowState.team,
    currentAgents: conversationFlowState.agents,
    conversationStage: conversationFlowState.conversationStage,
    pendingUpdates: conversationFlowState.pendingUpdates,
    autogenStructure: conversationFlowState.autogenStructure
  };
};

export const resetFlowState = () => {
  conversationFlowState = {
    userInput: {
      shown: false,
      content: '',
      timestamp: 0,
      processed: false
    },
    agents: [],
    conversationState: 'idle',
    conversationStage: 'initial',
    lastUpdate: Date.now(),
    lastAnalysis: 0,
    analysisInProgress: false,
    pendingUpdates: []
  };
};

export const getFlowState = () => conversationFlowState;

// Enhanced state getters for specific use cases
export const getTeamProgress = () => {
  const state = conversationFlowState;
  return {
    hasTeam: !!state.team,
    teamConfidence: state.team?.confidence || 0,
    agentCount: state.agents.length,
    averageAgentConfidence: state.agents.length > 0 ? 
      state.agents.reduce((sum, agent) => sum + (agent.confidence || 0), 0) / state.agents.length : 0,
    stage: state.conversationStage,
    readyForDeployment: state.conversationStage === 'finalization' && 
                       state.agents.length > 0 && 
                       !!state.team,
    hasAutogenStructure: !!state.autogenStructure
  };
};

export const getAgentsByConfidence = () => {
  return conversationFlowState.agents
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
};

export const getRecentUpdates = (timeWindow: number = 30000) => {
  const cutoff = Date.now() - timeWindow;
  const updates = [];
  
  if (conversationFlowState.userInput.timestamp > cutoff) {
    updates.push({
      type: 'user_input',
      timestamp: conversationFlowState.userInput.timestamp,
      data: conversationFlowState.userInput.content
    });
  }
  
  if (conversationFlowState.team && conversationFlowState.team.timestamp > cutoff) {
    updates.push({
      type: 'team_update',
      timestamp: conversationFlowState.team.timestamp,
      data: conversationFlowState.team.name
    });
  }
  
  conversationFlowState.agents
    .filter(agent => agent.timestamp > cutoff)
    .forEach(agent => {
      updates.push({
        type: 'agent_update',
        timestamp: agent.timestamp,
        data: agent.name
      });
    });
  
  return updates.sort((a, b) => b.timestamp - a.timestamp);
};

// Get current Autogen structure for export/deployment
export const getCurrentAutogenStructure = (): TeamStructure | null => {
  return conversationFlowState.autogenStructure || null;
};

// Update flow state with new Autogen structure
export const updateAutogenStructure = (structure: TeamStructure) => {
  conversationFlowState.autogenStructure = structure;
  conversationFlowState.lastUpdate = Date.now();
  
  // Also update the simplified team/agent data for compatibility
  updateTeamData({
    name: structure.label,
    description: structure.description,
    type: structure.provider.split('.').pop() || 'RoundRobinGroupChat',
    status: 'configured',
    confidence: 0.9,
    source: 'ai_analysis',
    autogenStructure: structure
  });
};
