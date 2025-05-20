
import React, { useEffect } from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a motion button component that works with framer-motion
const MotionButton = motion(Button);

// Shared page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// Brain icon SVG component
const BrainIcon = () => (
  <motion.svg 
    width="280" 
    height="280" 
    viewBox="0 0 280 280" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
    transition={{ duration: 1.2 }}
  >
    <path 
      d="M140 70C120 70 105 80 100 95C95 110 100 130 110 140C120 150 125 165 120 180C115 195 100 200 85 195C70 190 60 175 65 155C70 135 85 125 95 125C105 125 115 130 120 140"
      stroke="#FFD02F" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M140 70C155 70 170 80 175 95C180 110 175 125 165 135C155 145 150 165 155 180C160 195 170 200 185 195C200 190 210 175 205 160C200 145 185 135 175 135" 
      stroke="#FFD02F" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M205 120C215 120 225 130 225 145C225 160 215 170 200 170" 
      stroke="#FFD02F" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M140 70C140 50 150 35 170 30C190 25 210 35 220 55C230 75 225 95 210 105" 
      stroke="#FFD02F" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M240 120C255 120 265 135 265 150C265 165 255 180 240 180" 
      stroke="#FFD02F" 
      strokeWidth="2" 
      strokeLinecap="round"
      opacity="0.7"
    />
    <path 
      d="M250 150C260 155 265 165 265 175" 
      stroke="#FFD02F" 
      strokeWidth="2" 
      strokeLinecap="round"
      opacity="0.6"
    />
  </motion.svg>
);

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  // Handler to explicitly navigate to the intake step
  const handleStartQuiz = () => {
    setCurrentStep('intake');
  };
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-r from-black to-fia-yellow"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Main hero section */}
      <div className="flex-1 flex flex-col items-center justify-center relative pt-10 pb-8 px-6 md:px-12">
        {/* Brain icon overlay */}
        <div className="absolute top-0 left-0 opacity-70 md:opacity-100">
          <BrainIcon />
        </div>
        
        {/* Content container */}
        <div className="max-w-3xl mx-auto text-center z-10 mt-16">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Uncover Your<br />
            Blind Spot<br />
            Patterns
          </motion.h1>
          
          <motion.p 
            className="text-white text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            How do you show up in emotionally complex relationships? Let's find out.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <MotionButton
              onClick={handleStartQuiz}
              className="bg-black text-white text-lg md:text-xl px-8 py-6 rounded-full font-bold group hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start the Quiz
              <ArrowRight className="ml-2 text-fia-yellow group-hover:translate-x-1 transition-transform" />
            </MotionButton>
          </motion.div>
        </div>
      </div>
      
      {/* Feature cards section */}
      <div className="px-6 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div 
              className="bg-fia-white/95 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-fia-blue flex items-center justify-center">
                  <span className="text-2xl text-white">+</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Discover Patterns</h3>
              <p className="text-fia-charcoal/80">
                Identify your unique relational tendencies.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-fia-white/95 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-fia-teal flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">P</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Warning Signs</h3>
              <p className="text-fia-charcoal/80">
                Detect insights targeting your vulnerabilities.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-fia-white/95 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-fia-burgundy flex items-center justify-center">
                  <span className="text-2xl text-white">↓</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Build Defenses</h3>
              <p className="text-fia-charcoal/80">
                Get strategies to navigate relationship snags.
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
  
  // Previously the resetQuiz function was called when entering the quiz step
  // which was resetting the quiz state back to the landing page
  
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
