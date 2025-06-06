import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import SmartVisualizerContent from './smart-visualizer/SmartVisualizerContent';
import { SmartVisualizerProps } from './smart-visualizer/types';

const SmartVisualizer: React.FC<SmartVisualizerProps> = (props) => {
  return (
    <ReactFlowProvider>
      <SmartVisualizerContent {...props} />
    </ReactFlowProvider>
  );
};

export default SmartVisualizer;