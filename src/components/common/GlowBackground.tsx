import React from 'react';

interface GlowBackgroundProps {
  opacity?: number;
  height?: string;
}

const GlowBackground: React.FC<GlowBackgroundProps> = ({ 
  opacity = 0.7,
  height = '500px'
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-0 w-full" style={{ height }}>
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgb(0, 102, 255) 0%, rgba(0, 68, 255, 0.2) 25%, transparent 50%)',
          transform: 'scale(2)',
          opacity,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-background/80 to-dark-background" />
    </div>
  );
};

export default GlowBackground;