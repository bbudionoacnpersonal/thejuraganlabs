// Temporary conversation agent flow data
// This will be populated progressively as the conversation develops

export interface TempTeamData {
  id: string;
  name: string;
  description: string;
  type: string; // roundrobin, hierarchical, cascading, etc.
  status: 'identified' | 'configured' | 'active';
  timestamp: number;
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
  }>;
  status: 'identified' | 'configured' | 'active';
  timestamp: number;
}

export interface ConversationFlowState {
  userInput: {
    shown: boolean;
    content: string;
    timestamp: number;
  };
  team?: TempTeamData;
  agents: TempAgentData[];
  conversationState: 'idle' | 'listening' | 'processing' | 'responding';
  lastUpdate: number;
}

// Initial empty state
export let conversationFlowState: ConversationFlowState = {
  userInput: {
    shown: false,
    content: '',
    timestamp: 0
  },
  agents: [],
  conversationState: 'idle',
  lastUpdate: Date.now()
};

// Helper functions to update the flow state
export const updateUserInput = (content: string) => {
  conversationFlowState.userInput = {
    shown: true,
    content,
    timestamp: Date.now()
  };
  conversationFlowState.lastUpdate = Date.now();
};

export const updateTeamData = (teamData: Partial<TempTeamData>) => {
  if (!conversationFlowState.team) {
    conversationFlowState.team = {
      id: `team-${Date.now()}`,
      name: '',
      description: '',
      type: '',
      status: 'identified',
      timestamp: Date.now(),
      ...teamData
    };
  } else {
    conversationFlowState.team = {
      ...conversationFlowState.team,
      ...teamData,
      timestamp: Date.now()
    };
  }
  conversationFlowState.lastUpdate = Date.now();
};

export const addOrUpdateAgent = (agentData: Partial<TempAgentData> & { name: string }) => {
  const existingIndex = conversationFlowState.agents.findIndex(a => a.name === agentData.name);
  
  if (existingIndex >= 0) {
    // Update existing agent
    conversationFlowState.agents[existingIndex] = {
      ...conversationFlowState.agents[existingIndex],
      ...agentData,
      timestamp: Date.now()
    };
  } else {
    // Add new agent
    const newAgent: TempAgentData = {
      id: `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      timestamp: Date.now()
    };
    conversationFlowState.agents.push(newAgent);
  }
  conversationFlowState.lastUpdate = Date.now();
};

export const updateConversationState = (state: ConversationFlowState['conversationState']) => {
  conversationFlowState.conversationState = state;
  conversationFlowState.lastUpdate = Date.now();
};

export const resetFlowState = () => {
  conversationFlowState = {
    userInput: {
      shown: false,
      content: '',
      timestamp: 0
    },
    agents: [],
    conversationState: 'idle',
    lastUpdate: Date.now()
  };
};

export const getFlowState = () => conversationFlowState;

export { conversationFlowState }