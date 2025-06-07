import { Node, Edge, MarkerType, Position } from 'reactflow';
import { getAutoLayout } from '@/utils/dagreLayout';

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

    // Generate final task example based on progressive elements
    const generateFinalTaskExample = (elements: any) => {
      try {
        if (elements.teamName && elements.identifiedAgents && Array.isArray(elements.identifiedAgents)) {
          const agentNames = elements.identifiedAgents.map((a: any) => a.name || 'Agent').join(', ');
          const teamType = elements.teamType || 'RoundRobinGroupChat';
          const teamTypeName = teamType.split('GroupChat')[0].replace(/([A-Z])/g, ' $1').trim();
          
          return `Deploy ${elements.teamName} using ${teamTypeName} coordination with specialized agents: ${agentNames}. The team will process user requests efficiently through coordinated agent collaboration.`;
        }
        if (elements.teamName) {
          return `Deploy ${elements.teamName} for coordinated AI task processing with intelligent agent collaboration.`;
        }
        return 'Deploy AI agents team to handle complex user requests through intelligent multi-agent coordination and task distribution.';
      } catch (error) {
        console.error('Error generating final task example:', error);
        return 'Deploy AI agents team to handle complex user requests through intelligent multi-agent coordination.';
      }
    };

    // Replace user input with final task when conversation ends
    if (conversationEnded && hasGeneratedTask) {
      const finalTaskExample = generateFinalTaskExample(progressiveElements);
      
      newNodes.push({
        id: 'final-task-input',
        type: 'conversation',
        position: { x: 400, y: yPosition },
        data: {
          type: 'final_task',
          label: 'Final Task Generated',
          description: finalTaskExample,
          confidence: 1.0
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
      yPosition += 200;
    } else {
      // Show original user input when conversation is active
      if (analysisStage !== 'initial' && messages.length > 0) {
        const userMessages = messages.filter(m => m.role === 'user');
        if (userMessages.length > 0) {
          const lastUserMessage = userMessages[userMessages.length - 1];
          
          newNodes.push({
            id: 'user-input',
            type: 'conversation',
            position: { x: 400, y: yPosition },
            data: {
              type: 'user',
              label: 'User Input',
              description: lastUserMessage.content.substring(0, 100) + (lastUserMessage.content.length > 100 ? '...' : ''),
              confidence: 1.0
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          });
          yPosition += 200;
        }
      }
    }

    // Team Node (when team is identified)
    if (analysisStage !== 'initial' && progressiveElements.teamName) {
      const teamNode: Node = {
        id: 'team',
        type: 'conversation',
        position: { x: 300, y: yPosition },
        data: {
          type: 'team',
          label: progressiveElements.teamName,
          description: progressiveElements.teamDescription || 'AI agents team',
          confidence: analysisStage === 'structure_complete' ? 0.9 : 0.7,
          teamType: progressiveElements.teamType || 'RoundRobinGroupChat',
          agents: progressiveElements.identifiedAgents || []
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      newNodes.push(teamNode);

      // Create edge from input to team
      const sourceNodeId = conversationEnded ? 'final-task-input' : 'user-input';
      const sourceNode = newNodes.find(n => n.id === sourceNodeId);
      
      if (sourceNode) {
        console.log('🔗 Creating edge from', sourceNodeId, 'to team');
        newEdges.push({
          id: `edge-${sourceNodeId}-team`,
          source: sourceNodeId,
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

      yPosition += 280;
    }

    // Agent Nodes (when agents are emerging)
    if (analysisStage === 'agents_emerging' || analysisStage === 'structure_complete') {
      const agents = progressiveElements.identifiedAgents || [];
      
      agents.forEach((agent: any, index: number) => {
        // Extract LLM and tools info from team structure if available
        let llmModel = 'gpt-4o-mini';
        let llmProvider = 'OpenAI';
        let agentType = 'AssistantAgent';
        let tools: any[] = [];

        if (teamStructure?.config?.participants && teamStructure.config.participants[index]) {
          const participant = teamStructure.config.participants[index];
          llmModel = participant.config.model_client?.config.model || 'gpt-4o-mini';
          llmProvider = participant.config.model_client?.provider.split('.').pop() || 'OpenAI';
          agentType = participant.provider.split('.').pop() || 'AssistantAgent';
          tools = participant.config.tools?.map((tool: any) => ({
            name: tool.config?.name || tool.label,
            description: tool.description
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
            label: agent.name,
            description: agent.description,
            confidence: agent.confidence || 0.6,
            role: agent.role,
            agentType,
            llmModel,
            llmProvider,
            tools
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };
        newNodes.push(agentNode);

        // Create edge from team to agent
        const teamNode = newNodes.find(n => n.id === 'team');
        if (teamNode) {
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

      yPosition += 280;
    }

    console.log('🎨 Generated progressive flow:', { 
      nodeCount: newNodes.length, 
      edgeCount: newEdges.length,
      stage: analysisStage,
      conversationEnded,
      hasGeneratedTask
    });
    
    return { nodes: newNodes, edges: newEdges };
  } catch (error) {
    console.error('Error generating progressive flow:', error);
    return { nodes: [], edges: [] };
  }
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