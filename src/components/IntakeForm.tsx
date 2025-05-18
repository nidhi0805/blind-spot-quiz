
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
    <div className="fia-container py-8">
      <Card className="fia-card">
        <div className="mb-8">
          <h2 className="fia-heading mb-2">Before we begin</h2>
          <p className="text-fia-textLight">Please share a bit about yourself before taking the quiz.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
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
              className={`fia-input ${emailError ? 'border-red-500' : ''}`}
              placeholder="your@email.com"
              required
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>
          
          {/* Age Range */}
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          
          {/* Relationship Status */}
          <div className="space-y-2">
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
          
          {/* Emotional Safety Slider */}
          <div className="space-y-4">
            <Label className="fia-label">
              How emotionally safe do you feel in your closest relationships?
            </Label>
            <div className="space-y-6">
              <Slider
                value={[emotionalSafety]}
                min={0}
                max={10}
                step={1}
                onValueChange={values => setEmotionalSafety(values[0])}
              />
              <div className="flex justify-between text-sm text-fia-textLight">
                <span>0 - Not at all safe</span>
                <span>10 - Extremely safe</span>
              </div>
              <div className="text-center font-medium">
                Current: {emotionalSafety}
              </div>
            </div>
          </div>
          
          {/* Pre-traits Checkboxes */}
          <div className="space-y-3">
            <Label className="fia-label">Do any of these apply to you? (Optional)</Label>
            <div className="space-y-3">
              {preTraitsOptions.map(option => (
                <div key={option.value} className="flex items-start space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={preTraits.includes(option.value)}
                    onCheckedChange={() => handlePreTraitChange(option.value)}
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
          
          {/* Consent Message */}
          <div className="rounded-md bg-fia-gray p-4 text-sm leading-relaxed">
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
  );
};

export default IntakeForm;
