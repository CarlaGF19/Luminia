import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Leaf, Users } from 'lucide-react';

const GuardianCard = ({ guardian, isSelected, onSelect, level = 1 }) => {
  const getIcon = () => {
    switch (guardian.type) {
      case 'solar':
        return <Sun className="w-16 h-16" />;
      case 'wind':
        return <Wind className="w-16 h-16" />;
      case 'earth':
        return <Leaf className="w-16 h-16" />;
      case 'unity':
        return <Users className="w-16 h-16" />;
      default:
        return <Sun className="w-16 h-16" />;
    }
  };

  const getGradient = () => {
    switch (guardian.type) {
      case 'solar':
        return 'from-energy-solar to-energy-solarEnd';
      case 'wind':
        return 'from-energy-wind to-energy-windEnd';
      case 'earth':
        return 'from-energy-earth to-energy-earthEnd';
      case 'unity':
        return 'from-energy-unity to-energy-unityEnd';
      default:
        return 'from-energy-solar to-energy-solarEnd';
    }
  };

  const getGlowClass = () => {
    switch (guardian.type) {
      case 'solar':
        return 'shadow-glow-solar';
      case 'wind':
        return 'shadow-glow-wind';
      case 'earth':
        return 'shadow-glow-earth';
      case 'unity':
        return 'shadow-glow-unity';
      default:
        return 'shadow-glow-solar';
    }
  };

  return (
    <motion.div
      className={`
        relative w-80 h-96 rounded-2xl backdrop-blur-md bg-white/10 
        border border-white/20 shadow-glassmorphism cursor-pointer
        transition-all duration-300 group overflow-hidden
        ${getGlowClass()}
      `}
      whileHover={{
        scale: 1.05,
        rotateY: 1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      {/* Efecto shimmer */}
      <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      
      {/* Borde holográfico */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getGradient()} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
      
      {/* Contenido de la tarjeta */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-8">
        {/* Icono central */}
        <motion.div
          className={`text-white mb-6 bg-gradient-to-br ${getGradient()} bg-clip-text text-transparent`}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          {getIcon()}
        </motion.div>
        
        {/* Nombre de la guardiana */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-space font-semibold text-white mb-2">
            {guardian.name}
          </h3>
          <p className="text-sm text-white/70 font-inter">
            {guardian.description}
          </p>
        </div>
        
        {/* Botón Activar */}
        <motion.button
          className={`
            relative px-8 py-3 rounded-xl font-space font-medium text-white
            bg-gradient-to-r ${getGradient()} shadow-lg
            hover:shadow-xl transition-all duration-300
            border border-white/30 backdrop-blur-sm
            animate-energy-pulse
          `}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255,255,255,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Nivel {level}</span>
          
          {/* Efecto de pulso interno */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-white/20"
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </div>

      {/* Partículas de energía */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${getGradient()}`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}

export default GuardianCard;