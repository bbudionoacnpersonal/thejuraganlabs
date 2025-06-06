import { Node, Edge } from 'reactflow';
import { TeamStructure } from '@/types';

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
    position: { x: 250, y: -200 }
  });

  // Add participant nodes with enhanced positioning based on team type
  const participantPositions = generateTeamTypePositions(
    extractedTeamType,
    teamStructure.config.participants.length
  );

  teamStructure.config.participants.forEach((participant: any, index: number) => {
    const position = participantPositions[index] || { x: 0, y: 0 };
    
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
      position: { 
        x: 250 + position.x, 
        y: 250 + position.y 
      }
    });

    // Add simple edge from team to participant
    edges.push({
      id: `e-team-${participant.label}`,
      source: 'team',
      target: participant.label,
      animated: true,
      style: { stroke: '#4D9CFF' }
    });
  });

  console.log('✅ Generated simplified flow:', {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    teamType: extractedTeamType
  });

  return { nodes, edges };
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

// Generate positions based on team coordination pattern
const generateTeamTypePositions = (teamType: string, agentCount: number) => {
  const positions = [];
  const spacing = 300;

  switch (teamType) {
    case 'RoundRobinGroupChat':
      // Circular arrangement for round-robin coordination
      const radius = Math.max(150, agentCount * 40);
      for (let i = 0; i < agentCount; i++) {
        const angle = (i * 2 * Math.PI) / agentCount;
        positions.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
      break;
    
    case 'SelectorGroupChat':
      // Star pattern with central selector logic
      const selectorRadius = Math.max(180, agentCount * 30);
      for (let i = 0; i < agentCount; i++) {
        const angle = (i * 2 * Math.PI) / agentCount;
        positions.push({
          x: Math.cos(angle) * selectorRadius,
          y: Math.sin(angle) * selectorRadius
        });
      }
      break;
    
    case 'MagenticOneGroupChat':
      // Magnetic field pattern for generalist coordination
      const magneticRadius = Math.max(160, agentCount * 35);
      for (let i = 0; i < agentCount; i++) {
        const angle = (i * Math.PI) / (agentCount - 1);
        positions.push({
          x: Math.cos(angle) * magneticRadius,
          y: Math.sin(angle) * magneticRadius - magneticRadius / 2
        });
      }
      break;
    
    case 'Swarm':
      // Swarm clustering pattern for handoff coordination
      for (let i = 0; i < agentCount; i++) {
        const cluster = Math.floor(i / 3);
        const inCluster = i % 3;
        positions.push({
          x: cluster * 200 + (inCluster - 1) * 80,
          y: inCluster * 60 - 60
        });
      }
      break;
    
    case 'GraphFlow':
      // Graph-like network pattern for complex workflows
      const cols = Math.ceil(Math.sqrt(agentCount));
      for (let i = 0; i < agentCount; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        positions.push({
          x: (col - (cols - 1) / 2) * spacing,
          y: row * 120
        });
      }
      break;
    
    default:
      // Default horizontal layout
      for (let i = 0; i < agentCount; i++) {
        positions.push({
          x: i * spacing - ((agentCount - 1) * spacing) / 2,
          y: 0
        });
      }
  }

  return positions;
};