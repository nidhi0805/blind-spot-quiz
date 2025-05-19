
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight, Flag, Lock, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a motion button component
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
      className="min-h-screen bg-fia-yellow relative overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <div className="fia-split-container min-h-[70vh] shadow-lg">
        <div className="w-full md:w-1/2 bg-fia-charcoal flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-fia-yellow/20 rounded-full p-5">
                <Lock className="w-12 h-12 text-fia-yellow" />
              </div>
            </div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Uncover Your <br/> Blind Spot Patterns
            </motion.h2>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="max-w-xl">
            <motion.p 
              className="text-xl text-fia-charcoal mb-10 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Gain insights into your relational blind spot patterns in emotionally complex relationships.
              This self-awareness diagnostic helps you understand how you show up when
              things get complicated.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <MotionButton
                onClick={() => setCurrentStep('intake')}
                className="fia-cta-button group"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Self-Assessment
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </MotionButton>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="fia-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-10 rounded-xl border-2 border-fia-border shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-fia-blue flex items-center justify-center mb-6">
              <Puzzle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-4">Discover Your Patterns</h3>
            <p className="text-fia-textLight leading-relaxed text-lg">
              Identify your unique relational tendencies and blind spots that may be affecting your relationships.
            </p>
          </motion.div>
          <motion.div 
            className="bg-white p-10 rounded-xl border-2 border-fia-border shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-fia-teal flex items-center justify-center mb-6">
              <Flag className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-4">Recognize Warning Signs</h3>
            <p className="text-fia-textLight leading-relaxed text-lg">
              Learn to detect manipulative tactics that target your specific vulnerabilities.
            </p>
          </motion.div>
          <motion.div 
            className="bg-white p-10 rounded-xl border-2 border-fia-border shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-fia-burgundy flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-4">Build Better Defenses</h3>
            <p className="text-fia-textLight leading-relaxed text-lg">
              Gain practical strategies to protect your emotional wellbeing in complex relationships.
            </p>
          </motion.div>
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
