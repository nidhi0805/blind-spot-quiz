
import { ProfileResult, QuizResponse, UserIntake } from "../types/quiz";

// Generate a unique user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Save quiz progress in localStorage
export const saveQuizProgress = (data: {
  currentStep: string;
  currentQuestionIndex: number;
  answers: any[];
  intakeData: any;
}) => {
  try {
    localStorage.setItem('quiz_progress', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving quiz progress:', error);
  }
};

// Get saved quiz progress from localStorage
export const getQuizProgress = () => {
  try {
    const progressData = localStorage.getItem('quiz_progress');
    return progressData ? JSON.parse(progressData) : null;
  } catch (error) {
    console.error('Error retrieving quiz progress:', error);
    return null;
  }
};

// Clear saved quiz progress from localStorage
export const clearQuizProgress = () => {
  try {
    localStorage.removeItem('quiz_progress');
  } catch (error) {
    console.error('Error clearing quiz progress:', error);
  }
};

// Save quiz result to localStorage
export const saveQuizResult = (
  userId: string,
  intake: UserIntake,
  responses: QuizResponse[],
  profileResults: ProfileResult[]
): void => {
  const timestamp = new Date().toISOString();
  
  const result = {
    userId,
    intake,
    responses,
    profileResults,
    dominant: profileResults.slice(0, 2), // Top 2 profiles
    timestamp
  };
  
  // Save to localStorage
  try {
    // Get existing results
    const existingResultsStr = localStorage.getItem('fia_quiz_results');
    const existingResults = existingResultsStr ? JSON.parse(existingResultsStr) : [];
    
    // Add new result
    existingResults.push(result);
    
    // Save updated results
    localStorage.setItem('fia_quiz_results', JSON.stringify(existingResults));
    
    // Also save this specific result under its userId
    localStorage.setItem(`fia_result_${userId}`, JSON.stringify(result));
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw new Error('Failed to save quiz results');
  }
};

// Get a specific quiz result
export const getQuizResult = (userId: string) => {
  try {
    const resultStr = localStorage.getItem(`fia_result_${userId}`);
    if (!resultStr) return null;
    return JSON.parse(resultStr);
  } catch (error) {
    console.error('Error retrieving quiz result:', error);
    return null;
  }
};
