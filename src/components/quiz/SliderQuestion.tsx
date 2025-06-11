
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
    <div className="w-full max-w-lg mx-auto py-8">
      <div className="relative">
        {/* Value Display */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold shadow-lg">
            {value}
          </div>
        </motion.div>

        {/* Slider */}
        <div className="px-4">
          <Slider
            value={[value]}
            min={min || 0}
            max={max || 10}
            step={1}
            onValueChange={onValueChange}
            className="w-full"
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-6 px-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-slate-600">
              {minLabel || min || "0"}
            </div>
            <div className="text-xs text-slate-500 mt-1">Strongly Disagree</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-slate-600">
              {maxLabel || max || "10"}
            </div>
            <div className="text-xs text-slate-500 mt-1">Strongly Agree</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderQuestion;
