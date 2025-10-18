import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../hooks/useGameStore';

export const GameHUD = () => {
  const { score, timeLeft, tries, matchedPairs, status } = useGameStore();
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getTimeColor = () => {
    if (timeLeft <= 60) return 'text-red-500';
    if (timeLeft <= 180) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  if (status === 'ready' || status === 'memorizing') return null;
  
  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto mb-6 px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-500/10 via-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Score */}
          <motion.div 
            className="bg-white/20 rounded-xl p-3 backdrop-blur-sm border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {score}
            </div>
            <div className="text-sm font-medium text-gray-700">
              Puntos
            </div>
          </motion.div>
          
          {/* Time */}
          <motion.div 
            className="bg-white/20 rounded-xl p-3 backdrop-blur-sm border border-white/30"
            whileHover={{ scale: 1.05 }}
            animate={timeLeft <= 60 ? { 
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                "0 0 0 10px rgba(239, 68, 68, 0)",
              ]
            } : {}}
            transition={timeLeft <= 60 ? { duration: 1, repeat: Infinity } : {}}
          >
            <div className={`text-2xl font-bold mb-1 ${getTimeColor()}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm font-medium text-gray-700">
              Tiempo
            </div>
          </motion.div>
          
          {/* Pairs */}
          <motion.div 
            className="bg-white/20 rounded-xl p-3 backdrop-blur-sm border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-green-600 mb-1">
              {matchedPairs}/12
            </div>
            <div className="text-sm font-medium text-gray-700">
              Parejas
            </div>
          </motion.div>
          
          {/* Tries */}
          <motion.div 
            className="bg-white/20 rounded-xl p-3 backdrop-blur-sm border border-white/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {tries}
            </div>
            <div className="text-sm font-medium text-gray-700">
              Intentos
            </div>
          </motion.div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round((matchedPairs / 12) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(matchedPairs / 12) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};