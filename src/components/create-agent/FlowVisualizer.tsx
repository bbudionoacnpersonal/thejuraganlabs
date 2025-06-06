import React, { useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  ReactFlowProvider,
  Node,
  Edge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import PlayMsgNode from './PlayMsgNode';
import { Message } from '@/types';
import { teamStructure } from '@/mockdata/teamStructure';

interface FlowVisualizerProps {
  messages: Message[];
}

const nodeTypes = {
  playMsg: PlayMsgNode,
};

const VERTICAL_SPACING = 260;
const VERTICAL_SPACING_START = 140;
const CENTER_X = 0;

const FlowVisualizerContent: React.FC<FlowVisualizerProps> = ({ messages }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Only process the last message pair (user + assistant)
    const lastMessages = messages.slice(-2);
    
    const generatedNodes: Node[] = [];
    const generatedEdges: Edge[] = [];
    let yOffset = 0;

    lastMessages.forEach((message, index) => {
      if (message.role === 'assistant') {
        const userMessage = lastMessages[index - 1];
        if (userMessage?.role !== 'user') return;

        // Position user node at the top center
        const userNode = {
          id: `${userMessage.id}-user`,
          type: 'playMsg',
          data: {
            type: 'user',
            content: userMessage.content,
          },
          position: { x: CENTER_X, y: yOffset },
        };
        generatedNodes.push(userNode);
        yOffset += VERTICAL_SPACING_START;

        // Add team node if we have steps (showing team coordination)
        if (message.steps && message.steps.length > 0) {
          // 🎯 ENHANCED: Extract team type from provider attribute
          const teamType = extractTeamTypeFromProvider();
          const teamDescription = generateTeamDescription(message.steps, userMessage.content);
          
          const teamNode = {
            id: `${message.id}-team`,
            type: 'playMsg',
            data: {
              type: 'team',
              teamType: teamType,
              label: `${formatTeamTypeName(teamType)} Team`,
              description: teamDescription,
              content: `Coordinating ${message.steps.length} agents using ${teamType} pattern`,
              agents: message.steps.map(step => ({
                name: step.agent,
                type: step.agent_type || step.type || 'AssistantAgent'
              })),
              duration: message.steps.reduce((sum, step) => sum + (step.duration || 0), 0),
              tokens: message.steps.reduce((sum, step) => sum + (step.tokens || 0), 0),
            },
            position: { x: CENTER_X, y: yOffset },
          };
          generatedNodes.push(teamNode);

          // Create edge from user to team
          generatedEdges.push({
            id: `e-${userMessage.id}-team`,
            source: `${userMessage.id}-user`,
            target: `${message.id}-team`,
            type: 'smoothstep',
            label: 'Team Coordination',
            animated: true,
            style: { stroke: '#4D9CFF', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 12,
              height: 12,
              color: '#4D9CFF',
            },
          });

          yOffset += VERTICAL_SPACING;
        }

        // Add step nodes vertically in the center
        message.steps?.forEach((step, stepIndex) => {
          const stepNode = {
            id: `${message.id}-step-${stepIndex}`,
            type: 'playMsg',
            data: {
              type: 'step',
              agent: step.agent,
              agent_type: step.agent_type || step.type,
              version: step.version,
              content: step.content,
              duration: step.duration,
              llmDetails: step.llmDetails,
              tools: step.toolCalls,
            },
            position: { x: CENTER_X, y: yOffset },
          };
          generatedNodes.push(stepNode);

          // Create edge from previous node (team or previous step)
          const sourceId = stepIndex === 0 
            ? (generatedNodes.find(n => n.data.type === 'team') ? `${message.id}-team` : `${userMessage.id}-user`)
            : `${message.id}-step-${stepIndex - 1}`;

          generatedEdges.push({
            id: `e-${message.id}-${stepIndex}`,
            source: sourceId,
            target: stepNode.id,
            type: 'smoothstep',
            label: `Agent ${stepIndex + 1}`,
            animated: true,
            style: { stroke: '#4D9CFF', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 12,
              height: 12,
              color: '#4D9CFF',
            },
          });

          yOffset += VERTICAL_SPACING;
        });

        // Add final response node if available
        if (message.finalResponse) {
          const finalNode = {
            id: `${message.id}-final`,
            type: 'playMsg',
            data: {
              type: 'final',
              content: message.finalResponse.content,
              tokens: message.finalResponse.tokens,
              duration: message.finalResponse.duration,
            },
            position: { x: CENTER_X, y: yOffset },
          };
          generatedNodes.push(finalNode);

          // Create edge from last step to final node
          const lastStepId = message.steps?.length 
            ? `${message.id}-step-${message.steps.length - 1}`
            : (generatedNodes.find(n => n.data.type === 'team') ? `${message.id}-team` : `${userMessage.id}-user`);

          generatedEdges.push({
            id: `e-${message.id}-final`,
            source: lastStepId,
            target: `${message.id}-final`,
            type: 'smoothstep',
            animated: true,
            label: `Final Response`,
            style: { stroke: '#4D9CFF', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 12,
              height: 12,
              color: '#4D9CFF',
            },
          });
        }

        // Reset viewport and fit view
        setTimeout(() => {
          fitView({ padding: 0.2, duration: 800 });
        }, 100);
      }
    });

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, [messages, fitView, setNodes, setEdges]);

  // 🎯 CRITICAL: Extract team type from provider attribute in team structure
  const extractTeamTypeFromProvider = (): string => {
    // First, try to get from the actual team structure provider
    if (teamStructure?.provider) {
      const teamType = extractTeamTypeFromProviderString(teamStructure.provider);
      if (teamType) {
        console.log('🎯 Extracted team type from provider:', teamType);
        return teamType;
      }
    }
    
    // Fallback: Default team type
    console.log('⚠️ No provider found, using default RoundRobinGroupChat');
    return 'RoundRobinGroupChat';
  };

  // Extract team type from provider string (e.g., "autogen_agentchat.teams.RoundRobinGroupChat")
  const extractTeamTypeFromProviderString = (provider: string): string | null => {
    if (!provider || typeof provider !== 'string') return null;
    
    // Match pattern: *.teams.<TeamType>
    const teamTypeMatch = provider.match(/\.teams\.([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm)?)/);
    if (teamTypeMatch) {
      console.log('✅ Found team type in provider:', teamTypeMatch[1]);
      return teamTypeMatch[1];
    }
    
    // Alternative patterns for different naming conventions
    const alternativeMatch = provider.match(/([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm))$/);
    if (alternativeMatch) {
      console.log('✅ Found team type (alternative pattern):', alternativeMatch[1]);
      return alternativeMatch[1];
    }
    
    console.log('❌ No team type found in provider:', provider);
    return null;
  };

  // Format team type name for display
  const formatTeamTypeName = (teamType: string): string => {
    // Convert CamelCase to readable format
    return teamType
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
      .replace(/Group Chat$/, 'Group')
      .replace(/Chat$/, '')
      .trim();
  };

  // Helper function to generate team description
  const generateTeamDescription = (steps: any[], userInput: string) => {
    const agentTypes = [...new Set(steps.map(step => step.agent))];
    const hasTools = steps.some(step => step.toolCalls && step.toolCalls.length > 0);
    
    // Extract task context from user input
    let taskContext = 'user requests';
    if (userInput.toLowerCase().includes('customer')) taskContext = 'customer support tasks';
    else if (userInput.toLowerCase().includes('analyz')) taskContext = 'data analysis tasks';
    else if (userInput.toLowerCase().includes('ticket')) taskContext = 'ticket processing';
    else if (userInput.toLowerCase().includes('market')) taskContext = 'market analysis';
    
    const toolsText = hasTools ? ' with specialized tools' : '';
    
    return `Coordinates ${agentTypes.length} specialized agents${toolsText} to handle ${taskContext} efficiently`;
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 0.2 }}
      minZoom={0.2}
      maxZoom={1}
      fitViewOptions={{ 
        padding: 0.2,
        includeHiddenNodes: true,
        duration: 800
      }}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#333" gap={16} />
      <Controls 
        className="bg-dark-surface border border-dark-border rounded-md"
        showInteractive={false}
      />
      <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Flow visualization - Team Type: {extractTeamTypeFromProvider()}</span>
        </div>
      </Panel>
    </ReactFlow>
  );
};

const FlowVisualizer: React.FC<FlowVisualizerProps> = (props) => {
  return (
    <div className="h-full w-full bg-dark-background">
      <ReactFlowProvider>
        <FlowVisualizerContent {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowVisualizer;