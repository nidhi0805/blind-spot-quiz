
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight, Flag, Lock, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a motion button component that works with framer-motion
const MotionButton = motion(Button);

// Shared page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  return (
    <motion.div 
      className="h-screen flex flex-col overflow-hidden bg-fia-yellow"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Split container that takes full height */}
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Left panel */}
        <div className="w-full md:w-1/2 bg-fia-charcoal flex items-center justify-center p-6 md:p-8">
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-5">
              <div className="bg-fia-yellow/20 rounded-full p-4">
                <Lock className="w-10 h-10 text-fia-yellow" />
              </div>
            </div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Uncover Your <br/> Blind Spot Patterns
            </motion.h2>
            
            {/* CTA for mobile only - appears below headline on mobile */}
            <div className="md:hidden mt-6">
              <MotionButton
                onClick={() => setCurrentStep('intake')}
                className="fia-cta-button group w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Self-Assessment
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </MotionButton>
            </div>
          </div>
        </div>
        
        {/* Right panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-5 md:p-8">
          <div className="max-w-md mx-auto">
            <motion.p 
              className="text-lg md:text-xl text-fia-charcoal mb-6 font-medium text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Gain insights into your relational blind spot patterns in emotionally complex relationships.
            </motion.p>
            
            {/* CTA for tablet/desktop - appears below description */}
            <motion.div
              className="hidden md:block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <MotionButton
                onClick={() => setCurrentStep('intake')}
                className="fia-cta-button group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Self-Assessment
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </MotionButton>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Feature cards in a condensed layout */}
      <div className="bg-fia-white/90 py-4 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.div 
              className="bg-white p-4 rounded-xl border-2 border-fia-border shadow hover:shadow-md hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center mb-2">
                <div className="w-9 h-9 rounded-full bg-fia-blue flex items-center justify-center mr-3">
                  <Puzzle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Discover Patterns</h3>
              </div>
              <p className="text-fia-textLight leading-snug text-balance text-sm">
                Identify your unique relational tendencies.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl border-2 border-fia-border shadow hover:shadow-md hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center mb-2">
                <div className="w-9 h-9 rounded-full bg-fia-teal flex items-center justify-center mr-3">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Warning Signs</h3>
              </div>
              <p className="text-fia-textLight leading-snug text-balance text-sm">
                Detect manipulative tactics targeting vulnerabilities.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-xl border-2 border-fia-border shadow hover:shadow-md hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center mb-2">
                <div className="w-9 h-9 rounded-full bg-fia-burgundy flex items-center justify-center mr-3">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Build Defenses</h3>
              </div>
              <p className="text-fia-textLight leading-snug text-balance text-sm">
                Gain strategies to protect your wellbeing.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
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
