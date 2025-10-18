import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IntiLevel = () => {
  const navigate = useNavigate();
  const gameAreaRef = useRef(null);
  const audioContextRef = useRef(null);
  
  const [gameState, setGameState] = useState('tutorial');
  const [solarConsciousness, setSolarConsciousness] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [intiPosition, setIntiPosition] = useState({ x: 50, y: 80 });
  const [fallingObjects, setFallingObjects] = useState([]);
  const [particles, setParticles] = useState([]);
  const [currentTip, setCurrentTip] = useState(0);
  const [showLegend, setShowLegend] = useState(false);
  const [floatingMessage, setFloatingMessage] = useState(null);
  const [consecutiveHits, setConsecutiveHits] = useState(0);
  const [backgroundBrightness, setBackgroundBrightness] = useState(1);
  const [victoryEffects, setVictoryEffects] = useState(false);
  const [starParticles, setStarParticles] = useState([]);
  
  // Estados para microinteracciones de la barra
  const [barLuminousWave, setBarLuminousWave] = useState(false);
  const [barShake, setBarShake] = useState(false);
  const [barGoldenParticles, setBarGoldenParticles] = useState([]);
  
  // Estados para controles "Brillo Solar"
  const [leftButtonPressed, setLeftButtonPressed] = useState(false);
  const [rightButtonPressed, setRightButtonPressed] = useState(false);
  const [leftButtonRipple, setLeftButtonRipple] = useState(false);
  const [rightButtonRipple, setRightButtonRipple] = useState(false);
  const [leftButtonParticles, setLeftButtonParticles] = useState([]);
  const [rightButtonParticles, setRightButtonParticles] = useState([]);
  const [leftButtonHeld, setLeftButtonHeld] = useState(false);
  const [rightButtonHeld, setRightButtonHeld] = useState(false);
  
  // Estados para botón "Volver" con efectos solares
  const [backButtonHovered, setBackButtonHovered] = useState(false);
  const [backButtonPressed, setBackButtonPressed] = useState(false);
  const [backButtonFocused, setBackButtonFocused] = useState(false);
  const [backButtonRipple, setBackButtonRipple] = useState(false);
  const [backButtonSolarTrace, setBackButtonSolarTrace] = useState(false);
  const [backButtonParticles, setBackButtonParticles] = useState([]);
  const [backButtonReflection, setBackButtonReflection] = useState(false);
  
  // Estados para efectos interactivos del Valle Solar
  const [valleyBrightness, setValleyBrightness] = useState(1);
  const [flowersGlow, setFlowersGlow] = useState(false);
  const [housesWarmLight, setHousesWarmLight] = useState(false);
  const [auroraVisible, setAuroraVisible] = useState(false);
  const [groundSaturation, setGroundSaturation] = useState(1);
  const [solarPanelsGlow, setSolarPanelsGlow] = useState(false);

  // Estados para temporizador "Pulso Solar"
  const [timerTick, setTimerTick] = useState(false);
  const [timerThresholdFlash, setTimerThresholdFlash] = useState(null);
  const [timerPulse, setTimerPulse] = useState(false);
  const [timerShake, setTimerShake] = useState(false);
  const [previousTimeLeft, setPreviousTimeLeft] = useState(120);
  const [supportPhrase, setSupportPhrase] = useState(null);
  const [timerCollapsed, setTimerCollapsed] = useState(false);

  const solarTips = [
    "🌱 Apagar una luz también ilumina el planeta.",
    "💛 Aprovecha el sol y cuida tu energía.",
    "🌤️ Los pequeños cambios hacen grandes diferencias.",
    "☀️ El sol nos da energía gratis todos los días.",
    "🌪️ El viento y el sol trabajan juntos por un futuro limpio."
  ];

  const objectTypes = {
    solarRay: { emoji: '☀️', points: 5, type: 'positive', name: 'Rayo Solar' },
    greenBulb: { emoji: '💡', points: 10, type: 'positive', name: 'Foco Verde LED', color: '#10B981' },
    windSwirl: { emoji: '🌪️', points: 8, type: 'positive', name: 'Remolino Eólico', color: '#3B82F6' },
    brownBulb: { emoji: '💡', points: -5, type: 'negative', name: 'Foco Ineficiente', color: '#8B4513' },
    greyPlug: { emoji: '🔌', points: -10, type: 'negative', name: 'Enchufe Desperdiciado', color: '#6B7280' },
    factory: { emoji: '🏭', points: -8, type: 'negative', name: 'Energía Contaminante', color: '#374151' }
  };

  const positiveMessages = [
    "✨ ¡Buena práctica! ¡Cada rayo cuenta!",
    "🌞 ¡El sol te recompensa con energía limpia!",
    "🌪️ ¡El viento se une a tu causa!",
    "💚 ¡Excelente elección energética!",
    "🌟 ¡Sigues iluminando el valle!"
  ];

  const negativeMessages = [
    "⚠️ ¡Ups! Esa energía no ayuda al planeta.",
    "⚡ Desenchufa lo que no usas, ¡ahorras más de lo que imaginas!",
    "🏭 Evita la energía contaminante.",
    "🔌 Los enchufes sin uso drenan energía."
  ];

  const getSolarIcon = (percentage) => {
    if (percentage === 100) return '🌈';
    if (percentage >= 71) return '🌞';
    if (percentage >= 31) return '🌤️';
    return '🌑';
  };

  // Función para crear partículas doradas de la barra
  const createBarGoldenParticles = () => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: 50,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 3 - 1,
      life: 1,
      size: Math.random() * 2 + 1
    }));
    
    setBarGoldenParticles(prev => [...prev, ...newParticles]);
    
    // Limpiar partículas después de la animación
    setTimeout(() => {
      setBarGoldenParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  };

  // Función para activar onda luminosa
  const triggerLuminousWave = () => {
    setBarLuminousWave(true);
    setTimeout(() => setBarLuminousWave(false), 400);
  };

  // Función para activar temblor de la barra
  const triggerBarShake = () => {
    setBarShake(true);
    setTimeout(() => setBarShake(false), 200);
  };

  // Crear partículas de estrella para efectos especiales
  const createStarParticles = (x, y, count = 8) => {
    const colors = ['#FFF8E1', '#FDE68A', '#FFD54F', '#FFEB3B'];
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      size: Math.random() * 4 + 2,
      twinkle: Math.random() * Math.PI * 2
    }));

    setStarParticles(prev => [...prev, ...newStars]);
  };

  // Efectos de sonido usando Web Audio API
  const playSound = (type) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (type) {
      case 'positive':
        // Sonido "pim!" brillante
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
        break;
      
      case 'streak':
        // Sonido "pum-pum!" alegre
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
      
      case 'negative':
        // Sonido "buzz" eléctrico suave
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
      
      case 'victory':
        // Sonido "ta-da!" solar triunfal
        oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.2); // E5
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.4); // G5
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.8);
        break;
      
      case 'crystal':
        // Sonido "pim" cristalino para controles
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime); // -20 dB aproximadamente
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.12);
        break;
      
      case 'ting':
        // Sonido "ting" suave para hover del botón volver
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.06);
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime); // -24 dB aproximadamente
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;
      
      case 'pum-pim':
        // Sonido "pum-pim" alegre para clic del botón volver
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.08);
        oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.16);
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.24);
        break;
      
      case 'pip':
        // Sonido "pip" corto para últimos 10 segundos del temporizador
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime); // Volumen bajo
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;
      
      case 'ta-da':
        // Campanilla "ta-da" para cuando el tiempo se agota
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15); // E5
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.3); // G5
        oscillator.frequency.setValueAtTime(1047, ctx.currentTime + 0.45); // C6
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.6);
        break;
      
      case 'threshold-hint':
        // Hint sonoro muy breve para cambio de umbral
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.04);
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime); // Muy suave
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.06);
        break;
    }
  };

  // Funciones para efectos del temporizador "Pulso Solar"
  const getTimerColor = (timeLeft) => {
    if (timeLeft > 60) return '#10B981'; // Verde
    if (timeLeft > 10) return '#F59E0B'; // Ámbar
    return '#EF4444'; // Rojo
  };

  const getTimerIcon = (timeLeft) => {
    if (timeLeft > 60) return '✅';
    if (timeLeft > 10) return '⚠️';
    return '⛔';
  };

  const getSupportPhrase = (timeLeft) => {
    if (timeLeft > 60) return '⏳ ¡Buen ritmo!';
    if (timeLeft > 10) return '⚡ ¡Aprovecha cada rayo!';
    return '🌞 ¡Últimos segundos, tú puedes!';
  };

  const triggerTimerTick = () => {
    setTimerTick(true);
    setTimeout(() => setTimerTick(false), 100);
  };

  const triggerThresholdFlash = (color) => {
    setTimerThresholdFlash(color);
    setTimeout(() => setTimerThresholdFlash(null), 120);
  };

  const triggerTimerPulse = () => {
    setTimerPulse(true);
    setTimeout(() => setTimerPulse(false), 1000);
  };

  const triggerTimerShake = () => {
    setTimerShake(true);
    setTimeout(() => setTimerShake(false), 200);
  };

  const updateSupportPhrase = (timeLeft) => {
    const phrase = getSupportPhrase(timeLeft);
    setSupportPhrase(phrase);
    setTimeout(() => setSupportPhrase(null), 3000);
  };

  // Funciones para efectos del botón "Volver"
  const createBackButtonParticles = () => {
    const particles = [];
    for (let i = 0; i < 6; i++) {
      particles.push({
        id: Date.now() + i,
        x: Math.random() * 20 - 10, // -10 a 10 px del centro
        y: Math.random() * 12 - 6,
        opacity: 1,
        scale: Math.random() * 0.4 + 0.3,
        velocityX: -Math.random() * 2 - 1 // Hacia la izquierda
      });
    }
    
    setBackButtonParticles(particles);
    setTimeout(() => setBackButtonParticles([]), 500);
  };

  const triggerBackButtonSolarTrace = () => {
    setBackButtonSolarTrace(true);
    setTimeout(() => setBackButtonSolarTrace(false), 400);
  };

  const triggerBackButtonRipple = () => {
    setBackButtonRipple(true);
    setTimeout(() => setBackButtonRipple(false), 250);
  };

  const triggerBackButtonReflection = () => {
    setBackButtonReflection(true);
    setTimeout(() => setBackButtonReflection(false), 1200);
  };

  const handleBackButtonClick = () => {
    // Sonido alegre
    playSound('pum-pim');
    
    // Efectos visuales
    triggerBackButtonRipple();
    triggerBackButtonSolarTrace();
    createBackButtonParticles();
    
    // Estado de presionado
    setBackButtonPressed(true);
    setTimeout(() => setBackButtonPressed(false), 100);
    
    // Navegación
    setTimeout(() => navigate('/'), 150);
  };

  const handleBackButtonHover = () => {
    if (!backButtonHovered) {
      playSound('ting');
      triggerBackButtonReflection();
      setBackButtonHovered(true);
    }
  };

  // Funciones para micro-interacciones de controles "Brillo Solar"
  const createButtonParticles = (buttonSide) => {
    const particles = [];
    for (let i = 0; i < 8; i++) {
      particles.push({
        id: Date.now() + i,
        x: Math.random() * 16 - 8, // -8 a 8 px del centro
        y: Math.random() * 16 - 8,
        opacity: 1,
        scale: Math.random() * 0.5 + 0.5
      });
    }
    
    if (buttonSide === 'left') {
      setLeftButtonParticles(particles);
      setTimeout(() => setLeftButtonParticles([]), 360);
    } else {
      setRightButtonParticles(particles);
      setTimeout(() => setRightButtonParticles([]), 360);
    }
  };

  const triggerButtonRipple = (buttonSide) => {
    if (buttonSide === 'left') {
      setLeftButtonRipple(true);
      setTimeout(() => setLeftButtonRipple(false), 260);
    } else {
      setRightButtonRipple(true);
      setTimeout(() => setRightButtonRipple(false), 260);
    }
  };

  const handleButtonPress = (direction) => {
    // Sonido cristalino
    playSound('crystal');
    
    // Efectos visuales
    triggerButtonRipple(direction);
    createButtonParticles(direction);
    
    // Movimiento del personaje
    moveInti(direction);
    
    // Estado de presionado
    if (direction === 'left') {
      setLeftButtonPressed(true);
      setTimeout(() => setLeftButtonPressed(false), 100);
    } else {
      setRightButtonPressed(true);
      setTimeout(() => setRightButtonPressed(false), 100);
    }
  };

  // Función para obtener el gradiente dinámico del fondo
  const getBackgroundGradient = () => {
    const brightness = backgroundBrightness;
    const progress = solarConsciousness;
    
    if (progress < 30) {
      return `linear-gradient(135deg, 
        rgba(255, 248, 220, ${brightness}) 0%, 
        rgba(253, 230, 138, ${brightness}) 50%, 
        rgba(251, 186, 116, ${brightness}) 100%)`;
    } else if (progress < 70) {
      return `linear-gradient(135deg, 
        rgba(253, 230, 138, ${brightness}) 0%, 
        rgba(251, 186, 116, ${brightness}) 30%, 
        rgba(245, 158, 11, ${brightness}) 70%, 
        rgba(250, 204, 21, ${brightness}) 100%)`;
    } else {
      return `linear-gradient(135deg, 
        rgba(251, 186, 116, ${brightness}) 0%, 
        rgba(245, 158, 11, ${brightness}) 20%, 
        rgba(250, 204, 21, ${brightness}) 50%, 
        rgba(253, 224, 71, ${brightness}) 80%, 
        rgba(255, 255, 255, ${brightness * 0.3}) 100%)`;
    }
  };

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(120);
    setSolarConsciousness(0);
    setScore(0);
    setFallingObjects([]);
    setParticles([]);
    setFloatingMessage(null);
    setConsecutiveHits(0);
    setBackgroundBrightness(1);
    setVictoryEffects(false);
    setStarParticles([]);
  };

  const resetGame = () => {
    setGameState('tutorial');
    setSolarConsciousness(0);
    setScore(0);
    setTimeLeft(120);
    setFallingObjects([]);
    setParticles([]);
    setFloatingMessage(null);
    setConsecutiveHits(0);
    setBackgroundBrightness(1);
    setVictoryEffects(false);
    setStarParticles([]);
  };

  const showFloatingMessage = (message, type) => {
    setFloatingMessage({ text: message, type, id: Date.now() });
    setTimeout(() => setFloatingMessage(null), 2000);
  };

  const createParticles = (x, y, colors) => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      size: Math.random() * 3 + 1
    }));

    setParticles(prev => [...prev, ...newParticles]);
  };

  const checkCollisions = () => {
    const intiRect = {
      x: intiPosition.x - 3,
      y: intiPosition.y - 3,
      width: 6,
      height: 6
    };

    setFallingObjects(prev => {
      const remaining = [];
      let scoreChange = 0;
      let consciousnessChange = 0;

      prev.forEach(obj => {
        const objRect = {
          x: obj.x - 2,
          y: obj.y - 2,
          width: 4,
          height: 4
        };

        if (
          intiRect.x < objRect.x + objRect.width &&
          intiRect.x + intiRect.width > objRect.x &&
          intiRect.y < objRect.y + objRect.height &&
          intiRect.y + intiRect.height > objRect.y
        ) {
          const objType = objectTypes[obj.type];
          scoreChange += objType.points;
          
          if (objType.type === 'positive') {
            consciousnessChange += Math.abs(objType.points);
            setConsecutiveHits(prev => prev + 1);
            
            // Efectos visuales positivos
            createParticles(obj.x, obj.y, ['#FFF8DC', '#FFD700', '#FFEB3B']);
            createStarParticles(obj.x, obj.y, 5);
            
            // Sonidos positivos
            playSound('positive');
            
            // Efectos específicos de la barra
            triggerLuminousWave();
            createBarGoldenParticles();
            
            // Mensaje flotante positivo
            const message = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
            showFloatingMessage(message, 'positive');
            
            // Efecto de racha
            if (consecutiveHits > 0 && (consecutiveHits + 1) % 3 === 0) {
              playSound('streak');
              createStarParticles(obj.x, obj.y, 12);
              showFloatingMessage('¡Excelente energía limpia! ⚡', 'streak');
            }

            // Efectos interactivos del Valle Solar
            setFlowersGlow(true);
            setTimeout(() => setFlowersGlow(false), 1500);
            
            setGroundSaturation(prev => Math.min(1.3, prev + 0.05));
            setTimeout(() => setGroundSaturation(1), 2000);
            
            setSolarPanelsGlow(true);
            setTimeout(() => setSolarPanelsGlow(false), 1000);
            
          } else {
            consciousnessChange -= Math.abs(objType.points);
            setConsecutiveHits(0);
            
            // Efectos visuales negativos
            createParticles(obj.x, obj.y, ['#8B4513', '#6B7280', '#374151']);
            
            // Flash sepia y pérdida de brillo
            setBackgroundBrightness(0.7);
            setTimeout(() => setBackgroundBrightness(1), 500);
            
            // Sonidos negativos
            playSound('negative');
            
            // Efectos específicos de la barra
            triggerBarShake();
            
            // Mensaje flotante negativo
            const message = negativeMessages[Math.floor(Math.random() * negativeMessages.length)];
            showFloatingMessage(message, 'negative');
          }
        } else {
          remaining.push(obj);
        }
      });

      if (scoreChange !== 0) {
        setScore(prev => Math.max(0, prev + scoreChange));
      }
      
      if (consciousnessChange !== 0) {
        setSolarConsciousness(prev => Math.max(0, Math.min(100, prev + consciousnessChange)));
      }

      return remaining;
    });
  };

  const moveInti = (direction) => {
    setIntiPosition(prev => {
      const newX = direction === 'left' 
        ? Math.max(5, prev.x - 8)
        : Math.min(85, prev.x + 8);
      return { ...prev, x: newX };
    });
  };

  // Efectos y useEffects
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      const objectTypeKeys = Object.keys(objectTypes);
      const randomType = objectTypeKeys[Math.floor(Math.random() * objectTypeKeys.length)];
      
      const newObject = {
        id: Date.now() + Math.random(),
        type: randomType,
        x: Math.random() * 80 + 10,
        y: -5,
        speed: Math.random() * 1.5 + 1,
        rotation: 0
      };

      setFallingObjects(prev => [...prev, newObject]);
    }, 1200);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setFallingObjects(prev => 
        prev.map(obj => ({ 
          ...obj, 
          y: obj.y + obj.speed,
          rotation: obj.rotation + 2
        })).filter(obj => obj.y < 100)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev <= 1 ? 0 : prev - 1;
        
        // Efectos visuales y sonoros del temporizador
        if (newTime > 0) {
          // Tick visual cada segundo
          triggerTimerTick();
          
          // Detectar cambio de umbral
          const prevColor = getTimerColor(prev);
          const newColor = getTimerColor(newTime);
          if (prevColor !== newColor) {
            triggerThresholdFlash(newColor);
            playSound('threshold-hint');
            updateSupportPhrase(newTime);
          }
          
          // Pulsos según el umbral
          if (newTime <= 10) {
            // Rojo: pulso 2x por segundo + shake sutil
            triggerTimerPulse();
            if (newTime <= 10) triggerTimerShake();
            playSound('pip'); // Pip en últimos 10 segundos
          } else if (newTime <= 60) {
            // Ámbar: pulso ligero cada segundo
            triggerTimerPulse();
          } else if (newTime % 5 === 0) {
            // Verde: brillo suave cada 5 segundos
            triggerTimerPulse();
          }
        } else {
          // Tiempo agotado
          setTimerCollapsed(true);
          playSound('ta-da');
          setGameState('defeat');
        }
        
        setPreviousTimeLeft(prev);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % solarTips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Actualizar partículas normales
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.015,
          size: p.size * 0.98
        })).filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Actualizar partículas de estrella
  useEffect(() => {
    const interval = setInterval(() => {
      setStarParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02,
          size: p.size * 0.99,
          twinkle: p.twinkle + 0.2
        })).filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Efectos de victoria
  useEffect(() => {
    if (solarConsciousness === 100 && !victoryEffects) {
      setVictoryEffects(true);
      playSound('victory');
      
      // Efectos del Valle Solar al 100%
      setAuroraVisible(true);
      setHousesWarmLight(true);
      
      // Crear lluvia de estrellas
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          createStarParticles(Math.random() * 100, -10, 3);
        }, i * 100);
      }
      
      setTimeout(() => {
        setGameState('victory');
      }, 2000);
    }
  }, [solarConsciousness, victoryEffects]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handleButtonPress('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleButtonPress('right');
      }
    };

    const handleGlobalKeyPress = (e) => {
      // Manejo de teclas para el botón "Volver"
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        handleBackButtonClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(checkCollisions, 50);
      return () => clearInterval(interval);
    }
  }, [gameState, fallingObjects, intiPosition, consecutiveHits]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Capa 1 - Fondo cósmico cálido con movimiento */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: getBackgroundGradient()
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Capa 1 - Suelo y pasto del Valle Solar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, #06603A 10%, #1B8F5A 80%), 
                      linear-gradient(to top, rgba(255, 215, 91, 0.25) 0%, transparent 100%)`,
          filter: `saturate(${groundSaturation})`,
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Ondulaciones suaves del suelo */}
        <svg viewBox="0 0 1200 128" className="absolute bottom-0 w-full h-full opacity-30">
          <path
            d="M0,128 Q300,100 600,110 T1200,105 L1200,128 Z"
            fill="rgba(255,255,255,0.1)"
          />
          <path
            d="M0,128 Q200,95 400,105 T800,100 Q1000,95 1200,100 L1200,128 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>

        {/* Brillitos dispersos animados */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              backgroundColor: 'rgba(255,255,200,0.15)',
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Flores emoji con animación de balanceo */}
        {Array.from({ length: 6 }).map((_, i) => {
          const flowers = ['🌸', '🌼', '🌻'];
          const flower = flowers[i % flowers.length];
          return (
            <motion.div
              key={`flower-${i}`}
              className="absolute text-lg"
              style={{
                left: `${15 + (i * 15) + Math.random() * 10}%`,
                bottom: `${20 + Math.random() * 40}%`,
                filter: flowersGlow ? 'drop-shadow(0 0 8px #FFD700)' : 'none'
              }}
              animate={{
                rotate: [-2, 3, -2],
                scale: flowersGlow ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {flower}
            </motion.div>
          );
        })}
      </div>

      {/* Capa 2 - Estrellitas y brillos suaves flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: solarConsciousness < 30 ? 15 : solarConsciousness < 70 ? 25 : 40 }).map((_, i) => (
          <motion.div
            key={`floating-star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              backgroundColor: '#FFF8E1',
              boxShadow: '0 0 6px rgba(255, 248, 225, 0.8)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              opacity: Math.random() * 0.3 + 0.2
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Capa 3 - Destellos solares dinámicos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: Math.floor(solarConsciousness / 20) + 1 }).map((_, i) => (
          <motion.div
            key={`solar-flare-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              backgroundColor: `rgba(255, 220, 120, ${0.15 + (solarConsciousness / 100) * 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Capa 4 - Montañas andinas con parallax y ondas de calor */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-48"
        animate={{
          x: [0, -10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 1200 200" className="w-full h-full">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={`rgba(16, 185, 129, ${0.8 + solarConsciousness / 500})`} />
              <stop offset="50%" stopColor={`rgba(6, 95, 70, ${0.9 + solarConsciousness / 1000})`} />
              <stop offset="100%" stopColor={`rgba(4, 120, 87, ${0.95})`} />
            </linearGradient>
            {/* Gradiente para montañas lejanas */}
            <linearGradient id="distantMountains" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F9A8D4" />
            </linearGradient>
            <filter id="heatWave">
              <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
            </filter>
          </defs>
          
          {/* Montañas lejanas con gradiente lila/melocotón */}
          <path
            d="M0,200 L0,140 L150,110 L300,120 L450,100 L600,115 L750,95 L900,105 L1050,90 L1200,100 L1200,200 Z"
            fill="url(#distantMountains)"
            opacity="0.4"
          />
          
          {/* Montañas principales */}
          <path
            d="M0,200 L0,120 L200,80 L400,100 L600,60 L800,90 L1000,50 L1200,80 L1200,200 Z"
            fill="url(#mountainGradient)"
            filter="url(#heatWave)"
          />
          
          {/* Reflejos dorados en los bordes */}
          <path
            d="M0,120 L200,80 L400,100 L600,60 L800,90 L1000,50 L1200,80"
            stroke={`rgba(255, 215, 0, ${0.3 + solarConsciousness / 200})`}
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Aurora arcoíris al 100% de conciencia solar */}
        <AnimatePresence>
          {auroraVisible && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <svg viewBox="0 0 1200 128" className="w-full h-full">
                <defs>
                  <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 0, 150, 0.3)" />
                    <stop offset="20%" stopColor="rgba(255, 100, 0, 0.3)" />
                    <stop offset="40%" stopColor="rgba(255, 255, 0, 0.3)" />
                    <stop offset="60%" stopColor="rgba(0, 255, 100, 0.3)" />
                    <stop offset="80%" stopColor="rgba(0, 150, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(150, 0, 255, 0.3)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,128 Q200,80 400,90 T800,85 Q1000,80 1200,90 L1200,128 Z"
                  fill="url(#auroraGradient)"
                  animate={{
                    d: [
                      "M0,128 Q200,80 400,90 T800,85 Q1000,80 1200,90 L1200,128 Z",
                      "M0,128 Q200,70 400,85 T800,75 Q1000,70 1200,85 L1200,128 Z",
                      "M0,128 Q200,80 400,90 T800,85 Q1000,80 1200,90 L1200,128 Z"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Capa 5 - Fondo atmosférico superior */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Luz radial desde el centro superior */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,180,0.2) 0%, transparent 70%)'
          }}
        />
        
        {/* Estrellas diminutas con parallax */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`tiny-star-${i}`}
            className="absolute rounded-full"
            style={{
              width: '1px',
              height: '1px',
              backgroundColor: '#FFFDEE',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: Math.random() * 0.2 + 0.1
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Casas del Valle Solar con paneles solares y efectos mejorados */}
      {/* Casa 1 - Primer plano izquierda */}
      <motion.div 
        className="absolute bottom-12 left-1/4 text-3xl"
        animate={{
          scale: [1, 1.05, 1],
          filter: [`brightness(${1 + solarConsciousness / 200})`, 
                  housesWarmLight ? 'drop-shadow(0 0 15px #FFD700)' : `brightness(${1 + solarConsciousness / 200})`]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          🏠
          {/* Panel solar en el techo */}
          <motion.div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs"
            animate={{
              filter: solarPanelsGlow ? 'drop-shadow(0 0 6px #FACC15)' : 'none'
            }}
          >
            ☀️
          </motion.div>
          {/* Sombra proyectada */}
          <div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 rounded-full opacity-30"
            style={{ backgroundColor: '#FFD38C' }}
          />
          {/* Humo solar dorado opcional */}
          {solarConsciousness > 50 && (
            <motion.div
              className="absolute -top-3 right-0 text-xs"
              animate={{
                y: [0, -10, -20],
                opacity: [0.8, 0.4, 0],
                scale: [0.5, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              ✨
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Casa 2 - Segundo plano derecha */}
      <motion.div 
        className="absolute bottom-16 right-1/3 text-2xl"
        animate={{
          y: [0, -3, 0],
          filter: [`brightness(${1 + solarConsciousness / 200})`,
                  housesWarmLight ? 'drop-shadow(0 0 12px #FFD700)' : `brightness(${1 + solarConsciousness / 200})`]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          🏘️
          <motion.div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs"
            animate={{
              filter: solarPanelsGlow ? 'drop-shadow(0 0 6px #FACC15)' : 'none'
            }}
          >
            ☀️
          </motion.div>
          <div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full opacity-25"
            style={{ backgroundColor: '#FFD38C' }}
          />
        </div>
      </motion.div>

      {/* Casa 3 - Primer plano derecha */}
      <motion.div 
        className="absolute bottom-10 left-2/3 text-3xl"
        animate={{
          scale: [1, 1.03, 1],
          filter: [`brightness(${1 + solarConsciousness / 200})`,
                  housesWarmLight ? 'drop-shadow(0 0 15px #FFD700)' : `brightness(${1 + solarConsciousness / 200})`]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          🏡
          <motion.div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs"
            animate={{
              filter: solarPanelsGlow ? 'drop-shadow(0 0 6px #FACC15)' : 'none'
            }}
          >
            ☀️
          </motion.div>
          <div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 rounded-full opacity-30"
            style={{ backgroundColor: '#FFD38C' }}
          />
        </div>
      </motion.div>

      {/* Casa 4 - Fondo pequeña */}
      <motion.div 
        className="absolute bottom-18 left-1/2 text-xl"
        animate={{
          scale: [0.6, 0.63, 0.6],
          filter: [`brightness(${1 + solarConsciousness / 200})`,
                  housesWarmLight ? 'drop-shadow(0 0 10px #FFD700)' : `brightness(${1 + solarConsciousness / 200})`]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          🏠
          <motion.div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs"
            animate={{
              filter: solarPanelsGlow ? 'drop-shadow(0 0 4px #FACC15)' : 'none'
            }}
          >
            ☀️
          </motion.div>
          <div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full opacity-20"
            style={{ backgroundColor: '#FFD38C' }}
          />
        </div>
      </motion.div>

      {/* Elementos decorativos de energía */}
      {/* Molinillo eólico mini */}
      <motion.div 
        className="absolute bottom-20 left-1/6 text-2xl"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ color: '#87CEEB' }}
      >
        ⚙️
      </motion.div>

      {/* Conectores eléctricos discretos */}
      <motion.div 
        className="absolute bottom-8 right-1/5 text-lg opacity-60"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🔌
      </motion.div>

      <motion.div 
        className="absolute bottom-6 left-1/3 text-sm opacity-60"
        animate={{
          opacity: [0.6, 0.4, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🔌
      </motion.div>

      {/* Partículas de juego existentes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              opacity: particle.life,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Partículas de estrella especiales */}
      <div className="absolute inset-0 pointer-events-none">
        {starParticles.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.life * (0.5 + 0.5 * Math.sin(star.twinkle)),
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`
            }}
          />
        ))}
      </div>

      {/* Efectos de victoria - Explosión radial */}
      {victoryEffects && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 215, 0, 0.4) 30%, transparent 70%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 3 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          {/* Arcoíris suave */}
          <motion.div
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
            style={{
              width: '300px',
              height: '150px',
              background: 'linear-gradient(90deg, rgba(255,0,0,0.3), rgba(255,165,0,0.3), rgba(255,255,0,0.3), rgba(0,255,0,0.3), rgba(0,0,255,0.3), rgba(75,0,130,0.3), rgba(238,130,238,0.3))',
              borderRadius: '150px 150px 0 0',
              filter: 'blur(2px)'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
      )}

      {/* HUD Superior */}
      {gameState === 'playing' && (
        <div className="absolute top-0 left-0 right-0 z-30 p-6">
          <div className="flex justify-between items-start">
            {/* Botón "Volver" con estilo Lumina Solar Glow */}
            <motion.button
              onClick={handleBackButtonClick}
              onMouseEnter={handleBackButtonHover}
              onMouseLeave={() => setBackButtonHovered(false)}
              onFocus={() => setBackButtonFocused(true)}
              onBlur={() => setBackButtonFocused(false)}
              className="relative flex items-center gap-3 px-4 py-3 rounded-full overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid transparent',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), linear-gradient(90deg, #FACC15, #FBBF24, #FB923C)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: `
                  0 4px 12px rgba(240, 160, 50, 0.25),
                  ${backButtonHovered ? '0 0 20px rgba(250, 204, 21, 0.4)' : '0 0 8px rgba(250, 204, 21, 0.15)'}
                `,
                minHeight: '44px',
                minWidth: '44px'
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: 0.18, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              animate={{
                boxShadow: backButtonFocused ? [
                  '0 4px 12px rgba(240, 160, 50, 0.25), 0 0 8px rgba(250, 204, 21, 0.15)',
                  '0 4px 12px rgba(240, 160, 50, 0.25), 0 0 20px rgba(250, 204, 21, 0.6)',
                  '0 4px 12px rgba(240, 160, 50, 0.25), 0 0 8px rgba(250, 204, 21, 0.15)'
                ] : undefined
              }}
              transition={{
                boxShadow: { duration: 1.5, repeat: backButtonFocused ? Infinity : 0, ease: "easeInOut" }
              }}
              aria-label="Volver al menú de niveles"
            >
              {/* Reflejo dinámico en hover */}
              <AnimatePresence>
                {(backButtonHovered || backButtonReflection) && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(251, 146, 60, 0.3) 30%, rgba(253, 230, 138, 0.4) 50%, rgba(250, 204, 21, 0.3) 70%, transparent 100%)',
                      transform: 'translateX(-100%)'
                    }}
                    initial={{ transform: 'translateX(-100%)' }}
                    animate={{ 
                      transform: ['translateX(-100%)', 'translateX(100%)'],
                      transition: { duration: 1.2, ease: "easeInOut" }
                    }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* Efecto ripple */}
              <AnimatePresence>
                {backButtonRipple && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ 
                      scale: 2.5, 
                      opacity: 0,
                      transition: { duration: 0.25, ease: "easeOut" }
                    }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* Trazo de Retroceso Solar */}
              <AnimatePresence>
                {backButtonSolarTrace && (
                  <motion.div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2"
                    style={{
                      width: '40px',
                      height: '2px',
                      background: 'linear-gradient(90deg, #FACC15, #FBBF24)',
                      borderRadius: '1px',
                      boxShadow: '0 0 8px rgba(250, 204, 21, 0.8)'
                    }}
                    initial={{ 
                      x: 0, 
                      opacity: 0,
                      scaleX: 0
                    }}
                    animate={{ 
                      x: -40, 
                      opacity: [0, 1, 0],
                      scaleX: [0, 1, 0.8, 0],
                      transition: { duration: 0.4, ease: "easeInOut" }
                    }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* Partículas doradas */}
              <AnimatePresence>
                {backButtonParticles.map(particle => (
                  <motion.div
                    key={particle.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '4px',
                      height: '4px',
                      background: '#FACC15',
                      borderRadius: '50%',
                      boxShadow: '0 0 6px rgba(250, 204, 21, 0.8)'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1, 
                      scale: particle.scale 
                    }}
                    animate={{ 
                      x: particle.x + particle.velocityX * 20,
                      y: particle.y,
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                    exit={{ opacity: 0 }}
                  />
                ))}
              </AnimatePresence>

              {/* Ícono de flecha */}
              <motion.div
                animate={{
                  color: backButtonPressed ? '#FFF8E7' : '#FFF8E7',
                  scale: backButtonPressed ? 0.9 : 1
                }}
                transition={{ duration: 0.1 }}
              >
                <ArrowLeft 
                  size={20} 
                  style={{ 
                    strokeWidth: 2.5,
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }} 
                />
              </motion.div>

              {/* Texto "Volver" */}
              <motion.span 
                className="font-semibold text-sm tracking-wide"
                style={{ 
                  color: '#FFF8E7',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  fontFamily: 'Nunito, sans-serif'
                }}
                animate={{
                  scale: backButtonPressed ? 0.95 : 1
                }}
                transition={{ duration: 0.1 }}
              >
                Volver
              </motion.span>

              {/* Área táctil ampliada (invisible) */}
              <div 
                className="absolute inset-0"
                style={{
                  margin: '-6px',
                  borderRadius: '50px'
                }}
              />
            </motion.button>

            {/* Barra de Conciencia Solar Mejorada */}
            <div className="flex-1 max-w-md mx-8">
              <motion.div 
                className="relative"
                animate={solarConsciousness === 100 ? {
                  scale: [1, 1.05, 1],
                  filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                } : barShake ? {
                  x: [-2, 2, -2, 2, 0]
                } : {}}
                transition={{ 
                  duration: barShake ? 0.2 : 2, 
                  repeat: solarConsciousness === 100 ? Infinity : 0 
                }}
              >
                {/* Contenedor base con glassmorphism y borde holográfico */}
                <motion.div 
                  className="relative backdrop-blur-xl border-2 rounded-full p-4 overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.3),
                      0 8px 32px rgba(240, 180, 80, 0.4)
                    `
                  }}
                  animate={{
                    borderImage: [
                      'linear-gradient(45deg, #FACC15, #F472B6, #60A5FA, #10B981, #FACC15) 1',
                      'linear-gradient(90deg, #F472B6, #60A5FA, #10B981, #FACC15, #F472B6) 1',
                      'linear-gradient(135deg, #60A5FA, #10B981, #FACC15, #F472B6, #60A5FA) 1',
                      'linear-gradient(180deg, #10B981, #FACC15, #F472B6, #60A5FA, #10B981) 1'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {/* Borde holográfico animado */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(45deg, #FACC15, #F472B6, #60A5FA, #10B981, #FACC15)',
                      padding: '2px'
                    }}
                    animate={{
                      background: [
                        'linear-gradient(0deg, #FACC15, #F472B6, #60A5FA, #10B981, #FACC15)',
                        'linear-gradient(90deg, #F472B6, #60A5FA, #10B981, #FACC15, #F472B6)',
                        'linear-gradient(180deg, #60A5FA, #10B981, #FACC15, #F472B6, #60A5FA)',
                        'linear-gradient(270deg, #10B981, #FACC15, #F472B6, #60A5FA, #10B981)',
                        'linear-gradient(360deg, #FACC15, #F472B6, #60A5FA, #10B981, #FACC15)'
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-full" style={{ background: 'rgba(255, 255, 255, 0.12)' }} />
                  </motion.div>

                  {/* Contenido interno */}
                  <div className="relative z-10">
                    {/* Ícono solar dinámico y texto */}
                    <div className="flex items-center gap-3 mb-3">
                      <motion.span 
                        className="text-3xl"
                        animate={solarConsciousness >= 76 ? {
                          scale: [1, 1.2, 1],
                          filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                        } : solarConsciousness >= 51 ? {
                          filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                        } : {}}
                        transition={{ 
                          duration: solarConsciousness === 100 ? 1.5 : 2, 
                          repeat: solarConsciousness >= 51 ? Infinity : 0 
                        }}
                        style={{
                          filter: solarConsciousness >= 76 ? 'drop-shadow(0 0 12px #FFD700)' : 
                                 solarConsciousness >= 51 ? 'drop-shadow(0 0 8px #FACC15)' : 
                                 solarConsciousness >= 26 ? 'drop-shadow(0 0 4px #F59E0B)' : 'none'
                        }}
                      >
                        {getSolarIcon(solarConsciousness)}
                      </motion.span>
                      <motion.span 
                        className="text-white font-bold text-lg"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: '800',
                          textShadow: solarConsciousness === 100 ? 
                            '0 0 12px #FFD700, 0 2px 4px rgba(255, 255, 255, 0.5)' : 
                            '0 2px 4px rgba(255, 255, 255, 0.5)'
                        }}
                        animate={solarConsciousness === 100 ? {
                          textShadow: [
                            '0 0 12px #FFD700, 0 2px 4px rgba(255, 255, 255, 0.5)',
                            '0 0 20px #FFD700, 0 2px 4px rgba(255, 255, 255, 0.8)',
                            '0 0 12px #FFD700, 0 2px 4px rgba(255, 255, 255, 0.5)'
                          ]
                        } : {}}
                        transition={{ duration: 1.5, repeat: solarConsciousness === 100 ? Infinity : 0 }}
                      >
                        Conciencia Solar: {solarConsciousness}%
                      </motion.span>
                    </div>

                    {/* Contenedor de la barra líquida */}
                    <div className="relative w-full h-4 rounded-full overflow-hidden" style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}>
                      {/* Barra líquida brillante con gradientes dinámicos */}
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                        style={{ 
                          width: `${solarConsciousness}%`,
                          background: solarConsciousness >= 75 ? 
                            'linear-gradient(90deg, #FACC15 0%, #FFFACD 50%, #FB923C 100%)' :
                            solarConsciousness >= 25 ?
                            'linear-gradient(90deg, #FDE68A 0%, #FACC15 100%)' :
                            'linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)'
                        }}
                        animate={{
                          background: solarConsciousness >= 75 ? [
                            'linear-gradient(90deg, #FACC15 0%, #FFFACD 50%, #FB923C 100%)',
                            'linear-gradient(90deg, #FB923C 0%, #FACC15 50%, #FFFACD 100%)',
                            'linear-gradient(90deg, #FFFACD 0%, #FB923C 50%, #FACC15 100%)',
                            'linear-gradient(90deg, #FACC15 0%, #FFFACD 50%, #FB923C 100%)'
                          ] : solarConsciousness >= 25 ? [
                            'linear-gradient(90deg, #FDE68A 0%, #FACC15 100%)',
                            'linear-gradient(90deg, #FACC15 0%, #FDE68A 100%)',
                            'linear-gradient(90deg, #FDE68A 0%, #FACC15 100%)'
                          ] : [
                            'linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)',
                            'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
                            'linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)'
                          ],
                          filter: barLuminousWave ? [
                            'brightness(1)',
                            'brightness(1.5)',
                            'brightness(1)'
                          ] : 'brightness(1)'
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {/* Efecto ondulante horizontal */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                            transform: 'skewX(-20deg)'
                          }}
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Reflejo móvil */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                            width: '30%'
                          }}
                          animate={{
                            x: ['-30%', '130%']
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Partículas doradas flotantes */}
                        {Array.from({ length: Math.floor(solarConsciousness / 20) + 1 }).map((_, i) => (
                          <motion.div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                            style={{
                              left: `${10 + i * 15}%`,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              boxShadow: '0 0 4px #FFD700'
                            }}
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.5, 1.2, 0.5],
                              y: [0, -4, 0]
                            }}
                            transition={{
                              duration: 1.5 + Math.random(),
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Partícula viajera */}
                      {solarConsciousness > 0 && (
                        <motion.div
                          className="absolute top-1/2 w-2 h-2 text-xs"
                          style={{ transform: 'translateY(-50%)' }}
                          animate={{
                            x: [`0%`, `${solarConsciousness * 0.9}%`]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          🌞
                        </motion.div>
                      )}
                    </div>

                    {/* Destellos en hitos del 25% */}
                    {[25, 50, 75, 100].map(milestone => (
                      solarConsciousness >= milestone && (
                        <motion.div
                          key={`milestone-${milestone}`}
                          className="absolute right-2 top-1/2 w-2 h-2 bg-white rounded-full"
                          style={{ transform: 'translateY(-50%)' }}
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      )
                    ))}
                  </div>

                  {/* Explosión de luz al 100% */}
                  {solarConsciousness === 100 && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)'
                      }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}

                  {/* Halo solar envolvente al 100% */}
                  {solarConsciousness === 100 && (
                    <motion.div
                      className="absolute -inset-4 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Partículas doradas de la barra */}
                <AnimatePresence>
                  {barGoldenParticles.map(particle => (
                    <motion.div
                      key={particle.id}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full pointer-events-none"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        boxShadow: '0 0 4px #FFD700'
                      }}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{
                        x: particle.vx * 20,
                        y: particle.vy * 20,
                        opacity: 0,
                        scale: 0
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  ))}
                </AnimatePresence>

                {/* Texto alternativo en hover */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-xs text-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  "Tu energía limpia está iluminando el valle."
                </motion.div>
              </motion.div>
            </div>

            {/* Temporizador "Pulso Solar" */}
            <div className="relative">
              <motion.div
                className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `
                    0 0 20px rgba(255, 255, 255, 0.1),
                    inset 0 0 20px rgba(255, 255, 255, 0.05)
                  `
                }}
                animate={{
                  scale: timerShake ? [1, 1.02, 1] : 1,
                  boxShadow: timerThresholdFlash 
                    ? `0 0 30px ${timerThresholdFlash}40, inset 0 0 20px ${timerThresholdFlash}20`
                    : `0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)`
                }}
                transition={{ 
                  scale: { duration: 0.2 },
                  boxShadow: { duration: 0.12 }
                }}
                aria-label={`Tiempo restante: ${Math.floor(timeLeft / 60)} minuto${Math.floor(timeLeft / 60) !== 1 ? 's' : ''} ${timeLeft % 60} segundo${timeLeft % 60 !== 1 ? 's' : ''}`}
              >
                {/* Anillo de progreso */}
                <svg 
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 80 80"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke={getTimerColor(timeLeft)}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - timeLeft / 120)}`}
                    style={{
                      filter: `drop-shadow(0 0 8px ${getTimerColor(timeLeft)}60)`,
                      transition: 'stroke 0.3s ease, stroke-dashoffset 1s linear'
                    }}
                    animate={{
                      opacity: timerTick ? [1, 0.7, 1] : 1,
                      strokeWidth: timerPulse ? [3, 4, 3] : 3,
                      filter: timerPulse 
                        ? `drop-shadow(0 0 12px ${getTimerColor(timeLeft)}80)`
                        : `drop-shadow(0 0 8px ${getTimerColor(timeLeft)}60)`
                    }}
                    transition={{
                      opacity: { duration: 0.1 },
                      strokeWidth: { duration: timeLeft <= 10 ? 0.25 : 1 },
                      filter: { duration: timeLeft <= 10 ? 0.25 : 1 }
                    }}
                  />
                </svg>

                {/* Contenido central */}
                <div className="relative z-10 text-center">
                  {/* Icono de estado */}
                  <div className="text-xs mb-1 opacity-80">
                    {getTimerIcon(timeLeft)}
                  </div>
                  
                  {/* Tiempo */}
                  <motion.div
                    className="text-white font-bold text-sm leading-none"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                    animate={{
                      scale: timerTick ? [1, 1.05, 1] : 1,
                      color: timeLeft === 0 ? '#FFF8E7' : '#FFFFFF'
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {formatTime(timeLeft)}
                  </motion.div>
                </div>

                {/* Efecto de colapso al final */}
                {timerCollapsed && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(255, 248, 231, 0.9)',
                      backdropFilter: 'blur(10px)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>

              {/* Frase de apoyo */}
              <AnimatePresence>
                {supportPhrase && (
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: getTimerColor(timeLeft),
                      textShadow: `0 0 8px ${getTimerColor(timeLeft)}60`
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {supportPhrase}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Consejo solar */}
          <div className="mt-4 text-center">
            <motion.div
              className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2"
              key={currentTip}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white text-sm font-medium">{solarTips[currentTip]}</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Leyenda interactiva */}
      {gameState === 'playing' && (
        <div className="absolute bottom-6 left-6 z-30">
          <motion.button
            onClick={() => setShowLegend(!showLegend)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info size={20} />
          </motion.button>

          <AnimatePresence>
            {showLegend && (
              <motion.div
                className="absolute bottom-16 left-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 w-64"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white font-bold mb-3">Elementos del Juego</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(objectTypes).map(([key, obj]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-lg">{obj.emoji}</span>
                      <span className="text-white/80">{obj.name}</span>
                      <span className={`ml-auto font-bold ${obj.type === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                        {obj.points > 0 ? '+' : ''}{obj.points}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Controles "Brillo Solar" */}
      {gameState === 'playing' && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-8">
          {/* Botón Izquierda */}
          <div className="relative">
            <motion.button
              onClick={() => handleButtonPress('left')}
              onMouseDown={() => setLeftButtonHeld(true)}
              onMouseUp={() => setLeftButtonHeld(false)}
              onMouseLeave={() => setLeftButtonHeld(false)}
              className="relative w-14 h-14 rounded-full overflow-hidden group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-60"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.1),
                  0 4px 12px rgba(0, 0, 0, 0.15),
                  ${leftButtonPressed ? '0 0 20px rgba(250, 204, 21, 0.6)' : '0 0 8px rgba(250, 204, 21, 0.1)'}
                `
              }}
              whileHover={{ 
                y: -2,
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.1),
                  0 6px 16px rgba(0, 0, 0, 0.2),
                  0 0 16px rgba(250, 204, 21, 0.4)
                `
              }}
              whileTap={{ scale: 0.96 }}
              animate={{
                scale: leftButtonPressed ? [1, 0.96, 1] : 1,
                boxShadow: leftButtonPressed ? 
                  `inset 0 1px 2px rgba(255, 255, 255, 0.1),
                   0 4px 12px rgba(0, 0, 0, 0.15),
                   0 0 24px rgba(250, 204, 21, 0.8)` : undefined
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-label="Mover a la izquierda"
            >
              {/* Halo exterior */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(250, 204, 21, ${leftButtonPressed ? '0.3' : '0.1'}) 0%, transparent 70%)`,
                  transform: 'scale(1.5)',
                  opacity: leftButtonPressed ? 1 : 0.5
                }}
              />
              
              {/* Efecto ripple */}
              <AnimatePresence>
                {leftButtonRipple && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: 'rgba(250, 204, 21, 0.6)',
                      background: 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, transparent 70%)'
                    }}
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              
              {/* Icono flecha */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="rgba(255, 248, 231, 0.9)"
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    filter: leftButtonPressed ? 'brightness(1.2) drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))' : 'brightness(0.85)'
                  }}
                >
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </div>
              
              {/* Partículas doradas */}
              <AnimatePresence>
                {leftButtonParticles.map(particle => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FACC15 0%, #FB923C 100%)',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`
                    }}
                    initial={{ opacity: 1, scale: particle.scale }}
                    animate={{ 
                      opacity: 0,
                      y: particle.y - 12,
                      x: particle.x * 1.5,
                      scale: particle.scale * 0.3
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.36, ease: "easeInOut" }}
                  />
                ))}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Botón Derecha */}
          <div className="relative">
            <motion.button
              onClick={() => handleButtonPress('right')}
              onMouseDown={() => setRightButtonHeld(true)}
              onMouseUp={() => setRightButtonHeld(false)}
              onMouseLeave={() => setRightButtonHeld(false)}
              className="relative w-14 h-14 rounded-full overflow-hidden group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-60"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.1),
                  0 4px 12px rgba(0, 0, 0, 0.15),
                  ${rightButtonPressed ? '0 0 20px rgba(250, 204, 21, 0.6)' : '0 0 8px rgba(250, 204, 21, 0.1)'}
                `
              }}
              whileHover={{ 
                y: -2,
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.1),
                  0 6px 16px rgba(0, 0, 0, 0.2),
                  0 0 16px rgba(250, 204, 21, 0.4)
                `
              }}
              whileTap={{ scale: 0.96 }}
              animate={{
                scale: rightButtonPressed ? [1, 0.96, 1] : 1,
                boxShadow: rightButtonPressed ? 
                  `inset 0 1px 2px rgba(255, 255, 255, 0.1),
                   0 4px 12px rgba(0, 0, 0, 0.15),
                   0 0 24px rgba(250, 204, 21, 0.8)` : undefined
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-label="Mover a la derecha"
            >
              {/* Halo exterior */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(250, 204, 21, ${rightButtonPressed ? '0.3' : '0.1'}) 0%, transparent 70%)`,
                  transform: 'scale(1.5)',
                  opacity: rightButtonPressed ? 1 : 0.5
                }}
              />
              
              {/* Efecto ripple */}
              <AnimatePresence>
                {rightButtonRipple && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: 'rgba(250, 204, 21, 0.6)',
                      background: 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, transparent 70%)'
                    }}
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              
              {/* Icono flecha */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="rgba(255, 248, 231, 0.9)"
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    filter: rightButtonPressed ? 'brightness(1.2) drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))' : 'brightness(0.85)'
                  }}
                >
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
              
              {/* Partículas doradas */}
              <AnimatePresence>
                {rightButtonParticles.map(particle => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FACC15 0%, #FB923C 100%)',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`
                    }}
                    initial={{ opacity: 1, scale: particle.scale }}
                    animate={{ 
                      opacity: 0,
                      y: particle.y - 12,
                      x: particle.x * 1.5,
                      scale: particle.scale * 0.3
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.36, ease: "easeInOut" }}
                  />
                ))}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      )}

      {/* Área de juego */}
      <div
        ref={gameAreaRef}
        className="absolute inset-0 z-10"
        style={{ cursor: gameState === 'playing' ? 'none' : 'default' }}
      >
        {/* Inti (personaje) */}
        {gameState === 'playing' && (
          <motion.div
            className="absolute text-5xl pointer-events-none"
            style={{
              left: `${intiPosition.x}%`,
              top: `${intiPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.8))',
              textShadow: '0 0 20px rgba(250, 204, 21, 0.6)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ☀️
          </motion.div>
        )}

        {/* Objetos que caen */}
        {gameState === 'playing' && fallingObjects.map(obj => {
          const objType = objectTypes[obj.type];
          return (
            <motion.div
              key={obj.id}
              className="absolute text-3xl pointer-events-none"
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: 'translate(-50%, -50%)',
                filter: `drop-shadow(0 0 10px ${objType.color || (objType.type === 'positive' ? '#FBBF24' : '#EF4444')})`,
                color: objType.color
              }}
              animate={{
                rotate: obj.rotation,
                scale: [1, 1.1, 1]
              }}
              transition={{
                scale: { duration: 1, repeat: Infinity }
              }}
            >
              {objType.emoji}
            </motion.div>
          );
        })}
      </div>

      {/* Mensaje flotante mejorado */}
      <AnimatePresence>
        {floatingMessage && (
          <motion.div
            className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-bold text-lg z-50 ${
              floatingMessage.type === 'positive' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' :
              floatingMessage.type === 'streak' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
              'bg-gradient-to-r from-red-400 to-orange-500 text-white'
            }`}
            style={{
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {floatingMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up tutorial inicial */}
      <AnimatePresence>
        {gameState === 'tutorial' && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative max-w-2xl mx-4 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 226, 89, 0.9) 0%, rgba(255, 167, 81, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 40px rgba(251, 146, 60, 0.4)',
                padding: '40px 32px'
              }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            >
              {/* Emoji solar animado */}
              <motion.div
                className="text-6xl mb-6 inline-block"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 226, 89, 0.8))',
                  textShadow: '0 0 30px rgba(255, 226, 89, 0.6)'
                }}
              >
                🌞
              </motion.div>

              <h1 className="text-4xl font-black mb-4 text-white" style={{ fontFamily: 'Fredoka One, cursive' }}>
                ¡Desafío Solar Activado!
              </h1>

              <p className="text-lg mb-6 text-white/90 leading-relaxed">
                "Ayuda a Inti a iluminar el valle con energía limpia y consciente."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">☀️</span>
                    <span className="text-white font-semibold">Atrapa energía positiva</span>
                  </div>
                  <p className="text-white/80 text-sm">Rayos solares, focos verdes LED y remolinos eólicos</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💡</span>
                    <span className="text-white font-semibold">Evita el desperdicio</span>
                  </div>
                  <p className="text-white/80 text-sm">Focos ineficientes, enchufes sin uso y energía contaminante</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🌱</span>
                    <span className="text-white font-semibold">Completa tu misión</span>
                  </div>
                  <p className="text-white/80 text-sm">Alcanza 100% de Conciencia Solar</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⏳</span>
                    <span className="text-white font-semibold">Tiempo límite</span>
                  </div>
                  <p className="text-white/80 text-sm">Tienes 2 minutos para completar el desafío</p>
                </div>
              </div>

              <p className="text-white/90 mb-8">
                Usa las flechas del teclado o los botones para mover a Inti.
              </p>

              <motion.button
                onClick={startGame}
                className="group relative px-8 py-4 rounded-full font-bold text-lg text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #FACC15, #FB923C, #F59E0B)',
                  boxShadow: '0 0 30px rgba(251, 146, 60, 0.6), 0 8px 16px rgba(0, 0, 0, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 50px rgba(251, 146, 60, 0.8), 0 12px 24px rgba(0, 0, 0, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">🌈 Iniciar Desafío Solar 🔆</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pantalla de victoria */}
      <AnimatePresence>
        {gameState === 'victory' && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-sm"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-white/30 rounded-3xl p-8 max-w-lg text-center"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌞
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-4">🌞 ¡El valle brilla gracias a tu energía limpia! 🌈</h2>
              
              <p className="text-white/90 mb-2 text-lg">
                Gracias a tu ayuda, los hogares y molinos brillan con energía renovable.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6 border border-white/20">
                <p className="text-yellow-300 font-bold text-2xl mb-2">Puntuación: {score}</p>
                <p className="text-white/80 italic">"Cada rayo cuenta. Cada acción importa."</p>
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔁 Reintentar Desafío Solar
                </motion.button>
                <motion.button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-purple-500 hover:to-pink-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔜 Volver a los Niveles de Energía
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pantalla de derrota */}
      <AnimatePresence>
        {gameState === 'defeat' && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 max-w-md text-center"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">☀️</div>
              <h2 className="text-2xl font-bold text-white mb-4">El sol sigue brillando</h2>
              <p className="text-white/90 mb-2">¡Intenta de nuevo y mejora tu energía solar!</p>
              <p className="text-yellow-300 font-bold text-xl mb-6">Puntuación: {score}</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Intentar de Nuevo
                </motion.button>
                <motion.button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold py-3 px-6 rounded-full hover:from-gray-500 hover:to-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Volver al Menú
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntiLevel;