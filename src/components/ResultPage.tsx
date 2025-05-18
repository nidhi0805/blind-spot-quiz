
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import CTAButton from './CTAButton';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDominantProfiles } from '../utils/resultProfiles';

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
  
  return (
    <div className="fia-container py-8">
      <h2 className="fia-heading mb-2 text-center">Your Blind Spot Analysis</h2>
      <p className="text-fia-textLight text-center mb-8">
        Based on your responses, we've identified your primary relational patterns.
      </p>
      
      {/* Dominant Profile */}
      <div className="mb-12">
        <h3 className="fia-subheading mb-6">Your Primary Blind Spot Pattern</h3>
        
        {dominantProfiles.map(profile => (
          <Card key={profile.id} className="fia-result-card mb-8">
            <h4 className="text-xl font-medium mb-2">{profile.name}</h4>
            <p className="text-fia-textLight mb-6">{profile.summary}</p>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h5 className="font-medium mb-3">Manipulative Tactics to Watch Out For</h5>
              <p>{profile.manipulativeTactics}</p>
            </div>
            
            <div className="mb-6">
              <h5 className="font-medium mb-3">How to Defend Yourself</h5>
              <p>{profile.defenseStrategies}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {profile.tools.map((tool, index) => (
                <CTAButton 
                  key={tool.name}
                  name={tool.name}
                  url={tool.url}
                  isPrimary={index === 0}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
      
      {/* Full Profile Breakdown */}
      <div className="mb-8">
        <h3 className="fia-subheading mb-6">Your Complete Profile Breakdown</h3>
        <Card className="fia-card">
          <div className="space-y-4">
            {sortedProfiles.map(profile => (
              <div key={profile.id} className="space-y-2">
                <div className="flex justify-between">
                  <span>{profile.name}</span>
                  <span className="font-medium">{profile.percentage}%</span>
                </div>
                <Progress value={profile.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Start Over Button */}
      <div className="text-center">
        <button 
          onClick={() => setCurrentStep('landing')}
          className="fia-btn-secondary"
        >
          Take the Quiz Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
