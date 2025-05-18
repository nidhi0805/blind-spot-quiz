
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
    <div className="min-h-screen bg-fia-background py-12">
      <div className="fia-container">
        <div className="fia-stepper mb-8">
          <div className="fia-stepper-item fia-stepper-item-active">
            <div className="w-8 h-8 rounded-full bg-fia-accent text-white flex items-center justify-center mr-2 text-sm">1</div>
            <span>Personal Info</span>
          </div>
          <div className="w-12 h-[2px] bg-fia-border mx-2"></div>
          <div className="fia-stepper-item">
            <div className="w-8 h-8 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center mr-2 text-sm">2</div>
            <span>Quiz</span>
          </div>
          <div className="w-12 h-[2px] bg-fia-border mx-2"></div>
          <div className="fia-stepper-item">
            <div className="w-8 h-8 rounded-full bg-fia-border text-fia-textLight flex items-center justify-center mr-2 text-sm">3</div>
            <span>Results</span>
          </div>
        </div>
        
        <Card className="fia-card animate-fade-in">
          <div className="mb-8">
            <h2 className="fia-heading mb-3">Before we begin</h2>
            <p className="text-fia-textLight">Please share a bit about yourself before taking the quiz.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-6 bg-fia-background rounded-lg border border-fia-border">
              <h3 className="text-lg font-dmserif mb-4">About You</h3>
              
              {/* Email */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="email" className="fia-label">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  className={`fia-input ${emailError ? 'border-red-500 ring-1 ring-red-500' : 'focus:border-fia-accent'}`}
                  placeholder="your@email.com"
                  required
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Range */}
                <div className="space-y-3">
                  <Label htmlFor="age-range" className="fia-label">
                    Age Range <span className="text-red-500">*</span>
                  </Label>
                  <Select value={ageRange} onValueChange={setAgeRange} required>
                    <SelectTrigger id="age-range" className="fia-input">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
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
                    Gender Identity <span className="text-red-500">*</span>
                  </Label>
                  <Select value={genderIdentity} onValueChange={setGenderIdentity} required>
                    <SelectTrigger id="gender-identity" className="fia-input">
                      <SelectValue placeholder="Select gender identity" />
                    </SelectTrigger>
                    <SelectContent>
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
              <div className="space-y-3 mt-6">
                <Label htmlFor="relationship-status" className="fia-label">
                  Relationship Status <span className="text-red-500">*</span>
                </Label>
                <Select value={relationshipStatus} onValueChange={setRelationshipStatus} required>
                  <SelectTrigger id="relationship-status" className="fia-input">
                    <SelectValue placeholder="Select relationship status" />
                  </SelectTrigger>
                  <SelectContent>
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
            <div className="p-6 bg-fia-background rounded-lg border border-fia-border">
              <h3 className="text-lg font-dmserif mb-4">Emotional Safety</h3>
              
              {/* Emotional Safety Slider */}
              <div className="space-y-4">
                <Label className="fia-label">
                  How emotionally safe do you feel in your closest relationships?
                </Label>
                <div className="space-y-6 px-4">
                  <div className="relative pt-6">
                    <Slider
                      value={[emotionalSafety]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={values => setEmotionalSafety(values[0])}
                      className="z-10"
                    />
                    <div 
                      className="absolute top-0 left-0 bg-fia-accent text-white px-3 py-1 rounded-md transform -translate-x-1/2 transition-all" 
                      style={{ left: `${emotionalSafety * 10}%` }}
                    >
                      {emotionalSafety}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-fia-textLight">
                    <span>Not at all safe</span>
                    <span>Extremely safe</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pre-traits Section */}
            <div className="p-6 bg-fia-background rounded-lg border border-fia-border">
              <h3 className="text-lg font-dmserif mb-4">Behavioral Patterns</h3>
              
              {/* Pre-traits Checkboxes */}
              <div className="space-y-3">
                <Label className="fia-label">Do any of these apply to you? (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {preTraitsOptions.map(option => (
                    <div key={option.value} className="flex items-start space-x-3 p-4 border border-fia-border rounded-lg bg-white hover:bg-fia-background/60 transition-colors">
                      <Checkbox
                        id={option.value}
                        checked={preTraits.includes(option.value)}
                        onCheckedChange={() => handlePreTraitChange(option.value)}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={option.value}
                        className="cursor-pointer text-base font-normal leading-snug"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Consent Message */}
            <div className="rounded-lg bg-fia-background border border-fia-border p-5 text-sm leading-relaxed">
              <p>
                This is not therapy or diagnosis. It's a mirror — built to help you reflect 
                on how you show up when things get complicated. Everything you share is 
                private and never sold.
              </p>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="fia-btn-primary w-full"
            >
              Begin the Quiz
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default IntakeForm;
