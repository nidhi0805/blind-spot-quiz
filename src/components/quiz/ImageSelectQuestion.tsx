
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
      scale: 1.03, 
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  return (
    <div className="w-full flex justify-center overflow-visible">
      <div className="grid grid-cols-2 gap-6 w-full max-w-[380px]">
        {answers?.map(answer => (
          <motion.div 
            key={answer.id}
            variants={cardVariants}
            initial="unselected"
            animate={selectedOption === answer.id ? "selected" : "unselected"}
            whileHover={{ y: -4, boxShadow: "0 8px 20px -4px rgba(0,0,0,0.1)" }}
            onClick={() => onOptionSelect(answer.id)}
            className={`
              overflow-visible box-border cursor-pointer transition-all flex flex-col items-center
              rounded-xl shadow-sm hover:shadow-md
              ${selectedOption === answer.id ? 
                'ring-3 ring-fia-yellow ring-offset-2' : 
                'border-2 border-fia-border/40 hover:border-fia-border'}
            `}
          >
            <div className="w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-fia-teal/10 to-fia-teal/5">
              <img 
                src={answer.imageSrc || "/placeholder.svg"} 
                alt={answer.text}
                className="w-full h-auto object-cover aspect-square" 
              />
            </div>
            <div className="p-3 w-full text-center bg-white rounded-b-xl">
              <p className="font-medium text-sm line-clamp-2 h-10" title={answer.text}>
                {answer.text}
              </p>
              {selectedOption === answer.id && (
                <motion.div 
                  className="w-6 h-6 rounded-full bg-fia-yellow flex items-center justify-center mt-1 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Check className="h-3.5 w-3.5 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelectQuestion;
