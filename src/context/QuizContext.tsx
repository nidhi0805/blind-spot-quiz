
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Question, Answer, ProfileResult, QuizResponse, UserIntake } from '../types/quiz';
import { quizQuestions } from '../utils/quizData';
import { calculateResults } from '../utils/scoring';
import { initializeProfileResults } from '../utils/resultProfiles';
import { generateUserId, saveQuizResult } from '../utils/storage';

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
  
  // Added properties to match component usage
  responses: QuizResponse[];
  addResponse: (response: QuizResponse) => void;
  intake: UserIntake | null;
  setIntake: (intake: UserIntake) => void;
  setResults: (results: ProfileResult[]) => void;
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

  // State for quiz responses (added to match component usage)
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  
  // State for intake data (added to match component usage)
  const [intake, setIntake] = useState<UserIntake | null>(null);
  
  // State for quiz results
  const [results, setResults] = useState<ProfileResult[] | null>(null);
  
  // Questions from the quiz data
  const questions = quizQuestions;
  
  // Check if current question is the last question
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // Function to update a specific answer
  const updateAnswer = (questionId: string, answerValue: string | string[] | number) => {
    const existingAnswerIndex = answers.findIndex(answer => answer.id === questionId);
    
    if (existingAnswerIndex !== -1) {
      // Update existing answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        text: answerValue.toString()
      };
      setAnswers(updatedAnswers);
    } else {
      // Add new answer
      setAnswers([...answers, { 
        id: questionId, 
        text: answerValue.toString(),
        profileWeights: []
      }]);
    }
  };

  // Function to add a quiz response
  const addResponse = (response: QuizResponse) => {
    setResponses(prev => {
      const existingIndex = prev.findIndex(r => r.questionId === response.questionId);
      if (existingIndex !== -1) {
        // Replace existing response
        const updated = [...prev];
        updated[existingIndex] = response;
        return updated;
      } else {
        // Add new response
        return [...prev, response];
      }
    });
  };
  
  // Function to calculate results based on answers
  const calculateQuizResults = () => {
    const calculatedResults = calculateResults(responses);
    setResults(calculatedResults);
    setCurrentStep('results');
  };
  
  // Function to reset the quiz state
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResponses([]);
    setResults(null);
    setCurrentStep('landing');
  };

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
    calculateResults: calculateQuizResults,
    isLastQuestion,
    resetQuiz,
    // Added values to match component usage
    responses,
    addResponse,
    intake, 
    setIntake,
    setResults
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
