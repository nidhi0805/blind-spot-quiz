
import { ProfileResult, QuizResponse, UserIntake } from "../types/quiz";

// Generate a unique user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
    
    return result;
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
