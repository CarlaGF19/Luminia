import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const QuestionCard = ({ question, options, onAnswer, selectedAnswer, showFeedback, feedback, correctAnswer }) => {
  // Función para reproducir sonidos
  const playSound = (type) => {
    try {
      const audio = new Audio(`/assets/sounds/${type}.mp3`);
      audio.volume = 0.3; // Volumen moderado
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const handleOptionClick = (index) => {
    if (!showFeedback) {
      // Reproducir sonido al hacer clic
      playSound(index === correctAnswer ? 'correct' : 'incorrect');
      onAnswer(index);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto rounded-3xl p-8 shadow-2xl border relative z-10"
      style={{
        background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.15), rgba(199, 220, 139, 0.1))',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(242, 238, 242, 0.3)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center leading-relaxed"
        style={{ 
          fontFamily: 'Nunito, sans-serif',
          color: '#C66F89',
          textShadow: '0 0 10px rgba(198, 111, 137, 0.3)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question}
      </motion.h2>

      <div className="grid gap-4 mb-6">
        {options.map((option, index) => {
          let buttonStyle = {
            fontFamily: 'Poppins, sans-serif',
            background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.2), rgba(105, 148, 220, 0.15))',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(242, 238, 242, 0.4)',
            color: '#C66F89',
          };
          
          if (showFeedback) {
            if (index === correctAnswer) {
              buttonStyle = {
                ...buttonStyle,
                background: 'linear-gradient(135deg, rgba(199, 220, 139, 0.3), rgba(105, 148, 220, 0.2))',
                borderColor: 'rgba(199, 220, 139, 0.6)',
                color: '#6994DC',
                boxShadow: '0 0 20px rgba(199, 220, 139, 0.4)',
              };
            } else if (index === selectedAnswer && index !== correctAnswer) {
              buttonStyle = {
                ...buttonStyle,
                background: 'linear-gradient(135deg, rgba(233, 186, 198, 0.3), rgba(198, 111, 137, 0.2))',
                borderColor: 'rgba(233, 186, 198, 0.6)',
                color: '#E9BAC6',
                boxShadow: '0 0 20px rgba(233, 186, 198, 0.4)',
              };
            } else {
              buttonStyle = {
                ...buttonStyle,
                background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.1), rgba(199, 220, 139, 0.05))',
                borderColor: 'rgba(242, 238, 242, 0.2)',
                color: 'rgba(198, 111, 137, 0.6)',
              };
            }
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={!showFeedback ? { 
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(105, 148, 220, 0.3)"
              } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              <Button
                onClick={() => handleOptionClick(index)}
                className="w-full p-6 text-left text-lg font-semibold rounded-2xl transition-all duration-300 border-2"
                style={buttonStyle}
                disabled={showFeedback}
                variant="ghost"
              >
                <span 
                  className="mr-4 text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
                  style={{
                    background: 'rgba(242, 238, 242, 0.3)',
                    color: '#6994DC'
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {showFeedback && (
        <motion.div
          className="mt-6 p-6 rounded-2xl border"
          style={{
            background: selectedAnswer === correctAnswer 
              ? 'linear-gradient(135deg, rgba(199, 220, 139, 0.2), rgba(105, 148, 220, 0.15))'
              : 'linear-gradient(135deg, rgba(233, 186, 198, 0.2), rgba(198, 111, 137, 0.15))',
            backdropFilter: 'blur(10px)',
            borderColor: selectedAnswer === correctAnswer 
              ? 'rgba(199, 220, 139, 0.4)'
              : 'rgba(233, 186, 198, 0.4)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <motion.span 
              className="text-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              {selectedAnswer === correctAnswer ? '🎉' : '💡'}
            </motion.span>
            <p 
              className="text-lg leading-relaxed font-medium"
              style={{ 
                fontFamily: 'Baloo 2, sans-serif',
                color: '#C66F89'
              }}
            >
              {feedback}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionCard;