
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileResult } from '../types/quiz';

interface InteractiveChartProps {
  profiles: ProfileResult[];
  dominantProfile: ProfileResult;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({ profiles, dominantProfile }) => {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  // Colors for each profile
  const profileColors: {[key: string]: string} = {
    dreamer: '#8B5CF6',
    peacemaker: '#10B981',
    caregiver: '#F59E0B',
    rebel: '#EF4444',
    achiever: '#3B82F6',
    explorer: '#06B6D4',
    traditionalist: '#6B7280',
    intellectual: '#7C3AED',
    leader: '#DC2626'
  };

  // Caricature mapping
  const getProfileCaricature = (profileId: string) => {
    const caricatureMap: {[key: string]: string} = {
      dreamer: "🌟",
      peacemaker: "🕊️", 
      caregiver: "🤗",
      rebel: "⚡",
      achiever: "🏆",
      explorer: "🗺️",
      traditionalist: "📚",
      intellectual: "🧠",
      leader: "👑",
      default: "🎭"
    };
    
    return caricatureMap[profileId.toLowerCase()] || caricatureMap.default;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Your Personality Distribution</h3>
        <p className="text-slate-600">Hover over each type to explore your traits</p>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="space-y-4">
        {profiles.map((profile, index) => {
          const isHovered = hoveredProfile === profile.id;
          const isDominant = profile.id === dominantProfile.id;
          
          return (
            <motion.div
              key={profile.id}
              className={`relative bg-white rounded-xl shadow-lg border-2 p-4 cursor-pointer transition-all ${
                isDominant ? 'border-purple-300 ring-2 ring-purple-100' : 'border-slate-200'
              } ${isHovered ? 'shadow-xl scale-105' : ''}`}
              onMouseEnter={() => setHoveredProfile(profile.id)}
              onMouseLeave={() => setHoveredProfile(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                {/* Caricature */}
                <div className="text-3xl">
                  {getProfileCaricature(profile.id)}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`font-bold ${isDominant ? 'text-lg' : 'text-base'} text-slate-800`}>
                      {profile.name}
                      {isDominant && <span className="ml-2 text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Primary</span>}
                    </h4>
                    <span className={`font-bold ${isDominant ? 'text-xl' : 'text-lg'} text-slate-800`}>
                      {profile.percentage}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: profileColors[profile.id] || '#6B7280' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${profile.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                      >
                        {/* Glowing effect for dominant profile */}
                        {isDominant && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ 
                              backgroundColor: profileColors[profile.id],
                              filter: 'blur(2px)',
                              opacity: 0.4
                            }}
                            animate={{ 
                              scale: [1, 1.1, 1],
                              opacity: [0.4, 0.6, 0.4]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Info on Hover */}
              <motion.div
                className="mt-3 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isHovered ? 'auto' : 0,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    {profile.summary || `Learn more about ${profile.name} traits and how they influence your relationships.`}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{dominantProfile.percentage}%</div>
          <div className="text-sm text-purple-600">Primary Type</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{profiles.length}</div>
          <div className="text-sm text-blue-600">Types Identified</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">
            {profiles.filter(p => p.percentage > 15).length}
          </div>
          <div className="text-sm text-green-600">Strong Traits</div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveChart;
