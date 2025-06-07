import { Node, Edge, MarkerType } from 'reactflow';
import { TeamStructure } from '@/types';
import { getAutoLayout } from './dagreLayout';

export const transformTeamStructureToFlow = (
  teamStructure: TeamStructure,
  onEdit?: (data: any) => void,
  teamType?: string // Enhanced: Accept extracted team type
): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // 🎯 DEFENSIVE: Check if teamStructure and config exist
  if (!teamStructure || !teamStructure.config) {
    console.warn('⚠️ TeamStructure or config is undefined, returning empty flow');
    return { nodes: [], edges: [] };
  }
  
  // 🎯 ENHANCED: Use provided team type or extract from provider
  const extractedTeamType = teamType || extractTeamTypeFromProvider(teamStructure.provider);
  
  console.log('🎨 Transforming team structure with team type:', {
    teamName: teamStructure.label,
    teamType: extractedTeamType,
    participantCount: teamStructure.config.participants?.length || 0
  });
  
  // Add enhanced team node with team type information
  nodes.push({
    id: 'team',
    type: 'custom',
    data: {
      label: teamStructure.label || 'Unnamed Team',
      type: 'team',
      teamType: extractedTeamType, // 🎯 CRITICAL: Pass extracted team type
      description: teamStructure.description || '',
      model: teamStructure.config.model_client?.config?.model || '',
      agents: (teamStructure.config.participants || []).map((p: any) => ({
        name: p?.label || 'Unnamed Agent',
        description: p?.description || '',
        model: {
          name: p?.config?.model_client?.config?.model || 'gpt-4o-mini',
          provider: p?.config?.model_client?.provider?.split('.').pop() || 'OpenAI'
        },
        tools: (p?.config?.tools || []).map((t: any) => ({
          name: t?.config?.name || t?.label || 'Unnamed Tool',
          description: t?.description || ''
        }))
      })),
      terminations: teamStructure.config.termination_condition?.config?.conditions?.map((c: any) => ({
        name: c?.label || 'Unnamed Condition'
      })) || [{ name: teamStructure.config.termination_condition?.label || 'Default Termination' }],
      onEdit,
    },
    // Initial position - will be overridden by Dagre
    position: { x: 0, y: 0 }
  });

  // Add participant nodes with proper tool extraction
  const participants = teamStructure.config.participants || [];
  participants.forEach((participant: any) => {
    // 🎯 DEFENSIVE: Check if participant exists
    if (!participant) {
      console.warn('⚠️ Participant is undefined, skipping');
      return;
    }
    
    // 🎯 FIXED: Properly extract tool names from the participant configuration
    const extractedTools = extractToolsFromParticipant(participant);
    
    console.log('🔧 Extracted tools for', participant.label, ':', extractedTools);
    
    nodes.push({
      id: participant.label || `agent-${nodes.length}`,
      type: 'custom',
      data: {
        label: participant.label || 'Unnamed Agent',
        type: 'agent',
        description: participant.description || '',
        model: participant.config?.model_client?.config?.model || '',
        tools: extractedTools.length, // Number of tools
        toolNames: extractedTools, // 🎯 NEW: Pass actual tool names for display
        onEdit,
      },
      // Initial position - will be overridden by Dagre
      position: { x: 0, y: 0 }
    });

    // Add edge from team to participant
    edges.push({
      id: `e-team-${participant.label || `agent-${nodes.length - 1}`}`,
      source: 'team',
      target: participant.label || `agent-${nodes.length - 1}`,
      animated: true,
      style: { stroke: '#4D9CFF', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 12,
        height: 12,
        color: '#4D9CFF',
      },
    });
  });

  console.log('🎨 Generated initial flow structure:', {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    teamType: extractedTeamType
  });

  // 🎯 CRITICAL: Apply Dagre layout for optimal positioning
  const layoutedElements = getAutoLayout(nodes, edges, extractedTeamType);

  console.log('✅ Applied Dagre layout:', {
    layoutedNodeCount: layoutedElements.nodes.length,
    layoutedEdgeCount: layoutedElements.edges.length,
    teamType: extractedTeamType
  });

  return layoutedElements;
};

// 🎯 NEW: Function to properly extract tool names from participant configuration
const extractToolsFromParticipant = (participant: any): string[] => {
  const tools: string[] = [];
  
  // 🎯 DEFENSIVE: Check if participant and tools exist
  if (!participant || !participant.config || !participant.config.tools || !Array.isArray(participant.config.tools)) {
    return tools;
  }
  
  participant.config.tools.forEach((tool: any) => {
    // 🎯 DEFENSIVE: Check if tool exists
    if (!tool) {
      return;
    }
    
    let toolName = '';
    
    // Try different ways to extract the tool name
    if (tool.config?.name) {
      toolName = tool.config.name;
    } else if (tool.label) {
      toolName = tool.label;
    } else if (tool.config?.source_code) {
      // Extract function name from source code
      const functionMatch = tool.config.source_code.match(/def\s+(\w+)\s*\(/);
      if (functionMatch) {
        toolName = functionMatch[1];
      }
    } else if (tool.description) {
      // Use first word of description as fallback
      toolName = tool.description.split(' ')[0];
    }
    
    if (toolName) {
      tools.push(toolName);
    }
  });
  
  console.log('🔧 Extracted tools from participant:', {
    participantLabel: participant.label || 'Unnamed',
    toolsFound: tools,
    rawTools: participant.config?.tools || []
  });
  
  return tools;
};

// 🎯 CRITICAL: Extract team type from provider attribute
const extractTeamTypeFromProvider = (provider: string): string => {
  if (!provider || typeof provider !== 'string') {
    console.log('⚠️ No provider found in utils, using default RoundRobinGroupChat');
    return 'RoundRobinGroupChat';
  }
  
  // Match pattern: *.teams.<TeamType>
  const teamTypeMatch = provider.match(/\.teams\.([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm)?)/);
  if (teamTypeMatch) {
    console.log('✅ Utils extracted team type from provider:', teamTypeMatch[1]);
    return teamTypeMatch[1];
  }
  
  // Alternative patterns for different naming conventions
  const alternativeMatch = provider.match(/([A-Za-z]+(?:GroupChat|Chat|Flow|Swarm))$/);
  if (alternativeMatch) {
    console.log('✅ Utils extracted team type (alternative pattern):', alternativeMatch[1]);
    return alternativeMatch[1];
  }
  
  console.log('❌ Utils: No team type found in provider, using default:', provider);
  return 'RoundRobinGroupChat';
};