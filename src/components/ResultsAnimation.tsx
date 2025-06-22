
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsAnimationProps {
  onComplete: () => void;
  canSkip?: boolean;
}

const ResultsAnimation: React.FC<ResultsAnimationProps> = ({ onComplete, canSkip = true }) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip option after 300ms
    const skipTimer = setTimeout(() => setShowSkip(true), 300);
    
    // Auto-complete after 1.2s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        {/* Spinning lens animation */}
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-fiaPink to-fiaBlue flex items-center justify-center"
          animate={{ 
            rotate: 360,
            scale: [0.8, 1.1, 1],
          }}
          transition={{ 
            duration: 1.2,
            ease: "easeInOut"
          }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white/40"></div>
          </div>
        </motion.div>

        <motion.p 
          className="text-lg font-semibold text-fiaCharcoal mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Analyzing your blind-spot patterns...
        </motion.p>

        <motion.p 
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You've got this! 💪
        </motion.p>

        {/* Skip button */}
        <AnimatePresence>
          {showSkip && canSkip && (
            <motion.button
              onClick={handleSkip}
              className="mt-6 text-sm text-gray-500 hover:text-fiaBlue transition-colors underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Skip animation
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResultsAnimation;
