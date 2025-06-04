
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProfileResult } from '../types/quiz';

interface RadialChartProps {
  profiles: ProfileResult[];
  dominantProfile: ProfileResult;
}

const RadialChart: React.FC<RadialChartProps> = ({ profiles, dominantProfile }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const centerX = 200;
  const centerY = 200;
  const outerRadius = 160;
  const innerRadius = 80;
  
  // Colors for each profile
  const profileColors: {[key: string]: string} = {
    dreamer: '#9B59B6',
    peacemaker: '#27AE60',
    caregiver: '#E74C3C',
    rebel: '#E67E22',
    achiever: '#F1C40F',
    explorer: '#3498DB',
    traditionalist: '#95A5A6',
    intellectual: '#8E44AD',
    leader: '#2C3E50'
  };

  // Calculate angles for each profile
  const angleStep = (2 * Math.PI) / profiles.length;
  
  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1500);
    const timer3 = setTimeout(() => setAnimationStep(3), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const createPath = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number,
    isDominant: boolean = false
  ) => {
    const adjustedOuterR = isDominant ? outerR + 20 : outerR;
    
    const x1 = centerX + innerR * Math.cos(startAngle);
    const y1 = centerY + innerR * Math.sin(startAngle);
    const x2 = centerX + adjustedOuterR * Math.cos(startAngle);
    const y2 = centerY + adjustedOuterR * Math.sin(startAngle);
    
    const x3 = centerX + adjustedOuterR * Math.cos(endAngle);
    const y3 = centerY + adjustedOuterR * Math.sin(endAngle);
    const x4 = centerX + innerR * Math.cos(endAngle);
    const y4 = centerY + innerR * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return `M ${x1} ${y1} 
            L ${x2} ${y2} 
            A ${adjustedOuterR} ${adjustedOuterR} 0 ${largeArcFlag} 1 ${x3} ${y3}
            L ${x4} ${y4} 
            A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x1} ${y1} z`;
  };

  const getLabelPosition = (angle: number, radius: number) => {
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-lg">
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRadius + 30}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="1"
            opacity="0.3"
          />
          
          {/* Profile segments */}
          {profiles.map((profile, index) => {
            const startAngle = index * angleStep - Math.PI / 2;
            const endAngle = (index + 1) * angleStep - Math.PI / 2;
            const isDominant = profile.id === dominantProfile.id;
            const midAngle = startAngle + angleStep / 2;
            
            return (
              <g key={profile.id}>
                {/* Segment path */}
                <motion.path
                  d={createPath(startAngle, endAngle, innerRadius, outerRadius, isDominant)}
                  fill={profileColors[profile.id] || '#95A5A6'}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: animationStep >= 1 ? 1 : 0,
                    scale: animationStep >= 1 ? 1 : 0,
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  style={{
                    filter: isDominant && animationStep >= 3 ? 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' : 'none',
                    transformOrigin: `${centerX}px ${centerY}px`
                  }}
                />
                
                {/* Percentage text */}
                <motion.text
                  x={getLabelPosition(midAngle, (innerRadius + outerRadius) / 2).x}
                  y={getLabelPosition(midAngle, (innerRadius + outerRadius) / 2).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
                >
                  {profile.percentage}%
                </motion.text>
                
                {/* Profile name labels */}
                <motion.text
                  x={getLabelPosition(midAngle, outerRadius + (isDominant ? 50 : 35)).x}
                  y={getLabelPosition(midAngle, outerRadius + (isDominant ? 50 : 35)).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isDominant ? profileColors[profile.id] : '#666'}
                  fontSize={isDominant ? "14" : "12"}
                  fontWeight={isDominant ? "bold" : "normal"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
                  transition={{ delay: 1.2 + index * 0.05, duration: 0.3 }}
                >
                  {profile.name}
                </motion.text>
              </g>
            );
          })}
          
          {/* Center circle with dominant profile */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={innerRadius - 10}
            fill={profileColors[dominantProfile.id]}
            stroke="white"
            strokeWidth="3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: animationStep >= 3 ? 1 : 0,
              scale: animationStep >= 3 ? 1 : 0,
            }}
            transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
          />
          
          {/* Center text */}
          <motion.text
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 3 ? 1 : 0 }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            Primary
          </motion.text>
          
          <motion.text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 3 ? 1 : 0 }}
            transition={{ delay: 3.2, duration: 0.5 }}
          >
            {dominantProfile.percentage}%
          </motion.text>
        </svg>
      </motion.div>
      
      {/* Legend */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: animationStep >= 3 ? 1 : 0, y: animationStep >= 3 ? 0 : 20 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <h4 className="text-xl font-bold text-fia-charcoal mb-2">
          Your Primary Type: {dominantProfile.name}
        </h4>
        <p className="text-fia-textLight">
          This interactive wheel shows how your responses mapped to different vulnerability patterns
        </p>
      </motion.div>
    </div>
  );
};

export default RadialChart;
