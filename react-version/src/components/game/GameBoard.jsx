import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { useGameStore } from '../../hooks/useGameStore';

export const GameBoard = () => {
  const { cards, flipCard, decrementTime, decrementMemorizingTime, status, memorizingTimeLeft } = useGameStore();
  
  useEffect(() => {
    if (status === 'memorizing') {
      const timer = setInterval(() => {
        decrementMemorizingTime();
      }, 1000);
      return () => clearInterval(timer);
    }
    
    if (status === 'playing') {
      const timer = setInterval(() => {
        decrementTime();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, decrementTime, decrementMemorizingTime]);
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {status === 'memorizing' && (
        <motion.div 
          className="mb-6 text-center"
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 backdrop-blur-sm text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white relative overflow-hidden"
            animate={{ 
              boxShadow: [
                "0 8px 32px rgba(255, 193, 7, 0.3)",
                "0 8px 32px rgba(255, 193, 7, 0.6)",
                "0 8px 32px rgba(255, 193, 7, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-xl font-extrabold flex items-center gap-2 relative z-10">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                👀
              </motion.span>
              ¡Memoriza las cartas! 
              <motion.span
                key={memorizingTimeLeft}
                initial={{ scale: 1.5, color: "white" }}
                animate={{ scale: 1 }}
                className="font-black text-2xl"
              >
                {memorizingTimeLeft}s
              </motion.span>
            </p>
          </motion.div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
        {cards.map((card, index) => (
          <GameCard
            key={card.id}
            card={card}
            index={index}
            onFlip={flipCard}
          />
        ))}
      </div>
    </div>
  );
};