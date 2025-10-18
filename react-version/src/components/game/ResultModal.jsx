import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../hooks/useGameStore';

export const ResultModal = ({ isOpen, onClose, onRestart }) => {
  const { status, score, tries, matchedPairs, educationalNote } = useGameStore();
  
  const isWin = status === 'win';
  const isLose = status === 'lose';
  
  if (!isOpen || (!isWin && !isLose)) return null;
  
  const getPerformanceMessage = () => {
    if (isWin) {
      if (tries <= 15) return "¡Excelente memoria! 🌟";
      if (tries <= 25) return "¡Muy bien! 👏";
      return "¡Completado! 🎉";
    }
    return "¡No te rindas! 💪";
  };
  
  const getScoreColor = () => {
    if (score >= 800) return "text-yellow-500";
    if (score >= 600) return "text-green-500";
    if (score >= 400) return "text-blue-500";
    return "text-purple-500";
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-white/20"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              className="text-6xl mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {isWin ? "🏆" : "⏰"}
            </motion.div>
            
            <motion.h2
              className={`text-3xl font-bold mb-2 ${isWin ? 'text-green-600' : 'text-orange-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isWin ? "¡Felicitaciones!" : "¡Tiempo agotado!"}
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {getPerformanceMessage()}
            </motion.p>
          </div>
          
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center border-2 border-blue-200">
              <div className={`text-2xl font-bold ${getScoreColor()} mb-1`}>
                {score}
              </div>
              <div className="text-sm font-medium text-gray-600">Puntos</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center border-2 border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {matchedPairs}/12
              </div>
              <div className="text-sm font-medium text-gray-600">Parejas</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center border-2 border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {tries}
              </div>
              <div className="text-sm font-medium text-gray-600">Intentos</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 text-center border-2 border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {Math.round((matchedPairs / 12) * 100)}%
              </div>
              <div className="text-sm font-medium text-gray-600">Completado</div>
            </div>
          </motion.div>
          
          {/* Educational Note */}
          {educationalNote && (
            <motion.div
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-6 border-2 border-green-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-bold text-green-700 mb-1">Consejo de Wayra:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {educationalNote}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Buttons */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg border-2 border-green-400"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
            >
              🔄 Jugar de nuevo
            </motion.button>
            
            <motion.button
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg border-2 border-gray-400"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(107, 114, 128, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              🏠 Salir
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};