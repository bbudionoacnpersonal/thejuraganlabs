import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface VoiceOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  isRecording?: boolean;
  setIsRecording?: (val: boolean) => void;
}

const VoiceOverlay: React.FC<VoiceOverlayProps> = ({ 
  isVisible, 
  onClose, 
  isRecording = false,
  setIsRecording = () => {} 
}) => {
  useEffect(() => {
    if (!isVisible) return;

    const handleRecordingStart = () => {
    console.log('[ElevenLabs] Recording started');
    setIsRecording(true);
    };
  
    const handleRecordingEnd = () => {
      console.log('[ElevenLabs] Recording ended');
      setIsRecording(false);
    };
  
    const handleResponseStart = () => {
      console.log('[ElevenLabs] AI response started');
    };
  
    const handleResponseEnd = () => {
      console.log('[ElevenLabs] AI response ended');
    };
  
    // Add event listeners (with temporary log)
    window.addEventListener('elevenlabs-convai:recording-start', (e) => {
      console.log('[Event] recording-start', e);
      handleRecordingStart();
    });
    
    window.addEventListener('elevenlabs-convai:recording-end', (e) => {
      console.log('[Event] recording-end', e);
      handleRecordingEnd();
    });
    
    window.addEventListener('elevenlabs-convai:response-start', (e) => {
      console.log('[Event] response-start', e);
      handleResponseStart();
    });
    
    window.addEventListener('elevenlabs-convai:response-end', (e) => {
      console.log('[Event] response-end', e);
      handleResponseEnd();
    });

    // Check if script is already added
    const existing = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup event listeners
      window.removeEventListener('elevenlabs-convai:recording-start', handleRecordingStart);
      window.removeEventListener('elevenlabs-convai:recording-end', handleRecordingEnd);
      window.removeEventListener('elevenlabs-convai:response-start', handleResponseStart);
      window.removeEventListener('elevenlabs-convai:response-end', handleResponseEnd);
    };
  }, [isVisible, setIsRecording]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            exit={{ scale: 0.9 }}
            className="relative justify-center items-center bg-dark-surface/80 backdrop-blur-md p-4 border border-dark-border rounded-xl shadow-xl w-[300px] h-[200px]"
          >
            <button
              onClick={onClose}
              className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
            
            <div className="flex items-center justify-center w-full">
              <span className="text-gray-300 text-sm py-4">
                {isRecording ? "Listening..." : "Click below to start the conversation"}
              </span>
            </div>

            <div className="flex items-center justify-center h-full py-2">
              <div id="voice-widget">
                {/* @ts-ignore - Custom element */}
                <elevenlabs-convai agent-id="agent_01jvw7ms1jfbe8c3ptec0na5z9"></elevenlabs-convai>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceOverlay;