import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lock, ExternalLink, Sun, Wind, Leaf, Heart } from 'lucide-react';

// Datos de las historias actualizados con información de guardianes
const storiesData = [
  {
    id: "kallpuna-luz",
    title: "Kallpuna y la Luz que Cambia el Mundo",
    status: "unlocked",
    readTime: "7 min",
    description: "Una historia sobre energía y esperanza",
    guardian: "kallpuna",
    guardianName: "Kallpuna",
    icon: Heart,
    colors: {
      primary: "#A855F7",
      secondary: "#C084FC", 
      accent: "#E879F9",
      glow: "rgba(168, 85, 247, 0.6)"
    },
    languages: {
      spanish: {
        url: "https://gemini.google.com/share/01fe09904b79",
        label: "Leer en Español"
      },
      quechua: {
        url: "https://gemini.google.com/share/d91d508726e8",
        label: "Leer en Quechua"
      }
    }
  },
  {
    id: "story-es-02",
    title: "Kallpuna y el Espejo de los Miedos",
    language: "Español",
    status: "locked",
    url: "",
    readTime: "6 min",
    description: "Una aventura de autoconocimiento",
    guardian: "wayra",
    guardianName: "Wayra",
    icon: Wind,
    colors: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      accent: "#93C5FD",
      glow: "rgba(59, 130, 246, 0.6)"
    }
  },
  {
    id: "story-es-03",
    title: "La Linterna de las Ideas",
    language: "Español", 
    status: "locked",
    url: "",
    readTime: "5 min",
    description: "Iluminando la creatividad",
    guardian: "inti",
    guardianName: "Inti",
    icon: Sun,
    colors: {
      primary: "#F59E0B",
      secondary: "#FBBF24",
      accent: "#FCD34D",
      glow: "rgba(245, 158, 11, 0.6)"
    }
  },
  {
    id: "story-en-01",
    title: "El Viaje de la Energía",
    language: "Español",
    status: "locked",
    url: "",
    readTime: "6 min",
    description: "Un recorrido por el mundo energético",
    guardian: "tierra-viva",
    guardianName: "Tierra Viva",
    icon: Leaf,
    colors: {
      primary: "#10B981",
      secondary: "#34D399",
      accent: "#6EE7B7",
      glow: "rgba(16, 185, 129, 0.6)"
    }
  }
];

