
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizQuestions } from '../utils/quizData';
import { calculateResults } from '../utils/scoring';
import { generateUserId, saveQuizResult } from '../utils/storage';
import QuizQuestion from './QuizQuestion';
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
      <Puzzle className="h-6 w-6 text-fia-yellow" />,
      <Lock className="h-6 w-6 text-fia-yellow" />,
      <Flag className="h-6 w-6 text-fia-yellow" />
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
      className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-fia-white to-fia-yellow/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Progress Bar */}
      <motion.div 
        className="w-full h-1.5 bg-fia-border/30 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-fia-yellow"
          initial={{ width: `${progress - 5}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Progress Info */}
      <motion.div 
        className="flex items-center justify-between px-6 py-4 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 flex items-center justify-center">
            {getQuestionIcon(currentQuestionIndex)}
          </div>
          <span className="text-sm font-medium text-fia-charcoal/80">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-fia-charcoal/80">
            {progress}%
          </span>
        </div>
      </motion.div>
      
      {/* Previous Button (only show if not on first question) */}
      {currentQuestionIndex > 0 && (
        <motion.div
          className="absolute top-12 left-6 z-20"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.8, x: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-fia-white/50 text-fia-charcoal/70 font-medium flex items-center group"
            onClick={handlePreviousQuestion}
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Previous
          </Button>
        </motion.div>
      )}
      
      {/* Main Question Container - Full height minus header */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-subtle-dots opacity-10"></div>
        
        {/* Flashcard Animation Container */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentQuestionIndex}
            custom={direction}
            variants={cardVariants}
            initial={direction === "right" ? "enterFromLeft" : "enterFromRight"}
            animate="center"
            exit={direction === "right" ? "exitToRight" : "exitToLeft"}
            className="w-full max-h-full flex justify-center items-center"
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
      
      {/* Final invitation - shown on last question */}
      {currentQuestionIndex === quizQuestions.length - 1 && responses.some(r => r.questionId === quizQuestions[currentQuestionIndex].id) && (
        <motion.div 
          className="absolute bottom-6 left-0 right-0 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-fia-charcoal/70 text-sm max-w-md mx-auto">
            Want to go deeper? Check out your full pattern in the Blind Spot Quiz or explore the Listening Lab.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Quiz;
