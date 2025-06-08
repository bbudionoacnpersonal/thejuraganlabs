// src/utils/dagreLayout.ts
import dagre from 'dagre';
import { Node, Edge } from 'reactflow';

const g = new dagre.graphlib.Graph();
g.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 260;
const nodeHeight = 280;

export const applyAutoLayout = (nodes: Node[], edges: Edge[]) => {
  g.setGraph({
    rankdir: 'LR',   // <- LEFT to RIGHT
    nodesep: 120,
    ranksep: 120,
  });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
