
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileResult } from '../types/quiz';

interface RedFlag {
  id: string;
  angle: number;
  radius: number;
  message: string;
  delay: number;
}

interface RedFlagRadarProps {
  profile: ProfileResult;
  onInteraction?: (flagsExplored: number) => void;
}

const RedFlagRadar: React.FC<RedFlagRadarProps> = ({ profile, onInteraction }) => {
  const [activeFlag, setActiveFlag] = useState<string | null>(null);
  const [exploredFlags, setExploredFlags] = useState<Set<string>>(new Set());

  // Red flags based on profile type
  const getRedFlags = (profileId: string): RedFlag[] => {
    const flagsMap: { [key: string]: RedFlag[] } = {
      dreamer: [
        { id: 'idealization', angle: 45, radius: 80, message: "Watch out for love-bombing that matches your romantic ideals.", delay: 0.2 },
        { id: 'future-faking', angle: 135, radius: 90, message: "Be cautious when promises about the future override present inconsistencies.", delay: 0.4 },
        { id: 'emotional-manipulation', angle: 225, radius: 85, message: "Notice when your empathy is weaponized against your boundaries.", delay: 0.6 },
        { id: 'reality-dismissal', angle: 315, radius: 95, message: "Trust your gut when someone dismisses your concerns as 'overthinking'.", delay: 0.8 }
      ],
      caregiver: [
        { id: 'manufactured-crisis', angle: 30, radius: 85, message: "Be alert to manufactured crises that only you can solve.", delay: 0.2 },
        { id: 'guilt-framing', angle: 120, radius: 90, message: "Watch out for guilt-framing disguised as concern.", delay: 0.4 },
        { id: 'responsibility-shifting', angle: 210, radius: 80, message: "Notice when their emotional regulation becomes your responsibility.", delay: 0.6 },
        { id: 'exhaustion-tactics', angle: 300, radius: 95, message: "Recognize when helping requests are designed to exhaust you.", delay: 0.8 }
      ],
      leader: [
        { id: 'authority-challenge', angle: 60, radius: 85, message: "Be cautious of unnecessary power struggles designed to drain your energy.", delay: 0.2 },
        { id: 'flattery-bypass', angle: 150, radius: 90, message: "Watch when flattery is used to bypass your critical thinking.", delay: 0.4 },
        { id: 'weakness-shaming', angle: 240, radius: 80, message: "Notice when showing vulnerability is met with judgment or dismissal.", delay: 0.6 },
        { id: 'isolation-tactics', angle: 330, radius: 95, message: "Be alert to attempts to isolate you from your support network.", delay: 0.8 }
      ],
      // Default flags for other types
      default: [
        { id: 'gut-override', angle: 45, radius: 85, message: "When someone's charm overrides your gut, pause.", delay: 0.2 },
        { id: 'apology-pattern', angle: 135, radius: 90, message: "Be cautious if you're always the one apologizing.", delay: 0.4 },
        { id: 'boundary-testing', angle: 225, radius: 80, message: "Notice when your 'no' is consistently challenged or ignored.", delay: 0.6 },
        { id: 'isolation-signs', angle: 315, radius: 95, message: "Watch for subtle attempts to separate you from friends and family.", delay: 0.8 }
      ]
    };

    return flagsMap[profileId] || flagsMap.default;
  };

  const redFlags = getRedFlags(profile.id);

  const handleFlagClick = (flagId: string) => {
    const newExplored = new Set(exploredFlags);
    newExplored.add(flagId);
    setExploredFlags(newExplored);
    setActiveFlag(flagId);
    
    if (onInteraction) {
      onInteraction(newExplored.size);
    }
  };

  const handleFlagHover = (flagId: string | null) => {
    setActiveFlag(flagId);
  };

  return (
    <div className="relative">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-fiaCharcoal mb-2 font-karla">
          🧭 Red Flag Radar
        </h3>
        <p className="text-gray-600">
          Tap each blip to reveal key warning signs for your pattern
        </p>
      </div>

      <div className="relative w-80 h-80 mx-auto">
        {/* Radar rings */}
        <div className="absolute inset-0 rounded-full border-2 border-fiaPink/20"></div>
        <div className="absolute inset-4 rounded-full border border-fiaBlue/20"></div>
        <div className="absolute inset-8 rounded-full border border-fiaPink/10"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-fiaCharcoal rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Red flag blips */}
        {redFlags.map((flag) => {
          const x = Math.cos(flag.angle * Math.PI / 180) * flag.radius;
          const y = Math.sin(flag.angle * Math.PI / 180) * flag.radius;
          const isExplored = exploredFlags.has(flag.id);
          
          return (
            <motion.div
              key={flag.id}
              className="absolute w-4 h-4 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px - 8px)`,
                top: `calc(50% + ${y}px - 8px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ delay: flag.delay, duration: 0.4 }}
              onClick={() => handleFlagClick(flag.id)}
              onMouseEnter={() => handleFlagHover(flag.id)}
              onMouseLeave={() => handleFlagHover(null)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Red flag: ${flag.message}`}
            >
              <motion.div
                className={`w-4 h-4 rounded-full ${
                  isExplored ? 'bg-fiaCharcoal' : 'bg-red-500'
                } relative`}
                animate={{
                  boxShadow: isExplored 
                    ? '0 0 0 0 rgba(34, 34, 34, 0)'
                    : [
                        '0 0 0 0 rgba(239, 68, 68, 0.7)',
                        '0 0 0 10px rgba(239, 68, 68, 0)',
                        '0 0 0 0 rgba(239, 68, 68, 0)'
                      ]
                }}
                transition={{
                  duration: 2,
                  repeat: isExplored ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              >
                {isExplored && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {activeFlag && (
            <motion.div
              className="absolute z-10 bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs"
              style={{
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%)',
                marginTop: '20px'
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-fiaCharcoal font-medium">
                {redFlags.find(f => f.id === activeFlag)?.message}
              </p>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          {exploredFlags.size} of {redFlags.length} red flags explored
        </p>
        {exploredFlags.size >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 text-fiaBlue font-medium"
          >
            ✅ Nice work, Agent. Awareness is power.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RedFlagRadar;
