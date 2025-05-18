
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../utils/quizData';
import { calculateResults } from '../utils/scoring';
import { generateUserId, saveQuizResult } from '../utils/storage';
import QuizQuestion from './QuizQuestion';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, Flag, Lock, Puzzle } from "lucide-react";
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
  
  // Animation variants
  const cardVariants = {
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
      className="min-h-screen bg-fia-white overflow-hidden fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fia-container py-8 h-full flex flex-col">
        <motion.div 
          className="mb-12 p-6 bg-fia-white rounded-lg border-2 border-fia-border shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
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
            <motion.div 
              className="h-full bg-fia-yellow"
              initial={{ width: `${progress - 10}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </Progress>
        </motion.div>
        
        {currentQuestionIndex > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 hover:bg-fia-white font-medium flex items-center"
              onClick={handlePreviousQuestion}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous question
            </Button>
          </motion.div>
        )}
        
        <div className="fia-flashcard-container flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-fia-teal bg-subtle-dots opacity-10"></div>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            {getQuestionIcon(currentQuestionIndex)}
          </div>
          
          <AnimatePresence initial={false} mode="wait">
            <motion.div 
              key={currentQuestionIndex}
              custom={direction}
              variants={cardVariants}
              initial={direction === "right" ? "enterFromLeft" : "enterFromRight"}
              animate="center"
              exit={direction === "right" ? "exitToRight" : "exitToLeft"}
              className="w-full max-w-3xl"
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
    </motion.div>
  );
};

export default Quiz;
