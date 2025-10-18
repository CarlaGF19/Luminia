import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GameBoard } from '../components/game/GameBoard';
import { GameHUD } from '../components/game/GameHUD';
import { WayraAssistant } from '../components/game/WayraAssistant';
import { ResultModal } from '../components/game/ResultModal';
import { useGameStore } from '../hooks/useGameStore';

const TierraVivaLevel = () => {
  const navigate = useNavigate();
  const { status, startGame, restartGame, resetGame } = useGameStore();
  const [showResultModal, setShowResultModal] = useState(false);
  
  // Watch for game end states
  React.useEffect(() => {
    if (status === 'win' || status === 'lose') {
      setShowResultModal(true);
    }
  }, [status]);
  
  const handleStartGame = () => {
    startGame();
  };
  
  const handleRestartGame = () => {
    restartGame();
    setShowResultModal(false);
  };
  
  const handleCloseModal = () => {
    setShowResultModal(false);
    resetGame();
  };
  
  const handleBackToMenu = () => {
    resetGame();
    navigate('/');
  };
  
  const getWayraMessage = () => {
    switch (status) {
      case 'ready':
        return "¡Hola! Soy Wayra, tu guía en este juego de memoria sobre ahorro de energía. ¿Estás listo para aprender?";
      case 'memorizing':
        return "¡Memoriza bien las cartas! Tienes 9 segundos para recordar dónde están los consejos de ahorro energético.";
      case 'playing':
        return "¡Encuentra las parejas! Cada consejo te ayudará a cuidar nuestro planeta. 🌍";
      case 'win':
        return "¡Excelente trabajo! Has aprendido valiosos consejos para ahorrar energía. 🌟";
      case 'lose':
        return "¡No te desanimes! Cada intento te acerca más al éxito. ¡Inténtalo de nuevo! 💪";
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-200 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Custom scrollbar styles */
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            margin: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #86efac 0%, #4ade80 50%, #22c55e 100%);
            border-radius: 10px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #4ade80 0%, #22c55e 50%, #16a34a 100%);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:active {
            background: linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
          }
          
          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4ade80 rgba(255, 255, 255, 0.1);
          }
        `
      }} />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🍃
          </motion.div>
        ))}
        
        {/* Energy particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handleBackToMenu}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-gray-700 hover:bg-white/30 transition-all duration-200"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Volver</span>
        </motion.button>
        
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Tierra Viva
          </h1>
          <p className="text-gray-600 font-medium">Memoria de Energía</p>
        </motion.div>
        
        <div className="w-24"></div> {/* Spacer for centering */}
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6">
        {status === 'ready' && (
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Welcome Section */}
            <motion.div
              className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-6xl">🌿</span>
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Bienvenido al Juego de Memoria Energética!
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Acompaña a <strong>Wayra</strong> en esta aventura donde aprenderás 
                valiosos consejos para ahorrar energía mientras ejercitas tu memoria.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                <div className="bg-blue-100 rounded-2xl p-4 border-2 border-blue-200">
                  <div className="text-3xl mb-2">👀</div>
                  <h3 className="font-bold text-blue-800 mb-1">Memoriza</h3>
                  <p className="text-blue-700">9 segundos para recordar las cartas</p>
                </div>
                
                <div className="bg-green-100 rounded-2xl p-4 border-2 border-green-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-bold text-green-800 mb-1">Encuentra</h3>
                  <p className="text-green-700">12 parejas de consejos energéticos</p>
                </div>
                
                <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-200">
                  <div className="text-3xl mb-2">⏰</div>
                  <h3 className="font-bold text-yellow-800 mb-1">Compite</h3>
                  <p className="text-yellow-700">10 minutos para completar</p>
                </div>
              </div>
              
              <motion.button
                onClick={handleStartGame}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg border-2 border-green-400 text-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 12px 40px rgba(34, 197, 94, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Play className="inline mr-2" size={24} />
                Comenzar Juego
              </motion.button>
            </motion.div>
            
            {/* SDG Footer */}
            <motion.div
              className="text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="mb-2">🎯 Contribuyendo a los Objetivos de Desarrollo Sostenible</p>
              <div className="flex justify-center gap-4 text-xs">
                <span className="bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200">
                  ODS 7: Energía Asequible
                </span>
                <span className="bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                  ODS 12: Consumo Responsable
                </span>
                <span className="bg-green-100 px-3 py-1 rounded-full border border-green-200">
                  ODS 13: Acción Climática
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Game Content */}
        {(status === 'memorizing' || status === 'playing') && (
          <motion.div
            className="custom-scrollbar max-h-[calc(100vh-200px)] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GameHUD />
            <GameBoard />
          </motion.div>
        )}
      </main>

      {/* Wayra Assistant */}
      <WayraAssistant 
        message={getWayraMessage()} 
        isVisible={status !== 'ready'} 
      />

      {/* Result Modal */}
      <ResultModal
        isOpen={showResultModal}
        onClose={handleCloseModal}
        onRestart={handleRestartGame}
      />
    </div>
  );
};

export default TierraVivaLevel;