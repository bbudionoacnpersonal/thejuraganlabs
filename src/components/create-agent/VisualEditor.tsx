import React, { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TeamStructure } from '@/types';
import { transformTeamStructureToFlow } from '@/utils/visualEditorUtils';
import AutogenNode from './AutogenNode';
import NodeEditPanel from './NodeEditPanel';

interface VisualEditorProps {
  teamStructure: TeamStructure;
}

const nodeTypes = {
  custom: AutogenNode
};

const VisualEditor: React.FC<VisualEditorProps> = ({ teamStructure }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleNodeEdit = (nodeData: any) => {
    setSelectedNode(nodeData);
  };
  
  const { nodes: initialNodes, edges: initialEdges } = React.useMemo(
    () => transformTeamStructureToFlow(teamStructure, handleNodeEdit),
    [teamStructure]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: any) => 
    setEdges((eds) => [...eds, { ...params, animated: true, style: { stroke: '#4D9CFF' } }]);

  const handleSaveNode = (updatedData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.label === selectedNode.label) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          };
        }
        return node;
      })
    );
    setSelectedNode(null);
  };

  return (
    <div className="h-full w-full bg-dark-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.2}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#4D9CFF' }
        }}
      >
        <Background color="#525252" gap={16} />
        <Controls className="bg-dark-surface border border-dark-border rounded-md" />
        <MiniMap 
          nodeColor="#fff"
          maskColor="rgba(0, 0, 0, 0.2)"
          className="bg-dark-surface border border-dark-border rounded-md"
        />
        <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Use your mouse for zoom in and out</span>
          </div>
        </Panel>
      </ReactFlow>

      <NodeEditPanel
        isVisible={!!selectedNode}
        nodeData={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSave={handleSaveNode}
      />
    </div>
  );
};

export default VisualEditor;