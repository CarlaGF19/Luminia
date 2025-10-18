import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-800 to-green-900" />
      
      {/* Animated Wind Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{
            x: -10,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: window.innerWidth + 10,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Floating Wind Symbols */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute text-4xl text-white/10 select-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: -50,
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        >
          🌬️
        </motion.div>
      ))}
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default AnimatedBackground;