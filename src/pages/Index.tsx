
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight, Flag, Lock, Puzzle } from 'lucide-react';

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  return (
    <div className="min-h-screen bg-fia-yellow relative">
      {/* Hero Section */}
      <div className="fia-split-container min-h-[70vh]">
        <div className="w-full md:w-1/2 bg-fia-charcoal flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-fia-yellow/20 rounded-full p-5">
                <Lock className="w-12 h-12 text-fia-yellow" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Uncover Your <br/> Blind Spot Patterns
            </h2>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="max-w-xl">
            <p className="text-xl text-fia-charcoal mb-10 leading-relaxed font-medium">
              Gain insights into your relational blind spot patterns in emotionally complex relationships.
              This self-awareness diagnostic helps you understand how you show up when
              things get complicated.
            </p>
            <Button
              onClick={() => setCurrentStep('intake')}
              className="fia-cta-button group"
            >
              Begin Self-Assessment
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="fia-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-xl border-2 border-fia-border shadow-lg hover:shadow-xl transition-all animate-slide-up transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full bg-fia-blue flex items-center justify-center mb-6">
              <Puzzle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-4">Discover Your Patterns</h3>
            <p className="text-fia-textLight leading-relaxed text-lg">
              Identify your unique relational tendencies and blind spots that may be affecting your relationships.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl border-2 border-fia-border shadow-lg hover:shadow-xl transition-all animate-slide-up transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full bg-fia-teal flex items-center justify-center mb-6">
              <Flag className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-4">Recognize Warning Signs</h3>
            <p className="text-fia-textLight leading-relaxed text-lg">
              Learn to detect manipulative tactics that target your specific vulnerabilities.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl border-2 border-fia-border shadow-lg hover:shadow-xl transition-all animate-slide-up transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full bg-fia-burgundy flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-4">Build Better Defenses</h3>
            <p className="text-fia-textLight leading-relaxed text-lg">
              Gain practical strategies to protect your emotional wellbeing in complex relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component that manages quiz flow
const Index: React.FC = () => {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
};

// Quiz content based on current step
const QuizContent: React.FC = () => {
  const { currentStep } = useQuiz();
  
  switch (currentStep) {
    case 'landing':
      return <Landing />;
    case 'intake':
      return <IntakeForm />;
    case 'quiz':
      return <Quiz />;
    case 'results':
      return <ResultPage />;
    default:
      return <Landing />;
  }
};

export default Index;
