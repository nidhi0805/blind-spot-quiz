
import React from 'react';
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  name: string;
  url: string;
  isPrimary?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ name, url, isPrimary = false }) => {
  return (
    <Button 
      variant={isPrimary ? "default" : "outline"}
      className={`px-6 py-2 font-medium transition-colors ${
        isPrimary 
          ? "bg-primary hover:bg-primary/90" 
          : "bg-fia-blue text-fia-text hover:bg-fia-blue/90"
      }`}
      asChild
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </Button>
  );
};

export default CTAButton;
