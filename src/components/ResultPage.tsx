
import React, { useState, useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';
import CTAButton from './CTAButton';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getDominantProfiles } from '../utils/resultProfiles';
import { ArrowUp, ChevronDown, Lock, Puzzle, Flag, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipCard from './FlipCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Create motion components
const MotionButton = motion(Button);
const MotionDiv = motion.div;

// Profile color mapping
const getProfileColor = (profileId: string): string => {
  const colorMap: {[key: string]: string} = {
    dreamer: 'profile-dreamer',
    peacemaker: 'profile-peacemaker',
    caregiver: 'profile-caregiver',
    rebel: 'profile-rebel',
    achiever: 'profile-achiever',
    default: 'profile-dreamer'
  };
  
  return colorMap[profileId.toLowerCase()] || colorMap.default;
};

// Profile illustrations
const getProfileIcon = (profileId: string) => {
  const iconMap: {[key: string]: React.ReactNode} = {
    dreamer: <Puzzle className="h-8 w-8" />,
    peacemaker: <Flag className="h-8 w-8" />,
    caregiver: <Shield className="h-8 w-8" />,
    rebel: <Puzzle className="h-8 w-8" />,
    achiever: <Flag className="h-8 w-8" />,
    default: <Puzzle className="h-8 w-8" />
  };
  
  return iconMap[profileId.toLowerCase()] || iconMap.default;
};

const getBgColor = (profileId: string): string => {
  const colorMap: {[key: string]: string} = {
    dreamer: 'bg-fia-blue',
    peacemaker: 'bg-fia-teal',
    caregiver: 'bg-fia-yellow',
    rebel: 'bg-fia-burgundy',
    achiever: 'bg-fia-charcoal',
    explorer: 'bg-fia-blue',
    traditionalist: 'bg-fia-teal',
    intellectual: 'bg-fia-charcoal',
    leader: 'bg-fia-burgundy',
    default: 'bg-fia-blue'
  };
  
  return colorMap[profileId.toLowerCase()] || colorMap.default;
};

const getTailwindColor = (profileId: string): string => {
  const colorMap: {[key: string]: string} = {
    dreamer: '#1B3B6F',
    peacemaker: '#246A73',
    caregiver: '#F2BE29',
    rebel: '#842E2E',
    achiever: '#121212',
    explorer: '#1B3B6F',
    traditionalist: '#246A73',
    intellectual: '#121212',
    leader: '#842E2E',
    default: '#1B3B6F'
  };
  
  return colorMap[profileId.toLowerCase()] || colorMap.default;
};

// Chart colors for profiles
const CHART_COLORS = [
  '#1B3B6F', '#246A73', '#F2BE29', '#842E2E', '#121212',
  '#4A90E2', '#50C878', '#FF6B6B', '#9B59B6'
];

// Manipulative match data based on profile with traits
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

// Get placeholder image path for manipulative match
const getManipulativeMatchImage = (profileId: string): string => {
  const imageMap: {[key: string]: string} = {
    dreamer: "/placeholder.svg",
    peacemaker: "/placeholder.svg",
    caregiver: "/placeholder.svg",
    rebel: "/placeholder.svg",
    achiever: "/placeholder.svg",
    explorer: "/placeholder.svg",
    traditionalist: "/placeholder.svg",
    intellectual: "/placeholder.svg",
    leader: "/placeholder.svg",
    default: "/placeholder.svg"
  };
  
  return imageMap[profileId.toLowerCase()] || imageMap.default;
};

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  const [showFullInsight, setShowFullInsight] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const insightRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Handle scroll to insight section
  const scrollToInsight = () => {
    setShowFullInsight(true);
    setTimeout(() => {
      if (insightRef.current) {
        insightRef.current.scrollIntoView({ behavior: 'smooth' });
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
  
  useEffect(() => {
    // Show chart after a delay
    const chartTimer = setTimeout(() => {
      setShowChart(true);
    }, 1200);
    
    return () => {
      clearTimeout(chartTimer);
    };
  }, []);
  
  if (!results) {
    return (
      <div className="fia-container py-12 text-center">
        <h2 className="fia-heading mb-4">Results not available</h2>
        <p className="mb-6 text-lg">Sorry, we couldn't retrieve your quiz results.</p>
        <button 
          onClick={() => setCurrentStep('landing')} 
          className="fia-cta-button"
        >
          Start Over
        </button>
      </div>
    );
  }
  
  const dominantProfiles = getDominantProfiles(results, 1);
  const dominantProfile = dominantProfiles[0];
  
  // Get the manipulative match for the dominant profile
  const manipulativeMatch = getManipulativeMatch(dominantProfile.id);
  const manipulativeMatchImage = getManipulativeMatchImage(dominantProfile.id);
  
  // Prepare chart data from results
  const chartData = results
    .filter(profile => profile.score > 0)
    .map((profile, index) => ({
      name: profile.name,
      score: profile.score,
      percentage: profile.percentage,
      fill: CHART_COLORS[index % CHART_COLORS.length]
    }))
    .sort((a, b) => b.score - a.score);
  
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const insightSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const insightItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const profileCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * index,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };
  
  return (
    <ScrollArea className="min-h-screen max-h-screen overflow-y-auto">
      <motion.div 
        className="min-h-screen bg-fia-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* HERO SECTION - Result Overview (Full screen, no scroll) */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center relative pt-16 pb-8">
          <motion.div 
            className="fia-stepper mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="fia-stepper-item">
              <div className="w-10 h-10 rounded-full bg-fia-yellow/30 text-fia-charcoal flex items-center justify-center mr-3 text-base font-bold">✓</div>
              <span className="font-medium">Personal Info</span>
            </div>
            <div className="w-16 h-[2px] bg-fia-yellow mx-3"></div>
            <div className="fia-stepper-item">
              <div className="w-10 h-10 rounded-full bg-fia-yellow/30 text-fia-charcoal flex items-center justify-center mr-3 text-base font-bold">✓</div>
              <span className="font-medium">Quiz</span>
            </div>
            <div className="w-16 h-[2px] bg-fia-yellow mx-3"></div>
            <div className="fia-stepper-item fia-stepper-item-active">
              <div className="w-10 h-10 rounded-full bg-fia-yellow text-fia-charcoal flex items-center justify-center mr-3 text-base font-bold">3</div>
              <span className="font-medium">Results</span>
            </div>
          </motion.div>
        
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-3 text-center"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            Your Blind Spot Analysis
          </motion.h2>
          
          <motion.p 
            className="text-fia-textLight text-xl text-center mb-8 max-w-3xl mx-auto px-4"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Based on your responses, we've identified your primary relational pattern.
          </motion.p>
          
          {/* Dominant Profile Card - Smaller height */}
          <motion.div 
            className="w-full max-w-md mx-auto px-5"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className={`rounded-2xl overflow-hidden shadow-xl ${getBgColor(dominantProfile.id)}`}
              initial="hidden"
              animate="visible"
              variants={profileCardVariants}
              custom={0}
            >
              <div className="p-6 md:py-6 md:px-10 flex flex-col items-center text-white">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-white/20 mb-3 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                >
                  {getProfileIcon(dominantProfile.id)}
                </motion.div>
                
                <motion.h4 
                  className="text-2xl md:text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {dominantProfile.name}
                </motion.h4>
                
                <motion.div 
                  className="px-5 py-1.5 rounded-full bg-white/20 text-white text-xl font-bold mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {dominantProfile.percentage}%
                </motion.div>
                
                <motion.button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 transition-colors"
                  onClick={scrollToInsight}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  View Full Insight <ChevronDown className="h-4 w-4 animate-bounce" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* INSIGHT SECTION - Full Trait Breakdown (Scrollable) */}
        <AnimatePresence>
          {showFullInsight && (
            <motion.section 
              ref={insightRef} 
              className="py-16 bg-gradient-to-b from-white to-fia-offwhite"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={insightSectionVariants}
            >
              <div className="fia-container">
                <motion.h3 
                  className="text-3xl font-bold mb-10 text-center"
                  variants={insightItemVariants}
                >
                  Your Primary Pattern: {dominantProfile.name}
                </motion.h3>

                {/* Profile Scores Chart */}
                <AnimatePresence>
                  {showChart && chartData.length > 0 && (
                    <motion.div 
                      className="mb-16 p-6 sm:p-8 border-2 border-fia-border rounded-xl bg-white shadow-md"
                      variants={chartVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold mb-2">Your Personality Profile Breakdown</h4>
                        <p className="text-fia-textLight">See how your responses mapped to different vulnerability patterns</p>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Bar Chart */}
                        <motion.div 
                          className="h-96"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <h5 className="text-lg font-semibold mb-4 text-center">Score Distribution</h5>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="name" 
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                fontSize={12}
                              />
                              <YAxis />
                              <Tooltip 
                                formatter={(value: number, name: string) => [`${value}%`, 'Percentage']}
                                labelFormatter={(label) => `Profile: ${label}`}
                              />
                              <Bar dataKey="percentage" fill="#1B3B6F" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </motion.div>

                        {/* Pie Chart */}
                        <motion.div 
                          className="h-96"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                        >
                          <h5 className="text-lg font-semibold mb-4 text-center">Profile Composition</h5>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="percentage"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="mt-4 text-sm text-fia-textLight text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                      >
                        <p>This visualization shows how your quiz responses mapped to different personality vulnerability patterns. Your dominant pattern is highlighted as your primary result.</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  className="mb-8 p-6 sm:p-8 border-2 border-fia-border rounded-xl bg-white shadow-md"
                  variants={insightItemVariants}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${getBgColor(dominantProfile.id)} flex items-center justify-center mr-4`}>
                      <Puzzle className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-2xl font-bold">Summary</h5>
                  </div>
                  <p className="text-fia-charcoal leading-relaxed text-lg">{dominantProfile.summary}</p>
                </motion.div>
                
                <motion.div 
                  className="mb-8 p-6 sm:p-8 border-2 border-fia-border rounded-xl bg-white shadow-md"
                  variants={insightItemVariants}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${getBgColor(dominantProfile.id)} flex items-center justify-center mr-4`}>
                      <Flag className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-2xl font-bold">Manipulative Tactics to Watch Out For</h5>
                  </div>
                  <p className="text-fia-charcoal leading-relaxed text-lg">{dominantProfile.manipulativeTactics}</p>
                </motion.div>
                
                {/* Updated Your Manipulative Match section with FlipCard */}
                <motion.div 
                  className="mb-8 border-2 border-fia-border rounded-xl bg-white shadow-md overflow-hidden"
                  variants={insightItemVariants}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full ${getBgColor(dominantProfile.id)} flex items-center justify-center mr-4`}>
                        <span className="text-2xl text-white">{manipulativeMatch.emoji}</span>
                      </div>
                      <h5 className="text-2xl font-bold">💥 Your Manipulative Match</h5>
                    </div>
                    
                    {/* FlipCard component for manipulative match */}
                    <div className="h-[340px]">
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
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mb-8 p-6 sm:p-8 border-2 border-fia-border rounded-xl bg-white shadow-md"
                  variants={insightItemVariants}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${getBgColor(dominantProfile.id)} flex items-center justify-center mr-4`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="text-2xl font-bold">How to Defend Yourself</h5>
                  </div>
                  <p className="text-fia-charcoal leading-relaxed text-lg">{dominantProfile.defenseStrategies}</p>
                </motion.div>
                
                <motion.h5 
                  className="text-2xl font-bold mb-6 mt-12"
                  variants={insightItemVariants}
                >
                  Recommended Tools
                </motion.h5>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16"
                  variants={insightItemVariants}
                >
                  {dominantProfile.tools.map((tool, toolIndex) => (
                    <motion.div 
                      key={tool.name} 
                      className="p-6 border-2 border-fia-border rounded-xl bg-white hover:shadow-lg transition-all"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                    >
                      <h6 className="font-bold text-xl mb-3">{tool.name}</h6>
                      <p className="text-fia-textLight mb-6">Build resources to strengthen your relational skills</p>
                      <CTAButton 
                        name={`Try ${tool.name}`} 
                        url={tool.url} 
                        isPrimary={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Start Over Button */}
                <motion.div 
                  className="text-center pt-6"
                  variants={insightItemVariants}
                >
                  <button 
                    onClick={() => setCurrentStep('landing')}
                    className="fia-btn-secondary text-lg px-10 py-4"
                  >
                    Take the Quiz Again
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <button 
              onClick={scrollToTop}
              className="bg-fia-charcoal text-white p-3 rounded-full shadow-lg hover:bg-fia-burgundy transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </ScrollArea>
  );
};

export default ResultPage;
