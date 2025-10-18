import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BadgeCard = ({ badge, isLocked = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Configuración de colores por rareza
  const rarityConfig = {
    1: {
      color: '#3B82F6', // Azul
      name: 'Común',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
      border: 'border-blue-500/30',
      shimmer: 'from-blue-400/20 via-blue-300/40 to-blue-400/20'
    },
    2: {
      color: '#7C3AED', // Morado
      name: 'Raro',
      glow: 'shadow-[0_0_25px_rgba(124,58,237,0.5)]',
      border: 'border-purple-500/40',
      shimmer: 'from-purple-400/20 via-purple-300/40 to-purple-400/20'
    },
    3: {
      color: '#EC4899', // Rosa neón
      name: 'Épico',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.6)]',
      border: 'border-pink-500/50',
      shimmer: 'from-pink-400/20 via-pink-300/40 to-pink-400/20'
    },
    4: {
      color: '#FACC15', // Dorado
      name: 'Legendario',
      glow: 'shadow-[0_0_35px_rgba(250,204,21,0.7)]',
      border: 'border-yellow-400/60',
      shimmer: 'from-yellow-400/20 via-yellow-300/40 to-yellow-400/20'
    },
    5: {
      color: 'rainbow', // Arcoíris
      name: 'Mítico',
      glow: 'shadow-[0_0_40px_rgba(147,51,234,0.8)]',
      border: 'border-transparent',
      shimmer: 'from-red-400/20 via-yellow-300/40 via-green-300/40 via-blue-300/40 to-purple-400/20'
    }
  };

  const config = rarityConfig[badge.rarity] || rarityConfig[1];

  // Renderizar estrellas de rareza
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < badge.rarity ? 'text-yellow-400' : 'text-gray-600'
        }`}
      >
        ⭐
      </span>
    ));
  };

  // Animación de brillo holográfico
  const holographicAnimation = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  // Animación especial para mítico (arcoíris)
  const mythicAnimation = badge.rarity === 5 ? {
    animate: {
      borderColor: [
        '#EF4444', // Rojo
        '#F97316', // Naranja
        '#EAB308', // Amarillo
        '#22C55E', // Verde
        '#3B82F6', // Azul
        '#8B5CF6', // Violeta
        '#EF4444', // Rojo (vuelta)
      ],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
    },
  } : {};

  if (isLocked) {
    return (
      <motion.div
        className="relative w-64 h-80 cursor-not-allowed"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-600/30 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4 opacity-50">🔒</div>
          <p className="text-gray-400 text-center px-4 text-sm">
            Desbloquea completando misiones de {badge.element}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-64 h-80 cursor-pointer perspective-1000"
      whileHover={{ 
        y: -10,
        rotateY: isFlipped ? 180 : 5,
        scale: 1.05
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Carta principal */}
      <motion.div
        className={`
          absolute inset-0 w-full h-full rounded-2xl
          ${config.glow} ${config.border}
          ${badge.rarity === 5 ? 'border-2' : 'border'}
          backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
          transform-style-preserve-3d transition-transform duration-700
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        {...mythicAnimation}
      >
        {/* Efecto holográfico de fondo */}
        <motion.div
          className={`
            absolute inset-0 rounded-2xl opacity-30
            bg-gradient-to-br ${config.shimmer}
            bg-size-200 bg-pos-0
          `}
          {...holographicAnimation}
        />

        {/* Cara frontal */}
        <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}>
          <div className="p-6 h-full flex flex-col">
            {/* Estrellas de rareza */}
            <div className="flex gap-1 mb-4">
              {renderStars()}
            </div>

            {/* Ícono central */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                className="text-8xl filter drop-shadow-lg"
                animate={{
                  rotateY: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {badge.icon}
              </motion.div>
            </div>

            {/* Información del badge */}
            <div className="text-center">
              <h3 
                className="text-xl font-bold mb-2 font-space"
                style={{ color: config.color }}
              >
                {badge.name}
              </h3>
              <p className="text-white/70 text-sm font-inter">
                {badge.description}
              </p>
            </div>
          </div>
        </div>

        {/* Cara trasera */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? 'visible' : 'invisible'}`}>
          <div className="p-6 h-full flex flex-col justify-between">
            {/* Título trasero */}
            <div className="text-center">
              <h3 
                className="text-lg font-bold mb-4 font-space"
                style={{ color: config.color }}
              >
                {badge.name}
              </h3>
            </div>

            {/* Detalles */}
            <div className="flex-1 space-y-4">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Obtenido el:</p>
                <p className="text-white font-medium">{badge.dateObtained}</p>
              </div>

              <div className="text-center">
                <p className="text-white/60 text-sm mb-1">Nivel de Energía:</p>
                <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${badge.energyLevel}%`,
                      backgroundColor: config.color 
                    }}
                  />
                </div>
                <p className="text-white font-medium">{badge.energyLevel}%</p>
              </div>

              {badge.inspirationalQuote && (
                <div className="text-center">
                  <p className="text-white/80 text-sm italic font-inter">
                    "{badge.inspirationalQuote}"
                  </p>
                </div>
              )}
            </div>

            {/* Rareza en la parte inferior */}
            <div className="text-center">
              <p className="text-white/60 text-xs mb-1">Rareza:</p>
              <p 
                className="font-bold text-sm"
                style={{ color: config.color }}
              >
                {config.name}
              </p>
            </div>
          </div>
        </div>

        {/* Partículas flotantes específicas por rareza */}
        {badge.rarity >= 3 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {Array.from({ length: badge.rarity * 2 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full opacity-60"
                style={{ backgroundColor: config.color }}
                initial={{
                  x: Math.random() * 256,
                  y: Math.random() * 320,
                }}
                animate={{
                  y: [320, -20],
                  x: [
                    Math.random() * 256,
                    Math.random() * 256,
                  ],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BadgeCard;