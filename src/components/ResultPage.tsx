import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FIAHeader from './FIAHeader';
import InteractiveChart from './InteractiveChart';
import ResultsAnimation from './ResultsAnimation';
import RedFlagRadar from './RedFlagRadar';
import InsightRouting from './InsightRouting';

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  const [activeSection, setActiveSection] = useState<string | null>('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [radarInteractions, setRadarInteractions] = useState(0);
  const navigate = useNavigate();

  // Handle case where results don't exist
  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-fiaCharcoal mb-4">No Results Available</h2>
          <p className="text-gray-600 mb-6">Please take the assessment first to see your results.</p>
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

  // Get profile emoji - FIA victim type emojis
  const getProfileEmoji = (profileId: string) => {
    const emojiMap: {[key: string]: string} = {
      dreamer: "🎭", // The Player
      peacemaker: "🕵️‍♂️", // The Investigator  
      caregiver: "🤗", // The Caregiver
      rebel: "💣", // The Saboteur
      achiever: "🧛", // The Energy-Drainer
      explorer: "🗺️", // The Explorer
      traditionalist: "📚", // The Traditionalist
      intellectual: "🧠", // The Intellectual
      leader: "👑", // The Leader
      default: "🎭"
    };
    
    return emojiMap[profileId.toLowerCase()] || emojiMap.default;
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

  const handleChatWithEva = () => {
    navigate('/chat');
  };

  const handleCompleteAnimation = () => {
    setShowAnimation(false);
  };

  const handleRadarInteraction = (flagsExplored: number) => {
    setRadarInteractions(flagsExplored);
  };

  return (
    <div className="min-h-screen bg-white">
      <FIAHeader />
      
      {/* Results Animation Overlay */}
      <AnimatePresence>
        {showAnimation && (
          <ResultsAnimation onComplete={handleCompleteAnimation} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          
          {/* Primary Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-fiaPink/10 to-fiaBlue/10 border-fiaPink/20 p-8 text-center">
              <div className="text-7xl mb-6" role="img" aria-label={`${dominantProfile.name} emoji`}>
                {getProfileEmoji(dominantProfile.id)}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-fiaCharcoal mb-3 font-karla">
                Your Primary Pattern: {dominantProfile.name}
              </h2>
              <p className="text-xl text-fiaPink font-semibold mb-4">
                {dominantProfile.percentage}% match
              </p>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {dominantProfile.summary}
                </p>
              </div>
              
              {/* Chat with Eva CTA */}
              <div className="mt-8">
                <Button
                  onClick={handleChatWithEva}
                  className="fia-btn-secondary text-lg px-8 py-4"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat with our Chatbot - Your FIA Coach
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Get personalized guidance and support
                </p>
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
              <h3 className="text-2xl font-bold text-fiaCharcoal mb-6 font-karla text-center">
                Your Complete Pattern Breakdown
              </h3>
              <InteractiveChart 
                profiles={results} 
                dominantProfile={dominantProfile}
              />
            </Card>
          </motion.div>

          {/* Red Flag Radar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="p-8">
              <RedFlagRadar 
                profile={dominantProfile} 
                onInteraction={handleRadarInteraction}
              />
            </Card>
          </motion.div>

          {/* Insight Routing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="p-8">
              <InsightRouting 
                profile={dominantProfile}
                flagsExplored={radarInteractions}
              />
            </Card>
          </motion.div>

          {/* Detailed Analysis Sections */}
          <div className="space-y-4">
            
            {/* Manipulation Tactics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleSection('tactics')}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-6 w-6 text-red-500" aria-label="Warning" />
                      <div>
                        <h3 className="text-xl font-bold text-fiaCharcoal font-karla">
                          ⚠️ Tactics That Target You
                        </h3>
                        <p className="text-gray-600">Learn what predators look for in your pattern</p>
                      </div>
                    </div>
                    {activeSection === 'tactics' ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
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
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-6">
                          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {dominantProfile.manipulativeTactics}
                          </p>
                          <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-6">
                            <h4 className="font-bold text-red-800 mb-3 font-karla">🚨 Common Red Flags</h4>
                            <ul className="space-y-2 text-red-700">
                              <li>• Love bombing or excessive early attention</li>
                              <li>• Isolation from friends and family</li>
                              <li>• Gaslighting your perceptions</li>
                              <li>• Exploiting your helpful nature</li>
                              <li>• Creating artificial urgency or scarcity</li>
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
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleSection('defenses')}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Shield className="h-6 w-6 text-green-600" aria-label="Shield" />
                      <div>
                        <h3 className="text-xl font-bold text-fiaCharcoal font-karla">
                          🛡️ Your Protection Strategies
                        </h3>
                        <p className="text-gray-600">Personalized defense methods for your pattern</p>
                      </div>
                    </div>
                    {activeSection === 'defenses' ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
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
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-6">
                          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {dominantProfile.defenseStrategies}
                          </p>
                          <div className="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-6">
                            <h4 className="font-bold text-green-800 mb-3 font-karla">✨ Key Protection Strategies</h4>
                            <ul className="space-y-2 text-green-700">
                              <li>• Trust your gut feelings — they're your superpower</li>
                              <li>• Maintain strong support networks</li>
                              <li>• Set and enforce clear boundaries</li>
                              <li>• Take time before making big decisions</li>
                              <li>• Practice saying "no" without explanation</li>
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
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleSection('overview')}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <BookOpen className="h-6 w-6 text-fiaBlue" aria-label="Book" />
                      <div>
                        <h3 className="text-xl font-bold text-fiaCharcoal font-karla">
                          📊 Complete Pattern Analysis
                        </h3>
                        <p className="text-gray-600">All your vulnerability dimensions</p>
                      </div>
                    </div>
                    {activeSection === 'overview' ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
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
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-6 space-y-4">
                          {results.map((profile, index) => (
                            <div key={profile.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                              <div className="flex items-center space-x-4">
                                <span className="text-3xl" role="img" aria-label={`${profile.name} emoji`}>
                                  {getProfileEmoji(profile.id)}
                                </span>
                                <div>
                                  <h4 className="font-bold text-fiaCharcoal font-karla text-lg">{profile.name}</h4>
                                  <p className="text-gray-600">{profile.summary}</p>
                                </div>
                              </div>
                              <Badge 
                                variant={index === 0 ? "default" : "secondary"}
                                className={index === 0 ? "bg-fiaPink text-white text-lg py-1 px-3" : "text-lg py-1 px-3"}
                              >
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

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-fiaBlue/10 to-fiaPink/10 border-fiaBlue/20 p-8 text-center">
              <h3 className="text-3xl font-bold text-fiaCharcoal mb-4 font-karla">
                Ready to Build Stronger Defenses?
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Take the next step in protecting yourself with personalized coaching from Eva, 
                our AI coach trained in feminine intelligence principles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mobile-fix">
                <Button 
                  onClick={handleChatWithEva}
                  className="fia-btn-primary text-lg px-8 py-4"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Coaching Session
                </Button>
                <Button 
                  variant="outline"
                  className="fia-btn-secondary"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Results
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                🔒 Your data is secure and never shared with third parties
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-fiaPink text-white p-4 rounded-full shadow-lg hover:bg-fiaPink/90 transition-colors z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultPage;
