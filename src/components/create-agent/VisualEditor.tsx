import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TeamStructure } from '@/types';
import { transformTeamStructureToFlow } from '@/utils/visualEditorUtils';
import { relayoutNodes } from '@/utils/dagreLayout';
import AutogenNode from './AutogenNode';
import NodeEditPanel from './NodeEditPanel';
import Button from '@/components/ui/Button';
import { ArrowPathIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

interface VisualEditorProps {
  teamStructure: TeamStructure;
}

const nodeTypes = {
  custom: AutogenNode
};

const VisualEditor: React.FC<VisualEditorProps> = ({ teamStructure }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const handleNodeEdit = (nodeData: any) => {
    setSelectedNode(nodeData);
  };
  
  // 🎯 CRITICAL: Extract team type from provider attribute for enhanced display
  const extractTeamTypeFromProvider = (provider: string): string => {
    if (!provider || typeof provider !== 'string') {
      console.log('⚠️ No provider found in VisualEditor, using default RoundRobinGroupChat');
      return 'RoundRobinGroupChat';
    }
    
    // Match pattern: *.teams.<TeamType>
    const teamTypeMatch = provider.match(/\.teams\.([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm)?)/);
    if (teamTypeMatch) {
      console.log('✅ VisualEditor extracted team type from provider:', teamTypeMatch[1]);
      return teamTypeMatch[1];
    }
    
    // Alternative patterns for different naming conventions
    const alternativeMatch = provider.match(/([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm))$/);
    if (alternativeMatch) {
      console.log('✅ VisualEditor extracted team type (alternative pattern):', alternativeMatch[1]);
      return alternativeMatch[1];
    }
    
    console.log('❌ VisualEditor: No team type found in provider, using default:', provider);
    return 'RoundRobinGroupChat';
  };

  // Enhanced transformation with team type extraction and Dagre layout
  const { nodes: initialNodes, edges: initialEdges } = React.useMemo(() => {
    // Extract team type from the team structure provider
    const teamType = extractTeamTypeFromProvider(teamStructure.provider);
    
    console.log('🎨 VisualEditor: Transforming team structure with enhanced team type:', {
      teamName: teamStructure.label,
      provider: teamStructure.provider,
      extractedTeamType: teamType,
      participantCount: teamStructure.config.participants.length
    });
    
    return transformTeamStructureToFlow(teamStructure, handleNodeEdit, teamType);
  }, [teamStructure]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when teamStructure changes
  useEffect(() => {
    const teamType = extractTeamTypeFromProvider(teamStructure.provider);
    const { nodes: newNodes, edges: newEdges } = transformTeamStructureToFlow(
      teamStructure, 
      handleNodeEdit, 
      teamType
    );
    setNodes(newNodes);
    setEdges(newEdges);
  }, [teamStructure, setNodes, setEdges]);

  const onConnect = (params: any) => 
    setEdges((eds) => [...eds, { 
      ...params, 
      animated: true, 
      style: { stroke: '#4D9CFF', strokeWidth: 2 },
      markerEnd: {
        type: 'arrowclosed',
        width: 12,
        height: 12,
        color: '#4D9CFF',
      },
    }]);

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

  // 🎯 NEW: Auto-layout function using Dagre
  const handleAutoLayout = useCallback(() => {
    const teamType = extractTeamTypeFromProvider(teamStructure.provider);
    const layouted = relayoutNodes(nodes, edges, teamType);
    
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
    
    // Fit view after layout
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);
  }, [nodes, edges, teamStructure.provider, setNodes, setEdges, fitView]);

  // 🎯 NEW: Fit view function
  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, duration: 800 });
  }, [fitView]);

  // Extract team type for display in panel
  const currentTeamType = extractTeamTypeFromProvider(teamStructure.provider);
  const formatTeamTypeName = (teamType: string): string => {
    return teamType
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
      .replace(/Group Chat$/, 'Group')
      .replace(/Chat$/, '')
      .trim();
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
          style: { stroke: '#4D9CFF', strokeWidth: 2 }
        }}
      >
        <Background color="#525252" gap={16} />
        <Controls className="bg-dark-surface border border-dark-border rounded-md" />
        <MiniMap 
          nodeColor="#fff"
          maskColor="rgba(0, 0, 0, 0.2)"
          className="bg-dark-surface border border-dark-border rounded-md"
        />
        
        {/* Enhanced Control Panel */}
        <Panel position="top-left" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <span>Team Type: {formatTeamTypeName(currentTeamType)}</span>
            <span>•</span>
            <span>{teamStructure.config.participants.length} Agents</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">
            {teamStructure.description}
          </div>
          
          {/* Layout Controls */}
          <div className="flex items-center gap-1">
            <Button
              size="xs"
              variant="ghost"
              onClick={handleAutoLayout}
              className="text-xs px-2 py-1 border border-dark-border hover:bg-dark-400"
              leftIcon={<ArrowPathIcon className="h-3 w-3" />}
            >
              Auto Layout
            </Button>
            <Button
              size="xs"
              variant="ghost"
              onClick={handleFitView}
              className="text-xs px-2 py-1 border border-dark-border hover:bg-dark-400"
            >
              Fit View
            </Button>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => zoomIn({ duration: 300 })}
              className="text-xs px-1 py-1 border border-dark-border hover:bg-dark-400"
            >
              <MagnifyingGlassPlusIcon className="h-3 w-3" />
            </Button>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => zoomOut({ duration: 300 })}
              className="text-xs px-1 py-1 border border-dark-border hover:bg-dark-400"
            >
              <MagnifyingGlassMinusIcon className="h-3 w-3" />
            </Button>
          </div>
        </Panel>
        
        <Panel position="top-right" className="bg-dark-surface/50 backdrop-blur-sm p-2 rounded-md border border-dark-border">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Provider: {teamStructure.provider.split('.').pop()}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Version: {teamStructure.component_version}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Dagre Layout: Active
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