import React from 'react';
import { motion } from 'framer-motion';

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Fondo base cósmico */}
      <div className="absolute inset-0 bg-cosmic-gradient" />
      
      {/* Efectos de aurora */}
      <motion.div
        className="absolute top-0 left-1/2 w-full h-full bg-aurora-gradient opacity-30 blur-3xl"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transform: 'translateX(-50%)',
        }}
      />
      
      {/* Segunda capa de aurora */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-gradient-to-br from-aurora-400/20 to-cosmic-600/20 rounded-full blur-2xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Partículas flotantes */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-energy-hero rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Estrellas de fondo */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* Gradiente de profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-energy-background/50 to-energy-background/80" />
    </div>
  );
};

export default CosmicBackground;