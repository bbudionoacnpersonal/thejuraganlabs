import dagre from 'dagre';
import { Node, Edge, Position } from 'reactflow';

export interface LayoutOptions {
  direction: 'TB' | 'BT' | 'LR' | 'RL';
  nodeWidth: number;
  nodeHeight: number;
  rankSeparation: number;
  nodeSeparation: number;
}

const defaultOptions: LayoutOptions = {
  direction: 'TB', // Top to Bottom
  nodeWidth: 280,
  nodeHeight: 200,
  rankSeparation: 150,
  nodeSeparation: 100,
};

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: Partial<LayoutOptions> = {}
): { nodes: Node[]; edges: Edge[] } => {
  const opts = { ...defaultOptions, ...options };
  
  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Configure the graph
  dagreGraph.setGraph({
    rankdir: opts.direction,
    ranksep: opts.rankSeparation,
    nodesep: opts.nodeSeparation,
    marginx: 50,
    marginy: 50,
  });

  // Add nodes to the graph
  nodes.forEach((node) => {
    // Adjust node dimensions based on type
    let width = opts.nodeWidth;
    let height = opts.nodeHeight;
    
    // Team nodes are typically larger
    if (node.data?.type === 'team') {
      width = opts.nodeWidth * 1.2;
      height = opts.nodeHeight * 1.1;
    }
    // Agent nodes are standard size
    else if (node.data?.type === 'agent') {
      width = opts.nodeWidth * 0.8;
      height = opts.nodeHeight * 0.9;
    }
    
    dagreGraph.setNode(node.id, {
      width,
      height,
    });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Apply the calculated positions to nodes
  const layoutedNodes: Node[] = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    // Calculate the position (dagre gives center coordinates, we need top-left)
    const newNode: Node = {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };

    return newNode;
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
};

// Specialized layout for different team types
export const getTeamTypeLayout = (
  teamType: string,
  nodes: Node[],
  edges: Edge[]
): { nodes: Node[]; edges: Edge[] } => {
  let layoutOptions: Partial<LayoutOptions> = {};

  switch (teamType.toLowerCase()) {
    case 'roundrobingroupchat':
      // Circular-like layout with top-down flow
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 120,
        nodeSeparation: 80,
      };
      break;
      
    case 'selectorgroupchat':
      // Star pattern with central coordination
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 100,
        nodeSeparation: 120,
      };
      break;
      
    case 'magneticone':
    case 'magneticonegroupchat':
      // Magnetic field pattern
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 140,
        nodeSeparation: 90,
      };
      break;
      
    case 'swarm':
      // Swarm clustering
      layoutOptions = {
        direction: 'LR', // Left to Right for swarm
        rankSeparation: 100,
        nodeSeparation: 60,
      };
      break;
      
    case 'graphflow':
      // Complex workflow layout
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 160,
        nodeSeparation: 100,
      };
      break;
      
    case 'hierarchical':
    case 'hierarchicalgroupchat':
      // Hierarchical tree layout
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 180,
        nodeSeparation: 80,
      };
      break;
      
    case 'cascading':
    case 'cascadinggroupchat':
      // Sequential cascade layout
      layoutOptions = {
        direction: 'LR',
        rankSeparation: 120,
        nodeSeparation: 60,
      };
      break;
      
    case 'broadcast':
    case 'broadcastgroupchat':
      // Broadcast pattern
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 100,
        nodeSeparation: 150,
      };
      break;
      
    default:
      // Default layout
      layoutOptions = {
        direction: 'TB',
        rankSeparation: 150,
        nodeSeparation: 100,
      };
  }

  return getLayoutedElements(nodes, edges, layoutOptions);
};

// Auto-layout function that detects the best layout based on node count and structure
export const getAutoLayout = (
  nodes: Node[],
  edges: Edge[],
  teamType?: string
): { nodes: Node[]; edges: Edge[] } => {
  const nodeCount = nodes.length;
  
  // Use team-specific layout if team type is provided
  if (teamType) {
    return getTeamTypeLayout(teamType, nodes, edges);
  }
  
  // Auto-detect best layout based on structure
  if (nodeCount <= 3) {
    // Small graphs - vertical layout
    return getLayoutedElements(nodes, edges, {
      direction: 'TB',
      rankSeparation: 120,
      nodeSeparation: 80,
    });
  } else if (nodeCount <= 6) {
    // Medium graphs - balanced layout
    return getLayoutedElements(nodes, edges, {
      direction: 'TB',
      rankSeparation: 140,
      nodeSeparation: 100,
    });
  } else {
    // Large graphs - spread out more
    return getLayoutedElements(nodes, edges, {
      direction: 'TB',
      rankSeparation: 180,
      nodeSeparation: 120,
    });
  }
};

// Function to re-layout nodes when the graph changes
export const relayoutNodes = (
  currentNodes: Node[],
  currentEdges: Edge[],
  teamType?: string
): { nodes: Node[]; edges: Edge[] } => {
  console.log('🔄 Re-layouting nodes with Dagre:', {
    nodeCount: currentNodes.length,
    edgeCount: currentEdges.length,
    teamType
  });
  
  const layouted = getAutoLayout(currentNodes, currentEdges, teamType);
  
  console.log('✅ Dagre layout completed:', {
    layoutedNodeCount: layouted.nodes.length,
    layoutedEdgeCount: layouted.edges.length
  });
  
  return layouted;
};