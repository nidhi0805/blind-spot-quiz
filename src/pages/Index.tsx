
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
    <div className="min-h-screen py-16 bg-soft-grid bg-fia-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-fia-dreamer/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-fia-peacemaker/10 to-transparent pointer-events-none"></div>
      
      <div className="fia-container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-medium text-fia-text mb-6 font-dmserif leading-tight">
            Uncover Your Blind Spot Patterns
          </h1>
          <p className="text-lg text-fia-textLight mb-10 max-w-2xl mx-auto leading-relaxed">
            Gain insights into your relational blind spot patterns in emotionally complex relationships.
            This self-awareness diagnostic helps you understand how you show up when
            things get complicated.
          </p>
          <Button
            onClick={() => setCurrentStep('intake')}
            className="fia-btn-primary text-lg px-8 py-6 group"
          >
            Begin Self-Assessment
            <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-fia-border shadow-md hover:shadow-xl transition-all animate-slide-up-delay-1 transform hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-full bg-fia-dreamer/30 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fia-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="font-dmserif font-medium text-xl mb-4">Discover Your Patterns</h3>
            <p className="text-fia-textLight leading-relaxed">
              Identify your unique relational tendencies and blind spots that may be affecting your relationships.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-fia-border shadow-md hover:shadow-xl transition-all animate-slide-up-delay-2 transform hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-full bg-fia-peacemaker/30 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fia-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="font-dmserif font-medium text-xl mb-4">Recognize Warning Signs</h3>
            <p className="text-fia-textLight leading-relaxed">
              Learn to detect manipulative tactics that target your specific vulnerabilities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-fia-border shadow-md hover:shadow-xl transition-all animate-slide-up-delay-3 transform hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-full bg-fia-caregiver/30 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fia-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="font-dmserif font-medium text-xl mb-4">Build Better Defenses</h3>
            <p className="text-fia-textLight leading-relaxed">
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
