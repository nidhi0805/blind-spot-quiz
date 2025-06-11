
import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="space-y-3">
        {answers?.map((answer, index) => (
          <motion.button
            key={answer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`
              w-full p-4 text-left rounded-xl border-2 transition-all duration-200
              hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500
              ${selectedOption === answer.id ? 
                'border-blue-500 bg-blue-50 text-blue-900 shadow-lg shadow-blue-100' : 
                'border-slate-200 bg-white hover:border-slate-300 text-slate-700'}
            `}
            onClick={() => onOptionSelect(answer.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className={`
                w-5 h-5 rounded-full border-2 flex-shrink-0 mr-4
                ${selectedOption === answer.id ? 
                  'border-blue-500 bg-blue-500' : 
                  'border-slate-300'}
              `}>
                {selectedOption === answer.id && (
                  <motion.div 
                    className="w-full h-full rounded-full bg-white scale-[0.4]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 0.4 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </div>
              <span className="font-medium text-base leading-relaxed">
                {answer.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SingleSelectQuestion;
