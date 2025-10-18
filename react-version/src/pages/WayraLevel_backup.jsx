import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WayraAvatar from '../components/WayraAvatar';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import ResultsScreen from '../components/ResultsScreen';
import AnimatedBackground from '../components/AnimatedBackground';

// Preguntas del quiz
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
    feedback: 'La luz del sol es gratis y limpia. ¡Aprovéchala! ✨'
  },
  {
    id: 6,
    question: '¿Cuál es una energía renovable?',
    options: [
      'Petróleo',
      'Agua en movimiento',
      'Gas natural'
    ],
    correct: 1,
    feedback: 'El agua de los ríos puede generar electricidad limpia 🌊'
  },
  {
    id: 7,
    question: '¿Qué deberías hacer al cepillarte los dientes?',
    options: [
      'Cerrar la llave del agua',
      'Dejar el agua corriendo',
      'Usar más agua caliente'
    ],
    correct: 0,
    feedback: 'Cerrar la llave ahorra agua y la energía para calentarla 💧'
  },
  {
    id: 8,
    question: '¿Cómo podemos usar menos electricidad en verano?',
    options: [
      'Usar ventiladores en vez de aire acondicionado',
      'Prender todos los aires',
      'Abrir el refrigerador más seguido'
    ],
    correct: 0,
    feedback: 'Los ventiladores usan mucha menos energía que el aire acondicionado 🌬️'
  },
  {
    id: 9,
    question: '¿Qué aparato debería estar apagado cuando no lo usas?',
    options: [
      'El refrigerador',
      'La computadora',
      'El reloj de pared'
    ],
    correct: 1,
    feedback: 'Apagar la computadora cuando no la usas ahorra mucha energía 💻'
  },
  {
    id: 10,
    question: '¿Qué puedes hacer para ayudar al planeta desde hoy?',
    options: [
      'Desperdiciar energía',
      'Apagar luces que no uso',
      'No hacer nada'
    ],
    correct: 1,
    feedback: '¡Cada acción cuenta! Apagar las luces es un gran comienzo 🌟'
  }
];

