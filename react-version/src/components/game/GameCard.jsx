import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../hooks/useGameStore';

export const GameCard = ({ card, index, onFlip }) => {
  const { status } = useGameStore();
  
  const handleClick = () => {
    // Only allow flipping during playing status
    if (status === 'playing' && !card.isFlipped && !card.isMatched) {
      onFlip(index);
    }
  };
  
  return (
    <motion.div
      className="game-card cursor-pointer"
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0, rotateY: -180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ 
        delay: index * 0.05,
        type: "spring",
        stiffness: 150,
        damping: 15
      }}
      whileHover={!card.isMatched && !card.isFlipped && status === 'playing' ? { 
        y: -8,
        scale: 1.05,
        boxShadow: "0 12px 40px rgba(0, 123, 255, 0.25)"
      } : {}}
      whileTap={!card.isMatched && !card.isFlipped && status === 'playing' ? { 
        y: -4,
        scale: 1.02 
      } : {}}
      style={{ height: '120px', perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <div className="w-full h-full relative flex items-center justify-center border-4 border-green-400/80 bg-gradient-to-br from-green-100 to-green-300 shadow-inner">
            <div className="text-4xl">🌿</div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
          </div>
        </div>
        
        {/* Card Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-blue-50 to-green-50 border-4 border-blue-300/30 flex flex-col items-center justify-center p-3 overflow-hidden shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {card.type === 'icon' && card.image ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <img
                src={card.image}
                alt={card.content}
                className="w-16 h-16 object-contain"
              />
              <p className="text-xs font-semibold text-center text-gray-700 line-clamp-2">
                {card.content}
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2">
              <p className="text-sm font-bold text-center text-blue-700 leading-tight">
                {card.content}
              </p>
            </div>
          )}
          
          {card.isMatched && (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-green-300/10 to-transparent flex items-center justify-center backdrop-blur-[2px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-6xl text-green-600 drop-shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  ✓
                </motion.div>
              </motion.div>
              {/* Sparkles effect */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${25 + i * 20}%`,
                    top: `${25 + (i % 2) * 50}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: 2,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};