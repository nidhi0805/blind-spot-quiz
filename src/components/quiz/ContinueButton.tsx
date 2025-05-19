
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
      className="flex justify-center mt-6 sm:mt-8 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <MotionButton
        onClick={onClick}
        disabled={isDisabled}
        className={`
          px-6 py-2.5 rounded-full font-medium text-base group relative
          transition-all duration-300 min-w-[140px] sm:min-w-[160px]
          ${isAnswered ? 
            'bg-gradient-to-r from-fia-teal to-fia-teal/90 hover:from-fia-burgundy hover:to-fia-burgundy/90 text-white' : 
            'bg-fia-border/40 text-fia-charcoal/40 cursor-not-allowed'}
        `}
        whileHover={!isDisabled ? { scale: 1.03, y: -2 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
      >
        Continue
        <ChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
      </MotionButton>
    </motion.div>
  );
};

export default ContinueButton;
