
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
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };
  
  // Render question based on type
  const renderQuestion = () => {
    switch (question.type) {
      case 'single-select':
        return (
          <RadioGroup
            value={selectedOption}
            onValueChange={handleRadioChange}
            className="fia-radio-group space-y-5"
          >
            {question.answers?.map(answer => (
              <motion.div 
                key={answer.id} 
                variants={cardVariants}
                initial="unselected"
                animate={selectedOption === answer.id ? "selected" : "unselected"}
                className={`fia-radio-label transition-all ${
                  selectedOption === answer.id ? 'border-fia-yellow bg-fia-yellow/10 shadow-md' : ''
                }`}
                whileHover={{ scale: 1.01, y: -2, transition: { duration: 0.2 } }}
              >
                <RadioGroupItem value={answer.id} id={answer.id} className="mr-3 text-fia-yellow" />
                <Label htmlFor={answer.id} className="flex-grow cursor-pointer text-lg">
                  {answer.text}
                </Label>
                {selectedOption === answer.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-5 w-5 text-fia-yellow ml-2" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </RadioGroup>
        );
      
      case 'multi-select':
        return (
          <div className="space-y-5">
            {question.answers?.map(answer => (
              <motion.div 
                key={answer.id} 
                variants={cardVariants}
                initial="unselected"
                animate={selectedOptions.includes(answer.id) ? "selected" : "unselected"}
                className={`fia-checkbox-label transition-all ${
                  selectedOptions.includes(answer.id) ? 'border-fia-yellow bg-fia-yellow/10 shadow-md' : ''
                }`}
                whileHover={{ scale: 1.01, y: -2, transition: { duration: 0.2 } }}
              >
                <Checkbox
                  id={answer.id}
                  checked={selectedOptions.includes(answer.id)}
                  onCheckedChange={() => handleCheckboxChange(answer.id)}
                  className="mr-3 mt-0.5 text-fia-yellow border-fia-charcoal/60"
                />
                <Label htmlFor={answer.id} className="flex-grow cursor-pointer text-lg">
                  {answer.text}
                </Label>
              </motion.div>
            ))}
          </div>
        );
      
      case 'image-select':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {question.answers?.map(answer => (
              <motion.div 
                key={answer.id}
                variants={cardVariants}
                initial="unselected"
                animate={selectedOption === answer.id ? "selected" : "unselected"}
                whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.2 } }}
                onClick={() => handleRadioChange(answer.id)}
                className={`
                  border-2 rounded-lg p-5 cursor-pointer transition-all
                  ${selectedOption === answer.id ? 
                    'border-fia-yellow ring-2 ring-fia-yellow/20 shadow-md' : 
                    'hover:bg-fia-yellow/5 border-fia-border'}
                `}
              >
                <div className="aspect-square bg-fia-teal/10 rounded-md mb-5 overflow-hidden">
                  <img 
                    src={answer.imageSrc || "/placeholder.svg"} 
                    alt={answer.text}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-center text-lg font-medium">{answer.text}</p>
              </motion.div>
            ))}
          </div>
        );
      
      case 'slider':
        return (
          <div className="space-y-10 py-6">
            <div className="relative pt-10">
              <Slider
                value={[sliderValue]}
                min={question.min || 0}
                max={question.max || 10}
                step={1}
                onValueChange={handleSliderChange}
                className="z-10"
              />
              <motion.div 
                className="absolute top-0 left-0 bg-fia-charcoal text-fia-white px-4 py-2 rounded-md transform -translate-x-1/2 transition-all" 
                style={{ left: `${((sliderValue - (question.min || 0)) / ((question.max || 10) - (question.min || 0))) * 100}%` }}
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.3 }}
                key={sliderValue}
              >
                {sliderValue}
              </motion.div>
            </div>
            <div className="flex justify-between text-base font-medium text-fia-charcoal mt-6">
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
    <motion.div 
      className="fia-flashcard bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-3xl w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className="text-2xl sm:text-3xl font-bold mb-10 text-center leading-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {question.text}
      </motion.h3>
      <motion.div 
        className="mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {renderQuestion()}
      </motion.div>
      <motion.div 
        className="flex justify-center pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button
          onClick={handleSubmit}
          disabled={isButtonDisabled()}
          className={`fia-cta-button group ${isAnswered ? 'animate-pulse-once' : ''}`}
          whileHover={!isButtonDisabled() ? { scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" } : {}}
          whileTap={!isButtonDisabled() ? { scale: 0.98 } : {}}
        >
          Continue
          <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuizQuestion;
