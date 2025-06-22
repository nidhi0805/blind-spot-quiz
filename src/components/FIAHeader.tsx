
import React from 'react';
import { motion } from 'framer-motion';

const FIAHeader: React.FC = () => {
  return (
    <motion.div 
      className="bg-white border-b border-gray-100 py-4 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* FIA Logo placeholder - will need actual logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-fiaPink to-fiaBlue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">FIA</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-fiaCharcoal font-karla">
              Feminine Intelligence Agency
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              Gain Insight. Assess Risk. Keep Your Power.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FIAHeader;
