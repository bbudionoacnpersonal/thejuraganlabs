// Types specific to Smart Visualizer components
export interface SmartVisualizerProps {
  isVisible: boolean;
  onClose: () => void;
  conversationState: 'idle' | 'listening' | 'processing' | 'responding';
  agentFlow: Array<{
    id: string;
    type: 'user' | 'agent' | 'tool' | 'decision' | 'output';
    label: string;
    status: 'pending' | 'active' | 'completed' | 'error';
    description?: string;
    timestamp?: number;
    duration?: number;
  }>;
  messages?: Array<{ role: string; content: string; timestamp: number }>;
  conversationId?: string | null;
  onJsonGenerated?: (json: any) => void;
}

export interface VisualizerState {
  isMinimized: boolean;
  isAnalyzing: boolean;
  lastMessageCount: number;
  currentConversationId: string | null;
  analysisStage: 'initial' | 'team_identified' | 'agents_emerging' | 'structure_complete';
  teamStructure: any | null;
  progressiveElements: any;
  error: string | null;
  hasGeneratedTask: boolean;
  conversationEnded: boolean;
  pendingJsonUpdate: any | null;
  hasJsonReady: boolean;
}

export interface TeamTypeInfo {
  icon: any;
  color: string;
  bgColor: string;
  label: string;
  description: string;
}