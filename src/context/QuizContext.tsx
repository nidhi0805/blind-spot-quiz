
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Question, Answer, ProfileResult } from '../types/quiz';
import { quizData } from '../utils/quizData';
import { calculateScores } from '../utils/scoring';
import { initializeProfileResults } from '../utils/resultProfiles';
import { saveQuizProgress, getQuizProgress, clearQuizProgress } from '../utils/storage';

// Define the context type
interface QuizContextType {
  currentStep: 'landing' | 'intake' | 'quiz' | 'results';
  setCurrentStep: (step: 'landing' | 'intake' | 'quiz' | 'results') => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  updateAnswer: (questionId: string, answerValue: string | string[] | number) => void;
  intakeData: {
    name: string;
    email: string;
    age: string;
  };
  setIntakeData: (data: { name: string; email: string; age: string }) => void;
  questions: Question[];
  results: ProfileResult[] | null;
  calculateResults: () => void;
  isLastQuestion: boolean;
  resetQuiz: () => void;
}

// Create the context with a default value
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider component
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for tracking the current step in the quiz flow
  const [currentStep, setCurrentStep] = useState<'landing' | 'intake' | 'quiz' | 'results'>('landing');
  
  // State for tracking the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State for storing user answers
  const [answers, setAnswers] = useState<Answer[]>([]);
  
  // State for intake form data
  const [intakeData, setIntakeData] = useState({
    name: '',
    email: '',
    age: '',
  });
  
  // State for quiz results
  const [results, setResults] = useState<ProfileResult[] | null>(null);
  
  // Questions from the quiz data
  const questions = quizData;
  
  // Check if current question is the last question
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // Function to update a specific answer
  const updateAnswer = (questionId: string, answerValue: string | string[] | number) => {
    const existingAnswerIndex = answers.findIndex(answer => answer.questionId === questionId);
    
    if (existingAnswerIndex !== -1) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        value: answerValue
      };
      setAnswers(updatedAnswers);
    } else {
      // Add new answer
      setAnswers([...answers, { questionId, value: answerValue }]);
    }
  };
  
  // Function to calculate results based on answers
  const calculateResults = () => {
    const calculatedResults = calculateScores(answers, initializeProfileResults());
    setResults(calculatedResults);
    setCurrentStep('results');
    
    // Clear saved progress once we're at results
    clearQuizProgress();
  };
  
  // Function to reset the quiz state
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    clearQuizProgress();
  };
  
  // Load saved progress on initial mount
  useEffect(() => {
    const savedProgress = getQuizProgress();
    if (savedProgress) {
      if (savedProgress.currentStep) setCurrentStep(savedProgress.currentStep as 'landing' | 'intake' | 'quiz' | 'results');
      if (savedProgress.currentQuestionIndex !== undefined) setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      if (savedProgress.answers) setAnswers(savedProgress.answers);
      if (savedProgress.intakeData) setIntakeData(savedProgress.intakeData);
    }
  }, []);
  
  // Save progress when relevant state changes
  useEffect(() => {
    if (currentStep !== 'results') {
      saveQuizProgress({
        currentStep,
        currentQuestionIndex,
        answers,
        intakeData
      });
    }
  }, [currentStep, currentQuestionIndex, answers, intakeData]);
  
  // Context value
  const value = {
    currentStep,
    setCurrentStep,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    updateAnswer,
    intakeData,
    setIntakeData,
    questions,
    results,
    calculateResults,
    isLastQuestion,
    resetQuiz
  };
  
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook for using the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
