import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

interface LoaderProps {
  setLoading: (loading: boolean) => void;
}

export const Loader: React.FC<LoaderProps> = ({ setLoading }) => {
  useEffect(() => {
    // Ensure the loader stays visible for at least 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e0e0e]"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }
      }}
    >
      <motion.div
        className="relative h-[100px] w-[100px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
          }
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#9c4a37]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0],
            transition: {
              duration: 1.5,
              repeat: 2,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#fde3a7]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0],
            transition: {
              duration: 1.5,
              repeat: 2,
              delay: 0.25,
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};