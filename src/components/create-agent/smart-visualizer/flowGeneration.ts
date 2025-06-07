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
      conversationEnded
    } = options;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yPosition = 50;

    // 🎯 CRITICAL FIX: Always generate nodes even with minimal data
    console.log('🔍 Flow generation input:', {
      analysisStage,
      hasProgressiveElements: !!progressiveElements,
      hasTeamStructure: !!teamStructure,
      messageCount: messages.length,
      progressiveElementsKeys: Object.keys(progressiveElements || {})
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

    // 2. Team Node - Create if we have team info OR team structure
    const shouldCreateTeam = (analysisStage !== 'initial' && progressiveElements?.teamName) || teamStructure;
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
      yPosition += 280;
      console.log('✅ Created team node:', teamName);
    }

    // 3. Agent Nodes - Create if we have agents in the right stage
    const agents = progressiveElements?.identifiedAgents || extractAgentsFromTeamStructure(teamStructure) || [];
    const shouldCreateAgents = (analysisStage === 'agents_emerging' || analysisStage === 'structure_complete') && agents.length > 0;
    
    if (shouldCreateAgents) {
      agents.forEach((agent: any, index: number) => {
        // Extract LLM and tools info from team structure if available
        let llmModel = 'gpt-4o-mini';
        let llmProvider = 'OpenAI';
        let agentType = 'AssistantAgent';
        let tools: any[] = [];

        if (teamStructure?.config?.participants && teamStructure.config.participants[index]) {
          const participant = teamStructure.config.participants[index];
          llmModel = participant.config?.model_client?.config?.model || 'gpt-4o-mini';
          llmProvider = participant.config?.model_client?.provider?.split('.').pop() || 'OpenAI';
          agentType = participant.provider?.split('.').pop() || 'AssistantAgent';
          tools = participant.config?.tools?.map((tool: any) => ({
            name: tool.config?.name || tool.label || 'Tool',
            description: tool.description || 'Agent tool'
          })) || [];
        }

        const agentNode: Node = {
          id: `agent-${index}`,
          type: 'conversation',
          position: { 
            x: 200 + (index * 280), 
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
        console.log('✅ Created agent node:', agent.name || `Agent ${index + 1}`);
      });

      yPosition += 280;
    }

    // 4. Completion Node - Create if conversation is truly complete
    const shouldCreateCompletion = conversationEnded && hasGeneratedTask && analysisStage === 'structure_complete';
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

    // Edge 1: User Input → Team
    const userInputNode = newNodes.find(n => n.id === 'user-input');
    const teamNode = newNodes.find(n => n.id === 'team');

    if (userInputNode && teamNode) {
      console.log('🔗 Creating edge from user-input to team');
      newEdges.push({
        id: `edge-user-input-team`,
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
    } else {
      console.log('⚠️ Cannot create user-input → team edge:', {
        hasUserInput: !!userInputNode,
        hasTeam: !!teamNode
      });
    }

    // Edge 2: Team → Agents
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
        } else {
          console.log('⚠️ Cannot create team → agent edge for index', index, ': agent node not found');
        }
      });
    } else {
      console.log('⚠️ Cannot create team → agent edges:', {
        hasTeam: !!teamNode,
        agentCount: agents.length
      });
    }

    // Edge 3: Last Agent/Team → Completion
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
      } else {
        console.log('⚠️ Cannot create completion edge: source node not found for', sourceId);
      }
    }

    console.log('🎨 Generated progressive flow:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length,
      stage: analysisStage,
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

// 🎯 NEW: Helper function to extract team type from provider
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

// 🎯 NEW: Helper function to extract agents from team structure
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