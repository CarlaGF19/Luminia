import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Volume2, VolumeX } from 'lucide-react';
import audioUtils from '../utils/audioUtils';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Iniciar música automáticamente cuando se carga la página
  useEffect(() => {
    const startMusic = () => {
      audioUtils.startBackgroundMusic();
      setIsMusicPlaying(true);
    };

    // Iniciar música después de un pequeño delay para asegurar que el contexto de audio esté listo
    const timer = setTimeout(startMusic, 1000);

    return () => {
      clearTimeout(timer);
      audioUtils.stopBackgroundMusic();
    };
  }, []);

  const toggleMusic = () => {
    const newState = audioUtils.toggleBackgroundMusic();
    setIsMusicPlaying(newState);
  };

  const guardians = [
    {
      id: 1,
      name: 'Inti',
      type: 'solar',
      description: 'Guardiana de la Energía Solar',
      route: '/nivel/inti',
      color: '#FACC15',
      icon: '☀️',
      energy: 'Solar',
      level: 1
    },
    {
      id: 2,
      name: 'Wayra',
      type: 'wind',
      description: 'Guardiana de la Conciencia con cartas AR',
      route: '/nivel/wayra',
      color: '#3B82F6',
      icon: '🌬️',
      energy: 'Eólica',
      level: 2
    },
    {
      id: 3,
      name: 'Tierra Viva',
      type: 'earth',
      description: 'Guardiana de la Energía Circular',
      route: '/nivel/tierra-viva',
      color: '#10B981',
      icon: '🌿',
      energy: 'Circular',
      level: 3
    },
    {
      id: 4,
      name: 'Kallpuna',
      type: 'unity',
      description: 'Guardiana de la Energía Colectiva',
      route: '/nivel/kallpuna',
      color: '#A855F7',
      icon: '💞',
      energy: 'Colectiva',
      level: 4
    }
  ];

  const handleGuardianSelect = (guardian) => {
    // Reproducir sonido específico para cada guardiana
    audioUtils.playGuardianSound(guardian.type);
    
    // Pequeño delay para que el sonido se reproduzca antes de la navegación
    setTimeout(() => {
      navigate(guardian.route);
    }, 100);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Fondo cósmico avanzado con gradiente animado */}
      <div className="fixed inset-0 z-0">
        {/* Gradiente base cósmico */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0D0B20 0%, #1a1b3a 25%, #2d1b69 50%, #3B0764 75%, #1e1b4b 100%)'
          }}
          animate={{
            background: [
              'linear-gradient(135deg, #0D0B20 0%, #1a1b3a 25%, #2d1b69 50%, #3B0764 75%, #1e1b4b 100%)',
              'linear-gradient(135deg, #0f0d24 0%, #1c1e3d 25%, #301e6c 50%, #3e0967 75%, #21204e 100%)',
              'linear-gradient(135deg, #0D0B20 0%, #1a1b3a 25%, #2d1b69 50%, #3B0764 75%, #1e1b4b 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Auroras boreales animadas */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 20% 30%, rgba(34, 211, 238, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(250, 204, 21, 0.2) 0%, transparent 40%)'
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Montañas andinas translúcidas */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg viewBox="0 0 1200 300" className="w-full h-full">
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
                <stop offset="100%" stopColor="rgba(13, 11, 32, 0.8)" />
              </linearGradient>
            </defs>
            <path
              d="M0,300 L0,200 L200,120 L400,180 L600,100 L800,160 L1000,80 L1200,140 L1200,300 Z"
              fill="url(#mountainGradient)"
              opacity="0.6"
            />
            <path
              d="M0,300 L0,240 L150,180 L350,220 L550,160 L750,200 L950,140 L1200,180 L1200,300 Z"
              fill="url(#mountainGradient)"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Estrellas de fondo */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Polvo de energía flotante */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`energy-dust-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${['#22D3EE', '#F472B6', '#5EEAD4', '#FACC15'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Botones de control */}
      <div className="fixed top-8 right-8 z-20 flex gap-3">
        {/* Botón de música */}
        <motion.button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-4 py-2 
                     bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md 
                     rounded-full border border-purple-400/30 text-purple-300 
                     hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50
                     transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="font-medium">{isMusicPlaying ? 'Música' : 'Silencio'}</span>
        </motion.button>

        {/* Botón de colección */}
        <motion.button
          onClick={() => navigate('/coleccion')}
          className="flex items-center gap-2 px-4 py-2 
                     bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md 
                     rounded-full border border-yellow-400/30 text-yellow-300 
                     hover:from-yellow-400/30 hover:to-orange-500/30 hover:border-yellow-400/50
                     transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Trophy size={20} />
          <span className="font-medium">Logros</span>
        </motion.button>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen p-8">
        
        {/* Título principal con efectos avanzados */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl font-bold mb-4 relative"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              background: 'linear-gradient(45deg, #22D3EE, #A855F7, #22D3EE)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Lumina: Apus de la Energía
            
            {/* Partículas orbitando el título */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`title-particle-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 4) * 200],
                  y: [0, Math.sin(i * Math.PI / 4) * 100],
                  rotate: [0, 360],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/80 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Elige tu guardiana y accede a su nivel energético
          </motion.p>
        </motion.header>

        {/* Cartas de guardianas rediseñadas */}
        <motion.main
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex gap-8 max-w-6xl">
            {guardians.map((guardian, index) => (
              <motion.div
                key={guardian.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 100, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGuardianSelect(guardian)}
              >
                {/* Resplandor giratorio en hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `conic-gradient(from 0deg, ${guardian.color}40, transparent, ${guardian.color}40)`,
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Carta principal */}
                <div
                  className="relative w-64 h-80 rounded-3xl p-6 flex flex-col items-center justify-between
                             backdrop-blur-md border-2 overflow-hidden group-hover:shadow-2xl
                             transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 50%, 
                      rgba(255, 255, 255, 0.1) 100%)`,
                    borderImage: `linear-gradient(45deg, ${guardian.color}, transparent, ${guardian.color}) 1`,
                    boxShadow: `0 0 30px ${guardian.color}40, inset 0 0 20px rgba(255, 255, 255, 0.1)`
                  }}
                >
                  {/* Brillo holográfico animado */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Ícono 3D */}
                  <motion.div
                    className="text-6xl mb-4 relative z-10"
                    style={{
                      filter: `drop-shadow(0 0 20px ${guardian.color}) drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
                      textShadow: `0 0 20px ${guardian.color}`
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {guardian.icon}
                  </motion.div>

                  {/* Nombre y descripción */}
                  <div className="text-center mb-4 relative z-10">
                    <h2 
                      className="text-2xl font-bold mb-2"
                      style={{
                        color: guardian.color,
                        textShadow: `0 0 10px ${guardian.color}80`
                      }}
                    >
                      {guardian.name}
                    </h2>
                    <p className="text-white/80 text-sm font-medium">
                      {guardian.description}
                    </p>
                  </div>

                  {/* Botón Nivel */}
                  <motion.button
                    className="px-6 py-2 rounded-full font-bold text-white relative z-10
                               transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(45deg, ${guardian.color}, ${guardian.color}CC)`,
                      boxShadow: `0 0 20px ${guardian.color}60`,
                    }}
                    whileHover={{
                      boxShadow: `0 0 30px ${guardian.color}80`,
                    }}
                  >
                    Nivel {guardian.level}
                  </motion.button>

                  {/* Partículas flotantes específicas por guardiana */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`guardian-particle-${guardian.id}-${i}`}
                      className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        background: guardian.color,
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        scale: [0.5, 1.5, 0.5],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.main>
      </div>

      {/* Rayos de luz curvos detrás del título */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`light-ray-${i}`}
            className="absolute top-1/4 left-1/2 w-1 h-32 origin-bottom"
            style={{
              background: `linear-gradient(to top, transparent, ${['#22D3EE', '#A855F7', '#FACC15'][i % 3]}40, transparent)`,
              transform: `translateX(-50%) rotate(${(i - 2) * 15}deg)`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Nebulosas sutiles */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #5EEAD4 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;