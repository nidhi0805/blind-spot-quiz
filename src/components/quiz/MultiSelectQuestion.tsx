
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { Answer } from '../../types/quiz';

interface MultiSelectQuestionProps {
  answers: Answer[];
  selectedOptions: string[];
  onOptionSelect: (answerId: string) => void;
}

const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({
  answers,
  selectedOptions,
  onOptionSelect
}) => {
  // Animation variants for option selection
  const cardVariants = {
    unselected: { scale: 1, y: 0 },
    selected: { 
      scale: 1.02, 
      y: -3,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  return (
    <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
      <div className="space-y-2 max-w-md mx-auto">
        {answers?.map(answer => (
          <motion.div 
            key={answer.id} 
            variants={cardVariants}
            initial="unselected"
            animate={selectedOptions.includes(answer.id) ? "selected" : "unselected"}
            className={`
              p-3 rounded-xl border transition-all flex items-start cursor-pointer
              max-w-full box-border word-wrap-break-word
              ${selectedOptions.includes(answer.id) ? 
                'border-fia-yellow bg-gradient-to-r from-fia-yellow/5 to-fia-yellow/10' : 
                'border-fia-border/40 hover:border-fia-border'}
            `}
            onClick={() => onOptionSelect(answer.id)}
            whileHover={{ y: -2, boxShadow: "0 10px 15px -5px rgba(0,0,0,0.05)" }}
          >
            <div className="mr-3 mt-0.5 flex-shrink-0">
              <div className={`
                w-5 h-5 rounded-md border-2 flex items-center justify-center
                ${selectedOptions.includes(answer.id) ? 'border-fia-yellow bg-fia-yellow' : 'border-fia-border'}
              `}>
                {selectedOptions.includes(answer.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
            <Label className="flex-grow cursor-pointer text-base leading-tight font-medium">
              {answer.text}
            </Label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectQuestion;
