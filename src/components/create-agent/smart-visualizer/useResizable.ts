import { useState, useEffect, useRef } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useResizable = (ref: React.RefObject<HTMLDivElement>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState<Size>({ width: 600, height: 800 });

  useEffect(() => {
    try {
      const element = ref.current;
      if (!element) return;

      const handleMouseDown = (e: MouseEvent) => {
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

      const handleMouseMove = (e: MouseEvent) => {
        try {
          if (!isResizing || !element) return;

          const rect = element.getBoundingClientRect();
          let newWidth = size.width;
          let newHeight = size.height;

          newWidth = Math.max(800, e.clientX - rect.left);
          newHeight = Math.max(600, e.clientY - rect.top);

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