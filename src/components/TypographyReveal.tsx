import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface TypographyRevealProps {
  onComplete: () => void;
}

export const TypographyReveal: React.FC<TypographyRevealProps> = ({ onComplete }) => {
  const titleWords = ['THE', 'WEALTH', 'SUMMIT'];

  useEffect(() => {
    // Reveal text for ~2.6 seconds, then signal to replace with the form
    const timer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center px-4"
    >
      {/* Event Sub-Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 text-xs font-century-bold tracking-[0.25em] text-slate-500 mb-3"
      >
        <span>MINNESOTA EVENT</span>
        <span aria-hidden="true" className="text-slate-400">·</span>
        <span>21 NOV 2026</span>
      </motion.div>

      {/* Main Klarissa Bold Headline */}
      <div className="relative overflow-hidden px-4 py-2">
        <h1 className="font-klarissa text-5xl sm:text-7xl md:text-8xl tracking-wider leading-[1.05] uppercase select-none text-slate-900">
          {titleWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mx-1.5 sm:mx-3 overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + wordIndex * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-slate-950"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Ultra-thin hairline stroke under the Klarissa title */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-28 sm:w-36 mx-auto mt-4 bg-slate-300"
        />
      </div>
    </motion.div>
  );
};
