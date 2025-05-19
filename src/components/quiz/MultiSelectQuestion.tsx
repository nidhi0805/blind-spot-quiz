
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
    <div className="flex items-center justify-center w-full overflow-visible">
      <div className="space-y-3 max-w-[500px] w-full">
        {answers?.map(answer => (
          <motion.div 
            key={answer.id} 
            variants={cardVariants}
            initial="unselected"
            animate={selectedOptions.includes(answer.id) ? "selected" : "unselected"}
            className={`
              p-4 rounded-xl border-2 transition-all flex items-start cursor-pointer
              w-full box-border overflow-visible
              ${selectedOptions.includes(answer.id) ? 
                'border-fia-yellow bg-[#fffbe6]' : 
                'border-transparent hover:border-fia-border'}
            `}
            onClick={() => onOptionSelect(answer.id)}
            whileHover={{ y: -2, boxShadow: "0 10px 15px -5px rgba(0,0,0,0.05)" }}
          >
            <div className="mr-4 mt-0.5 flex-shrink-0">
              <div className={`
                w-6 h-6 rounded-md border-2 flex items-center justify-center
                ${selectedOptions.includes(answer.id) ? 'border-fia-yellow bg-fia-yellow' : 'border-fia-border'}
                transition-colors
              `}>
                {selectedOptions.includes(answer.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="h-3.5 w-3.5 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
            <Label className="flex-grow cursor-pointer text-base leading-tight font-medium pt-0.5">
              {answer.text}
            </Label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectQuestion;
