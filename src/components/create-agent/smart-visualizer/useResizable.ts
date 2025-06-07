import { useState, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useResizable = (ref: React.RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState<Size>({ width: 600, height: 900 });// size of the smart visualizer screen

  useEffect(() => {
    try {
      const element = ref.current;
      if (!element) return;

      const handleMouseDown = (e: Event) => {
        try {
          const target = e.target as HTMLElement;
          const direction = target.getAttribute('data-resize-direction');
          if (!direction) return;

          setIsResizing(true);
          e.preventDefault();
          e.stopPropagation();
        } catch (error) {
          console.error('Error in handleMouseDown:', error);
        }
      };

      const handleMouseMove = (e: Event) => {
        try {
          if (!isResizing || !element) return;

          const mouseEvent = e as MouseEvent;
          const rect = element.getBoundingClientRect();
          let newWidth = size.width;
          let newHeight = size.height;

          newWidth = Math.max(800, mouseEvent.clientX - rect.left);
          newHeight = Math.max(600, mouseEvent.clientY - rect.top);

          setSize({ width: newWidth, height: newHeight });
        } catch (error) {
          console.error('Error in handleMouseMove:', error);
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      const resizeHandles = element.querySelectorAll('[data-resize-direction]');
      resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', handleMouseDown);
      });

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        resizeHandles.forEach(handle => {
          handle.removeEventListener('mousedown', handleMouseDown);
        });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    } catch (error) {
      console.error('Error in useResizable effect:', error);
    }
  }, [isResizing, size, ref]);

  return { size, isResizing };
};