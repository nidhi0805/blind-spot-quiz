
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import CTAButton from './CTAButton';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDominantProfiles } from '../utils/resultProfiles';
import { Lock, Puzzle, Flag } from 'lucide-react';

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

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  
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
  
  return (
    <div className="min-h-screen bg-fia-white">
      <div className="fia-container py-12">
        <div className="fia-stepper mb-8">
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
        </div>
      
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-center animate-slide-up">Your Blind Spot Analysis</h2>
        <p className="text-fia-textLight text-xl text-center mb-16 animate-slide-up max-w-3xl mx-auto">
          Based on your responses, we've identified your primary relational patterns.
        </p>
        
        {/* Dominant Profile */}
        <div className="mb-16 animate-slide-up">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8">Your Primary Blind Spot Pattern</h3>
          
          {dominantProfiles.map(profile => (
            <div 
              key={profile.id} 
              className={`rounded-2xl overflow-hidden mb-16 shadow-xl ${getBgColor(profile.id)}`}
            >
              <div className="p-12 flex flex-col items-center text-white">
                <div className={`w-20 h-20 rounded-full bg-white/20 mb-6 flex items-center justify-center`}>
                  {getProfileIcon(profile.id)}
                </div>
                <h4 className="text-3xl font-bold mb-3">{profile.name}</h4>
                <div className="px-6 py-2 rounded-full bg-white/20 text-white text-lg font-bold">
                  {profile.percentage}%
                </div>
              </div>
              
              <Card className="fia-result-card border-0 rounded-none p-0">
                <div className="p-10 bg-white">
                  <div className="mb-10 p-8 border-2 border-fia-border rounded-lg bg-fia-white shadow-md">
                    <h5 className="text-xl font-bold mb-4">Summary</h5>
                    <p className="text-fia-charcoal leading-relaxed text-lg">{profile.summary}</p>
                  </div>
                  
                  <div className="mb-10 p-8 border-2 border-fia-border rounded-lg bg-fia-white shadow-md">
                    <h5 className="text-xl font-bold mb-4">Manipulative Tactics to Watch Out For</h5>
                    <p className="text-fia-charcoal leading-relaxed text-lg">{profile.manipulativeTactics}</p>
                  </div>
                  
                  <div className="mb-10 p-8 border-2 border-fia-border rounded-lg bg-fia-white shadow-md">
                    <h5 className="text-xl font-bold mb-4">How to Defend Yourself</h5>
                    <p className="text-fia-charcoal leading-relaxed text-lg">{profile.defenseStrategies}</p>
                  </div>
                  
                  <h6 className="text-2xl font-bold mb-6 mt-12">Recommended Tools</h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {profile.tools.map((tool) => (
                      <div key={tool.name} className="p-8 border-2 border-fia-border rounded-lg bg-white hover:shadow-lg transition-all">
                        <h6 className="font-bold text-xl mb-3">{tool.name}</h6>
                        <p className="text-fia-textLight mb-6">Build resources to strengthen your relational skills</p>
                        <CTAButton 
                          name={`Try ${tool.name}`} 
                          url={tool.url} 
                          isPrimary={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Profile Breakdown */}
        <div className="mb-16 animate-slide-up max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8">Your Blind Spot Profile Breakdown</h3>
          <Card className="p-10 bg-white rounded-xl border-2 border-fia-border shadow-xl">
            <div className="space-y-8">
              {top5Profiles.map(profile => (
                <div key={profile.id} className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-xl">{profile.name}</span>
                    <span className="font-bold text-xl">{profile.percentage}%</span>
                  </div>
                  <div className="h-12 rounded-lg overflow-hidden relative mb-5 bg-fia-border/30">
                    <div 
                      className={`h-full ${getBgColor(profile.id)}`} 
                      style={{ 
                        width: `${profile.percentage}%`,
                        transition: 'width 1s ease-out' 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Start Over Button */}
        <div className="text-center pt-8">
          <button 
            onClick={() => setCurrentStep('landing')}
            className="fia-btn-secondary text-lg px-10 py-4"
          >
            Take the Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
