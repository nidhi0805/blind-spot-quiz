
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from "@/components/ui/button";

interface MotionButtonProps extends ButtonProps {
  whileHover?: any;
  whileTap?: any;
  animate?: any;
  transition?: any;
  initial?: any;
}

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className, whileHover, whileTap, animate, transition, initial, ...props }, ref) => {
    return (
      <motion.div
        whileHover={whileHover}
        whileTap={whileTap}
        animate={animate}
        transition={transition}
        initial={initial}
        className="inline-block"
      >
        <Button className={className} ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

MotionButton.displayName = "MotionButton";

export { MotionButton };
