
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../utils/quizData';
import { calculateResults } from '../utils/scoring';
import { generateUserId, saveQuizResult } from '../utils/storage';
import QuizQuestion from './QuizQuestion';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, Flag, Lock, Puzzle } from "lucide-react";

const Quiz: React.FC = () => {
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex,
    responses,
    intake,
    setResults,
    setCurrentStep
  } = useQuiz();
  
  // Calculate progress percentage
  const progress = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
  
  // Get question icon based on index
  const getQuestionIcon = (index: number) => {
    const icons = [
      <Puzzle className="h-8 w-8 opacity-80" />,
      <Lock className="h-8 w-8 opacity-80" />,
      <Flag className="h-8 w-8 opacity-80" />
    ];
    return icons[index % icons.length];
  };
  
  // Handle moving to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizCompletion();
    }
  };
  
  // Handle moving to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Handle quiz completion
  const handleQuizCompletion = () => {
    if (!intake) {
      toast.error("Missing user information. Please restart the quiz.");
      return;
    }
    
    try {
      // Calculate results
      const profileResults = calculateResults(responses);
      
      // Save results
      const userId = generateUserId();
      saveQuizResult(userId, intake, responses, profileResults);
      
      // Update state and move to results page
      setResults(profileResults);
      setCurrentStep('results');
      
    } catch (error) {
      console.error('Error completing quiz:', error);
      toast.error("There was a problem calculating your results. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-fia-white">
      <div className="fia-container py-8">
        <div className="fia-stepper mb-8">
          <div className="fia-stepper-item">
            <div className="w-10 h-10 rounded-full bg-fia-yellow/30 text-fia-charcoal flex items-center justify-center mr-3 text-base font-bold">✓</div>
            <span className="font-medium">Personal Info</span>
          </div>
          <div className="w-16 h-[2px] bg-fia-yellow mx-3"></div>
          <div className="fia-stepper-item fia-stepper-item-active">
            <div className="w-10 h-10 rounded-full bg-fia-yellow text-fia-charcoal flex items-center justify-center mr-3 text-base font-bold">2</div>
            <span className="font-medium">Quiz</span>
          </div>
          <div className="w-16 h-[2px] bg-fia-border mx-3"></div>
          <div className="fia-stepper-item">
            <div className="w-10 h-10 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center mr-3 text-base font-bold">3</div>
            <span className="font-medium">Results</span>
          </div>
        </div>
        
        <div className="mb-12 p-6 bg-fia-white rounded-lg border-2 border-fia-border shadow-md animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-base font-medium text-fia-charcoal">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
            </div>
            <div>
              <span className="text-base font-medium text-fia-charcoal">
                {progress}%
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-3 bg-fia-border/30">
            <div className="h-full bg-fia-yellow" style={{ width: `${progress}%` }} />
          </Progress>
        </div>
        
        {currentQuestionIndex > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 hover:bg-fia-white font-medium flex items-center"
            onClick={handlePreviousQuestion}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous question
          </Button>
        )}
        
        <div className="fia-flashcard-container">
          <div className="absolute inset-0 bg-subtle-dots opacity-10"></div>
          {getQuestionIcon(currentQuestionIndex)}
          
          {currentQuestionIndex < quizQuestions.length && (
            <QuizQuestion 
              question={quizQuestions[currentQuestionIndex]} 
              onNext={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
