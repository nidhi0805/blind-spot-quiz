
import React, { useState, useEffect } from 'react';
import { Question, QuizResponse } from '../types/quiz';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';

// Import refactored components
import SingleSelectQuestion from './quiz/SingleSelectQuestion';
import MultiSelectQuestion from './quiz/MultiSelectQuestion';
import ImageSelectQuestion from './quiz/ImageSelectQuestion';
import SliderQuestion from './quiz/SliderQuestion';
import ContinueButton from './quiz/ContinueButton';

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
  
  // Render question based on type
  const renderQuestion = () => {
    switch (question.type) {
      case 'single-select':
        return (
          <SingleSelectQuestion 
            answers={question.answers || []}
            selectedOption={selectedOption}
            onOptionSelect={handleRadioChange}
          />
        );
      
      case 'multi-select':
        return (
          <MultiSelectQuestion 
            answers={question.answers || []} 
            selectedOptions={selectedOptions}
            onOptionSelect={handleCheckboxChange}
          />
        );
      
      case 'image-select':
        return (
          <ImageSelectQuestion 
            answers={question.answers || []}
            selectedOption={selectedOption}
            onOptionSelect={handleRadioChange}
          />
        );
      
      case 'slider':
        return (
          <SliderQuestion
            min={question.min || 0}
            max={question.max || 10}
            minLabel={question.minLabel}
            maxLabel={question.maxLabel}
            value={sliderValue}
            onValueChange={handleSliderChange}
          />
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
        className="w-full flex flex-col h-[85vh] max-h-[600px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden"
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
          
          <ContinueButton 
            isDisabled={isButtonDisabled()} 
            isAnswered={isAnswered} 
            onClick={handleSubmit} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuizQuestion;
