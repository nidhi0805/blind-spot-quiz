
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Create a motion button component that works with framer-motion
const MotionButton = motion(Button);

interface ContinueButtonProps {
  isDisabled: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ 
  isDisabled, 
  isAnswered, 
  onClick 
}) => {
  return (
    <motion.div 
      className="flex justify-center w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <MotionButton
        onClick={onClick}
        disabled={isDisabled}
        className={`
          px-8 py-3 rounded-xl font-semibold text-base group relative min-w-[200px]
          transition-all duration-300 shadow-lg
          ${isAnswered ? 
            'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200' : 
            'bg-slate-200 text-slate-400 cursor-not-allowed shadow-slate-100'}
        `}
        whileHover={!isDisabled ? { scale: 1.02, y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
      >
        Continue
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </MotionButton>
    </motion.div>
  );
};

export default ContinueButton;
