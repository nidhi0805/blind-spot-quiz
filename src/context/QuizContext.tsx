
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { QuizContextType, UserIntake, QuizResponse, ProfileResult } from '../types/quiz';

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider component
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'intake' | 'quiz' | 'results'>('landing');
  const [intake, setIntake] = useState<UserIntake | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [results, setResults] = useState<ProfileResult[] | null>(null);

  const addResponse = (response: QuizResponse) => {
    setResponses(prevResponses => {
      // Check if a response for this question already exists
      const existingIndex = prevResponses.findIndex(r => r.questionId === response.questionId);
      
      if (existingIndex !== -1) {
        // Replace the existing response
        const updatedResponses = [...prevResponses];
        updatedResponses[existingIndex] = response;
        return updatedResponses;
      }
      
      // Add a new response
      return [...prevResponses, response];
    });
  };

  const updateResponse = (index: number, response: QuizResponse) => {
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[index] = response;
      return updatedResponses;
    });
  };

  const value = {
    currentStep,
    setCurrentStep,
    intake,
    setIntake,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    responses,
    addResponse,
    updateResponse,
    results,
    setResults
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook for using the context
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
