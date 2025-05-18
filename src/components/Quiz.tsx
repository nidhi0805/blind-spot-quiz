
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../utils/quizData';
import { calculateResults } from '../utils/scoring';
import { generateUserId, saveQuizResult } from '../utils/storage';
import QuizQuestion from './QuizQuestion';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

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
    <div className="min-h-screen bg-fia-background py-12">
      <div className="fia-container">
        <div className="fia-stepper mb-8">
          <div className="fia-stepper-item">
            <div className="w-8 h-8 rounded-full bg-fia-accent/30 text-fia-accent flex items-center justify-center mr-2 text-sm">✓</div>
            <span>Personal Info</span>
          </div>
          <div className="w-12 h-[2px] bg-fia-accent mx-2"></div>
          <div className="fia-stepper-item fia-stepper-item-active">
            <div className="w-8 h-8 rounded-full bg-fia-accent text-white flex items-center justify-center mr-2 text-sm">2</div>
            <span>Quiz</span>
          </div>
          <div className="w-12 h-[2px] bg-fia-border mx-2"></div>
          <div className="fia-stepper-item">
            <div className="w-8 h-8 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center mr-2 text-sm">3</div>
            <span>Results</span>
          </div>
        </div>
        
        <div className="mb-8 p-6 bg-white rounded-lg border border-fia-border shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm text-fia-textLight">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium">
                {progress}%
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {currentQuestionIndex > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 hover:bg-fia-background"
            onClick={handlePreviousQuestion}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous question
          </Button>
        )}
        
        <div className="flashcard transition-all duration-300">
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
