
import React, { useState, useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';
import CTAButton from './CTAButton';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDominantProfiles } from '../utils/resultProfiles';
import { ArrowUp, Trophy, Target, Shield, Brain, Heart, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipCard from './FlipCard';
import RadialChart from './RadialChart';

// Create motion components
const MotionButton = motion(Button);
const MotionDiv = motion.div;

// Profile color mapping
const getProfileColor = (profileId: string): string => {
  const colorMap: {[key: string]: string} = {
    dreamer: '#8B5CF6',
    peacemaker: '#10B981',
    caregiver: '#F59E0B',
    rebel: '#EF4444',
    achiever: '#3B82F6',
    explorer: '#06B6D4',
    traditionalist: '#6B7280',
    intellectual: '#7C3AED',
    leader: '#DC2626',
    default: '#8B5CF6'
  };
  
  return colorMap[profileId.toLowerCase()] || colorMap.default;
};

// Profile icons mapping
const getProfileIcon = (profileId: string) => {
  const iconMap: {[key: string]: React.ReactNode} = {
    dreamer: <Brain className="h-8 w-8" />,
    peacemaker: <Heart className="h-8 w-8" />,
    caregiver: <Shield className="h-8 w-8" />,
    rebel: <Target className="h-8 w-8" />,
    achiever: <Trophy className="h-8 w-8" />,
    explorer: <Users className="h-8 w-8" />,
    traditionalist: <Shield className="h-8 w-8" />,
    intellectual: <Brain className="h-8 w-8" />,
    leader: <Trophy className="h-8 w-8" />,
    default: <Brain className="h-8 w-8" />
  };
  
  return iconMap[profileId.toLowerCase()] || iconMap.default;
};

// Manipulative match data (keeping existing logic)
const getManipulativeMatch = (profileId: string) => {
  const matchMap: {[key: string]: {name: string, quote: string, description: string, emoji: string, traits: string[]}} = {
    dreamer: {
      name: "The Illusionist",
      quote: "You saw the potential. They just saw your hope.",
      description: "They mirror your dreams, validate your emotions, and vanish when real life kicks in. You're left holding a fantasy, wondering if it was ever real.",
      emoji: "🃏",
      traits: ["Emotionally unavailable", "Promise-breaker", "Fantasy seller"]
    },
    peacemaker: {
      name: "The Chaos Creator",
      quote: "They need your calm to mask their storm.",
      description: "They manufacture crises that only you can solve, positioning any boundary as selfish. Your harmony becomes their weapon against your own needs.",
      emoji: "🌪️",
      traits: ["Boundary violator", "Drama instigator", "Guilt manipulator"]
    },
    caregiver: {
      name: "The Eternal Patient",
      quote: "Your care is their currency, and they're always bankrupt.",
      description: "They perform helplessness to extract your nurturing energy, always in crisis but never taking responsibility. Your compassion becomes their life support system.",
      emoji: "🏥",
      traits: ["Crisis manufacturer", "Responsibility avoider", "Energy vampire"]
    },
    rebel: {
      name: "The Persecution Specialist",
      quote: "They've found the perfect defender for their imaginary battles.",
      description: "They create 'us-against-them' narratives that isolate you while positioning themselves as fellow warriors. Your courage becomes collateral in conflicts they manufacture.",
      emoji: "⚔️",
      traits: ["Narrative controller", "Reality distorter", "Isolation enforcer"]
    },
    achiever: {
      name: "The Goalposter",
      quote: "The finish line moves every time you get close.",
      description: "They constantly shift standards and expectations, using your drive for excellence against you. Your achievements become stepping stones to their next impossible demand.",
      emoji: "🏁",
      traits: ["Standard shifter", "Validation withholder", "Perfectionism exploiter"]
    },
    explorer: {
      name: "The Freedom Baiter",
      quote: "They offer the horizon but build a cage.",
      description: "They initially celebrate your independence, then slowly introduce guilt and manipulation when you exercise it. Your autonomy becomes their favorite target.",
      emoji: "🪤",
      traits: ["Guilt-inducing", "Emotionally evasive", "Mystery as control"]
    },
    traditionalist: {
      name: "The Authority Impersonator",
      quote: "They don't follow the rules. They become them.",
      description: "They leverage your respect for structure by creating arbitrary standards they claim you must follow. Your conscientiousness becomes a lever for their control.",
      emoji: "📜",
      traits: ["Rule inventor", "Authority abuser", "Selective enforcer"]
    },
    intellectual: {
      name: "The Logic Twister",
      quote: "They exhaust your mind until compliance seems rational.",
      description: "They use circular arguments and intellectual gymnastics to make you doubt your perceptions. Your analytical nature becomes their playground for gaslighting.",
      emoji: "🔄",
      traits: ["Reality distorter", "Circular arguer", "Truth manipulator"]
    },
    leader: {
      name: "The Threat Magnifier",
      quote: "They make you feel powerful by creating problems only you can solve.",
      description: "They position themselves as in need of your protection while manufacturing crises that require your intervention. Your strength becomes their shield and weapon.",
      emoji: "🔍",
      traits: ["Crisis fabricator", "Protection seeker", "Dependency creator"]
    },
    default: {
      name: "The Manipulator",
      quote: "They study your patterns to exploit your blind spots.",
      description: "They carefully observe your vulnerabilities and use them against you, adapting their approach based on what works best to control your behavior.",
      emoji: "🎭",
      traits: ["Vulnerability hunter", "Pattern analyzer", "Behavior controller"]
    }
  };
  
  return matchMap[profileId.toLowerCase()] || matchMap.default;
};

const getManipulativeMatchImage = (profileId: string): string => {
  return "/placeholder.svg";
};

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  const [showFullResults, setShowFullResults] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll to details section
  const scrollToDetails = () => {
    setShowFullResults(true);
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  // Handle back to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track scroll position for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Results not available</h2>
          <p className="text-slate-600 mb-6">Sorry, we couldn't retrieve your quiz results.</p>
          <Button onClick={() => setCurrentStep('landing')} className="bg-blue-600 hover:bg-blue-700">
            Start Over
          </Button>
        </div>
      </div>
    );
  }
  
  const dominantProfiles = getDominantProfiles(results, 2);
  const primaryProfile = dominantProfiles[0];
  const secondaryProfile = dominantProfiles[1];
  
  const manipulativeMatch = getManipulativeMatch(primaryProfile.id);
  const manipulativeMatchImage = getManipulativeMatchImage(primaryProfile.id);
  
  // Filter profiles with scores > 0 for the chart
  const profilesWithScores = results.filter(profile => profile.score > 0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Completion Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Trophy className="h-4 w-4" />
            Assessment Complete
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Your Personality Type
          </motion.h1>
          
          <motion.p 
            className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Based on your responses, here's your unique personality profile and insights.
          </motion.p>

          {/* Primary Profile Card */}
          <motion.div 
            className="max-w-md mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div 
              className="bg-white rounded-2xl shadow-xl border-2 p-6 text-center relative overflow-hidden"
              style={{ borderColor: getProfileColor(primaryProfile.id) }}
            >
              {/* Background Gradient */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{ 
                  background: `linear-gradient(135deg, ${getProfileColor(primaryProfile.id)}, transparent)` 
                }}
              />
              
              <div className="relative z-10">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 mx-auto shadow-lg"
                  style={{ backgroundColor: getProfileColor(primaryProfile.id) }}
                >
                  {getProfileIcon(primaryProfile.id)}
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {primaryProfile.name}
                </h2>
                
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div 
                    className="px-3 py-1 rounded-full text-white font-bold text-base"
                    style={{ backgroundColor: getProfileColor(primaryProfile.id) }}
                  >
                    {primaryProfile.percentage}%
                  </div>
                  <span className="text-slate-600 text-sm">Primary Type</span>
                </div>

                {secondaryProfile && (
                  <div className="text-sm text-slate-600 mb-4">
                    <span className="font-medium">{secondaryProfile.percentage}% {secondaryProfile.name}</span>
                    <span className="block text-xs mt-1">Secondary influence</span>
                  </div>
                )}
                
                <Button 
                  onClick={scrollToDetails}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl text-sm"
                >
                  View Detailed Analysis
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Trait Bars Preview */}
          <motion.div 
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-base font-semibold text-slate-700 mb-3">Your Trait Distribution</h3>
            <div className="space-y-2">
              {dominantProfiles.slice(0, 3).map((profile, index) => (
                <div key={profile.id} className="flex items-center gap-3">
                  <div className="w-20 text-xs font-medium text-slate-600 text-right">
                    {profile.name}
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: getProfileColor(profile.id) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${profile.percentage}%` }}
                        transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <div className="w-10 text-xs font-semibold text-slate-700">
                    {profile.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Results Section */}
      <AnimatePresence>
        {showFullResults && (
          <motion.section 
            ref={detailsRef}
            className="py-12 bg-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  Detailed Analysis: {primaryProfile.name}
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Explore your complete personality profile, including strengths, challenges, and growth opportunities.
                </p>
              </div>

              {/* Interactive Radial Chart */}
              {profilesWithScores.length > 0 && (
                <motion.div 
                  className="mb-12 bg-slate-50 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <RadialChart 
                    profiles={profilesWithScores} 
                    dominantProfile={primaryProfile}
                  />
                </motion.div>
              )}

              {/* Profile Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Summary Card */}
                <motion.div 
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-5"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: getProfileColor(primaryProfile.id) }}
                    >
                      <Brain className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Your Profile</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">{primaryProfile.summary}</p>
                </motion.div>

                {/* Manipulative Tactics Card */}
                <motion.div 
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: getProfileColor(primaryProfile.id) }}
                    >
                      <Shield className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Warning Signs</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">{primaryProfile.manipulativeTactics}</p>
                </motion.div>
              </div>

              {/* Your Manipulative Match */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    💥 Your Manipulative Match
                  </h3>
                  <p className="text-slate-600 text-sm">
                    This profile shows the type of manipulator who might target your vulnerabilities
                  </p>
                </div>
                
                <div className="max-w-lg mx-auto">
                  <FlipCard 
                    frontContent={{
                      name: manipulativeMatch.name,
                      quote: manipulativeMatch.quote,
                      description: manipulativeMatch.description,
                      emoji: manipulativeMatch.emoji
                    }}
                    imageSrc={manipulativeMatchImage}
                    traits={manipulativeMatch.traits}
                  />
                </div>
              </motion.div>

              {/* Defense Strategies */}
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-12 border border-green-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">How to Defend Yourself</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{primaryProfile.defenseStrategies}</p>
              </motion.div>

              {/* Recommended Tools */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
                  Recommended Tools for Growth
                </h3>
                
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  {primaryProfile.tools.map((tool, index) => (
                    <motion.div 
                      key={tool.name}
                      className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                    >
                      <h4 className="text-lg font-bold text-slate-800 mb-2">{tool.name}</h4>
                      <p className="text-slate-600 mb-4 text-sm">Build resources to strengthen your relational skills</p>
                      <CTAButton 
                        name={`Explore ${tool.name}`} 
                        url={tool.url} 
                        isPrimary={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Retake Quiz */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <Button 
                  onClick={() => setCurrentStep('landing')}
                  variant="outline"
                  className="text-base px-6 py-2 border-slate-300 hover:bg-slate-50"
                >
                  Take the Assessment Again
                </Button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-6 right-6 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-900 transition-colors z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
};

export default ResultPage;
