
import { BlindSpotProfile, ProfileResult, Question, QuizResponse } from "../types/quiz";
import { quizQuestions } from "./quizData";
import { initializeProfileResults, resultProfiles } from "./resultProfiles";

// Calculate profile scores based on quiz responses
export const calculateResults = (responses: QuizResponse[]): ProfileResult[] => {
  // Initialize profile scores
  const profileScores: Record<BlindSpotProfile, number> = {
    explorer: 0,
    dreamer: 0,
    traditionalist: 0,
    intellectual: 0,
    achiever: 0,
    peacemaker: 0,
    caregiver: 0,
    leader: 0,
    rebel: 0
  };

  // Process each response
  responses.forEach(response => {
    const question = quizQuestions.find(q => q.id === response.questionId);
    
    if (!question) return;
    
    if (question.type === 'slider' && response.sliderValue !== undefined) {
      // Process slider response
      const sliderValue = response.sliderValue;
      question.profileWeights?.forEach(weight => {
        // Calculate score based on slider position: normalize to 0-1 range, then apply weight
        const normalizedValue = sliderValue / 10; // Assuming slider is 0-10
        profileScores[weight.profile] += normalizedValue * weight.weight * 10; // Multiply by 10 to make comparable to other question types
      });
    } else if (response.answerId) {
      // Process single-select or image-select response
      if (typeof response.answerId === 'string') {
        const answer = question.answers?.find(a => a.id === response.answerId);
        answer?.profileWeights.forEach(weight => {
          profileScores[weight.profile] += weight.weight;
        });
      } 
      // Process multi-select responses
      else if (Array.isArray(response.answerId)) {
        response.answerId.forEach(answerId => {
          const answer = question.answers?.find(a => a.id === answerId);
          answer?.profileWeights.forEach(weight => {
            profileScores[weight.profile] += weight.weight;
          });
        });
      }
    }
  });

  // Create profile results with calculated scores
  const results = initializeProfileResults();
  
  // Update scores
  results.forEach(profile => {
    profile.score = profileScores[profile.id];
  });
  
  // Calculate percentages
  const totalScore = Object.values(profileScores).reduce((sum, score) => sum + Math.max(0, score), 0);
  
  if (totalScore > 0) {
    results.forEach(profile => {
      // Ensure non-negative scores for percentage calculation
      const nonNegativeScore = Math.max(0, profile.score);
      profile.percentage = Math.round((nonNegativeScore / totalScore) * 100);
    });
  }
  
  // Sort by score in descending order
  return results.sort((a, b) => b.score - a.score);
};

// Get dominant profiles (top N)
export const getDominantProfiles = (profiles: ProfileResult[], count: number = 2): ProfileResult[] => {
  return [...profiles].slice(0, count);
};
