
import React from 'react';
import { QuizProvider } from '../context/QuizContext';
import IntakeForm from '../components/IntakeForm';
import Quiz from '../components/Quiz';
import ResultPage from '../components/ResultPage';
import { Button } from '@/components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { ChevronRight, ArrowRight, Users, Brain, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import FIAHeader from '../components/FIAHeader';

// Create a motion button component that works with framer-motion
const MotionButton = motion(Button);

// Shared page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// Interactive personality cards data with emojis
const personalityPreview = [
  { emoji: "🎭", name: "The Player", color: "#E86EB4", description: "Drawn to charismatic manipulators who mirror their dreams" },
  { emoji: "🕵️‍♂️", name: "The Investigator", color: "#36A0D9", description: "Susceptible to those who exploit their need for harmony" },
  { emoji: "🤗", name: "The Caregiver", color: "#10B981", description: "Vulnerable to energy vampires and emotional manipulators" },
  { emoji: "💣", name: "The Saboteur", color: "#EF4444", description: "Targeted by those who exploit their rebellious nature" },
  { emoji: "🧛", name: "The Energy-Drainer", color: "#8B5CF6", description: "Attracts those who exploit their drive and ambition" },
  { emoji: "🗺️", name: "The Explorer", color: "#06B6D4", description: "Vulnerable to predators who promise adventure and novelty" },
  { emoji: "📚", name: "The Traditionalist", color: "#6B7280", description: "Targeted by those who exploit their need for structure" },
  { emoji: "🧠", name: "The Intellectual", color: "#7C3AED", description: "Susceptible to intellectual manipulation and gaslighting" },
  { emoji: "👑", name: "The Leader", color: "#DC2626", description: "Vulnerable to those who challenge their authority subtly" }
];

// Landing page component
const Landing: React.FC = () => {
  const { setCurrentStep } = useQuiz();
  
  const handleStartQuiz = () => {
    setCurrentStep('intake');
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <FIAHeader />

      {/* Hero Section */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-fiaCharcoal mb-8 leading-tight font-karla">
                Uncover Your<br />
                <span className="bg-gradient-to-r from-fiaPink to-fiaBlue bg-clip-text text-transparent">
                  Blind Spot
                </span><br />
                Patterns
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                Discover how you show up in emotionally complex relationships and learn to protect yourself from manipulation. 
                <strong className="text-fiaCharcoal"> You've got this!</strong> 💪
              </p>

              <MotionButton
                onClick={handleStartQuiz}
                className="fia-btn-primary text-xl px-12 py-6 group shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Take the Free Assessment
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </MotionButton>
              
              <p className="text-sm text-gray-500 mt-4">
                ✨ Takes 5-7 minutes • Completely free • Instant results
              </p>
            </motion.div>
          </div>

          {/* Personality Types Grid */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-fiaCharcoal mb-4 font-karla">
                Which vulnerability pattern sounds like you?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each pattern has unique strengths and blind spots. Understanding yours is the first step to 
                building stronger defenses and keeping your power.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {personalityPreview.map((type, index) => (
                <motion.div
                  key={type.name}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 cursor-pointer transition-all hover:-translate-y-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleStartQuiz}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform" role="img" aria-label={`${type.name} emoji`}>
                      {type.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-fiaCharcoal mb-3 font-karla">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {type.description}
                    </p>
                    <div 
                      className="w-full h-2 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: type.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <MotionButton
                onClick={handleStartQuiz}
                className="fia-btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover Your Pattern Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </MotionButton>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center p-8 bg-gradient-to-br from-fiaPink/10 to-fiaPink/5 rounded-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-fiaPink to-fiaPink/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-10 w-10 text-white" aria-label="Brain icon" />
              </div>
              <h3 className="text-2xl font-bold text-fiaCharcoal mb-4 font-karla">Discover Patterns</h3>
              <p className="text-gray-600 leading-relaxed">
                Identify your unique relational tendencies and emotional vulnerabilities that others might exploit.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-white" aria-label="Shield icon" />
              </div>
              <h3 className="text-2xl font-bold text-fiaCharcoal mb-4 font-karla">Warning Signs</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn to recognize manipulation tactics that specifically target your blind spots and vulnerabilities.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-fiaBlue/10 to-fiaBlue/5 rounded-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-fiaBlue to-fiaBlue/80 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-white" aria-label="Heart icon" />
              </div>
              <h3 className="text-2xl font-bold text-fiaCharcoal mb-4 font-karla">Build Defenses</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized strategies to navigate relationship challenges safely while keeping your power.
              </p>
            </div>
          </motion.div>

          {/* Final CTA Section */}
          <motion.div
            className="bg-gradient-to-br from-fiaPink/10 via-white to-fiaBlue/10 rounded-3xl p-12 text-center border border-fiaPink/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fiaCharcoal mb-6 font-karla">
              Ready to sharpen your social discernment?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take our comprehensive assessment to discover your vulnerability patterns and learn how to protect yourself 
              in complex relationships. <strong className="text-fiaCharcoal">Knowledge is power!</strong>
            </p>
            <MotionButton
              onClick={handleStartQuiz}
              className="fia-btn-primary text-xl px-12 py-6 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Assessment Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </MotionButton>
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                100% Secure
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-fiaBlue" />
                50K+ Women Empowered
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2 text-fiaPink" />
                Science-Based
              </div>
            </div>
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
