import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Smartphone, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/wayra-ar-cards.css';

const WayraLevel = () => {
  const navigate = useNavigate();
  
  // Preguntas del MiniQuiz - Sistema inteligente con 10 preguntas y feedback detallado
  const quizQuestions = [
    {
      id: 1,
      question: "🔌 Terminas de cargar tu tablet. ¿Qué haces?",
      options: [
        "La dejas enchufada ⚡",
        "La desenchufas 🔌",
        "La cargas más tiempo 🔋"
      ],
      correct: 1,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "🔋 Dejarla conectada gasta energía aunque ya esté cargada."
    },
    {
      id: 2,
      question: "☀️ Es de día y hay luz natural. ¿Qué haces?",
      options: [
        "Enciendes todas las luces 💡",
        "Apagas los focos 💡",
        "Cierras cortinas 🪟"
      ],
      correct: 1,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "🌞 Aprovechar la luz natural ahorra electricidad."
    },
    {
      id: 3,
      question: "🌡️ Hace calor y usas ventilador. ¿Qué evitas?",
      options: [
        "Dejar ventanas abiertas 🚪",
        "Dormir con luz prendida 💡",
        "Apagarlo rápido ⏰"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "💨 El aire fresco se escapa si dejas abiertas las ventanas."
    },
    {
      id: 4,
      question: "🚪 Sales del cuarto. ¿Qué haces con las luces?",
      options: [
        "Las apagas 💡",
        "Las dejas prendidas ⚡",
        "Cambias el foco 🔧"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "💡 Cada foco apagado ayuda al planeta y ahorra energía."
    },
    {
      id: 5,
      question: "📺 Tu televisor está encendido y no lo miras. ¿Qué haces?",
      options: [
        "Bajas el volumen 🔊",
        "Cambias de canal 📻",
        "Lo apagas 📺"
      ],
      correct: 2,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "📺 Apagar reduce el consumo silencioso de energía."
    },
    {
      id: 6,
      question: "🌙 Cargas tu celular toda la noche. ¿Qué pasa?",
      options: [
        "Gasta más energía ⚡",
        "Se carga más rápido ⚡",
        "No pasa nada 😴"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "🔋 Cargar en exceso daña la batería y desperdicia energía."
    },
    {
      id: 7,
      question: "📚 Para ahorrar energía al estudiar debes...",
      options: [
        "Usar luz natural ☀️",
        "Encender ventilador 💨",
        "Subir brillo al máximo 📱"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "🌞 Usar la luz del día te ayuda a concentrarte y ahorrar energía."
    },
    {
      id: 8,
      question: "⚡ ¿Qué aparato gasta más energía?",
      options: [
        "Microondas 🍲",
        "Ventilador 💨",
        "Plancha 👕"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "⚡ Los microondas usan resistencias de alto consumo."
    },
    {
      id: 9,
      question: "🌍 ¿Qué es mejor para el ambiente?",
      options: [
        "Reutilizar materiales ♻️",
        "Tirar basura 🗑️",
        "Comprar más cosas 🛒"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "♻️ Reutilizar ayuda al planeta y ahorra energía en la producción."
    },
    {
      id: 10,
      question: "🌙 Vas a dormir. ¿Qué haces con tus aparatos?",
      options: [
        "Los apagas 🔋",
        "Los dejas conectados ⚡",
        "Los cargas de nuevo 🔌"
      ],
      correct: 0,
      feedback: "🌟 ¡Excelente! Elegiste la opción más eficiente y sostenible.",
      incorrectFeedback: "🌙 Dejar aparatos encendidos desperdicia energía mientras duermes."
    }
  ];

  const [activeTab, setActiveTab] = useState('ar-cards');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const audioRef = useRef(null);
  
  // Quiz state management with intelligent relearning system and timer
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    questionsQueue: [],
    correctAnswers: 0,
    totalAttempts: 0,
    startTime: null,
    selectedAnswer: null,
    showFeedback: false,
    isCompleted: false,
    unlockedCards: [],
    timeRemaining: 300, // 5 minutes in seconds
    isTimeUp: false
  });

  // Initialize quiz with shuffled questions and load progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('wayra-quiz-progress');
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    
    if (savedProgress && !quizState.startTime) {
      const progress = JSON.parse(savedProgress);
      setQuizState(prev => ({
        ...prev,
        ...progress,
        questionsQueue: progress.questionsQueue || shuffledQuestions,
        startTime: progress.startTime || Date.now()
      }));
    } else if (!quizState.startTime) {
      setQuizState(prev => ({
        ...prev,
        questionsQueue: shuffledQuestions,
        startTime: Date.now()
      }));
    }
  }, [quizQuestions]);

  // Save progress to localStorage
  useEffect(() => {
    if (quizState.startTime) {
      localStorage.setItem('wayra-quiz-progress', JSON.stringify(quizState));
    }
  }, [quizState]);

  // Timer countdown effect - 5 minutes (300 seconds)
  useEffect(() => {
    let timer;
    if (activeTab === 'miniquiz' && !quizState.isCompleted && !quizState.isTimeUp && quizState.timeRemaining > 0) {
      timer = setInterval(() => {
        setQuizState(prev => {
          const newTime = prev.timeRemaining - 1;
          if (newTime <= 0) {
            playSound('incorrect');
            return { ...prev, timeRemaining: 0, isTimeUp: true };
          }
          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeTab, quizState.isCompleted, quizState.isTimeUp, quizState.timeRemaining]);

  // Format time display (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get current question
  const getCurrentQuestion = () => {
    if (quizState.questionsQueue.length === 0) return null;
    return quizState.questionsQueue[quizState.currentQuestionIndex];
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (quizState.showFeedback) return;
    setQuizState(prev => ({ ...prev, selectedAnswer: answerIndex }));
  };

  // Handle answer submission with relearning logic
  const handleAnswerSubmit = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || quizState.selectedAnswer === null) return;

    const isCorrect = quizState.selectedAnswer === currentQuestion.correct;
    const newTotalAttempts = quizState.totalAttempts + 1;

    // Play sound
    if (soundEnabled) {
      if (isCorrect) {
        playSound('correct');
      } else {
        playSound('incorrect');
      }
    }

    if (isCorrect) {
      // Correct answer - move to next question
      const newCorrectAnswers = quizState.correctAnswers + 1;
      const newQuestionsQueue = [...quizState.questionsQueue];
      newQuestionsQueue.splice(quizState.currentQuestionIndex, 1);

      // Check if completed (10 correct answers)
      if (newCorrectAnswers >= 10) {
        const unlockedCards = [...quizState.unlockedCards, 'El Susurro del Ahorro'];
        setQuizState(prev => ({
          ...prev,
          correctAnswers: newCorrectAnswers,
          totalAttempts: newTotalAttempts,
          showFeedback: true,
          isCompleted: true,
          unlockedCards
        }));
        // Clear saved progress
        localStorage.removeItem('wayra-quiz-progress');
      } else {
        setQuizState(prev => ({
          ...prev,
          correctAnswers: newCorrectAnswers,
          totalAttempts: newTotalAttempts,
          questionsQueue: newQuestionsQueue,
          currentQuestionIndex: Math.min(prev.currentQuestionIndex, newQuestionsQueue.length - 1),
          showFeedback: true
        }));
      }
    } else {
      // Incorrect answer - move question to end of queue randomly
      const newQuestionsQueue = [...quizState.questionsQueue];
      const failedQuestion = newQuestionsQueue.splice(quizState.currentQuestionIndex, 1)[0];
      
      // Insert at random position in the remaining questions
      const insertPosition = Math.floor(Math.random() * (newQuestionsQueue.length + 1));
      newQuestionsQueue.splice(insertPosition, 0, failedQuestion);

      setQuizState(prev => ({
        ...prev,
        totalAttempts: newTotalAttempts,
        questionsQueue: newQuestionsQueue,
        currentQuestionIndex: Math.min(prev.currentQuestionIndex, newQuestionsQueue.length - 1),
        showFeedback: true
      }));
    }
  };

  // Continue to next question
  const handleContinue = () => {
    if (quizState.isCompleted) {
      setActiveTab('results');
      return;
    }

    // Play transition sound
    if (soundEnabled) {
      playSound('transition');
    }

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: null,
      showFeedback: false
    }));
  };

  // Reset quiz
  const resetQuiz = () => {
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuizState({
      currentQuestionIndex: 0,
      questionsQueue: shuffledQuestions,
      correctAnswers: 0,
      totalAttempts: 0,
      startTime: Date.now(),
      selectedAnswer: null,
      showFeedback: false,
      isCompleted: false,
      unlockedCards: [],
      timeRemaining: 300,
      isTimeUp: false
    });
    localStorage.removeItem('wayra-quiz-progress');
  };

  // Datos de las cartas AR
  const arCards = [
    {
      id: 1,
      title: "Sin Fantasmas de Energía",
      image: "/assets/images/card-fantasmas.webp",
      tip: "Desenchufa cargadores cuando no los uses. Los 'vampiros energéticos' consumen electricidad aunque no estés cargando nada.",
      status: "unlocked"
    },
    {
      id: 2,
      title: "Luz Natural",
      image: "/assets/images/card-luz.webp",
      tip: "Aprovecha el sol durante el día y apaga los focos. La luz natural es gratis y más saludable para tus ojos.",
      status: "unlocked"
    },
    {
      id: 3,
      title: "Tiempo Sabio",
      image: "/assets/images/card-tiempo.webp",
      tip: "Duchas cortas ahorran agua y energía. 5 minutos son suficientes para estar limpio y cuidar el planeta.",
      status: "unlocked"
    }
  ];

  // Función para reproducir sonidos
  const playSound = (type) => {
    if (!soundEnabled) return;
    
    try {
      const soundMap = {
        correct: '/assets/sounds/correct.mp3',
        incorrect: '/assets/sounds/incorrect.mp3',
        transition: '/assets/sounds/transition.mp3',
        toggle: '/assets/sounds/toggle.mp3'
      };

      if (audioRef.current && soundMap[type]) {
        audioRef.current.src = soundMap[type];
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(console.error);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Manejar cambio de tab
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      playSound('whoosh');
      setActiveTab(tab);
    }
  };

  // Manejar toggle de sonido
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    playSound('toggle');
  };

  // Manejar Ver en AR
  const handleViewAR = (cardId) => {
    playSound('whoosh');
    
    // Simular detección de AR
    if ('xr' in navigator) {
      // Dispositivo compatible con AR
      alert('🚀 Abriendo experiencia AR...\n\nApunta tu cámara al marcador para ver la carta en 3D!');
    } else {
      // Fallback para dispositivos sin AR
      alert('📱 Tu dispositivo no admite AR.\n\n✨ Mira la animación 3D en su lugar!');
    }
  };

  // Manejar mostrar consejo
  const handleShowTip = (tip) => {
    playSound('bell');
    alert(`💡 Consejo de Wayra:\n\n${tip}`);
  };

  // These functions are now handled by the intelligent quiz system above

  // Cambiar carta
  const handleNextCard = () => {
    playSound('whoosh');
    setCurrentCard((prev) => (prev + 1) % arCards.length);
  };

  // Volver al menú
  const handleBackToMenu = () => {
    navigate('/');
  };

  return (
    <div 
      className="wayra-level min-h-screen relative overflow-y-scroll" 
      style={{
        background: 'linear-gradient(180deg, #0B0E1D 0%, #2B437A 50%, #C27CFF 100%)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#C27CFF #2B437A',
        height: '100vh'
      }}
    >
      {/* Audio element */}
      <audio ref={audioRef} preload="none" />
      
      {/* Efectos de partículas galácticas mejoradas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: `radial-gradient(circle, ${['#70D4FF', '#C27CFF', '#F6F8FF', '#A9FF9F'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
              boxShadow: `0 0 ${4 + Math.random() * 8}px ${['#70D4FF', '#C27CFF', '#F6F8FF', '#A9FF9F'][Math.floor(Math.random() * 4)]}`
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.3, 1.2, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Scroll indicator - visible on right side */}
      <div 
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 w-2 h-32 rounded-full"
        style={{
          background: 'linear-gradient(180deg, rgba(194, 124, 255, 0.3) 0%, rgba(112, 212, 255, 0.3) 100%)',
          border: '1px solid rgba(194, 124, 255, 0.5)'
        }}
      >
        <motion.div
          className="w-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, #C27CFF 0%, #70D4FF 100%)',
            height: '20%',
            boxShadow: '0 0 10px rgba(194, 124, 255, 0.8)'
          }}
          animate={{
            y: ['0%', '400%', '0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Botón de regreso */}
      <motion.button
        onClick={handleBackToMenu}
        className="fixed top-6 left-6 z-50 p-3 rounded-full border transition-all duration-300 shadow-lg"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(112, 212, 255, 0.3)',
          color: '#F6F8FF'
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 25px rgba(112, 212, 255, 0.4)",
          background: 'rgba(255,255,255,0.12)'
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      {/* Header con tabs */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <div 
            className="flex items-center justify-between rounded-2xl p-4 border"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(112, 212, 255, 0.2)'
            }}
            role="tablist"
            aria-label="Opciones de Wayra"
          >
            {/* Tabs */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => handleTabChange('ar-cards')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'ar-cards' 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  background: activeTab === 'ar-cards' 
                    ? 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)' 
                    : 'rgba(255,255,255,0.05)',
                  boxShadow: activeTab === 'ar-cards' 
                    ? '0 0 20px rgba(194, 124, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)' 
                    : 'none',
                  borderBottom: activeTab === 'ar-cards' 
                    ? '2px solid transparent' 
                    : 'none',
                  borderImage: activeTab === 'ar-cards' 
                    ? 'linear-gradient(90deg, #70D4FF, #C27CFF) 1' 
                    : 'none'
                }}
                role="tab"
                aria-selected={activeTab === 'ar-cards' ? 'true' : 'false'}
                aria-controls="ar-cards-panel"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Smartphone size={20} />
                <span>Cartas AR</span>
                <span>📱✨</span>
              </motion.button>

              <motion.button
                onClick={() => handleTabChange('miniquiz')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'miniquiz' 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  background: activeTab === 'miniquiz' 
                    ? 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)' 
                    : 'rgba(255,255,255,0.05)',
                  boxShadow: activeTab === 'miniquiz' 
                    ? '0 0 20px rgba(194, 124, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)' 
                    : 'none',
                  borderBottom: activeTab === 'miniquiz' 
                    ? '2px solid transparent' 
                    : 'none',
                  borderImage: activeTab === 'miniquiz' 
                    ? 'linear-gradient(90deg, #70D4FF, #C27CFF) 1' 
                    : 'none'
                }}
                role="tab"
                aria-selected={activeTab === 'miniquiz' ? 'true' : 'false'}
                aria-controls="miniquiz-panel"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">💙</span>
                <span>MiniQuizz inteligente</span>
                <span>🧠🌬️</span>
              </motion.button>
            </div>

            {/* Toggle de sonido */}
            <motion.button
              onClick={toggleSound}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-gray-300 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: soundEnabled ? '1px solid rgba(112, 212, 255, 0.3)' : '1px solid rgba(255,255,255,0.1)'
              }}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span>🎧</span>
              <span>{soundEnabled ? 'ON' : 'OFF'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Panel de Cartas AR */}
            {activeTab === 'ar-cards' && (
              <motion.div
                key="ar-cards"
                id="ar-cards-panel"
                role="tabpanel"
                aria-labelledby="ar-cards-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="wayra-level card-ar-section space-y-6"
              >
                {/* Encabezado */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#F6F8FF', fontFamily: 'Poppins, sans-serif' }}>
                    Carta del Viento: Sin Fantasmas de Energía
                  </h2>
                  <div className="mb-6">
                    <span 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        background: 'rgba(169, 255, 159, 0.18)',
                        color: '#A9FF9F',
                        border: '1px solid rgba(169, 255, 159, 0.3)'
                      }}
                    >
                      <span className="text-green-400">⭐</span>
                      Desbloqueada
                    </span>
                  </div>
                </div>

                {/* Bloque de instrucciones */}
                <motion.div
                  className="rounded-3xl p-6 border shadow-2xl max-w-3xl mx-auto mb-8"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(112, 212, 255, 0.3)',
                    boxShadow: '0 0 40px rgba(194, 124, 255, 0.2)'
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center space-y-4" style={{ color: '#F6F8FF', fontFamily: 'Nunito, sans-serif' }}>
                    <div className="text-lg leading-relaxed">
                      <p className="mb-4">
                        <span className="text-2xl mr-2">💡</span>
                        <strong>Cada tarjeta AR tiene dos caras:</strong>
                      </p>
                      <ul className="text-left space-y-2 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
                        <li>• En la parte delantera, verás un reto del Apu con un código QR para escanear.</li>
                        <li>• En la parte trasera, encontrarás una reflexión del Apu para pensar cómo cuidamos la energía.</li>
                      </ul>
                    </div>
                    
                    <div className="text-lg leading-relaxed">
                      <p className="mb-4">
                        <span className="text-2xl mr-2">📱</span>
                        <strong>Al escanear el QR, LUMINA te guiará paso a paso:</strong>
                      </p>
                      <p className="text-left max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
                        primero pedirá activar la cámara trasera, y luego verás al Apu en 3D, con consejos animados y desafíos ecológicos. ✨
                      </p>
                    </div>
                    
                    <p className="text-xl font-semibold mt-6" style={{ color: '#C27CFF' }}>
                      ¡Explora, aprende y deja que el viento te hable! 🌬️💫
                    </p>
                  </div>
                </motion.div>

                {/* Botones principales */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
                  <motion.button
                    onClick={() => window.open('https://drive.google.com/file/d/15Wpr_5tlvHJxsxvWup9a67y5PImd96KF/view?usp=drivesdk', '_blank')}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)',
                      boxShadow: '0 0 20px rgba(194, 124, 255, 0.4)',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '18px'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(194, 124, 255, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Descarga la carta para imprimir y escanear su QR"
                    title="Descarga la carta para imprimir y escanear su QR."
                  >
                    <span className="text-2xl">📘</span>
                    Obtener PDF
                  </motion.button>

                  <motion.button
                    onClick={() => setShowTutorialModal(true)}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#F6F8FF',
                      border: '1px solid rgba(112, 212, 255, 0.3)',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '18px'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      background: 'rgba(255,255,255,0.15)',
                      boxShadow: '0 0 20px rgba(112, 212, 255, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Ver tutorial de cómo escanear tu Carta del Viento paso a paso"
                  >
                    <span className="text-2xl">🎥</span>
                    Ver Tutorial
                  </motion.button>
                </div>

                {/* Modal de Tutorial */}
                <AnimatePresence>
                  {showTutorialModal && (
                    <motion.div
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowTutorialModal(false)}
                    >
                      <motion.div
                        className="rounded-3xl p-8 border shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        style={{
                          background: 'rgba(11, 14, 29, 0.95)',
                          backdropFilter: 'blur(20px)',
                          borderColor: 'rgba(112, 212, 255, 0.3)',
                          boxShadow: '0 0 40px rgba(194, 124, 255, 0.3)'
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold mb-4" style={{ color: '#F6F8FF', fontFamily: 'Poppins, sans-serif' }}>
                            Cómo escanear tu Carta del Viento paso a paso
                          </h3>
                        </div>
                        
                        <div className="space-y-4" style={{ color: '#F6F8FF', fontFamily: 'Nunito, sans-serif' }}>
                          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <span className="text-2xl">1️⃣</span>
                            <p className="text-lg">Abre tu cámara o entra a LUMINA.</p>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <span className="text-2xl">2️⃣</span>
                            <p className="text-lg">Escanea el código QR.</p>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <span className="text-2xl">3️⃣</span>
                            <p className="text-lg">Permite acceso a la cámara trasera.</p>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <span className="text-2xl">4️⃣</span>
                            <p className="text-lg">Observa cómo el Apu cobra vida en 3D.</p>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <span className="text-2xl">5️⃣</span>
                            <p className="text-lg">Descubre su reto y reflexión ecológica. 🌱💫</p>
                          </div>
                        </div>
                        
                        <div className="text-center mt-8">
                          <motion.button
                            onClick={() => setShowTutorialModal(false)}
                            className="px-6 py-3 rounded-xl font-semibold"
                            style={{
                              background: 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)',
                              color: 'white',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Entendido
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Indicador de cartas */}
                {arCards.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {arCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCard(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentCard 
                            ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg' 
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                        aria-label={`Ir a carta ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Panel de MiniQuiz */}
            {activeTab === 'miniquiz' && !quizState.isCompleted && (
              <motion.div
                key="miniquiz"
                id="miniquiz-panel"
                role="tabpanel"
                aria-labelledby="miniquiz-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Quiz Header with Timer, Score, and Sound Toggle */}
                <div 
                  className="rounded-2xl p-6 border shadow-lg"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(112, 212, 255, 0.3)',
                    boxShadow: '0 0 30px rgba(194, 124, 255, 0.15)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    {/* Quiz Title */}
                    <div className="flex items-center gap-3">
                      <span className="text-blue-300 text-2xl">🌬️</span>
                      <h2 className="text-xl font-bold" style={{ color: '#F6F8FF' }}>
                        🌬️ MiniQuizz de Decisiones Inteligentes
                      </h2>
                    </div>

                    {/* Sound Toggle */}
                    <motion.button
                      onClick={toggleSound}
                      className="p-2 rounded-full border transition-all duration-300"
                      style={{
                        background: soundEnabled ? 'rgba(169, 255, 159, 0.15)' : 'rgba(255, 82, 82, 0.15)',
                        borderColor: soundEnabled ? 'rgba(169, 255, 159, 0.3)' : 'rgba(255, 82, 82, 0.3)',
                        color: soundEnabled ? '#A9FF9F' : '#FF8A8A'
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
                    >
                      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </motion.button>
                  </div>

                  {/* Timer and Score Row */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    {/* Timer */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#C27CFF' }}>⏱️ Tiempo:</span>
                      <span 
                        className={`text-lg font-bold ${quizState.timeRemaining <= 60 ? 'animate-pulse' : ''}`}
                        style={{ 
                          color: quizState.timeRemaining <= 60 ? '#FF8A8A' : '#70D4FF'
                        }}
                      >
                        {formatTime(quizState.timeRemaining)}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#C27CFF' }}>⭐ Puntos:</span>
                      <span className="text-lg font-bold" style={{ color: '#A9FF9F' }}>
                        {quizState.correctAnswers} / 10 correctas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Time Up Message */}
                {quizState.isTimeUp && (
                  <motion.div
                    className="rounded-2xl p-8 border text-center"
                    style={{
                      background: 'rgba(255, 82, 82, 0.1)',
                      backdropFilter: 'blur(20px)',
                      borderColor: 'rgba(255, 82, 82, 0.3)',
                      boxShadow: '0 0 30px rgba(255, 82, 82, 0.2)'
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#FF8A8A' }}>
                      ⏳ ¡Se acabó el tiempo! 🌬️
                    </h3>
                    <p className="text-lg mb-6" style={{ color: '#F6F8FF' }}>
                      Intenta otra vez para convertirte en Guardián del Viento.
                    </p>
                    <motion.button
                      onClick={resetQuiz}
                      className="px-8 py-3 rounded-full font-semibold transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)',
                        color: '#F6F8FF',
                        boxShadow: '0 0 20px rgba(194, 124, 255, 0.4)'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(194, 124, 255, 0.6)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🔁 Reintentar
                    </motion.button>
                  </motion.div>
                )}

                {!quizState.isCompleted && !quizState.isTimeUp ? (
                  <>
                    {/* Progress Bar */}
                    <div className="text-center mb-8">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: '#F6F8FF' }}>
                        Pregunta {quizState.correctAnswers + 1}/10
                      </h3>
                      
                      {/* Barra de progreso */}
                      <div 
                        className="w-full max-w-md mx-auto h-3 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #A9FF9F 0%, #70D4FF 50%, #C27CFF 100%)'
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(quizState.correctAnswers / 10) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Carta de pregunta */}
                    {getCurrentQuestion() && (
                      <motion.div
                        className="rounded-3xl p-8 border shadow-2xl max-w-2xl mx-auto"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(20px)',
                          borderColor: 'rgba(112, 212, 255, 0.3)',
                          boxShadow: '0 0 40px rgba(194, 124, 255, 0.2)'
                        }}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-xl font-bold mb-6 text-center leading-relaxed" style={{ color: '#F6F8FF' }}>
                          {getCurrentQuestion().question}
                        </h3>

                        {/* Opciones */}
                        <div className="space-y-4 mb-6">
                          {getCurrentQuestion().options.map((option, index) => {
                            const isSelected = quizState.selectedAnswer === index;
                            const isCorrect = index === getCurrentQuestion().correct;
                            const showResult = quizState.showFeedback;
                            
                            let buttonStyle = {
                              background: 'rgba(255,255,255,0.05)',
                              color: '#F6F8FF',
                              border: '1px solid rgba(255,255,255,0.1)'
                            };

                            if (isSelected && !showResult) {
                              buttonStyle = {
                                background: 'rgba(194, 124, 255, 0.2)',
                                color: '#F6F8FF',
                                border: '1px solid #C27CFF'
                              };
                            } else if (showResult && isCorrect) {
                              buttonStyle = {
                                background: 'rgba(169, 255, 159, 0.18)',
                                color: '#A9FF9F',
                                border: '1px solid rgba(169, 255, 159, 0.3)'
                              };
                            } else if (showResult && isSelected && !isCorrect) {
                              buttonStyle = {
                                background: 'rgba(255, 82, 82, 0.12)',
                                color: '#FF8A8A',
                                border: '1px solid rgba(255, 82, 82, 0.3)'
                              };
                            }

                            return (
                              <motion.button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={quizState.showFeedback}
                                className="w-full p-4 rounded-xl font-semibold text-left transition-all duration-300 disabled:cursor-not-allowed"
                                style={buttonStyle}
                                whileHover={!quizState.showFeedback ? { 
                                  scale: 1.02,
                                  boxShadow: '0 0 20px rgba(112, 212, 255, 0.3)'
                                } : {}}
                                whileTap={!quizState.showFeedback ? { scale: 0.98 } : {}}
                                animate={showResult && isSelected && !isCorrect ? {
                                  x: [0, -5, 5, -5, 5, 0]
                                } : {}}
                                transition={{ duration: 0.5 }}
                              >
                                {option}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Feedback */}
                        <AnimatePresence>
                          {quizState.showFeedback && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-center mb-6 p-4 rounded-xl"
                              style={{
                                background: quizState.selectedAnswer === getCurrentQuestion().correct 
                                  ? 'rgba(169, 255, 159, 0.1)' 
                                  : 'rgba(255, 82, 82, 0.1)',
                                border: `1px solid ${quizState.selectedAnswer === getCurrentQuestion().correct 
                                  ? 'rgba(169, 255, 159, 0.3)' 
                                  : 'rgba(255, 82, 82, 0.3)'}`
                              }}
                            >
                              <p 
                                className="text-lg font-semibold mb-2"
                                style={{ 
                                  color: quizState.selectedAnswer === getCurrentQuestion().correct ? '#A9FF9F' : '#FF8A8A'
                                }}
                                aria-live="polite"
                              >
                                {quizState.selectedAnswer === getCurrentQuestion().correct 
                                  ? getCurrentQuestion().feedback
                                  : getCurrentQuestion().incorrectFeedback
                                }
                              </p>
                              {quizState.selectedAnswer !== getCurrentQuestion().correct && (
                                <p className="text-sm" style={{ color: '#F6F8FF' }}>
                                  😅 Casi... la respuesta correcta era <strong>{getCurrentQuestion().options[getCurrentQuestion().correct]}</strong>
                                </p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Botón de acción */}
                        <div className="text-center">
                          {!quizState.showFeedback ? (
                            <motion.button
                              onClick={handleAnswerSubmit}
                              disabled={quizState.selectedAnswer === null}
                              className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{
                                background: quizState.selectedAnswer !== null 
                                  ? 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)'
                                  : 'rgba(255,255,255,0.1)',
                                boxShadow: quizState.selectedAnswer !== null 
                                  ? '0 0 20px rgba(194, 124, 255, 0.4)'
                                  : 'none'
                              }}
                              whileHover={quizState.selectedAnswer !== null ? { 
                                scale: 1.05,
                                boxShadow: '0 0 30px rgba(194, 124, 255, 0.6)'
                              } : {}}
                              whileTap={quizState.selectedAnswer !== null ? { scale: 0.95 } : {}}
                            >
                              Responder
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleContinue}
                              className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg"
                              style={{
                                background: 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)',
                                boxShadow: '0 0 20px rgba(194, 124, 255, 0.4)'
                              }}
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 0 30px rgba(194, 124, 255, 0.6)'
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {quizState.isCompleted ? 'Ver Resultados' : 'Siguiente'}
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  /* Quiz Completed - Results */
                  <motion.div
                    className="quiz-results text-center space-y-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Medal and Title */}
                    <motion.div 
                      className="results-header p-8 rounded-3xl border"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(169, 255, 159, 0.3)',
                        boxShadow: '0 0 40px rgba(169, 255, 159, 0.2)'
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <div className="text-8xl mb-4">🏅</div>
                      <h2 className="text-3xl font-bold mb-4" style={{ color: '#F6F8FF' }}>
                        🏅 ¡Guardiana o Guardián del Viento! 🌬️
                      </h2>
                      <p className="text-lg" style={{ color: '#A9FF9F' }}>
                        Completaste el MiniQuizz con sabiduría y energía. ⚡✨
                      </p>
                    </motion.div>

                    {/* Detailed Stats */}
                    <motion.div 
                      className="results-stats p-6 rounded-2xl border"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(112, 212, 255, 0.3)',
                        boxShadow: '0 0 30px rgba(112, 212, 255, 0.15)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-bold mb-6" style={{ color: '#F6F8FF' }}>
                        📊 Resumen de tu desempeño
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="stat-item p-4 rounded-xl" style={{ background: 'rgba(169, 255, 159, 0.1)' }}>
                          <div className="text-3xl font-bold" style={{ color: '#A9FF9F' }}>
                            {quizState.correctAnswers}/{quizState.totalAttempts}
                          </div>
                          <div className="text-sm" style={{ color: '#F6F8FF' }}>Respuestas correctas / intentos totales</div>
                        </div>
                        <div className="stat-item p-4 rounded-xl" style={{ background: 'rgba(112, 212, 255, 0.1)' }}>
                          <div className="text-3xl font-bold" style={{ color: '#70D4FF' }}>
                            {formatTime(300 - quizState.timeRemaining)}
                          </div>
                          <div className="text-sm" style={{ color: '#F6F8FF' }}>Tiempo utilizado</div>
                        </div>
                        <div className="stat-item p-4 rounded-xl col-span-2" style={{ background: 'rgba(194, 124, 255, 0.1)' }}>
                          <div className="text-3xl font-bold" style={{ color: '#C27CFF' }}>
                            {formatTime(quizState.timeRemaining)}
                          </div>
                          <div className="text-sm" style={{ color: '#F6F8FF' }}>Tiempo restante</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Special Card Unlock */}
                    <motion.div 
                      className="unlocked-card p-6 rounded-2xl border"
                      style={{ 
                        background: 'rgba(194, 124, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        borderColor: 'rgba(194, 124, 255, 0.3)',
                        boxShadow: '0 0 30px rgba(194, 124, 255, 0.2)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="text-5xl mb-4">🎁</div>
                      <h4 className="text-xl font-bold mb-4" style={{ color: '#C27CFF' }}>
                        ¡Cartas AR desbloqueadas!
                      </h4>
                      <div className="special-card p-4 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <h5 className="font-bold mb-2" style={{ color: '#F6F8FF' }}>🌬️💌 El Susurro del Ahorro</h5>
                        <p className="text-sm" style={{ color: '#F6F8FF', opacity: 0.8 }}>
                          Una carta especial que susurra los secretos del viento para ahorrar energía.
                        </p>
                      </div>
                      <p className="text-sm" style={{ color: '#A9FF9F' }}>
                        + {quizState.unlockedCards.length} cartas más disponibles en tu colección
                      </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="results-actions space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          onClick={resetQuiz}
                          className="px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                          style={{
                            background: 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)',
                            color: '#F6F8FF',
                            boxShadow: '0 0 20px rgba(194, 124, 255, 0.4)'
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 0 30px rgba(194, 124, 255, 0.6)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <RotateCcw size={20} />
                          🔁 Volver a jugar
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleTabChange('ar-cards')}
                          className="px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                          style={{
                            background: 'rgba(169, 255, 159, 0.15)',
                            color: '#A9FF9F',
                            border: '1px solid rgba(169, 255, 159, 0.3)'
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            background: 'rgba(169, 255, 159, 0.25)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Smartphone size={20} />
                          📱 Ver tus Cartas AR
                        </motion.button>
                      </div>
                      
                      <motion.button
                        onClick={() => navigate('/nivel/kallpuna')}
                        className="px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
                        style={{
                          background: 'rgba(112, 212, 255, 0.15)',
                          color: '#70D4FF',
                          border: '1px solid rgba(112, 212, 255, 0.3)'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          background: 'rgba(112, 212, 255, 0.25)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-yellow-400">⭐</span>
                        📚 Explorar historias Kallpuna
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Pantalla de resultados */}
            {quizState.isCompleted && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8"
              >
                <motion.div
                  className="rounded-3xl p-8 border shadow-2xl max-w-2xl mx-auto"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(112, 212, 255, 0.3)',
                    boxShadow: '0 0 40px rgba(194, 124, 255, 0.2)'
                  }}
                >
                  {/* Medalla */}
                  <motion.div
                    className="mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Trophy size={80} style={{ color: '#C27CFF', margin: '0 auto' }} />
                  </motion.div>

                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#F6F8FF' }}>
                    ¡Guardiana/Guardián del Viento!
                  </h2>

                  {/* Resumen */}
                  <div className="space-y-4 mb-8">
                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(169, 255, 159, 0.1)',
                        border: '1px solid rgba(169, 255, 159, 0.2)'
                      }}
                    >
                      <p className="text-lg font-semibold" style={{ color: '#A9FF9F' }}>
                        Aciertos: {quizState.correctAnswers}/{quizQuestions.length}
                      </p>
                    </div>
                    
                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(112, 212, 255, 0.1)',
                        border: '1px solid rgba(112, 212, 255, 0.2)'
                      }}
                    >
                      <p className="text-lg font-semibold" style={{ color: '#70D4FF' }}>
                        Cartas vistas en AR: 0/{arCards.length}
                      </p>
                    </div>

                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: 'rgba(194, 124, 255, 0.1)',
                        border: '1px solid rgba(194, 124, 255, 0.2)'
                      }}
                    >
                      <p className="text-lg font-semibold" style={{ color: '#C27CFF' }}>
                        ¡Has aprendido a ser un verdadero guardián de la energía!
                      </p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={resetQuiz}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #C27CFF 0%, #70D4FF 100%)',
                        boxShadow: '0 0 20px rgba(194, 124, 255, 0.4)'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(194, 124, 255, 0.6)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw size={20} />
                      Volver a jugar
                    </motion.button>

                    <motion.button
                      onClick={() => handleTabChange('ar-cards')}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: '#F6F8FF',
                        border: '1px solid rgba(112, 212, 255, 0.3)'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        background: 'rgba(255,255,255,0.15)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Smartphone size={20} />
                      Ver Cartas AR
                    </motion.button>

                    <motion.button
                      onClick={() => navigate('/nivel/kallpuna')}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#C27CFF',
                        border: '1px solid rgba(194, 124, 255, 0.3)'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        background: 'rgba(255,255,255,0.1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">🌬️</span>
                      Explorar cuentos Kallpuna
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WayraLevel;