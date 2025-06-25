
import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { 
  ageRangeOptions, 
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
import { ChevronRight, User, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FIAHeader from './FIAHeader';
import GenderIdentitySelect from './GenderIdentitySelect';
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
    if (!email) return true; // Optional field
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
    
    // Validate email only if provided
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    if (hasTakenQuiz === 'yes') {
      setCurrentStep('results');
      return;
    }
    
    // Save intake data (all fields are now optional)
    setIntake({
      email: email || undefined,
      ageRange: ageRange || undefined,
      genderIdentity: genderIdentity || undefined,
      relationshipStatus: relationshipStatus || undefined,
      emotionalSafety,
      preTraits
    });
    
    setCurrentStep('quiz');
  };

  const handleMBTIClick = () => {
    setShowMBTIFlow(true);
  };

  const handleBackFromMBTI = () => {
    setShowMBTIFlow(false);
  };

  if (showMBTIFlow) {
    return <MBTISelection onBack={handleBackFromMBTI} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FIAHeader />

      {/* Progress indicator */}
      <div className="pt-6 pb-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-fiaPink text-white flex items-center justify-center font-semibold">1</div>
            <span className="ml-3 font-semibold text-fiaCharcoal">Information</span>
          </div>
          <div className="w-12 h-1 bg-gray-200 rounded"></div>
          <div className="flex items-center opacity-50">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">2</div>
            <span className="ml-3 font-semibold text-gray-500">Assessment</span>
          </div>
          <div className="w-12 h-1 bg-gray-200 rounded"></div>
          <div className="flex items-center opacity-50">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">3</div>
            <span className="ml-3 font-semibold text-gray-500">Results</span>
          </div>
        </div>
      </div>

      {/* Main form area */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2 
              className="fia-heading"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Let's sharpen your social discernment
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Share a bit about yourself to get personalized insights. You've got this!
            </motion.p>
          </div>

          {/* Form content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="fia-card mobile-fix">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Email */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Label htmlFor="email" className="font-semibold text-fiaCharcoal">
                          Email
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" aria-label="Data usage information" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                We use this data only for aggregate insights and never sell your information.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        className={`h-12 border-gray-300 focus:border-fiaPink ${emailError ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                      />
                      {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                    </div>

                    {/* Age Range */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Label htmlFor="age-range" className="font-semibold text-fiaCharcoal">
                          Age Range
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" aria-label="Data usage information" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                We use this data only for aggregate insights and never sell your information.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select value={ageRange} onValueChange={setAgeRange}>
                        <SelectTrigger id="age-range" className="h-12 border-gray-300 focus:border-fiaPink">
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-200">
                          {ageRangeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Gender Identity */}
                    <GenderIdentitySelect 
                      value={genderIdentity}
                      onChange={setGenderIdentity}
                      isRequired={false}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Relationship Status */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Label htmlFor="relationship-status" className="font-semibold text-fiaCharcoal">
                          Relationship Status
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" aria-label="Data usage information" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                We use this data only for aggregate insights and never sell your information.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select value={relationshipStatus} onValueChange={setRelationshipStatus}>
                        <SelectTrigger id="relationship-status" className="h-12 border-gray-300 focus:border-fiaPink">
                          <SelectValue placeholder="Select relationship status" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-200">
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
                      <Label htmlFor="taken-quiz" className="font-semibold text-fiaCharcoal mb-2 block">
                        Have you taken a personality assessment before?
                      </Label>
                      <Select value={hasTakenQuiz} onValueChange={setHasTakenQuiz}>
                        <SelectTrigger id="taken-quiz" className="h-12 border-gray-300 focus:border-fiaPink">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-200">
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Emotional Safety Slider */}
                    <div>
                      <Label className="font-semibold text-fiaCharcoal mb-3 block">
                        How emotionally safe do you feel in close relationships?
                      </Label>
                      <div className="px-2">
                        <Slider
                          value={[emotionalSafety]}
                          min={0}
                          max={10}
                          step={1}
                          onValueChange={values => setEmotionalSafety(values[0])}
                          className="my-4"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Not at all safe</span>
                          <span className="font-semibold text-fiaPink">{emotionalSafety}</span>
                          <span>Extremely safe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consent message */}
                <div className="mt-6 text-sm text-fiaBlue/90 bg-fiaBlue/5 border border-fiaBlue/10 rounded-lg p-4">
                  This assessment is designed to help you understand your relationship patterns and build stronger boundaries. 
                  It's not therapy or diagnosis — it's a tool for empowerment and self-awareness.
                </div>

                {/* Submit Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 mobile-fix">
                  <Button 
                    type="submit" 
                    className="fia-btn-primary group"
                  >
                    Begin Assessment
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleMBTIClick}
                    className="fia-btn-secondary group"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Already know your type?
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
