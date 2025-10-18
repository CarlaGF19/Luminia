import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WayraAvatar from './WayraAvatar';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultsScreen from './ResultsScreen';
import AnimatedBackground from './AnimatedBackground';
import { Button } from './ui/button';

// Preguntas del quiz sobre energía eólica
const quizQuestions = [
  {
    id: 1,
    question: '¿Qué acción ayuda más a ahorrar energía en casa?',
    options: [
      'Dejar las luces encendidas cuando salgo',
      'Usar focos LED',
      'Abrir la refrigeradora varias veces'
    ],
    correct: 1,
    feedback: 'Las bombillas LED usan menos electricidad y duran más 💡'
  },
  {
    id: 2,
    question: '¿Qué fuente de energía NO contamina el aire?',
    options: [
      'Carbón',
      'Gasolina',
      'Viento'
    ],
    correct: 2,
    feedback: 'El viento es limpio y renovable, ¡como la energía de Wayra! 🌬️'
  },
  {
    id: 3,
    question: 'Si terminas de ver TV, ¿qué deberías hacer?',
    options: [
      'Dejarla encendida',
      'Apagarla',
      'Subir el volumen'
    ],
    correct: 1,
    feedback: 'Apagarla evita gastar energía y ayuda al planeta 💚'
  },
  {
    id: 4,
    question: '¿Cuál de estos aparatos usa energía del sol?',
    options: [
      'Panel solar',
      'Microondas',
      'Licuadora'
    ],
    correct: 0,
    feedback: 'Los paneles solares transforman la luz del sol en electricidad ☀️'
  },
  {
    id: 5,
    question: '¿Qué hacer cuando hay luz natural en tu cuarto?',
    options: [
      'Encender todas las luces',
      'Aprovechar la luz del sol',
      'Cerrar las cortinas'
    ],
    correct: 1,
    feedback: 'La luz natural es gratis y no contamina ☀️'
  },
  {
    id: 6,
    question: '¿Cuál es la mejor ubicación para un aerogenerador?',
    options: [
      'En un valle cerrado',
      'En una zona alta y abierta',
      'Dentro de una ciudad'
    ],
    correct: 1,
    feedback: 'Las zonas altas y abiertas capturan mejor el viento 🌬️'
  },
  {
    id: 7,
    question: '¿Qué contamina el aire y afecta las turbinas eólicas?',
    options: [
      'El viento limpio',
      'Las hojas de los árboles',
      'El humo de fábricas'
    ],
    correct: 2,
    feedback: 'El humo contamina el aire y puede dañar las turbinas 🏭'
  },
  {
    id: 8,
    question: '¿Cuándo puede generar electricidad una turbina eólica?',
    options: [
      'Solo de día',
      'Solo de noche',
      'Las 24 horas si hay viento'
    ],
    correct: 2,
    feedback: 'Las turbinas funcionan día y noche si hay viento suficiente 🌙'
  }
];

const WayraQuiz = ({ onComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [wayraMessage, setWayraMessage] = useState('');
  const [wayraEmotion, setWayraEmotion] = useState('happy');

  useEffect(() => {
    if (!gameStarted && !showResults) {
      setWayraMessage('¡Hola! Soy Wayra 🌬️ ¿Lista para el Desafío del Viento?');
      setWayraEmotion('excited');
    }
  }, [gameStarted, showResults]);

  const handleStartQuiz = () => {
    setGameStarted(true);
    setWayraMessage('¡Vamos a comenzar! Ayúdame a mantener mi molinito brillando ✨');
    setWayraEmotion('excited');
    setTimeout(() => setWayraMessage(''), 3000);
  };

  const handleAnswer = (correct) => {
    if (correct) {
      setScore(score + 1);
      setWayraEmotion('excited');
      setWayraMessage('¡Excelente! 🌟 El viento sopla limpio gracias a ti.');
    } else {
      setWayraEmotion('sad');
      setWayraMessage('Ups… el viento se enredó 😅, pero seguimos aprendiendo.');
    }

    setTimeout(() => {
      setWayraMessage('');
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setWayraEmotion('thinking');
        setWayraMessage('¿Lista para la siguiente ráfaga? 🌬️');
        setTimeout(() => {
          setWayraMessage('');
          setWayraEmotion('happy');
        }, 2000);
      } else {
        setShowResults(true);
        setWayraEmotion('excited');
      }
    }, 3000);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setWayraEmotion('happy');
  };

  const handleComplete = () => {
    onComplete(score, quizQuestions.length);
  };

  if (showResults) {
    return (
      <>
        <AnimatedBackground />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10">
          <ResultsScreen score={score} total={quizQuestions.length} onRestart={handleRestart} />
          <div className="mt-8">
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white font-bold text-xl py-4 px-8 rounded-2xl border-2 border-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              ✨ Completar Desafío ✨
            </Button>
          </div>
          <WayraAvatar emotion="excited" message="¡Lo hiciste genial! 🌟" />
        </div>
      </>
    );
  }

  if (!gameStarted) {
    return (
      <>
        <AnimatedBackground />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10">
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 max-w-2xl w-full text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🌬️
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-5">
              Wayra AR
            </h2>
            
            <p className="text-xl text-white leading-relaxed mb-8">
              Aprende junto a Wayra cómo cuidar la energía del planeta.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-center gap-4 text-lg bg-white/20 rounded-2xl p-4">
                <span className="text-3xl">⏱️</span>
                <span className="text-white font-bold">Duración: 10 minutos</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-lg bg-white/20 rounded-2xl p-4">
                <span className="text-3xl">❓</span>
                <span className="text-white font-bold">{quizQuestions.length} preguntas divertidas</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-lg bg-white/20 rounded-2xl p-4">
                <span className="text-3xl">🌎</span>
                <span className="text-white font-bold">¡Mantén encendido el molinito mágico!</span>
              </div>
            </div>

            <Button
              onClick={handleStartQuiz}
              className="bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 text-white font-bold text-2xl py-7 px-14 rounded-3xl border-2 border-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              💨 ¡Comenzar el desafío! 🚀
            </Button>
          </motion.div>
          <WayraAvatar emotion={wayraEmotion} message={wayraMessage} />
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10">
        {/* Barra de progreso */}
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white text-center mt-2 font-bold">
            Pregunta {currentQuestion + 1} de {quizQuestions.length}
          </p>
        </div>
        
        <QuestionCard
          question={quizQuestions[currentQuestion]}
          onAnswer={handleAnswer}
        />
        <WayraAvatar emotion={wayraEmotion} message={wayraMessage} />
      </div>
    </>
  );
};

export default WayraQuiz;