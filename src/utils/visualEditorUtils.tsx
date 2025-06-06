import { Node, Edge } from 'reactflow';
import { TeamStructure } from '@/types';
import { getAutoLayout } from './dagreLayout';

export const transformTeamStructureToFlow = (
  teamStructure: TeamStructure,
  onEdit?: (data: any) => void,
  teamType?: string // Enhanced: Accept extracted team type
): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // 🎯 ENHANCED: Use provided team type or extract from provider
  const extractedTeamType = teamType || extractTeamTypeFromProvider(teamStructure.provider);
  
  console.log('🎨 Transforming team structure with team type:', {
    teamName: teamStructure.label,
    teamType: extractedTeamType,
    participantCount: teamStructure.config.participants.length
  });
  
  // Add enhanced team node with team type information
  nodes.push({
    id: 'team',
    type: 'custom',
    data: {
      label: teamStructure.label,
      type: 'team',
      teamType: extractedTeamType, // 🎯 CRITICAL: Pass extracted team type
      description: teamStructure.description,
      model: teamStructure.config.model_client?.config.model || '',
      agents: teamStructure.config.participants.map((p: any) => ({
        name: p.label,
        description: p.description,
        model: {
          name: p.config.model_client?.config.model || 'gpt-4o-mini',
          provider: p.config.model_client?.provider.split('.').pop() || 'OpenAI'
        },
        tools: p.config.tools?.map((t: any) => ({
          name: t.config.name || t.label,
          description: t.description
        })) || []
      })),
      terminations: teamStructure.config.termination_condition.config.conditions?.map((c: any) => ({
        name: c.label
      })) || [{ name: teamStructure.config.termination_condition.label }],
      onEdit,
    },
    // Initial position - will be overridden by Dagre
    position: { x: 0, y: 0 }
  });

  // Add participant nodes
  teamStructure.config.participants.forEach((participant: any, index: number) => {
    nodes.push({
      id: participant.label,
      type: 'custom',
      data: {
        label: participant.label,
        type: 'agent',
        description: participant.description,
        model: participant.config.model_client?.config.model || '',
        tools: participant.config.tools?.length || 0,
        onEdit,
      },
      // Initial position - will be overridden by Dagre
      position: { x: 0, y: 0 }
    });

    // Add edge from team to participant
    edges.push({
      id: `e-team-${participant.label}`,
      source: 'team',
      target: participant.label,
      animated: true,
      style: { stroke: '#4D9CFF', strokeWidth: 2 },
      markerEnd: {
        type: 'arrowclosed',
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