import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  id: string;
}

const AnimatedCard = ({ children, id }: AnimatedCardProps) => {
  return (
    <motion.div
      key={id}
      initial={{
        opacity: 0,
        scaleY: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        scaleY: 1,
        height: 'auto',
      }}
      exit={{
        opacity: 0,
        scaleY: 0,
        height: 0,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        layout: true,
      }}
      style={{
        transformOrigin: 'top',
        overflow: 'hidden',
      }}
      layout
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;