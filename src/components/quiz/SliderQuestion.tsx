
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";

interface SliderQuestionProps {
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  value: number;
  onValueChange: (value: number[]) => void;
}

const SliderQuestion: React.FC<SliderQuestionProps> = ({
  min,
  max,
  minLabel,
  maxLabel,
  value,
  onValueChange
}) => {
  return (
    <div className="space-y-8 py-3 max-w-md mx-auto w-full px-2">
      <div className="relative pt-16">
        <Slider
          value={[value]}
          min={min || 0}
          max={max || 10}
          step={1}
          onValueChange={onValueChange}
          className="z-10"
        />
        <motion.div 
          className="absolute top-0 left-0 bg-gradient-to-br from-fia-teal to-fia-teal/90 text-white px-4 py-2 rounded-xl shadow-md transform -translate-x-1/2"
          style={{ 
            left: `${((value - min) / (max - min)) * 100}%` 
          }}
          initial={{ scale: 0.8, y: 10, opacity: 0 }}
          animate={{ 
            scale: 1,
            y: 0,
            opacity: 1
          }}
          transition={{ duration: 0.3 }}
          key={value}
        >
          {value}
        </motion.div>
      </div>
      <div className="flex justify-between text-sm font-medium text-fia-charcoal/70 mt-8 px-2 bg-gradient-to-r from-white to-gray-50 p-3 rounded-lg shadow-sm">
        <span>{minLabel || min || "0"}</span>
        <span>{maxLabel || max || "10"}</span>
      </div>
    </div>
  );
};

export default SliderQuestion;
