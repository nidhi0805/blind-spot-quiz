
export type QuestionType = 'single-select' | 'multi-select' | 'image-select' | 'slider';

export interface ProfileWeight {
  profile: BlindSpotProfile;
  weight: number;
}

export interface Answer {
  id: string;
  text: string;
  profileWeights: ProfileWeight[];
  imageSrc?: string;
  questionId?: string;
  value?: string | string[] | number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  answers?: Answer[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  profileWeights?: ProfileWeight[];  // For slider questions
}

export type BlindSpotProfile = 
  | 'explorer'
  | 'dreamer'
  | 'traditionalist'
  | 'intellectual'
  | 'achiever'
  | 'peacemaker'
  | 'caregiver'
  | 'leader'
  | 'rebel';

export interface ProfileResult {
  id: BlindSpotProfile;
  name: string;
  summary: string;
  manipulativeTactics: string;
  defenseStrategies: string;
  tools: ToolInfo[];
  score: number;
  percentage: number;
}

export interface ToolInfo {
  name: string;
  url: string;
}

export interface UserIntake {
  email: string;
  ageRange: string;
  genderIdentity: string;
  relationshipStatus: string;
  emotionalSafety: number;
  preTraits: string[];
}

export interface QuizResponse {
  questionId: string;
  answerId?: string | string[];
  sliderValue?: number;
}

export interface QuizResult {
  userId: string;
  intake: UserIntake;
  responses: QuizResponse[];
  profileResults: ProfileResult[];
  dominant: ProfileResult[];
  timestamp: string;
}

export interface QuizContextType {
  currentStep: 'landing' | 'intake' | 'quiz' | 'results';
  setCurrentStep: (step: 'landing' | 'intake' | 'quiz' | 'results') => void;
  intake: UserIntake | null;
  setIntake: (intake: UserIntake) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  responses: QuizResponse[];
  addResponse: (response: QuizResponse) => void;
  updateResponse: (index: number, response: QuizResponse) => void;
  results: ProfileResult[] | null;
  setResults: (results: ProfileResult[]) => void;
}