const WayraLevel = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [wayraMessage, setWayraMessage] = useState('');
  const [wayraEmotion, setWayraEmotion] = useState('happy');

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
    // Reproducir sonido según la respuesta
    playSound(correct ? 'correct' : 'incorrect');
    
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

  const handleBackToMenu = () => {
    navigate('/');
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-emerald-200 relative overflow-hidden">
        <AnimatedBackground />
        
        {/* Botón de regreso */}
        <motion.button
          onClick={handleBackToMenu}
          className="fixed top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-primary hover:bg-white/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </motion.button>

        <ResultsScreen score={score} total={quizQuestions.length} onRestart={handleRestart} />
        <WayraAvatar emotion="excited" message="¡Lo hiciste genial! 🌟" />
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, #6994DC 0%, #C7DC8B 50%, #E9BAC6 100%)'
      }}>
        {/* Fondo animado con partículas mágicas */}
        <div className="absolute inset-0">
          {/* Partículas flotantes tipo luces mágicas */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                background: `radial-gradient(circle, ${['#F2EEF2', '#E9BAC6', '#C66F89', '#C7DC8B'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Brillos suaves tipo glassmorphism */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`glow-${i}`}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${60 + Math.random() * 40}px`,
                height: `${60 + Math.random() * 40}px`,
                background: 'radial-gradient(circle, rgba(242, 238, 242, 0.3) 0%, transparent 70%)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -25, 35, 0],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Botón de regreso */}
        <motion.button
          onClick={handleBackToMenu}
          className="fixed top-6 left-6 z-50 p-3 rounded-full border-2 text-white transition-all duration-300 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.2), rgba(233, 186, 198, 0.3))',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(242, 238, 242, 0.4)',
          }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 25px rgba(242, 238, 242, 0.4)",
            background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.3), rgba(233, 186, 198, 0.4))'
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </motion.button>

        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12 relative z-10">
          {/* Card principal con glassmorphism mejorado y responsive */}
          <motion.div 
            className="relative max-w-2xl w-full text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Efecto de brillo lateral con nueva paleta */}
            <div 
              className="absolute -inset-1 rounded-3xl blur opacity-25 animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #E9BAC6, #C66F89, #6994DC, #C7DC8B)'
              }}
            ></div>
            
            <div 
              className="relative rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.15), rgba(233, 186, 198, 0.1))',
                backdropFilter: 'blur(25px)',
                borderColor: 'rgba(242, 238, 242, 0.3)',
              }}
            >
              {/* Logo y título responsive */}
              <motion.div 
                className="mb-6 sm:mb-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl mb-3 sm:mb-4 drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ 
                    fontFamily: 'Nunito, sans-serif',
                    textShadow: '0 0 20px rgba(198, 111, 137, 0.6)'
                  }}
                >
                  🌬️ Wayra 🌈
                </motion.h1>
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 drop-shadow-lg" 
                  style={{ 
                    fontFamily: 'Poppins, sans-serif',
                    color: '#C66F89',
                    textShadow: '0 0 15px rgba(242, 238, 242, 0.8)'
                  }}
                >
                  Wayra AR
                </h2>
                <p 
                  className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed px-2" 
                  style={{ 
                    fontFamily: 'Baloo 2, sans-serif',
                    color: '#6994DC'
                  }}
                >
                  Aprende junto a Wayra cómo cuidar la energía del planeta 🌎
                </p>
              </motion.div>

              {/* Tarjetas informativas con glassmorphism mejorado y responsive */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                 {[
                   { icon: "⏱️", text: "Duración: 10 minutos" },
                   { icon: "❓", text: "10 preguntas divertidas" },
                   { icon: "🌍", text: "¡Mantén encendido el molinito mágico!" }
                 ].map((item, index) => (
                   <motion.div
                     key={index}
                     className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg rounded-2xl p-3 sm:p-4 border shadow-lg"
                     style={{
                       background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.2), rgba(199, 220, 139, 0.15))',
                       backdropFilter: 'blur(15px)',
                       borderColor: 'rgba(242, 238, 242, 0.3)',
                     }}
                     initial={{ opacity: 0, x: -50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                     whileHover={{ 
                       scale: 1.02, 
                       background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.25), rgba(199, 220, 139, 0.2))',
                       boxShadow: "0 8px 32px rgba(198, 111, 137, 0.2)"
                     }}
                   >
                     <span className="text-2xl sm:text-3xl">{item.icon}</span>
                     <span 
                       className="font-semibold text-center sm:text-left" 
                       style={{ 
                         fontFamily: 'Poppins, sans-serif',
                         color: '#C66F89'
                       }}
                     >
                       {item.text}
                     </span>
                   </motion.div>
                 ))}
               </div>

               {/* Botón principal mejorado con degradado azul-rosado y responsive */}
               <div className="flex justify-center">
                 <motion.button
                   onClick={handleStartQuiz}
                   className="relative overflow-hidden text-white font-bold text-xl sm:text-2xl py-5 sm:py-6 px-8 sm:px-12 rounded-3xl border-2 shadow-2xl w-full sm:w-auto max-w-md"
                   style={{ 
                     fontFamily: 'Nunito, sans-serif',
                     background: 'linear-gradient(135deg, #6994DC 0%, #E9BAC6 100%)',
                     borderColor: 'rgba(242, 238, 242, 0.4)',
                   }}
                   whileHover={{ 
                     scale: 1.05,
                     boxShadow: "0 0 40px rgba(105, 148, 220, 0.6)",
                     background: 'linear-gradient(135deg, #6994DC 0%, #C66F89 50%, #E9BAC6 100%)',
                   }}
                   whileTap={{ scale: 0.95 }}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.8, duration: 0.5 }}
                 >
                   {/* Efecto de brillo animado */}
                   <motion.div
                     className="absolute inset-0 rounded-3xl"
                     style={{
                       background: 'linear-gradient(90deg, transparent, rgba(242, 238, 242, 0.3), transparent)'
                     }}
                     animate={{ x: ["-100%", "100%"] }}
                     transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                   />
                   <span className="relative z-10">¡Comenzar el desafío! 💫</span>
                 </motion.button>
               </div>
            </div>
          </motion.div>
          
          {/* Avatar de Wayra con globo de diálogo mejorado y responsive */}
           <motion.div 
             className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40"
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1, duration: 0.6 }}
           >
             {/* Globo de diálogo tipo cómic con nueva paleta y responsive */}
             <motion.div 
               className="relative mb-4 mr-4"
               animate={{ y: [-5, 5, -5] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               <div 
                 className="rounded-2xl p-3 sm:p-4 shadow-lg border"
                 style={{
                   background: 'linear-gradient(135deg, rgba(242, 238, 242, 0.95), rgba(233, 186, 198, 0.9))',
                   backdropFilter: 'blur(10px)',
                   borderColor: 'rgba(198, 111, 137, 0.3)',
                   maxWidth: 'min(280px, 80vw)',
                 }}
               >
                 <p 
                   className="text-xs sm:text-sm font-semibold" 
                   style={{ 
                     fontFamily: 'Baloo 2, sans-serif',
                     color: '#C66F89'
                   }}
                 >
                   "¡Hola! Soy Wayra 🌬️ ¿Lista para el Desafío del Viento?"
                 </p>
                 {/* Cola del globo con nueva paleta */}
                 <div 
                   className="absolute bottom-0 right-6 sm:right-8 w-0 h-0 transform translate-y-full"
                   style={{
                     borderLeft: '8px solid transparent',
                     borderRight: '8px solid transparent',
                     borderTop: '8px solid rgba(242, 238, 242, 0.95)',
                   }}
                 ></div>
               </div>
             </motion.div>
             
             <WayraAvatar emotion={wayraEmotion} message="" />
             
             {/* Partículas de viento con nueva paleta y responsive */}
             {[...Array(6)].map((_, i) => (
               <motion.div
                 key={`wind-${i}`}
                 className="absolute rounded-full opacity-60"
                 style={{
                   width: '6px',
                   height: '6px',
                   background: `radial-gradient(circle, ${['#C7DC8B', '#6994DC', '#E9BAC6'][Math.floor(Math.random() * 3)]} 0%, transparent 70%)`,
                   left: `${20 + Math.random() * 60}%`,
                   top: `${20 + Math.random() * 60}%`,
                 }}
                 animate={{
                   x: [0, 20, -10, 0],
                   y: [0, -15, 10, 0],
                   opacity: [0.3, 0.8, 0.3],
                 }}
                 transition={{
                   duration: 2 + Math.random() * 2,
                   repeat: Infinity,
                   delay: Math.random() * 2,
                 }}
               />
             ))}
           </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-emerald-200 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Botón de regreso */}
      <motion.button
        onClick={handleBackToMenu}
        className="fixed top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-primary hover:bg-white/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10">
        <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />
        <QuestionCard
          question={quizQuestions[currentQuestion]}
          onAnswer={handleAnswer}
        />
        <WayraAvatar emotion={wayraEmotion} message={wayraMessage} />
      </div>
    </div>
  );
};

export default WayraLevel;