
import React, { useEffect } from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight, ArrowRight, Users, Brain, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a motion button component that works with framer-motion
const MotionButton = motion(Button);
const dreamer = "/img/Dreamer.png"; 
const Peacemaker = "/img/Peacemaker.png"; 
const caregiver="/img/Caregiver.png";
const rebel="/img/Rebel.png";
const achiever="/img/Achiever.png";
const explorer="/img/Explorer.png";
const traditionalist="/img/Traditionalist.png";
const intellectual="/img/Intellectual.png";
const leader="/img/Leader.png";

// Shared page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// Interactive personality cards data
const personalityPreview = [
  { image: dreamer, name: "The Dreamer", color: "#8B5CF6", description: "Idealistic and empathetic" },
  { image: Peacemaker, name: "The Peacemaker", color: "#10B981", description: "Harmonious and diplomatic" },
  { image: caregiver, name: "The Caregiver", color: "#F59E0B", description: "Nurturing and supportive" },
  { image: rebel, name: "The Rebel", color: "#EF4444", description: "Independent and bold" },
  { image: achiever, name: "The Achiever", color: "#3B82F6", description: "Goal-oriented and driven" },
  { image: explorer, name: "The Explorer", color: "#06B6D4", description: "Curious and adventurous" },
  { image:traditionalist, name: "The Traditionalist", color: "#6B7280", description: "Reliable and structured" },
  { image: intellectual, name: "The Intellectual", color: "#7C3AED", description: "Analytical and thoughtful" },
  { image : leader, name: "The Leader", color: "#DC2626", description: "Confident and decisive" }
];

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  // Handler to explicitly navigate to the intake step
  const handleStartQuiz = () => {
    setCurrentStep('intake');
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-x-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Header */}
      <div className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-800">BlindSpots</div>
          <Button variant="outline" className="text-slate-600 border-slate-300">
            About
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Uncover Your<br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Blind Spot
              </span><br />
              Patterns
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Discover how you show up in emotionally complex relationships and learn to protect yourself from manipulation.
            </p>

            <MotionButton
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-full font-semibold group shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Take the Free Quiz
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </MotionButton>
          </motion.div>

          {/* Personality Types Grid */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Which type resonates with you?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {personalityPreview.map((type, index) => (
                <motion.div
                  key={type.name}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-slate-100 cursor-pointer transition-all hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleStartQuiz}
                >
                  <div className="h-[140px] flex items-center justify-center">
                     {type.image ? (
                      <img src={type.image} alt={type.name} className="mx-auto h-[140px] w-auto object-contain" />
                    ) : (
                      <span>{type.image}</span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm">{type.description}</p>
                  <div 
                    className="w-full h-1 rounded-full mt-3 opacity-70"
                    style={{ backgroundColor: type.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Discover Patterns</h3>
              <p className="text-slate-600">
                Identify your unique relational tendencies and emotional vulnerabilities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Warning Signs</h3>
              <p className="text-slate-600">
                Learn to recognize manipulation tactics that target your specific blind spots.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Build Defenses</h3>
              <p className="text-slate-600">
                Get personalized strategies to navigate relationship challenges safely.
              </p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to understand your blind spots?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Take our comprehensive assessment to discover your vulnerability patterns and learn how to protect yourself in complex relationships.
            </p>
            <MotionButton
              onClick={handleStartQuiz}
              className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Assessment Now
            </MotionButton>
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
