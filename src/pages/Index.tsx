
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight } from 'lucide-react';

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  return (
    <div className="min-h-screen py-16 bg-soft-grid bg-radial-gradient">
      <div className="fia-container">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-medium text-fia-text mb-6 font-playfair">
            Blind Spot Quiz
          </h1>
          <p className="text-lg text-fia-textLight mb-8 max-w-2xl mx-auto leading-relaxed">
            Uncover your relational blind spot patterns in emotionally complex relationships.
            This self-awareness diagnostic tool helps you understand how you show up when
            things get complicated.
          </p>
          <Button
            onClick={() => setCurrentStep('intake')}
            className="fia-btn-primary text-lg px-8 py-4 group"
          >
            Begin Self-Assessment
            <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-md hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
            <h3 className="font-playfair font-medium text-xl mb-4">Discover Your Patterns</h3>
            <p className="text-fia-textLight">
              Identify your unique relational tendencies and blind spots that may be affecting your relationships.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-md hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="font-playfair font-medium text-xl mb-4">Recognize Warning Signs</h3>
            <p className="text-fia-textLight">
              Learn to detect manipulative tactics that target your specific vulnerabilities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-md hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
            <h3 className="font-playfair font-medium text-xl mb-4">Build Better Defenses</h3>
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
