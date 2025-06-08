// User related types
export type Role = 'business' | 'engineer' | 'architect' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  password?: string;
  role: Role;
  avatar?: string;
}

export interface RoleFeatures {
  name: string;
  features: {
    voiceInput: boolean;
    settings: boolean;
    analytics: boolean;
    modelManagement: boolean;
    teamManagement: boolean;
  };
  dashboardItems: string[];
  agentGroups: string[];
}

// Team related types
export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
  ownerId: string;
  createdAt: string;
  aiTeamType: string; // Fixed typo: was 'strig'
  agents: string[];
}

// Agent related types
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'development' | 'testing' | 'deployed';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  teamId: string;
  modelId: string;
  toolIds: string[];
  terminationConfig: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  provider: string;
  type: string;
  version: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
}

export interface Termination {
  id: string;
  name: string;
  description: string;
  type: string;
}

// --- Message related types ---
// Define and export StepDetail
export interface StepDetail {
  agent: string;
  agent_type?: string; // This is where you'll store the determined agent type
  type?: string;       // This can remain if your raw source data sometimes uses 'type'
  version?: string;
  content: string;
  tokens: number;
  duration: number;
  timestamp: number;
  llmDetails?: any;   // Consider defining a specific LLMDetail type later
  toolCalls?: any[];  // Consider defining a specific ToolCall type later
}

// Message related types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  version?: string;
  agent?: string;
  timestamp: number;
  tokens?: number;
  cost?: number;
  duration?: number;
  steps?: StepDetail[];
  finalResponse?: {
    content: string;
    tokens: number;
    duration: number;
    timestamp: number;
  };
}

export interface Session {
  id: string;
  name: string;
  lastModified: string;
  messageCount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Team structure types
export interface Participant {
  provider: string;
  component_type: string;
  version: number;
  component_version: number;
  description: string;
  label: string;
  config: {
    name: string;
    model_client?: any;
    tools?: any[];
    model_context?: any;
    description?: string;
    system_message?: string;
    model_client_stream?: boolean;
    reflect_on_tool_use?: boolean;
    tool_call_summary_format?: string;
  };
}

export interface TeamStructure {
  provider: string;
  component_type: string;
  version: number;
  component_version: number;
  description: string;
  label: string;
  config: {
    participants: Participant[];
    model_client?: any;
    termination_condition: any;
  };
}

// Chatbox handle type
export interface ChatboxHandle {
  triggerMicClick: () => void;
}

// Agent Flow types for conversation visualization
interface AgentFlowStep {
  id: string;
  type: 'user' | 'agent' | 'tool' | 'decision' | 'output';
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  description?: string;
  timestamp?: number;
  duration?: number;
}

interface ConversationState {
  state: 'idle' | 'listening' | 'processing' | 'responding';
  currentStep?: string;
  agentFlow: AgentFlowStep[];
}