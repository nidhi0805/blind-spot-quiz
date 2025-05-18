
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
      className={`px-6 py-3 font-medium transition-all transform hover:scale-105 duration-200 ${
        isPrimary 
          ? "bg-fia-accent hover:bg-fia-accent/90 shadow-md" 
          : "bg-white text-fia-accent border-fia-accent/20 hover:bg-fia-accent/5"
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
