
import React, { useState, useEffect } from 'react';
import { Question, QuizResponse } from '../types/quiz';
import { useQuiz } from '../context/QuizContext';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronRight } from "lucide-react";

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
  
  // Update local state when navigating between questions
  useEffect(() => {
    if (existingResponse) {
      if (typeof existingResponse.answerId === 'string') {
        setSelectedOption(existingResponse.answerId);
      } else if (Array.isArray(existingResponse.answerId)) {
        setSelectedOptions(existingResponse.answerId);
      }
      
      if (existingResponse.sliderValue !== undefined) {
        setSliderValue(existingResponse.sliderValue);
      }
    } else {
      // Reset state for new question
      setSelectedOption(undefined);
      setSelectedOptions([]);
      setSliderValue(
        question.min !== undefined ? question.min + ((question.max || 10) - question.min) / 2 : 5
      );
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
    setSelectedOptions(prev => 
      prev.includes(answerId)
        ? prev.filter(id => id !== answerId)
        : [...prev, answerId]
    );
  };
  
  // Render question based on type
  const renderQuestion = () => {
    switch (question.type) {
      case 'single-select':
        return (
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="fia-radio-group"
          >
            {question.answers?.map(answer => (
              <div 
                key={answer.id} 
                className={`fia-radio-label transition-all ${
                  selectedOption === answer.id ? 'border-fia-yellow bg-fia-yellow/10 shadow' : ''
                }`}
              >
                <RadioGroupItem value={answer.id} id={answer.id} className="mr-3 text-fia-yellow" />
                <Label htmlFor={answer.id} className="flex-grow cursor-pointer text-lg">
                  {answer.text}
                </Label>
                {selectedOption === answer.id && (
                  <Check className="h-5 w-5 text-fia-yellow ml-2 animate-scale-in" />
                )}
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'multi-select':
        return (
          <div className="space-y-4">
            {question.answers?.map(answer => (
              <div 
                key={answer.id} 
                className={`fia-checkbox-label transition-all ${
                  selectedOptions.includes(answer.id) ? 'border-fia-yellow bg-fia-yellow/10 shadow' : ''
                }`}
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
              </div>
            ))}
          </div>
        );
      
      case 'image-select':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {question.answers?.map(answer => (
              <div 
                key={answer.id}
                className={`
                  border-2 rounded-lg p-5 cursor-pointer transition-all
                  ${selectedOption === answer.id ? 
                    'border-fia-yellow ring-2 ring-fia-yellow/20 shadow-md' : 
                    'hover:bg-fia-yellow/5 border-fia-border'}
                `}
                onClick={() => setSelectedOption(answer.id)}
              >
                <div className="aspect-square bg-fia-teal/10 rounded-md mb-5 overflow-hidden">
                  <img 
                    src={answer.imageSrc || "/placeholder.svg"} 
                    alt={answer.text}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-center text-lg font-medium">{answer.text}</p>
              </div>
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
                onValueChange={values => setSliderValue(values[0])}
                className="z-10"
              />
              <div 
                className="absolute top-0 left-0 bg-fia-charcoal text-fia-white px-4 py-2 rounded-md transform -translate-x-1/2 transition-all" 
                style={{ left: `${((sliderValue - (question.min || 0)) / ((question.max || 10) - (question.min || 0))) * 100}%` }}
              >
                {sliderValue}
              </div>
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
    <div className="fia-flashcard animate-card-flip max-w-3xl w-full">
      <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center leading-tight">{question.text}</h3>
      <div className="mb-10 max-w-2xl mx-auto">
        {renderQuestion()}
      </div>
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isButtonDisabled()}
          className="fia-cta-button group"
        >
          Continue
          <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
