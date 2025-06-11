
import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  BookOpen, 
  Shield, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowUp
} from 'lucide-react';
import InteractiveChart from './InteractiveChart';
import RadialChart from './RadialChart';
import CTAButton from './CTAButton';

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  const [activeSection, setActiveSection] = useState<string | null>('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle case where results don't exist
  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">No Results Available</h2>
          <p className="text-slate-600 mb-6">Please take the quiz first to see your results.</p>
          <Button onClick={() => setCurrentStep('landing')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Get dominant profile (highest percentage)
  const dominantProfile = results.reduce((prev, current) => 
    prev.percentage > current.percentage ? prev : current
  );

  // Get profile caricature
  const getProfileCaricature = (profileId: string) => {
    const caricatureMap: {[key: string]: string} = {
      dreamer: "🌟",
      peacemaker: "🕊️", 
      caregiver: "🤗",
      rebel: "⚡",
      achiever: "🏆",
      explorer: "🗺️",
      traditionalist: "📚",
      intellectual: "🧠",
      leader: "👑",
      default: "🎭"
    };
    
    return caricatureMap[profileId.toLowerCase()] || caricatureMap.default;
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep('landing')}
                className="text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Your Blind Spot Profile</h1>
                <p className="text-sm text-slate-600">Understanding your vulnerability patterns</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          
          {/* Primary Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {getProfileCaricature(dominantProfile.id)}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  You are primarily: {dominantProfile.name}
                </h2>
                <p className="text-lg text-slate-600 mb-4">
                  {dominantProfile.percentage}% match
                </p>
                <div className="max-w-2xl mx-auto">
                  <p className="text-slate-700 leading-relaxed">
                    {dominantProfile.summary}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="p-6">
              <InteractiveChart 
                profiles={results} 
                dominantProfile={dominantProfile}
              />
            </Card>
          </motion.div>

          {/* Detailed Analysis Sections */}
          <div className="space-y-4">
            
            {/* Manipulation Tactics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleSection('tactics')}
                  className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Manipulation Tactics Targeting You</h3>
                        <p className="text-slate-600">Learn what predators look for in your type</p>
                      </div>
                    </div>
                    {activeSection === 'tactics' ? 
                      <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    }
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeSection === 'tactics' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-200">
                        <div className="pt-4">
                          <p className="text-slate-700 leading-relaxed mb-4">
                            {dominantProfile.manipulativeTactics}
                          </p>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2">⚠️ Common Red Flags</h4>
                            <ul className="space-y-1 text-sm text-red-700">
                              <li>• Love bombing or excessive early attention</li>
                              <li>• Isolation from friends and family</li>
                              <li>• Gaslighting your perceptions</li>
                              <li>• Exploiting your helpful nature</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Defense Strategies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleSection('defenses')}
                  className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Your Defense Strategies</h3>
                        <p className="text-slate-600">Personalized protection methods</p>
                      </div>
                    </div>
                    {activeSection === 'defenses' ? 
                      <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    }
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeSection === 'defenses' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-200">
                        <div className="pt-4">
                          <p className="text-slate-700 leading-relaxed mb-4">
                            {dominantProfile.defenseStrategies}
                          </p>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">🛡️ Key Protection Strategies</h4>
                            <ul className="space-y-1 text-sm text-green-700">
                              <li>• Trust your gut feelings</li>
                              <li>• Maintain strong support networks</li>
                              <li>• Set and enforce clear boundaries</li>
                              <li>• Take time before making big decisions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* All Profiles Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleSection('overview')}
                  className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Complete Profile Breakdown</h3>
                        <p className="text-slate-600">All your personality dimensions</p>
                      </div>
                    </div>
                    {activeSection === 'overview' ? 
                      <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    }
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeSection === 'overview' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-200">
                        <div className="pt-4 space-y-4">
                          {results.map((profile, index) => (
                            <div key={profile.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getProfileCaricature(profile.id)}</span>
                                <div>
                                  <h4 className="font-semibold text-slate-800">{profile.name}</h4>
                                  <p className="text-sm text-slate-600">{profile.summary}</p>
                                </div>
                              </div>
                              <Badge variant={index === 0 ? "default" : "secondary"}>
                                {profile.percentage}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Recommended Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dominantProfile.tools?.map((tool, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">{tool.name}</span>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                )) || (
                  <div className="col-span-2 text-center py-8 text-slate-500">
                    Resources will be available soon for your profile type.
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Build Your Defenses?
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Take the next step in protecting yourself with our comprehensive protection program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton 
                  name="Get Protection Guide" 
                  url="#" 
                  isPrimary={true}
                />
                <CTAButton 
                  name="Join Support Community" 
                  url="#" 
                  isPrimary={false}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultPage;
