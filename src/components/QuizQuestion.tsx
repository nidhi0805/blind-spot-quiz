
import React, { useState, useEffect } from 'react';
import { Question, QuizResponse } from '../types/quiz';
import { useQuiz } from '../context/QuizContext';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";

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
                  selectedOption === answer.id ? 'border-fia-accent bg-fia-accent/5 shadow' : ''
                }`}
              >
                <RadioGroupItem value={answer.id} id={answer.id} className="mr-2" />
                <Label htmlFor={answer.id} className="flex-grow cursor-pointer">
                  {answer.text}
                </Label>
                {selectedOption === answer.id && (
                  <Check className="h-5 w-5 text-fia-accent ml-2 animate-scale-in" />
                )}
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'multi-select':
        return (
          <div className="space-y-3">
            {question.answers?.map(answer => (
              <div 
                key={answer.id} 
                className={`fia-checkbox-label transition-all ${
                  selectedOptions.includes(answer.id) ? 'border-fia-accent bg-fia-accent/5 shadow' : ''
                }`}
              >
                <Checkbox
                  id={answer.id}
                  checked={selectedOptions.includes(answer.id)}
                  onCheckedChange={() => handleCheckboxChange(answer.id)}
                  className="mr-2 mt-0.5"
                />
                <Label htmlFor={answer.id} className="flex-grow cursor-pointer">
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
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedOption === answer.id ? 
                    'border-fia-accent ring-2 ring-fia-accent/20 shadow-md' : 
                    'hover:bg-fia-background border-fia-border'}
                `}
                onClick={() => setSelectedOption(answer.id)}
              >
                <div className="aspect-square bg-fia-background rounded-md mb-4 overflow-hidden">
                  <img 
                    src={answer.imageSrc || "/placeholder.svg"} 
                    alt={answer.text}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-center">{answer.text}</p>
              </div>
            ))}
          </div>
        );
      
      case 'slider':
        return (
          <div className="space-y-8 py-4">
            <div className="relative pt-6">
              <Slider
                value={[sliderValue]}
                min={question.min || 0}
                max={question.max || 10}
                step={1}
                onValueChange={values => setSliderValue(values[0])}
                className="z-10"
              />
              <div 
                className="absolute top-0 left-0 bg-fia-accent text-white px-3 py-1 rounded-md transform -translate-x-1/2 transition-all" 
                style={{ left: `${((sliderValue - (question.min || 0)) / ((question.max || 10) - (question.min || 0))) * 100}%` }}
              >
                {sliderValue}
              </div>
            </div>
            <div className="flex justify-between text-sm text-fia-textLight mt-6">
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
    <div className="fia-question animate-fade-in">
      <h3 className="fia-subheading mb-8 text-center">{question.text}</h3>
      <div className="mb-8 max-w-2xl mx-auto">
        {renderQuestion()}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isButtonDisabled()}
          className="fia-btn-primary px-10"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
