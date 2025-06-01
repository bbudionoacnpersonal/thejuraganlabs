import { Node, Edge } from 'reactflow';
import { TeamStructure } from '@/types';

export const transformTeamStructureToFlow = (
  teamStructure: TeamStructure,
  onEdit?: (data: any) => void
): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Add team node
  nodes.push({
    id: 'team',
    type: 'custom',
    data: {
      label: teamStructure.label,
      type: 'team',
      description: teamStructure.description,
      model: teamStructure.config.model_client?.config.model || '',
      agents: teamStructure.config.participants.map((p: any) => ({
        name: p.label
      })),
      terminations: [{ name: teamStructure.config.termination_condition.label }],
      onEdit,
    },
    position: { x: 250, y: -200 }
  });

  // Add participant nodes
  teamStructure.config.participants.forEach((participant: any, index: number) => {
    const xOffset = (index - (teamStructure.config.participants.length - 1) / 2) * 300;
    
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
      position: { x: 250 + xOffset, y: 250 }
    });

    // Add edge from team to participant
    edges.push({
      id: `e-team-${participant.label}`,
      source: 'team',
      target: participant.label,
      animated: true,
      style: { stroke: '#4D9CFF' }
    });
  });

  return { nodes, edges };
};