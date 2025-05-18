
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import CTAButton from './CTAButton';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDominantProfiles } from '../utils/resultProfiles';

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

// Placeholder profile illustrations
const getProfileIllustration = (profileId: string): string => {
  return '/placeholder.svg';
};

const ResultPage: React.FC = () => {
  const { results, setCurrentStep } = useQuiz();
  
  if (!results) {
    return (
      <div className="fia-container py-12 text-center">
        <h2 className="fia-heading mb-4">Results not available</h2>
        <p className="mb-6">Sorry, we couldn't retrieve your quiz results.</p>
        <button 
          onClick={() => setCurrentStep('landing')} 
          className="fia-btn-primary"
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
    <div className="min-h-screen bg-fia-background py-12">
      <div className="fia-container">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-2 text-center animate-slide-up">Your Blind Spot Analysis</h2>
        <p className="text-fia-textLight text-center mb-12 animate-slide-up">
          Based on your responses, we've identified your primary relational patterns.
        </p>
        
        {/* Dominant Profile */}
        <div className="mb-12 animate-slide-up">
          <h3 className="text-2xl font-semibold mb-6">Your Primary Blind Spot Pattern</h3>
          
          {dominantProfiles.map(profile => (
            <Card key={profile.id} className="fia-card mb-12 overflow-hidden">
              <div className="flex flex-col items-center mb-8">
                <div className={`w-16 h-16 rounded-full ${getProfileColor(profile.id)} mb-4 flex items-center justify-center`}>
                  <img src={getProfileIllustration(profile.id)} alt="" className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-semibold mb-2">{profile.name}</h4>
                <div className="px-3 py-1 rounded-full bg-fia-accent/10 text-fia-accent text-sm font-medium">
                  {profile.percentage}%
                </div>
              </div>
              
              <div className="mb-8 p-6 border border-fia-border rounded-lg bg-fia-background">
                <h5 className="text-lg font-semibold mb-3">Summary</h5>
                <p className="text-fia-text leading-relaxed">{profile.summary}</p>
              </div>
              
              <div className="mb-8 p-6 border border-fia-border rounded-lg bg-fia-background">
                <h5 className="text-lg font-semibold mb-3">Manipulative Tactics to Watch Out For</h5>
                <p className="text-fia-text leading-relaxed">{profile.manipulativeTactics}</p>
              </div>
              
              <div className="mb-8 p-6 border border-fia-border rounded-lg bg-fia-background">
                <h5 className="text-lg font-semibold mb-3">How to Defend Yourself</h5>
                <p className="text-fia-text leading-relaxed">{profile.defenseStrategies}</p>
              </div>
              
              <h6 className="text-lg font-semibold mb-4 mt-8">Recommended Tools</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.tools.map((tool) => (
                  <div key={tool.name} className="p-6 border border-fia-border rounded-lg bg-white">
                    <h6 className="font-semibold mb-2">{tool.name}</h6>
                    <p className="text-fia-textLight text-sm mb-4">Build resources to strengthen your relational skills</p>
                    <CTAButton 
                      name={`Try ${tool.name}`} 
                      url={tool.url} 
                      isPrimary={true}
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Profile Breakdown */}
        <div className="mb-12 animate-slide-up">
          <h3 className="text-2xl font-semibold mb-6">Your Blind Spot Profile Breakdown</h3>
          <Card className="fia-card">
            <div className="space-y-6">
              {top5Profiles.map(profile => (
                <div key={profile.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{profile.name}</span>
                    <span className="font-medium">{profile.percentage}%</span>
                  </div>
                  <div className="h-10 rounded-lg overflow-hidden relative mb-5 bg-fia-border/30">
                    <div 
                      className={`h-full ${getProfileColor(profile.id)}`} 
                      style={{ width: `${profile.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Start Over Button */}
        <div className="text-center pt-4">
          <button 
            onClick={() => setCurrentStep('landing')}
            className="fia-btn-secondary"
          >
            Take the Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
