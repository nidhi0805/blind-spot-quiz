
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './flipCard.css';

interface FlipCardProps {
  frontContent: {
    name: string;
    quote: string;
    description: string;
    emoji: string;
  };
  imageSrc?: string;
  traits?: string[];
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, imageSrc = "/placeholder.svg", traits = [] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card-container w-full h-full min-h-[300px] perspective-1000">
      <div 
        className={`relative w-full h-full transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 p-5 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-md backface-hidden
            ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-fia-yellow/20 flex items-center justify-center mr-3">
              <span className="text-xl">{frontContent.emoji}</span>
            </div>
            <h6 className="text-xl font-bold">{frontContent.name}</h6>
          </div>
          
          <p className="text-fia-charcoal/80 italic mb-4">"{frontContent.quote}"</p>
          <p className="text-fia-charcoal leading-relaxed mb-6">{frontContent.description}</p>
          
          <div className="flex justify-center">
            <button 
              onClick={flipCard}
              className="rounded-full bg-black text-white px-5 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              Reveal Their Mask
              <span className="text-fia-yellow">🎭</span>
            </button>
          </div>
        </div>
        
        {/* Back */}
        <div 
          className={`absolute inset-0 rounded-xl overflow-hidden shadow-md backface-hidden rotate-y-180
            ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="relative w-full h-full">
            <img 
              src={imageSrc} 
              alt={frontContent.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-end">
                <h6 className="text-white font-bold text-lg">{frontContent.name}</h6>
                <button 
                  onClick={flipCard}
                  className="text-white/90 hover:text-white text-sm flex items-center gap-1"
                >
                  Back <span>&larr;</span>
                </button>
              </div>
            </div>
            
            {traits.length > 0 && (
              <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
                <ul className="space-y-1">
                  {traits.map((trait, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-red-400">✖</span> {trait}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
