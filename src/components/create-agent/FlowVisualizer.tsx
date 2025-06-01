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

        // Add step nodes vertically in the center
        message.steps?.forEach((step, stepIndex) => {
          const stepNode = {
            id: `${message.id}-step-${stepIndex}`,
            type: 'playMsg',
            data: {
              type: 'step',
              agent: step.agent,
              agent_type: step.agent_type,
              version: step.version,
              content: step.content,
              duration: step.duration,
              llmDetails: step.llmDetails,
              tools: step.toolCalls,
            },
            position: { x: CENTER_X, y: yOffset },
          };
          generatedNodes.push(stepNode);

          // Create edge from previous node
          generatedEdges.push({
            id: `e-${message.id}-${stepIndex}`,
            source: stepIndex === 0 ? `${userMessage.id}-user` : `${message.id}-step-${stepIndex - 1}`,
            target: stepNode.id,
            type: 'smoothstep',
            label: `Step ${stepIndex + 1}`,
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
            : `${userMessage.id}-user`;

          generatedEdges.push({
            id: `e-${message.id}-final`,
            source: lastStepId,
            target: `${message.id}-final`,
            type: 'smoothstep',
            animated: true,
            label: `Final`,
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
          <span>Flow visualization of current message</span>
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