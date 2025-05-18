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
import { ChevronRight, Lock, User, Puzzle } from "lucide-react";

const IntakeForm: React.FC = () => {
  const { setIntake, setCurrentStep } = useQuiz();

  const [email, setEmail] = useState('');
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
    
    // Save intake data
    setIntake({
      email,
      ageRange,
      genderIdentity,
      relationshipStatus,
      emotionalSafety,
      preTraits
    });
    
    // Move to quiz
    setCurrentStep('quiz');
  };

  return (
    <div className="min-h-screen bg-fia-yellow py-12">
      <div className="fia-container">
        <div className="fia-stepper mb-10">
          <div className="fia-stepper-item fia-stepper-item-active">
            <div className="w-10 h-10 rounded-full bg-fia-charcoal text-fia-white flex items-center justify-center mr-3 text-base font-bold">1</div>
            <span className="font-medium">Personal Info</span>
          </div>
          <div className="w-16 h-[2px] bg-fia-border mx-3"></div>
          <div className="fia-stepper-item">
            <div className="w-10 h-10 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center mr-3 text-base font-bold">2</div>
            <span className="font-medium">Quiz</span>
          </div>
          <div className="w-16 h-[2px] bg-fia-border mx-3"></div>
          <div className="fia-stepper-item">
            <div className="w-10 h-10 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center mr-3 text-base font-bold">3</div>
            <span className="font-medium">Results</span>
          </div>
        </div>
        
        <Card className="fia-card animate-fade-in shadow-xl border-0">
          <div className="mb-12">
            <h2 className="fia-heading mb-3 text-3xl">Before we begin</h2>
            <p className="text-fia-textLight text-lg">Please share a bit about yourself before taking the quiz.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="p-8 bg-fia-white rounded-xl border-2 border-fia-border shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-fia-yellow/30 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-fia-charcoal" />
                </div>
                <h3 className="text-xl font-bold">About You</h3>
              </div>
              
              {/* Email */}
              <div className="space-y-3 mb-8">
                <Label htmlFor="email" className="fia-label">
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
                  className={`fia-input ${emailError ? 'border-fia-burgundy ring-1 ring-fia-burgundy' : 'focus:border-fia-yellow'}`}
                  placeholder="your@email.com"
                  required
                />
                {emailError && <p className="text-sm text-fia-burgundy font-medium">{emailError}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Age Range */}
                <div className="space-y-3">
                  <Label htmlFor="age-range" className="fia-label">
                    Age Range <span className="text-fia-burgundy">*</span>
                  </Label>
                  <Select value={ageRange} onValueChange={setAgeRange} required>
                    <SelectTrigger id="age-range" className="fia-input">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-fia-border">
                      {ageRangeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Gender Identity */}
                <div className="space-y-3">
                  <Label htmlFor="gender-identity" className="fia-label">
                    Gender Identity <span className="text-fia-burgundy">*</span>
                  </Label>
                  <Select value={genderIdentity} onValueChange={setGenderIdentity} required>
                    <SelectTrigger id="gender-identity" className="fia-input">
                      <SelectValue placeholder="Select gender identity" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-fia-border">
                      {genderOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Relationship Status */}
              <div className="space-y-3 mt-8">
                <Label htmlFor="relationship-status" className="fia-label">
                  Relationship Status <span className="text-fia-burgundy">*</span>
                </Label>
                <Select value={relationshipStatus} onValueChange={setRelationshipStatus} required>
                  <SelectTrigger id="relationship-status" className="fia-input">
                    <SelectValue placeholder="Select relationship status" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-fia-border">
                    {relationshipOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Emotional Safety Section */}
            <div className="p-8 bg-fia-white rounded-xl border-2 border-fia-border shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-fia-blue/30 flex items-center justify-center mr-4">
                  <Lock className="w-6 h-6 text-fia-blue" />
                </div>
                <h3 className="text-xl font-bold">Emotional Safety</h3>
              </div>
              
              {/* Emotional Safety Slider */}
              <div className="space-y-6">
                <Label className="fia-label text-lg">
                  How emotionally safe do you feel in your closest relationships?
                </Label>
                <div className="space-y-8 px-4">
                  <div className="relative pt-10">
                    <Slider
                      value={[emotionalSafety]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={values => setEmotionalSafety(values[0])}
                      className="z-10"
                    />
                    <div 
                      className="absolute top-0 left-0 bg-fia-charcoal text-fia-white px-4 py-2 rounded-md transform -translate-x-1/2 transition-all" 
                      style={{ left: `${emotionalSafety * 10}%` }}
                    >
                      {emotionalSafety}
                    </div>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-6">
                    <span>Not at all safe</span>
                    <span>Extremely safe</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pre-traits Section */}
            <div className="p-8 bg-fia-white rounded-xl border-2 border-fia-border shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-fia-teal/30 flex items-center justify-center mr-4">
                  <Puzzle className="w-6 h-6 text-fia-teal" />
                </div>
                <h3 className="text-xl font-bold">Behavioral Patterns</h3>
              </div>
              
              {/* Pre-traits Checkboxes */}
              <div className="space-y-5">
                <Label className="fia-label text-lg">Do any of these apply to you? (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {preTraitsOptions.map(option => (
                    <div key={option.value} className="flex items-start space-x-3 p-5 border-2 border-fia-border rounded-lg bg-white hover:bg-fia-teal/5 transition-colors">
                      <Checkbox
                        id={option.value}
                        checked={preTraits.includes(option.value)}
                        onCheckedChange={() => handlePreTraitChange(option.value)}
                        className="mt-1 border-fia-charcoal/60"
                      />
                      <Label 
                        htmlFor={option.value}
                        className="cursor-pointer text-base leading-snug"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Consent Message */}
            <div className="rounded-lg bg-fia-blue/10 border-2 border-fia-blue/20 p-6 text-base leading-relaxed">
              <p className="font-medium text-fia-blue">
                This is not therapy or diagnosis. It's a mirror — built to help you reflect 
                on how you show up when things get complicated. Everything you share is 
                private and never sold.
              </p>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="fia-cta-button w-full group"
            >
              Begin the Quiz
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default IntakeForm;
