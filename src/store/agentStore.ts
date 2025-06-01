import { create } from 'zustand';
import { Agent, Model, Tool, Termination } from '@/types';

interface AgentState {
  agents: Agent[];
  models: Model[];
  tools: Tool[];
  terminations: Termination[];
  isLoading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  fetchGalleryItems: () => Promise<void>;
  createAgent: (
    name: string, 
    description: string, 
    teamId: string, 
    userId: string,
    modelId: string,
    toolIds: string[],
    terminationConfig: string
  ) => Promise<Agent>;
  updateAgentStatus: (agentId: string, status: Agent['status']) => Promise<void>;
}

// Mock data
const mockModels: Model[] = [
  {
    id: '1',
    name: 'GPT-4',
    description: 'Advanced language model with strong reasoning capabilities',
    provider: 'OpenAI',
    type: 'Large Language Model',
    version: '4',
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    description: 'State-of-the-art AI assistant with superior reasoning',
    provider: 'Anthropic',
    type: 'Large Language Model',
    version: '3 Opus',
  },
  {
    id: '3',
    name: 'Llama 3',
    description: 'Open-source large language model with strong capabilities',
    provider: 'Meta',
    type: 'Large Language Model',
    version: '3',
  },
];

const mockTools: Tool[] = [
  {
    id: '1',
    name: 'Web Search',
    description: 'Search the web for information',
    category: 'Information',
    provider: 'Dewa',
  },
  {
    id: '2',
    name: 'Code Interpreter',
    description: 'Execute code in a sandbox environment',
    category: 'Programming',
    provider: 'Zeus',
  },
  {
    id: '3',
    name: 'Database Connector',
    description: 'Connect to and query databases',
    category: 'Data',
    provider: 'Dewa',
  },
  {
    id: '4',
    name: 'Document Reader',
    description: 'Extract information from documents',
    category: 'Document Processing',
    provider: 'Dewa',
  },
];

const mockTerminations: Termination[] = [
  {
    id: '1',
    name: 'Simple Completion',
    description: 'Agent completes task when it determines the goal is met',
    type: 'Self-determined',
  },
  {
    id: '2',
    name: 'Time-based',
    description: 'Agent terminates after a set amount of time',
    type: 'Timed',
  },
  {
    id: '3',
    name: 'Human Evaluation',
    description: 'Requires human review and confirmation to terminate',
    type: 'Human-in-the-loop',
  },
];

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Assistant',
    description: 'Handles common customer support queries and escalates when needed',
    status: 'deployed',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: '1',
    teamId: '1',
    modelId: '1',
    toolIds: ['1', '4'],
    terminationConfig: '1',
  },
  {
    id: '2',
    name: 'Data Analysis Agent',
    description: 'Analyzes marketing data and generates insights',
    status: 'testing',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: '1',
    teamId: '2',
    modelId: '2',
    toolIds: ['2', '3'],
    terminationConfig: '2',
  },
  {
    id: '3',
    name: 'Content Generator',
    description: 'Creates marketing content based on campaign briefs',
    status: 'development',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: '3',
    teamId: '2',
    modelId: '3',
    toolIds: ['1', '4'],
    terminationConfig: '1',
  },
];

const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  models: [],
  tools: [],
  terminations: [],
  isLoading: false,
  error: null,
  
  fetchAgents: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({
        agents: mockAgents,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  fetchGalleryItems: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        models: mockModels,
        tools: mockTools,
        terminations: mockTerminations,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
  
  createAgent: async (name, description, teamId, userId, modelId, toolIds, terminationConfig) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAgent: Agent = {
        id: String(mockAgents.length + 1),
        name,
        description,
        status: 'development',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: userId,
        teamId,
        modelId,
        toolIds,
        terminationConfig,
      };
      
      mockAgents.push(newAgent);
      
      set(state => ({
        agents: [...state.agents, newAgent],
        isLoading: false,
      }));
      
      return newAgent;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
      throw error;
    }
  },
  
  updateAgentStatus: async (agentId, status) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        agents: state.agents.map(agent => {
          if (agent.id === agentId) {
            return {
              ...agent,
              status,
              updatedAt: new Date().toISOString(),
            };
          }
          return agent;
        }),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
}));

export default useAgentStore;