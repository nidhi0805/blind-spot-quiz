
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Answer } from '../../types/quiz';

interface SingleSelectQuestionProps {
  answers: Answer[];
  selectedOption?: string;
  onOptionSelect: (value: string) => void;
}

const SingleSelectQuestion: React.FC<SingleSelectQuestionProps> = ({
  answers,
  selectedOption,
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
            animate={selectedOption === answer.id ? "selected" : "unselected"}
            className={`
              p-3 rounded-xl border transition-all flex items-center cursor-pointer
              max-w-full box-border word-wrap-break-word
              ${selectedOption === answer.id ? 
                'border-fia-yellow bg-gradient-to-r from-fia-yellow/5 to-fia-yellow/10' : 
                'border-fia-border/40 hover:border-fia-border'}
            `}
            onClick={() => onOptionSelect(answer.id)}
            whileHover={{ y: -2, boxShadow: "0 10px 15px -5px rgba(0,0,0,0.05)" }}
          >
            <div className="mr-3 flex-shrink-0">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedOption === answer.id ? 'border-fia-yellow' : 'border-fia-border'}
              `}>
                {selectedOption === answer.id && (
                  <motion.div 
                    className="w-2.5 h-2.5 rounded-full bg-fia-yellow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
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

export default SingleSelectQuestion;
