import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import CTAButton from './CTAButton';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MotionButton } from "@/components/ui/motion-button";
import { getDominantProfiles } from '../utils/resultProfiles';
import { Lock, Puzzle, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Profile color mapping
const getProfileColor = (profileId: string): string => {
  const colorMap: {[key: string]: string} = {
    dreamer: 'profile-dreamer',
    peacemaker: 'profile-peacemaker',
    caregiver: 'profile-caregiver',
    rebel: 'profile-rebel',
    achiever: 'profile-achiever',
    // Default to first color if not found
    default: 'profile-dreamer'
  };
  
  return colorMap[profileId.toLowerCase()] || colorMap.default;
};

// Profile illustrations
const getProfileIcon = (profileId: string) => {
  const iconMap: {[key: string]: React.ReactNode} = {
    dreamer: <Puzzle className="h-10 w-10" />,
    peacemaker: <Flag className="h-10 w-10" />,
    caregiver: <Lock className="h-10 w-10" />,
    rebel: <Puzzle className="h-10 w-10" />,
    achiever: <Flag className="h-10 w-10" />,
    default: <Puzzle className="h-10 w-10" />
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
    default: '#1B3B6F'
  };
  
  return colorMap[profileId.toLowerCase()] || colorMap.default;
};

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  const [isChartVisible, setIsChartVisible] = useState(false);
  
  useEffect(() => {
    // Animation delay for chart
    const timer = setTimeout(() => {
      setIsChartVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
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
  
  const dominantProfiles = getDominantProfiles(results, 2);
  const sortedProfiles = [...results].sort((a, b) => b.percentage - a.percentage);
  const top5Profiles = sortedProfiles.slice(0, 5);
  
  // Prepare chart data
  const chartData = top5Profiles.map(profile => ({
    name: profile.name,
    percentage: profile.percentage,
    color: getTailwindColor(profile.id)
  }));
  
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
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
  
  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 }
    })
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-fia-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fia-container py-12">
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
          className="text-fia-textLight text-xl text-center mb-16 max-w-3xl mx-auto"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Based on your responses, we've identified your primary relational patterns.
        </motion.p>
        
        {/* Dominant Profile */}
        <motion.div 
          className="mb-16"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold mb-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            Your Primary Blind Spot Pattern
          </motion.h3>
          
          {dominantProfiles.map((profile, index) => (
            <motion.div 
              key={profile.id} 
              className={`rounded-2xl overflow-hidden mb-16 shadow-xl ${getBgColor(profile.id)}`}
              custom={index}
              variants={profileCardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="p-12 flex flex-col items-center text-white">
                <motion.div 
                  className={`w-20 h-20 rounded-full bg-white/20 mb-6 flex items-center justify-center`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.2), duration: 0.5, type: "spring" }}
                >
                  {getProfileIcon(profile.id)}
                </motion.div>
                
                <motion.h4 
                  className="text-3xl font-bold mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
                >
                  {profile.name}
                </motion.h4>
                
                <motion.div 
                  className="px-6 py-2 rounded-full bg-white/20 text-white text-lg font-bold"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + (index * 0.2), duration: 0.5 }}
                >
                  {profile.percentage}%
                </motion.div>
              </div>
              
              <Card className="fia-result-card border-0 rounded-none p-0">
                <div className="p-10 bg-white">
                  <motion.div 
                    className="mb-10 p-8 border-2 border-fia-border rounded-lg bg-fia-white shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full ${getBgColor(profile.id)} flex items-center justify-center mr-4`}>
                        <Puzzle className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-xl font-bold">Summary</h5>
                    </div>
                    <p className="text-fia-charcoal leading-relaxed text-lg">{profile.summary}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="mb-10 p-8 border-2 border-fia-border rounded-lg bg-fia-white shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full ${getBgColor(profile.id)} flex items-center justify-center mr-4`}>
                        <Flag className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-xl font-bold">Manipulative Tactics to Watch Out For</h5>
                    </div>
                    <p className="text-fia-charcoal leading-relaxed text-lg">{profile.manipulativeTactics}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="mb-10 p-8 border-2 border-fia-border rounded-lg bg-fia-white shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full ${getBgColor(profile.id)} flex items-center justify-center mr-4`}>
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-xl font-bold">How to Defend Yourself</h5>
                    </div>
                    <p className="text-fia-charcoal leading-relaxed text-lg">{profile.defenseStrategies}</p>
                  </motion.div>
                  
                  <motion.h6 
                    className="text-2xl font-bold mb-6 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                  >
                    Recommended Tools
                  </motion.h6>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {profile.tools.map((tool, toolIndex) => (
                      <motion.div 
                        key={tool.name} 
                        className="p-8 border-2 border-fia-border rounded-lg bg-white hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + (index * 0.1) + (toolIndex * 0.1), duration: 0.5 }}
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
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Profile Breakdown */}
        <motion.div 
          className="mb-16 max-w-4xl mx-auto"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold mb-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
          >
            Your Blind Spot Profile Breakdown
          </motion.h3>
          
          <Card className="p-10 bg-white rounded-xl border-2 border-fia-border shadow-xl">
            {isChartVisible && (
              <div className="mb-10 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }}
                    />
                    <Bar 
                      dataKey="percentage" 
                      fill="#8884d8" 
                      radius={[0, 4, 4, 0]}
                      animationDuration={1500}
                    >
                      {chartData.map((entry, index) => (
                        <motion.rect 
                          key={`bar-${index}`}
                          fill={entry.color}
                          initial={{ width: 0 }}
                          animate={{ width: `${entry.percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="space-y-8">
              {top5Profiles.map((profile, index) => (
                <motion.div 
                  key={profile.id} 
                  className="space-y-3"
                  custom={index}
                  variants={profileCardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between">
                    <span className="font-bold text-xl">{profile.name}</span>
                    <span className="font-bold text-xl">{profile.percentage}%</span>
                  </div>
                  <div className="h-12 rounded-lg overflow-hidden relative mb-5 bg-fia-border/30">
                    <motion.div 
                      className={`h-full ${getBgColor(profile.id)}`}
                      custom={profile.percentage}
                      variants={barVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Start Over Button */}
        <motion.div 
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <MotionButton
            onClick={() => setCurrentStep('landing')}
            className="fia-btn-secondary text-lg px-10 py-4"
            whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
            whileTap={{ y: 0 }}
          >
            Take the Quiz Again
          </MotionButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultPage;