const KallpunaLevel = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };



  // Función para manejar sonidos cósmicos
  const playCosmicSound = (type) => {
    try {
      let frequency, duration;
      
      if (type === 'locked') {
        frequency = 150;
        duration = 400;
      } else if (type === 'read') {
        frequency = 800;
        duration = 200;
      } else if (type === 'hover') {
        frequency = 600;
        duration = 150;
      }

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio no disponible');
    }
  };

  const handleReadStory = (url) => {
    playCosmicSound('read');
    setTimeout(() => {
      if (url) {
        window.open(url, '_blank');
      }
    }, 150);
  };

  const handleLockedStory = () => {
    playCosmicSound('locked');
  };

  const unlockedCount = storiesData.filter(story => story.status === 'unlocked').length;
  const totalCount = storiesData.length;

  return (
    <div className="kallpuna-panel min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #0F0C29 0%, #24243e 25%, #302b63 50%, #0f3460 75%, #0e4b99 100%)',
           animation: 'cosmicPulse 8s ease-in-out infinite alternate'
         }}>
      
      {/* Fondo dinámico con múltiples capas de gradientes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(245, 158, 11, 0.25) 0%, transparent 50%)'
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Partículas estelares cósmicas mejoradas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`cosmic-star-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1.5 + 'px',
              height: Math.random() * 3 + 1.5 + 'px',
              background: ['#A855F7', '#3B82F6', '#10B981', '#F59E0B', '#E879F9', '#60A5FA', '#34D399', '#FBBF24'][Math.floor(Math.random() * 8)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 15 + 8}px currentColor`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 80 - 40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.8, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Fondo de estrellas optimizado - reducido de 50 a 20 estrellas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Ondas de energía optimizadas - reducido de 3 a 1 onda */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, rgba(168, 85, 247, 0.05) 25%, transparent 50%, rgba(59, 130, 246, 0.05) 75%, transparent 100%)`,
            borderRadius: '50%',
            transform: 'scale(2)'
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Brillo estelar de fondo simplificado */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)'
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Ondas de energía animadas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`energy-wave-${i}`}
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from ${i * 120}deg, transparent 0%, rgba(168, 85, 247, 0.1) 25%, transparent 50%, rgba(59, 130, 246, 0.1) 75%, transparent 100%)`,
              borderRadius: '50%',
              transform: 'scale(2)'
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Brillo estelar de fondo mejorado */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.2) 0%, transparent 40%), radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 40%), radial-gradient(circle at 25% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.2) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(233, 121, 249, 0.1) 0%, transparent 60%)'
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen overflow-y-auto kallpuna-panel">
        <div className="p-6 md:p-8">
          
          {/* Botón de regreso mejorado */}
          <motion.button
            onClick={handleBackToHome}
            className="fixed top-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300"
            style={{
              right: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.95)',
              fontFamily: 'Nunito Sans, sans-serif',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 12px 40px rgba(112, 212, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              borderColor: 'rgba(112, 212, 255, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Volver</span>
          </motion.button>

          {/* Encabezado hero compacto */}
          <motion.header
            className="text-center py-4 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="flex items-center justify-center gap-3 mb-2">
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #A855F7 0%, #E879F9 100%)',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)'
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <BookOpen 
                  size={20} 
                  color="#FFFFFF" 
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                />
              </motion.div>
              
              <motion.h1
                className="font-bold leading-tight"
                style={{ 
                  fontFamily: 'Fredoka One, cursive',
                  fontSize: '34px',
                  color: '#C084FC',
                  textShadow: '0 2px 8px rgba(192, 132, 252, 0.3)',
                  filter: 'drop-shadow(0 0 12px rgba(192, 132, 252, 0.4))'
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                aria-level="1"
              >
                Kallpuna – Panel de Cuentos
              </motion.h1>
              
              <motion.span
                style={{
                  display: 'inline-block',
                  fontSize: '24px',
                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.span>
            </motion.div>
            
            <motion.p
              className="leading-relaxed text-center"
              style={{ 
                fontFamily: 'Nunito, sans-serif',
                fontSize: '16px',
                color: '#93C5FD',
                fontWeight: '600',
                textShadow: '0 1px 4px rgba(147, 197, 253, 0.3)',
                maxWidth: '450px',
                margin: '0 auto'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              role="doc-subtitle"
            >
              Explora historias sobre energía y magia del conocimiento.
            </motion.p>
          </motion.header>

          {/* Grid de historias optimizado con diseño colorido */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {storiesData.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <motion.div
                  key={story.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{
                    background: story.status === 'unlocked' 
                      ? `linear-gradient(145deg, ${story.colors.primary}25, ${story.colors.secondary}30, ${story.colors.accent}20)`
                      : 'linear-gradient(145deg, rgba(60, 60, 80, 0.4), rgba(80, 80, 100, 0.3), rgba(50, 50, 70, 0.4))',
                    backdropFilter: 'blur(25px)',
                    border: `2px solid ${story.status === 'unlocked' ? story.colors.primary + '60' : 'rgba(255, 255, 255, 0.2)'}`,
                    boxShadow: story.status === 'unlocked'
                      ? `0 15px 50px ${story.colors.glow}, 0 0 40px ${story.colors.primary}40, inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px ${story.colors.accent}40`
                      : '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.15 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    z: 30,
                    boxShadow: story.status === 'unlocked' 
                      ? `0 20px 60px ${story.colors.glow}, 0 0 50px ${story.colors.primary}80, inset 0 0 20px rgba(255, 255, 255, 0.2)`
                      : '0 12px 35px rgba(255, 255, 255, 0.2), 0 0 25px rgba(255, 255, 255, 0.1)',
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    rotateY: 0,
                    transition: { duration: 0.2 }
                  }}
                  onMouseEnter={() => story.status === 'unlocked' && playCosmicSound('hover')}
                  onClick={() => story.status === 'unlocked' ? handleReadStory(story.url) : handleLockedStory()}
                >
                  {/* Ilustración del guardián con colores distintivos mejorados */}
                  <div 
                    className="h-24 relative overflow-hidden"
                    style={{
                      background: story.status === 'unlocked'
                        ? `linear-gradient(135deg, ${story.colors.primary}, ${story.colors.secondary}, ${story.colors.accent})`
                        : 'linear-gradient(135deg, rgba(80, 80, 100, 0.6), rgba(100, 100, 120, 0.5), rgba(70, 70, 90, 0.6))',
                      filter: story.status === 'locked' ? 'grayscale(80%) blur(2px)' : 'none'
                    }}
                  >
                    {/* Efectos de luz adicionales - simplificados */}
                    {story.status === 'unlocked' && (
                      <div className="absolute inset-0">
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${story.colors.accent}40 0%, transparent 50%), radial-gradient(circle at 70% 70%, ${story.colors.secondary}30 0%, transparent 50%)`
                          }}
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    )}

                    {/* Icono del guardián mejorado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        animate={story.status === 'unlocked' ? {
                          scale: [1, 1.15, 1],
                          rotate: [0, 8, -8, 0]
                        } : {}}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <IconComponent 
                          size={60} 
                          style={{ 
                            color: story.status === 'unlocked' ? 'white' : 'rgba(255, 255, 255, 0.4)',
                            filter: story.status === 'unlocked' 
                              ? `drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 15px ${story.colors.glow})` 
                              : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))'
                          }} 
                        />
                        
                        {/* Anillo de energía alrededor del icono - simplificado */}
                        {story.status === 'unlocked' && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2"
                            style={{
                              borderColor: story.colors.accent,
                              width: '80px',
                              height: '80px',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              boxShadow: `0 0 20px ${story.colors.glow}`
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Partículas mágicas específicas del guardián - reducidas de 18 a 8 */}
                    {story.status === 'unlocked' && (
                      <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              width: `${Math.random() * 4 + 2}px`,
                              height: `${Math.random() * 4 + 2}px`,
                              background: story.colors.accent,
                              boxShadow: `0 0 20px ${story.colors.glow}, 0 0 10px ${story.colors.primary}`
                            }}
                            animate={{
                              opacity: [0.2, 1, 0.2],
                              scale: [0.3, 2, 0.3],
                              y: [0, -40, 0],
                              x: [0, Math.random() * 30 - 15, 0]
                            }}
                            transition={{
                              duration: 4 + Math.random() * 3,
                              repeat: Infinity,
                              delay: Math.random() * 3
                            }}
                          />
                        ))}
                        
                        {/* Estrellas flotantes adicionales - reducidas de 8 a 4 */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={`star-${i}`}
                            className="absolute"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              fontSize: '12px',
                              color: story.colors.accent,
                              textShadow: `0 0 15px ${story.colors.glow}`
                            }}
                            animate={{
                              opacity: [0.4, 1, 0.4],
                              rotate: [0, 360],
                              scale: [0.8, 1.3, 0.8]
                            }}
                            transition={{
                              duration: 6 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2
                            }}
                          >
                            ✨
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Badge del guardián */}
                    <div 
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: story.status === 'unlocked' 
                          ? `${story.colors.primary}90`
                          : 'rgba(100, 100, 100, 0.6)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${story.status === 'unlocked' ? story.colors.accent : 'rgba(255, 255, 255, 0.3)'}`,
                        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {story.guardianName}
                    </div>
                  </div>

                  {/* Contenido de la tarjeta mejorado */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                       <span 
                         className="px-3 py-1 rounded-full text-xs font-bold border"
                         style={{
                           background: story.status === 'unlocked'
                             ? `${story.colors.primary}30`
                             : 'rgba(255, 255, 255, 0.15)',
                           color: story.status === 'unlocked' ? story.colors.accent : 'rgba(255, 255, 255, 0.7)',
                           borderColor: story.status === 'unlocked' ? story.colors.primary : 'rgba(255, 255, 255, 0.3)',
                           textShadow: story.status === 'unlocked' ? `0 0 10px ${story.colors.glow}` : 'none'
                         }}
                       >
                         {story.language || story.guardianName}
                       </span>
                       <span 
                         className="text-xs font-medium"
                         style={{ 
                           color: 'rgba(255, 255, 255, 0.85)',
                           fontFamily: 'Nunito Sans, sans-serif'
                         }}
                       >
                         {story.readTime}
                       </span>
                     </div>

                    <h3 
                      className="text-xl font-bold mb-3 leading-tight"
                      style={{ 
                        color: story.status === 'unlocked' ? story.colors.accent : 'rgba(255, 255, 255, 0.8)',
                        fontFamily: 'Nunito Sans, sans-serif',
                        textShadow: story.status === 'unlocked' 
                          ? `0 0 20px ${story.colors.glow}` 
                          : '0 0 10px rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {story.title}
                    </h3>

                    <p 
                      className="text-sm mb-5 leading-relaxed"
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: 'Nunito Sans, sans-serif'
                      }}
                    >
                      {story.description}
                    </p>

                    {/* Botones de idioma para la historia de Kallpuna */}
                    {story.languages ? (
                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <motion.button
                          className="flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border text-sm"
                          style={{
                            background: 'linear-gradient(135deg, #C27CFF, #70D4FF)',
                            color: 'white',
                            borderColor: '#C27CFF',
                            fontFamily: 'Nunito Sans, sans-serif',
                            boxShadow: '0 0 25px rgba(194, 124, 255, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                            textShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
                          }}
                          whileHover={{
                            boxShadow: '0 0 40px rgba(194, 124, 255, 0.8), 0 0 20px rgba(194, 124, 255, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.5)',
                            y: -2,
                            scale: 1.02,
                            transition: { duration: 0.3 }
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadStory(story.languages.spanish.url);
                          }}
                        >
                          ES
                        </motion.button>

                        <motion.button
                          className="flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border text-sm"
                          style={{
                            background: 'linear-gradient(135deg, #70D4FF, #A9FF9F)',
                            color: '#1a1a1a',
                            borderColor: '#70D4FF',
                            fontFamily: 'Nunito Sans, sans-serif',
                            boxShadow: '0 0 25px rgba(112, 212, 255, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                            textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
                          }}
                          whileHover={{
                            boxShadow: '0 0 40px rgba(112, 212, 255, 0.8), 0 0 20px rgba(169, 255, 159, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.5)',
                            y: -2,
                            scale: 1.02,
                            transition: { duration: 0.3 }
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadStory(story.languages.quechua.url);
                          }}
                        >
                          QU
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        className="w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border text-sm"
                        style={{
                          background: story.status === 'unlocked'
                            ? `linear-gradient(135deg, ${story.colors.primary}, ${story.colors.secondary})`
                            : 'rgba(85, 85, 85, 0.8)',
                          color: story.status === 'unlocked' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                          borderColor: story.status === 'unlocked' ? story.colors.accent : 'rgba(255, 255, 255, 0.2)',
                          fontFamily: 'Nunito Sans, sans-serif',
                          boxShadow: story.status === 'unlocked'
                            ? `0 0 25px ${story.colors.glow}, inset 0 2px 0 rgba(255, 255, 255, 0.3)`
                            : 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          textShadow: story.status === 'unlocked' ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none'
                        }}
                        whileHover={story.status === 'unlocked' ? {
                          boxShadow: `0 0 50px ${story.colors.glow}, 0 0 30px ${story.colors.primary}80, inset 0 2px 0 rgba(255, 255, 255, 0.5)`,
                          y: -4,
                          scale: 1.05,
                          rotate: [0, 2, -2, 0],
                          transition: { 
                            duration: 0.3,
                            rotate: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                          }
                        } : {
                          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                          y: -2,
                          scale: 1.02
                        }}
                        whileTap={story.status === 'unlocked' ? { scale: 0.98 } : {}}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (story.status === 'unlocked') {
                            handleReadStory(story.url);
                          } else {
                            handleLockedStory();
                          }
                        }}
                        disabled={story.status === 'locked' ? true : false}
                        title={story.status === 'locked' ? '¡Nuevas aventuras muy pronto!' : `Leer ${story.title}`}
                      >
                        {story.status === 'unlocked' ? (
                          <>
                            <ExternalLink size={16} />
                            Leer Historia
                          </>
                        ) : (
                          <>
                            <Lock size={16} />
                            Bloqueado 🔒
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>

                  {story.status === 'locked' && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)'
                      }}
                      whileHover={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        backdropFilter: 'blur(12px)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div 
                        className="bg-black/90 text-white px-8 py-4 rounded-2xl text-lg font-bold border border-white/40"
                        style={{
                          fontFamily: 'Nunito Sans, sans-serif',
                          textShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            '0 0 20px rgba(255, 255, 255, 0.3)',
                            '0 0 30px rgba(255, 255, 255, 0.5)',
                            '0 0 20px rgba(255, 255, 255, 0.3)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Bloqueado 💫
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Burbuja de Kallpuna mejorada */}
          <motion.div
            className="fixed bottom-8 right-8 z-20"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.div
              className="relative max-w-sm p-6 rounded-3xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(30px)',
                borderColor: 'rgba(194, 124, 255, 0.6)',
                boxShadow: '0 16px 50px rgba(194, 124, 255, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.4)'
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <p 
                className="text-lg font-bold text-center flex items-center justify-center gap-2"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: 'Nunito Sans, sans-serif',
                  textShadow: '0 0 25px rgba(255, 255, 255, 0.6)'
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                ¡Nuevas historias muy pronto!
              </p>
              
              <div 
                className="absolute -bottom-3 left-8 w-6 h-6 rotate-45 border-r border-b"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(194, 124, 255, 0.6)'
                }}
              />
              
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${5 + Math.random() * 90}%`,
                    boxShadow: '0 0 15px rgba(194, 124, 255, 0.9)'
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.8, 0.5],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes cosmicPulse {
          0%, 100% { 
            background: linear-gradient(135deg, #0B0E1D 0%, #1C2142 50%, #2B437A 100%);
          }
          50% { 
            background: linear-gradient(135deg, #0F1225 0%, #1F2448 50%, #2E467D 100%);
          }
        }

        /* Scrollbar personalizado */
        .kallpuna-panel ::-webkit-scrollbar {
          width: 8px;
        }

        .kallpuna-panel ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .kallpuna-panel ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #C27CFF, #70D4FF);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(194, 124, 255, 0.5);
        }

        .kallpuna-panel ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #D48CFF, #80E4FF);
          box-shadow: 0 0 15px rgba(194, 124, 255, 0.7);
        }

        /* Scroll suave */
        .kallpuna-panel {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default KallpunaLevel;