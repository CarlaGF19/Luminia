import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Confetti from './Confetti.jsx';

const ResultsScreen = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 80) {
      return {
        title: "¡Maestro del Viento! 🌪️",
        message: "¡Increíble! Dominas la energía eólica como un verdadero guardián. El viento susurra secretos de sostenibilidad a través de ti.",
        emoji: "🏆",
        color: "from-yellow-400 to-orange-500"
      };
    } else if (percentage >= 60) {
      return {
        title: "¡Aprendiz del Viento! 🌬️",
        message: "¡Muy bien! Tienes un buen conocimiento sobre energía eólica. Con un poco más de práctica, serás un experto.",
        emoji: "⭐",
        color: "from-blue-400 to-green-500"
      };
    } else {
      return {
        title: "¡Explorador del Viento! 🍃",
        message: "¡No te desanimes! Cada experto fue una vez principiante. El viento te enseñará sus secretos con el tiempo.",
        emoji: "🌱",
        color: "from-green-400 to-blue-500"
      };
    }
  };

  const result = getResultMessage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {percentage >= 80 && <Confetti />}
      
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-8xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {result.emoji}
        </motion.div>

        <motion.h1
          className={`text-4xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {result.title}
        </motion.h1>

        <motion.p
          className="text-xl text-white/90 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {result.message}
        </motion.p>

        <motion.div
          className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-6xl font-bold text-white mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl font-semibold text-blue-300">
            {percentage}% de aciertos
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Jugar de Nuevo
          </Button>
        </motion.div>

        <motion.div
          className="mt-6 text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          "El viento no se puede atrapar, pero su energía sí se puede aprovechar" 🌬️💚
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;