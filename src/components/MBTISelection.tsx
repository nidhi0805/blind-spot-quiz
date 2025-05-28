import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMBTIOptions, mapMBTIToVictimProfiles } from '../utils/mbtiMapping';
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { BlindSpotProfile } from '../types/quiz';

interface MBTISelectionProps {
  onBack: () => void;
}

const MBTISelection: React.FC<MBTISelectionProps> = ({ onBack }) => {
  const { setResults, setCurrentStep } = useQuiz();
  const [selectedMBTI, setSelectedMBTI] = useState('');
  
  const mbtiOptions = getMBTIOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMBTI) {
      return;
    }

    // Map MBTI to victim profiles
    const victimProfiles = mapMBTIToVictimProfiles(selectedMBTI);
    
    // Convert to the format expected by the results page
    const results = victimProfiles.map(profile => ({
      id: profile.id as BlindSpotProfile, // Cast to BlindSpotProfile type
      name: profile.name,
      percentage: profile.percentage,
      score: profile.percentage,
      summary: `Based on your ${selectedMBTI} personality type, you align with this victim pattern.`,
      manipulativeTactics: "Specific tactics will vary based on your personality type vulnerabilities.",
      defenseStrategies: "Your defense strategies are tailored to your personality type strengths.",
      tools: [
        {
          name: "Personality-Based Defense Guide",
          url: "#"
        },
        {
          name: "MBTI Protection Strategies",
          url: "#"
        }
      ]
    }));

    // Set the results and move to results page
    setResults(results);
    setCurrentStep('results');
  };

  return (
    <motion.div 
      className="h-screen flex flex-col bg-gradient-to-b from-fia-white to-fia-yellow/10 overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Progress indicator */}
      <div className="pt-4 pb-2 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2 md:space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-fia-charcoal text-white flex items-center justify-center text-sm font-medium">1</div>
            <span className="ml-2 text-sm font-medium">Info</span>
          </div>
          <div className="w-8 h-1 bg-fia-border"></div>
          <div className="flex items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center text-sm font-medium">2</div>
            <span className="ml-2 text-sm font-medium">Quiz</span>
          </div>
          <div className="w-8 h-1 bg-fia-border"></div>
          <div className="flex items-center opacity-50">
            <div className="w-8 h-8 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center text-sm font-medium">3</div>
            <span className="ml-2 text-sm font-medium">Results</span>
          </div>
        </div>
      </div>

      {/* Main form area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Select Your Personality Type
            </motion.h2>
            <motion.p 
              className="text-fia-textLight text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              We'll map your MBTI type to your most likely blind spot patterns
            </motion.p>
          </div>

          {/* Form content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <Card className="bg-white border-0 shadow-md">
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  {/* MBTI Selection */}
                  <div>
                    <Label htmlFor="mbti-type" className="text-lg font-medium text-fia-charcoal mb-4 block">
                      Your MBTI Personality Type <span className="text-fia-burgundy">*</span>
                    </Label>
                    <Select value={selectedMBTI} onValueChange={setSelectedMBTI} required>
                      <SelectTrigger id="mbti-type" className="h-12 text-base">
                        <SelectValue placeholder="Select your MBTI type" />
                      </SelectTrigger>
                      <SelectContent className="border border-fia-border max-h-60">
                        {mbtiOptions.map(option => (
                          <SelectItem key={option.value} value={option.value} className="text-sm">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Info note */}
                  <div className="text-sm text-fia-blue/90 bg-fia-blue/5 border border-fia-blue/10 rounded-md p-4">
                    <p className="mb-2">
                      <strong>Don't know your MBTI type?</strong> Take a free test at{" "}
                      <a 
                        href="https://www.16personalities.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-fia-blue underline hover:text-fia-burgundy"
                      >
                        16personalities.com
                      </a>
                    </p>
                    <p>
                      We'll use research-based mappings to identify your most likely blind spot patterns based on your personality type.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Button 
                      type="button"
                      onClick={onBack}
                      variant="outline"
                      className="px-6 py-2 rounded-lg font-medium group"
                    >
                      <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      disabled={!selectedMBTI}
                      className={`px-8 py-2 rounded-lg font-medium group ${
                        selectedMBTI ? 
                        'bg-fia-charcoal hover:bg-fia-charcoal/90 text-white' : 
                        'bg-fia-border/40 text-fia-charcoal/40 cursor-not-allowed'
                      }`}
                    >
                      Get My Results
                      <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MBTISelection;
