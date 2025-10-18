import React from 'react';
import { motion } from 'framer-motion';

export const WayraAssistant = ({ message, isVisible = true }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0, x: 100 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0, opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="relative">
        {/* Speech Bubble */}
        {message && (
          <motion.div
            className="absolute bottom-full right-0 mb-4 max-w-xs"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-green-200 relative">
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {message}
              </p>
              {/* Arrow */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-200 absolute -top-1"></div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Wayra Character */}
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="text-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌿
          </motion.div>
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-300 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};