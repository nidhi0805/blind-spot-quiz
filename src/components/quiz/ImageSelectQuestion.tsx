
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from "lucide-react";
import { Answer } from '../../types/quiz';

interface ImageSelectQuestionProps {
  answers: Answer[];
  selectedOption?: string;
  onOptionSelect: (value: string) => void;
}

const ImageSelectQuestion: React.FC<ImageSelectQuestionProps> = ({
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
    <div className="overflow-x-hidden">
      <div className="grid grid-cols-2 gap-3 mx-auto" style={{ maxWidth: "360px" }}>
        {answers?.map(answer => (
          <motion.div 
            key={answer.id}
            variants={cardVariants}
            initial="unselected"
            animate={selectedOption === answer.id ? "selected" : "unselected"}
            whileHover={{ y: -4, scale: 1.03 }}
            onClick={() => onOptionSelect(answer.id)}
            className={`
              border-2 rounded-xl p-2 cursor-pointer transition-all flex flex-col items-center
              ${selectedOption === answer.id ? 
                'border-fia-yellow bg-gradient-to-r from-fia-yellow/5 to-fia-yellow/10' : 
                'border-fia-border/40 hover:border-fia-border'}
            `}
          >
            <div className="aspect-square rounded-xl mb-2 overflow-hidden bg-gradient-to-br from-fia-teal/10 to-fia-teal/5 w-full" style={{ maxWidth: "150px" }}>
              <img 
                src={answer.imageSrc || "/placeholder.svg"} 
                alt={answer.text}
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="text-center font-medium text-sm truncate w-full" title={answer.text}>
              {answer.text}
            </p>
            {selectedOption === answer.id && (
              <motion.div 
                className="w-5 h-5 rounded-full bg-fia-yellow flex items-center justify-center mt-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Check className="h-3 w-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelectQuestion;
