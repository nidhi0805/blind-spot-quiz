
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../utils/quizData';
import { calculateResults } from '../utils/scoring';
import { generateUserId, saveQuizResult } from '../utils/storage';
import QuizQuestion from './QuizQuestion';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Quiz: React.FC = () => {
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex,
    responses,
    intake,
    setResults,
    setCurrentStep
  } = useQuiz();
  
  // Animation direction state
  const [direction, setDirection] = useState<"left" | "right">("left");
  
  // Calculate progress percentage
  const progress = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
  
  // Handle moving to next question
  const handleNextQuestion = () => {
    setDirection("left");
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizCompletion();
    }
  };
  
  // Handle moving to previous question
  const handlePreviousQuestion = () => {
    setDirection("right");
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
  
  // Animation variants for question transitions
  const questionVariants = {
    enterFromRight: {
      x: "100%",
      opacity: 0
    },
    enterFromLeft: {
      x: "-100%",
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exitToLeft: {
      x: "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exitToRight: {
      x: "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        // Check if the current question has a response before allowing navigation
        const hasResponse = responses.some(r => r.questionId === quizQuestions[currentQuestionIndex].id);
        if (hasResponse) {
          handleNextQuestion();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePreviousQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestionIndex, responses]);
  
  return (
    <motion.div 
      className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header with Progress */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold text-slate-800">Personality Assessment</h1>
              <span className="text-sm text-slate-600 font-medium">
                {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-200" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Just started</span>
              <span>{progress}% complete</span>
              <span>Almost done!</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {currentQuestionIndex > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                onClick={handlePreviousQuestion}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            ) : (
              <div />
            )}
            
            <div className="text-sm text-slate-500">
              Question {currentQuestionIndex + 1}
            </div>
          </div>
        </div>
      </div>
      
      {/* Question Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.div 
              key={currentQuestionIndex}
              custom={direction}
              variants={questionVariants}
              initial={direction === "right" ? "enterFromLeft" : "enterFromRight"}
              animate="center"
              exit={direction === "right" ? "exitToRight" : "exitToLeft"}
              className="w-full"
            >
              {currentQuestionIndex < quizQuestions.length && (
                <QuizQuestion 
                  question={quizQuestions[currentQuestionIndex]} 
                  onNext={handleNextQuestion}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer Encouragement */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-slate-200 py-3">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-600">
            {currentQuestionIndex < quizQuestions.length - 1 
              ? "Answer honestly for the most accurate results" 
              : "Almost there! Complete your assessment to see your personality type"
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Quiz;
