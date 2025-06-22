
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GenderIdentitySelectProps {
  value: string;
  onChange: (value: string) => void;
  isRequired?: boolean;
}

const GenderIdentitySelect: React.FC<GenderIdentitySelectProps> = ({ 
  value, 
  onChange, 
  isRequired = false 
}) => {
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(value === 'custom');

  const handleGenderChange = (selectedValue: string) => {
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
      onChange('');
    } else {
      setShowCustomInput(false);
      setCustomValue('');
      onChange(selectedValue);
    }
  };

  const handleCustomInputChange = (inputValue: string) => {
    setCustomValue(inputValue);
    onChange(inputValue);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Label htmlFor="gender-identity" className="text-sm font-semibold text-fiaCharcoal">
          Gender Identity {isRequired && <span className="text-fiaPink">*</span>}
        </Label>
        {!isRequired && (
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
        )}
      </div>
      
      <Select value={showCustomInput ? 'custom' : value} onValueChange={handleGenderChange}>
        <SelectTrigger id="gender-identity" className="h-12 border-gray-300 focus:border-fiaPink">
          <SelectValue placeholder="Select gender identity" />
        </SelectTrigger>
        <SelectContent className="border border-gray-200">
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="non-binary">Non-binary</SelectItem>
          <SelectItem value="agender">Agender</SelectItem>
          <SelectItem value="custom">Prefer to self-describe</SelectItem>
        </SelectContent>
      </Select>
      
      {showCustomInput && (
        <div className="animate-fia-fade-in">
          <Input
            type="text"
            placeholder="Please describe your gender identity"
            value={customValue}
            onChange={(e) => handleCustomInputChange(e.target.value)}
            className="h-12 border-gray-300 focus:border-fiaPink"
          />
        </div>
      )}
    </div>
  );
};

export default GenderIdentitySelect;
