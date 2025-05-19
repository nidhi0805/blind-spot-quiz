
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
    <div className="flex items-center justify-center w-full overflow-visible">
      <div className="space-y-2.5 max-w-[500px] w-full">
        {answers?.map(answer => (
          <motion.div 
            key={answer.id} 
            variants={cardVariants}
            initial="unselected"
            animate={selectedOption === answer.id ? "selected" : "unselected"}
            className={`
              p-3.5 rounded-xl border-2 transition-all flex items-center cursor-pointer
              w-full box-border overflow-visible
              ${selectedOption === answer.id ? 
                'border-fia-yellow bg-[#fffbe6]' : 
                'border-transparent hover:border-fia-border'}
            `}
            onClick={() => onOptionSelect(answer.id)}
            whileHover={{ y: -2, boxShadow: "0 10px 15px -5px rgba(0,0,0,0.05)" }}
            style={{ boxSizing: 'border-box' }}
          >
            <div className="mr-4 flex-shrink-0">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedOption === answer.id ? 'border-fia-yellow' : 'border-fia-border'}
                transition-colors
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
            <Label className="flex-grow cursor-pointer text-sm leading-tight font-medium">
              {answer.text}
            </Label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SingleSelectQuestion;
