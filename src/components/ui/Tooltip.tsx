import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  maxWidth?: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delay = 0.3,
  maxWidth = '200px',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX + 12;
    const y = e.clientY - 12;
    requestAnimationFrame(() => setCoords({ x, y }));
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX + 12;
    const y = e.clientY - 12;

    timeoutRef.current = setTimeout(() => {
      setCoords({ x, y });  // set latest coords at time of showing
      setIsVisible(true);
    }, delay * 1000);
  };


  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="inline-block"
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              left: coords.x,
              top: coords.y,
              maxWidth,
              zIndex: 50,
              pointerEvents: 'none',
            }}
            className={`
              px-2 py-1 text-xs font-medium
              bg-dark-surface border border-dark-border
              rounded shadow-lg backdrop-blur-sm
              text-white
              ${className}
            `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;