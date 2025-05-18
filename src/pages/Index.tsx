
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  return (
    <div className="min-h-screen py-12">
      <div className="fia-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-medium text-fia-text mb-4">
            Blind Spot Quiz
          </h1>
          <p className="text-lg text-fia-textLight mb-6 max-w-2xl mx-auto">
            Uncover your relational blind spot patterns in emotionally complex relationships.
            This self-awareness diagnostic tool helps you understand how you show up when
            things get complicated.
          </p>
          <Button
            onClick={() => setCurrentStep('intake')}
            className="fia-btn-primary text-lg px-8 py-3"
          >
            Begin Self-Assessment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
            <h3 className="font-medium text-lg mb-3">Discover Your Patterns</h3>
            <p className="text-fia-textLight">
              Identify your unique relational tendencies and blind spots that may be affecting your relationships.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
            <h3 className="font-medium text-lg mb-3">Recognize Warning Signs</h3>
            <p className="text-fia-textLight">
              Learn to detect manipulative tactics that target your specific vulnerabilities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
            <h3 className="font-medium text-lg mb-3">Build Better Defenses</h3>
            <p className="text-fia-textLight">
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
