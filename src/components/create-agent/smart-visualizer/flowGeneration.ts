import { Node, Edge, MarkerType, Position } from 'reactflow';
import { getAutoLayout } from '../../../utils/dagreLayout';

interface FlowGenerationOptions {
  analysisStage: string;
  progressiveElements: any;
  teamStructure: any;
  conversationState: string;
  isAnalyzing: boolean;
  messages: any[];
  hasGeneratedTask: boolean;
  conversationEnded: boolean;
  conversationId?: string | null;
}

export const generateProgressiveFlow = (options: FlowGenerationOptions) => {
  try {
    console.log('🎨 Generating progressive flow visualization:', options);

    const {
      analysisStage,
      progressiveElements,
      teamStructure,
      conversationState,
      isAnalyzing,
      messages,
      hasGeneratedTask,
      conversationEnded,
      conversationId
    } = options;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yPosition = 50;

    // 🎯 CRITICAL FIX: Check if this is a new conversation or existing one with localStorage data
    const isNewConversation = !conversationId || !hasStoredConversationData(conversationId);

    // 🎯 FIXED: For completed conversations, ALWAYS show team structure regardless of new/existing
    const shouldUseTeamStructure = teamStructure && (
      !isNewConversation || // Existing conversation with data
      conversationEnded || // 🎯 CRITICAL: Completed conversation should show all data
      analysisStage === 'structure_complete' || // Structure is complete
      hasGeneratedTask // Task has been generated
    );

    console.log('🔍 Flow generation analysis:', {
      conversationId,
      isNewConversation,
      shouldUseTeamStructure,
      hasTeamStructure: !!teamStructure,
      analysisStage,
      messageCount: messages.length,
      conversationEnded,
      hasGeneratedTask
    });

    // --- STAGE 1: NODE CREATION (Create all nodes first) ---

    // 1. User Input Node - Create if we have any analysis stage beyond initial OR if we have messages
    const shouldCreateUserInput = analysisStage !== 'initial' || messages.length > 0;
    if (shouldCreateUserInput) {
      const userMessages = messages.filter((m: any) => m.role === 'user');
      const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
      
      newNodes.push({
        id: 'user-input',
        type: 'conversation',
        position: { x: 400, y: yPosition },
        data: {
          type: 'user',
          label: 'User Input',
          description: lastUserMessage 
            ? (lastUserMessage.content.substring(0, 100) + (lastUserMessage.content.length > 100 ? '...' : ''))
            : 'User requested AI agents team creation',
          confidence: 1.0
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
      yPosition += 200;
      console.log('✅ Created user-input node');
    }

    // 2. Team Node - 🎯 FIXED: Create if we have team info OR conversation is completed
    const shouldCreateTeam = shouldUseTeamStructure || (
      !isNewConversation && progressiveElements?.teamName
    ) || (
      // 🎯 NEW: For new conversations that are completed, use progressive elements
      isNewConversation && conversationEnded && (
        progressiveElements?.teamName || 
        analysisStage === 'structure_complete' ||
        hasGeneratedTask
      )
    );

    if (shouldCreateTeam) {
      const teamName = progressiveElements?.teamName || teamStructure?.label || 'AI Agents Team';
      const teamDescription = progressiveElements?.teamDescription || teamStructure?.description || 'AI agents team for task processing';
      const teamType = progressiveElements?.teamType || extractTeamTypeFromProvider(teamStructure?.provider) || 'RoundRobinGroupChat';
      
      const teamNode: Node = {
        id: 'team',
        type: 'conversation',
        position: { x: 300, y: yPosition },
        data: {
          type: 'team',
          label: teamName,
          description: teamDescription,
          confidence: analysisStage === 'structure_complete' ? 0.9 : 0.7,
          teamType: teamType,
          agents: progressiveElements?.identifiedAgents || extractAgentsFromTeamStructure(teamStructure) || []
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      newNodes.push(teamNode);
      yPosition += 400; //originally 280
      console.log('✅ Created team node:', teamName);
    }

    // 3. Agent Nodes - 🎯 FIXED: Create if we have agents OR conversation is completed
    const agents = progressiveElements?.identifiedAgents || extractAgentsFromTeamStructure(teamStructure) || [];

    const shouldCreateAgents = agents.length > 0 && (
      shouldUseTeamStructure || // Has team structure
      !isNewConversation || // Existing conversation
      conversationEnded || // 🎯 CRITICAL: Completed conversation
      analysisStage === 'agents_emerging' || 
      analysisStage === 'structure_complete' ||
      hasGeneratedTask
    );

    if (shouldCreateAgents) {
      agents.forEach((agent: any, index: number) => {
        // Extract LLM and tools info from team structure if available
        let llmModel = 'gpt-4o-mini';
        let llmProvider = 'OpenAI';
        let agentType = 'AssistantAgent';
        let tools: any[] = [];

        if (shouldUseTeamStructure && teamStructure?.config?.participants && teamStructure.config.participants[index]) {
          const participant = teamStructure.config.participants[index];
          llmModel = participant.config?.model_client?.config?.model || 'gpt-4o-mini';
          llmProvider = participant.config?.model_client?.provider?.split('.').pop() || 'OpenAI';
          agentType = participant.provider?.split('.').pop() || 'AssistantAgent';
          
          // 🎯 ENHANCED: Better tool extraction with multiple fallback methods
          tools = extractToolsFromParticipant(participant);
        }

        const agentNode: Node = {
          id: `agent-${index}`,
          type: 'conversation',
          position: { 
            x: 300 + (index * 280), 
            y: yPosition 
          },
          data: {
            type: 'agent',
            label: agent.name || `Agent ${index + 1}`,
            description: agent.description || 'AI agent for task processing',
            confidence: agent.confidence || 0.6,
            role: agent.role || 'assistant',
            agentType,
            llmModel,
            llmProvider,
            tools
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };
        newNodes.push(agentNode);
        console.log('✅ Created agent node:', agent.name || `Agent ${index + 1}`, 'with tools:', tools.map(t => t.name));
      });

      yPosition += 400;
    }

    // 4. Completion Node - Create if conversation is truly complete
    const shouldCreateCompletion = conversationEnded && hasGeneratedTask && (
      analysisStage === 'structure_complete' || agents.length > 0
    );
    if (shouldCreateCompletion) {
      const completionNode: Node = {
        id: 'completion-indicator',
        type: 'conversation',
        position: { x: 400, y: yPosition },
        data: {
          type: 'completion',
          label: 'Task Complete',
          description: 'AI agents team configuration completed and ready for deployment',
          confidence: 1.0
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      newNodes.push(completionNode);
      console.log('✅ Created completion node');
    }

    // --- STAGE 2: EDGE CREATION (After all nodes are created, validate and create edges) ---

    // 🎯 CRITICAL FIX: Only create edges if both source and target nodes exist
    const userInputNode = newNodes.find(n => n.id === 'user-input');
    const teamNode = newNodes.find(n => n.id === 'team');

    // Edge 1: User Input → Team (only if both nodes exist)
    if (userInputNode && teamNode) {
      console.log('🔗 Creating edge from user-input to team');
      newEdges.push({
        id: 'edge-user-input-team',
        source: 'user-input',
        target: 'team',
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: isAnalyzing ? '#f59e0b' : conversationState === 'processing' ? '#3b82f6' : '#4D9CFF',
          strokeWidth: 2
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 12,
          height: 12,
          color: isAnalyzing ? '#f59e0b' : conversationState === 'processing' ? '#3b82f6' : '#4D9CFF',
        },
        label: 'Team Coordination',
        labelStyle: { fontSize: 12, fontWeight: 600, fill: '#ffffff' },
        labelBgStyle: { fill: '#1e1e1e', fillOpacity: 0.8 },
      });
    }

    // Edge 2: Team → Agents (🎯 CRITICAL FIX: Only create if both nodes exist)
    if (teamNode && agents.length > 0) {
      agents.forEach((agent: any, index: number) => {
        const agentNode = newNodes.find(n => n.id === `agent-${index}`);
        if (agentNode) {
          console.log('🔗 Creating edge from team to agent', index);
          newEdges.push({
            id: `edge-team-agent-${index}`,
            source: 'team',
            target: `agent-${index}`,
            type: 'smoothstep',
            animated: true,
            style: { 
              stroke: conversationState === 'responding' ? '#10b981' : '#4D9CFF',
              strokeWidth: 2
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 12,
              height: 12,
              color: conversationState === 'responding' ? '#10b981' : '#4D9CFF',
            },
            label: `Agent ${index + 1}`,
            labelStyle: { fontSize: 10, fontWeight: 500, fill: '#ffffff' },
            labelBgStyle: { fill: '#1e1e1e', fillOpacity: 0.7 },
          });
        }
      });
    }

    // Edge 3: Last Agent/Team → Completion (only if both nodes exist)
    const completionNode = newNodes.find(n => n.id === 'completion-indicator');
    if (completionNode) {
      const lastAgentIndex = agents.length - 1;
      const sourceId = lastAgentIndex >= 0 ? `agent-${lastAgentIndex}` : 'team';
      const sourceNode = newNodes.find(n => n.id === sourceId);
      
      if (sourceNode) {
        console.log('🔗 Creating edge from', sourceId, 'to completion');
        newEdges.push({
          id: `edge-${sourceId}-completion`,
          source: sourceId,
          target: 'completion-indicator',
          type: 'smoothstep',
          animated: true,
          style: { 
            stroke: '#4D9CFF',
            strokeWidth: 2
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 12,
            height: 12,
            color: '#4D9CFF',
          },
          label: 'Complete',
          labelStyle: { fontSize: 10, fontWeight: 500, fill: '#ffffff' },
          labelBgStyle: { fill: '#1e1e1e', fillOpacity: 0.7 },
        });
      }
    }

    console.log('🎨 Generated progressive flow:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length,
      stage: analysisStage,
      isNewConversation,
      conversationEnded,
      hasGeneratedTask,
      nodeIds: newNodes.map(n => n.id),
      edgeConnections: newEdges.map(e => `${e.source} → ${e.target}`)
    });

    return { nodes: newNodes, edges: newEdges };
  } catch (error) {
    console.error('Error generating progressive flow:', error);
    return { nodes: [], edges: [] };
  }
};

// 🎯 ENHANCED: Better tool extraction with multiple fallback methods
const extractToolsFromParticipant = (participant: any): any[] => {
  const tools: any[] = [];

  if (!participant?.config?.tools || !Array.isArray(participant.config.tools)) {
    return tools;
  }

  participant.config.tools.forEach((tool: any, index: number) => {
    if (!tool) return;

    let toolName = '';
    let toolDescription = '';
    let toolType = 'function';
    let toolProvider = 'custom';
    let toolConfig = {};

    // Method 1: Extract from tool.config.name
    if (tool.config?.name) {
      toolName = tool.config.name;
      toolDescription = tool.description || tool.config.description || `${toolName} tool`;
      toolConfig = tool.config;
    }
    // Method 2: Extract from tool.label
    else if (tool.label) {
      toolName = tool.label;
      toolDescription = tool.description || `${toolName} tool`;
    }
    // Method 3: Extract function name from source_code
    else if (tool.config?.source_code) {
      const functionMatch = tool.config.source_code.match(/def\s+(\w+)\s*\(/);
      if (functionMatch) {
        toolName = functionMatch[1];
        toolDescription = tool.description || `${toolName} function`;
        toolConfig = tool.config;
      }
    }
    // Method 4: Extract from provider
    else if (tool.provider) {
      const providerParts = tool.provider.split('.');
      toolName = providerParts[providerParts.length - 1] || `tool_${index}`;
      toolDescription = tool.description || `${toolName} from ${providerParts[0]}`;
      toolProvider = providerParts[0] || 'custom';
    }
    // Method 5: Fallback
    else {
      toolName = `tool_${index + 1}`;
      toolDescription = tool.description || 'Custom tool';
    }

    if (toolName) {
      tools.push({
        id: `${participant.label || 'agent'}_${toolName}`,
        name: toolName,
        description: toolDescription,
        type: toolType,
        provider: toolProvider,
        config: toolConfig
      });
    }
  });

  console.log('🔧 Enhanced tool extraction for', participant.label, ':', {
    toolsFound: tools.map(t => ({ name: t.name, type: t.type, provider: t.provider })),
    rawToolsCount: participant.config?.tools?.length || 0
  });

  return tools;
};

// 🎯 NEW: Helper function to check if conversation has stored data
const hasStoredConversationData = (conversationId: string | null): boolean => {
  if (!conversationId) return false;

  try {
    const storageKey = `juragan_conversation_${conversationId}`;
    const storedData = localStorage.getItem(storageKey);
    return !!storedData;
  } catch (error) {
    console.error('Error checking stored conversation data:', error);
    return false;
  }
};

// 🎯 CONDITIONAL: Helper function to extract team type from provider - only for existing conversations
const extractTeamTypeFromProvider = (provider?: string): string => {
  if (!provider) return 'RoundRobinGroupChat';

  const teamTypeMatch = provider.match(/\.teams\.([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm)?)/);
  if (teamTypeMatch) {
    return teamTypeMatch[1];
  }

  const alternativeMatch = provider.match(/([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm))$/);
  if (alternativeMatch) {
    return alternativeMatch[1];
  }

  return 'RoundRobinGroupChat';
};

// 🎯 CONDITIONAL: Helper function to extract agents from team structure - only for existing conversations
const extractAgentsFromTeamStructure = (teamStructure?: any): any[] => {
  if (!teamStructure?.config?.participants) return [];

  return teamStructure.config.participants.map((participant: any, index: number) => ({
    name: participant.label || `Agent ${index + 1}`,
    description: participant.description || 'AI agent',
    role: 'assistant',
    confidence: 0.8
  }));
};

export const applyLayoutToFlow = (
  nodes: Node[],
  edges: Edge[],
  teamType?: string
): { nodes: Node[]; edges: Edge[] } => {
  if (nodes.length > 0) {
    const layoutedElements = getAutoLayout(nodes, edges, teamType);

    console.log('✅ Applied Dagre layout to Smart Visualizer:', {
      originalNodes: nodes.length,
      layoutedNodes: layoutedElements.nodes.length,
      originalEdges: edges.length,
      layoutedEdges: layoutedElements.edges.length,
      teamType
    });

    return layoutedElements;
  }

  return { nodes, edges };
};