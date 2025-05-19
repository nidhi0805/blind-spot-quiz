
import React, { useState, useEffect } from 'react';
import { Question, QuizResponse } from '../types/quiz';
import { useQuiz } from '../context/QuizContext';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';

// Create a motion button component that works with framer-motion
const MotionButton = motion(Button);

interface QuizQuestionProps {
  question: Question;
  onNext: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onNext }) => {
  const { responses, addResponse } = useQuiz();
  
  // Find existing response for this question
  const existingResponse = responses.find(r => r.questionId === question.id);
  
  // Local state for different question types
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    existingResponse?.answerId as string | undefined
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(existingResponse?.answerId) ? existingResponse?.answerId : []
  );
  const [sliderValue, setSliderValue] = useState<number>(
    existingResponse?.sliderValue !== undefined ? existingResponse.sliderValue : 
    (question.min !== undefined ? question.min + ((question.max || 10) - question.min) / 2 : 5)
  );
  
  // Animation states
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Update local state when navigating between questions
  useEffect(() => {
    if (existingResponse) {
      if (typeof existingResponse.answerId === 'string') {
        setSelectedOption(existingResponse.answerId);
        setIsAnswered(true);
      } else if (Array.isArray(existingResponse.answerId)) {
        setSelectedOptions(existingResponse.answerId);
        setIsAnswered(true);
      }
      
      if (existingResponse.sliderValue !== undefined) {
        setSliderValue(existingResponse.sliderValue);
        setIsAnswered(true);
      }
    } else {
      // Reset state for new question
      setSelectedOption(undefined);
      setSelectedOptions([]);
      setSliderValue(
        question.min !== undefined ? question.min + ((question.max || 10) - question.min) / 2 : 5
      );
      setIsAnswered(false);
    }
  }, [question.id, existingResponse]);
  
  // Handle response submission
  const handleSubmit = () => {
    let response: QuizResponse;
    
    switch (question.type) {
      case 'single-select':
      case 'image-select':
        if (!selectedOption) return; // Don't proceed without selection
        response = {
          questionId: question.id,
          answerId: selectedOption
        };
        break;
      case 'multi-select':
        if (selectedOptions.length === 0) return; // Don't proceed without selection
        response = {
          questionId: question.id,
          answerId: selectedOptions
        };
        break;
      case 'slider':
        response = {
          questionId: question.id,
          sliderValue
        };
        break;
      default:
        return;
    }
    
    addResponse(response);
    onNext();
  };
  
  // Handle checkbox selection
  const handleCheckboxChange = (answerId: string) => {
    const newSelectedOptions = selectedOptions.includes(answerId)
      ? selectedOptions.filter(id => id !== answerId)
      : [...selectedOptions, answerId];
      
    setSelectedOptions(newSelectedOptions);
    setIsAnswered(newSelectedOptions.length > 0);
  };
  
  // Handle radio selection
  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    setIsAnswered(true);
  };
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    setIsAnswered(true);
  };
  
  // Animations for option selection
  const cardVariants = {
    unselected: { scale: 1, y: 0 },
    selected: { 
      scale: 1.02, 
      y: -3,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };
  
  // Render question based on type
  const renderQuestion = () => {
    switch (question.type) {
      case 'single-select':
        return (
          <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
            <RadioGroup
              value={selectedOption}
              onValueChange={handleRadioChange}
              className="space-y-2 max-w-md mx-auto"
            >
              {question.answers?.map(answer => (
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
                  onClick={() => handleRadioChange(answer.id)}
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
            </RadioGroup>
          </div>
        );
      
      case 'multi-select':
        return (
          <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
            <div className="space-y-2 max-w-md mx-auto">
              {question.answers?.map(answer => (
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
                  onClick={() => handleCheckboxChange(answer.id)}
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
      
      case 'image-select':
        return (
          <div className="overflow-x-hidden">
            <div className="grid grid-cols-2 gap-3 mx-auto" style={{ maxWidth: "360px" }}>
              {question.answers?.map(answer => (
                <motion.div 
                  key={answer.id}
                  variants={cardVariants}
                  initial="unselected"
                  animate={selectedOption === answer.id ? "selected" : "unselected"}
                  whileHover={{ y: -4, scale: 1.03 }}
                  onClick={() => handleRadioChange(answer.id)}
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
      
      case 'slider':
        return (
          <div className="space-y-8 py-3 max-w-md mx-auto w-full px-2">
            <div className="relative pt-12">
              <Slider
                value={[sliderValue]}
                min={question.min || 0}
                max={question.max || 10}
                step={1}
                onValueChange={handleSliderChange}
                className="z-10"
              />
              <motion.div 
                className="absolute top-0 left-0 bg-gradient-to-br from-fia-teal to-fia-teal/90 text-white px-3 py-1.5 rounded-xl shadow-md transform -translate-x-1/2"
                style={{ 
                  left: `${((sliderValue - (question.min || 0)) / ((question.max || 10) - (question.min || 0))) * 100}%` 
                }}
                initial={{ scale: 0.8, y: 10, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  y: 0,
                  opacity: 1
                }}
                transition={{ duration: 0.3 }}
                key={sliderValue}
              >
                {sliderValue}
              </motion.div>
            </div>
            <div className="flex justify-between text-sm font-medium text-fia-charcoal/70 mt-5 px-2">
              <span>{question.minLabel || question.min || "0"}</span>
              <span>{question.maxLabel || question.max || "10"}</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const isButtonDisabled = () => {
    switch (question.type) {
      case 'single-select':
      case 'image-select':
        return !selectedOption;
      case 'multi-select':
        return selectedOptions.length === 0;
      default:
        return false;
    }
  };
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 h-full flex items-center">
      <motion.div 
        className="w-full flex flex-col h-[85vh] max-h-[600px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden overflow-x-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <motion.div 
          className="px-5 py-5 md:px-6 flex flex-col h-full box-border overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-6 text-center leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {question.text}
          </motion.h3>
          
          <motion.div 
            className="flex-1 flex items-center overflow-hidden overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {renderQuestion()}
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <MotionButton
              onClick={handleSubmit}
              disabled={isButtonDisabled()}
              className={`
                px-8 py-2 rounded-full font-medium text-base group
                ${isAnswered ? 
                  'bg-gradient-to-r from-fia-teal to-fia-teal/90 hover:from-fia-burgundy hover:to-fia-burgundy/90 text-white' : 
                  'bg-fia-border/40 text-fia-charcoal/40 cursor-not-allowed'}
              `}
              whileHover={!isButtonDisabled() ? { scale: 1.03, y: -2 } : undefined}
              whileTap={!isButtonDisabled() ? { scale: 0.98 } : undefined}
            >
              Continue
              <ChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </MotionButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuizQuestion;
