
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

interface CTAButtonProps {
  name: string;
  url: string;
  isPrimary?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ name, url, isPrimary = false }) => {
  return (
    <Button 
      variant={isPrimary ? "default" : "outline"}
      className={`px-6 py-4 font-medium text-base transition-all transform hover:scale-105 duration-200 group ${
        isPrimary 
          ? "bg-fia-charcoal hover:bg-fia-burgundy text-white shadow-md" 
          : "bg-white text-fia-charcoal border-2 border-fia-charcoal/20 hover:bg-fia-yellow/10"
      }`}
      asChild
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
        {name}
        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </Button>
  );
};

export default CTAButton;
