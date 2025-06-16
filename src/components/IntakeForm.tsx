
import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { 
  ageRangeOptions, 
  genderOptions, 
  relationshipOptions, 
  preTraitsOptions 
} from '../utils/quizData';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronRight, User } from "lucide-react";
import { motion } from "framer-motion";
import MBTISelection from './MBTISelection';

const IntakeForm: React.FC = () => {
  const { setIntake, setCurrentStep } = useQuiz();
  const [showMBTIFlow, setShowMBTIFlow] = useState(false);

  const [email, setEmail] = useState('');
  const [hasTakenQuiz, setHasTakenQuiz] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [genderIdentity, setGenderIdentity] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [emotionalSafety, setEmotionalSafety] = useState(5);
  const [preTraits, setPreTraits] = useState<string[]>([]);
  const [emailError, setEmailError] = useState('');
  
  // Email validation
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePreTraitChange = (trait: string) => {
    setPreTraits(prev => 
      prev.includes(trait) 
        ? prev.filter(t => t !== trait) 
        : [...prev, trait]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Validate required fields
    if (!ageRange || !genderIdentity || !relationshipStatus) {
      toast.error("Please complete all required fields");
      return;
    }
    
    if (hasTakenQuiz === 'yes') {
      // Simulate quiz results or fetch from storage
      setCurrentStep('results');
      return;
    }
    
    // Save intake data
    setIntake({
      email,
      ageRange,
      genderIdentity,
      relationshipStatus,
      emotionalSafety,
      preTraits
    });
    
    // Move to quiz - THIS IS THE FIX: Explicitly set to 'quiz' step
    setCurrentStep('quiz');
  };

  const handleMBTIClick = () => {
    setShowMBTIFlow(true);
  };

  const handleBackFromMBTI = () => {
    setShowMBTIFlow(false);
  };

  // Show MBTI selection if that flow is active
  if (showMBTIFlow) {
    return <MBTISelection onBack={handleBackFromMBTI} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
      <div className="flex-1 flex flex-col justify-evenly px-4 py-2 overflow-hidden">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 leading-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Before we begin
            </motion.h2>
            <motion.p 
              className="text-slate-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Please share a bit about yourself before taking the quiz
            </motion.p>
          </div>

          {/* Form content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="p-5">
                {/* Two column grid for form inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-fia-charcoal">
                        Email <span className="text-fia-burgundy">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        className={`h-10 ${emailError ? 'border-fia-burgundy ring-1 ring-fia-burgundy' : 'focus:border-fia-yellow'}`}
                        placeholder="your@email.com"
                        required
                      />
                      {emailError && <p className="text-xs text-fia-burgundy mt-1">{emailError}</p>}
                    </div>

                    {/* Age Range */}
                    <div>
                      <Label htmlFor="age-range" className="text-sm font-medium text-fia-charcoal">
                        Age Range <span className="text-fia-burgundy">*</span>
                      </Label>
                      <Select value={ageRange} onValueChange={setAgeRange} required>
                        <SelectTrigger id="age-range" className="h-10">
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent className="border border-fia-border">
                          {ageRangeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Gender Identity */}
                    <div>
                      <Label htmlFor="gender-identity" className="text-sm font-medium text-fia-charcoal">
                        Gender Identity <span className="text-fia-burgundy">*</span>
                      </Label>
                      <Select value={genderIdentity} onValueChange={setGenderIdentity} required>
                        <SelectTrigger id="gender-identity" className="h-10">
                          <SelectValue placeholder="Select gender identity" />
                        </SelectTrigger>
                        <SelectContent className="border border-fia-border">
                          {genderOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Relationship Status */}
                    <div>
                      <Label htmlFor="relationship-status" className="text-sm font-medium text-fia-charcoal">
                        Relationship Status <span className="text-fia-burgundy">*</span>
                      </Label>
                      <Select value={relationshipStatus} onValueChange={setRelationshipStatus} required>
                        <SelectTrigger id="relationship-status" className="h-10">
                          <SelectValue placeholder="Select relationship status" />
                        </SelectTrigger>
                        <SelectContent className="border border-fia-border">
                          {relationshipOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Previous Quiz */}
                    <div>
                      <Label htmlFor="taken-quiz" className="text-sm font-medium text-fia-charcoal">
                        Have you taken a personality quiz before?
                      </Label>
                      <Select value={hasTakenQuiz} onValueChange={setHasTakenQuiz}>
                        <SelectTrigger id="taken-quiz" className="h-10">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="border border-fia-border">
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Emotional Safety Slider */}
                    <div>
                      <Label className="text-sm font-medium text-fia-charcoal mb-2 block">
                        How emotionally safe do you feel in close relationships?
                      </Label>
                      <div className="px-1">
                        <Slider
                          value={[emotionalSafety]}
                          min={0}
                          max={10}
                          step={1}
                          onValueChange={values => setEmotionalSafety(values[0])}
                          className="my-4"
                        />
                        <div className="flex justify-between text-xs text-fia-textLight">
                          <span>Not at all safe</span>
                          <span className="font-medium">{emotionalSafety}</span>
                          <span>Extremely safe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            
                {/* Consent message - simplified */}
                <div className="mt-3 text-xs text-fia-blue/90 bg-fia-blue/5 border border-fia-blue/10 rounded-md p-2">
                  This is not therapy or diagnosis — it's a mirror to help you reflect on how you show up in complex relationships.
                </div>

                {/* Submit Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold group shadow-lg"
                  >
                    Begin the Quiz
                    <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleMBTIClick}
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-2 rounded-full font-semibold group"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Already know your personality type?
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntakeForm;
