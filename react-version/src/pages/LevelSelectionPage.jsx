import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Lock, Star } from 'lucide-react';

const LevelSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedGuardian, setSelectedGuardian] = useState(null);

  const guardians = [
    {
      id: 1,
      name: 'Inti',
      type: 'solar',
      description: 'Guardiana de la Energía Solar',
      longDescription: 'Domina el poder del sol y aprende sobre energía solar renovable. Atrapa rayos solares y evita el desperdicio energético.',
      route: '/nivel/inti',
      color: '#FACC15',
      icon: '☀',
      energy: 'Solar',
      level: 1,
      isUnlocked: true,
      difficulty: 'Principiante',
      objectives: ['Alcanzar 100% de conciencia solar', 'Atrapar rayos solares', 'Evitar desperdicios energéticos'],
      rewards: ['Badge Solar', '150 puntos de energía', 'Conocimiento sobre paneles solares']
    },
    {
      id: 2,
      name: 'Wayra',
      type: 'wind',
      description: 'Guardiana de la Conciencia con cartas AR',
      longDescription: 'Controla los vientos y descubre el poder de la energía eólica. Genera electricidad limpia con la fuerza del viento.',
      route: '/nivel/wayra',
      color: '#3B82F6',
      icon: '🌬',
      energy: 'Eólica',
      level: 2,
      isUnlocked: true,
      difficulty: 'Intermedio',
      objectives: ['Generar energía eólica', 'Controlar turbinas', 'Optimizar corrientes de aire'],
      rewards: ['Badge Eólico', '200 puntos de energía', 'Conocimiento sobre aerodinámica']
    },
    {
      id: 3,
      name: 'Tierra Viva',
      type: 'earth',
      description: 'Guardiana de la Energía Circular',
      longDescription: 'Conecta con la Pachamama y aprende sobre economía circular. Recicla, reutiliza y reduce el impacto ambiental.',
      route: '/nivel/tierra-viva',
      color: '#10B981',
      icon: '🌿',
      energy: 'Circular',
      level: 3,
      isUnlocked: true,
      difficulty: 'Intermedio',
      objectives: ['Implementar economía circular', 'Reducir residuos', 'Conectar con la naturaleza'],
      rewards: ['Badge Terrestre', '250 puntos de energía', 'Sabiduría ancestral']
    },
    {
      id: 4,
      name: 'Kallpuna',
      type: 'unity',
      description: 'Guardiana de la Energía Colectiva',
      longDescription: 'Une fuerzas con la comunidad y crea sinergia energética. El poder de la colaboración para un futuro sostenible.',
      route: '/nivel/kallpuna',
      color: '#A855F7',
      icon: '💞',
      energy: 'Colectiva',
      level: 4,
      isUnlocked: false,
      difficulty: 'Avanzado',
      objectives: ['Crear sinergia comunitaria', 'Coordinar energías', 'Lograr armonía colectiva'],
      rewards: ['Badge Colectivo', '300 puntos de energía', 'Poder de unidad']
    }
  ];

  const handleGuardianClick = (guardian) => {
    if (guardian.isUnlocked) {
      navigate(guardian.route);
    } else {
      setSelectedGuardian(guardian);
    }
  };

  const closeModal = () => {
    setSelectedGuardian(null);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Fondo cósmico andino */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0D0B20 0%, #1a1b3a 25%, #2d1b69 50%, #3B0764 75%, #1e1b4b 100%)'
          }}
          animate={{
            background: [
              'linear-gradient(135deg, #0D0B20 0%, #1a1b3a 25%, #2d1b69 50%, #3B0764 75%, #1e1b4b 100%)',
              'linear-gradient(135deg, #1e1b4b 0%, #3B0764 25%, #2d1b69 50%, #1a1b3a 75%, #0D0B20 100%)',
              'linear-gradient(135deg, #0D0B20 0%, #1a1b3a 25%, #2d1b69 50%, #3B0764 75%, #1e1b4b 100%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Montañas andinas */}
        <div className="absolute bottom-0 w-full h-1/3">
          <motion.div
            className="absolute bottom-0 w-full h-full"
            style={{
              background: 'linear-gradient(to top, #1F2937 0%, #374151 50%, transparent 100%)',
              clipPath: 'polygon(0 100%, 0 60%, 15% 40%, 30% 50%, 45% 30%, 60% 45%, 75% 25%, 90% 40%, 100% 35%, 100% 100%)'
            }}
            animate={{
              x: [0, -10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="p-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <motion.button
              onClick={() => navigate('/')}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={24} className="text-white" />
            </motion.button>

            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Selecciona tu Guardián
              </h1>
              <p className="text-white/80 text-lg">
                Elige tu aventura energética
              </p>
            </motion.div>

            <motion.button
              onClick={() => navigate('/coleccion')}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trophy size={24} className="text-yellow-400" />
            </motion.button>
          </div>
        </motion.header>

        {/* Grid de guardianes */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {guardians.map((guardian, index) => (
              <motion.div
                key={guardian.id}
                className={`relative group cursor-pointer ${!guardian.isUnlocked ? 'opacity-60' : ''}`}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: guardian.isUnlocked ? 1.05 : 1.02, 
                  y: guardian.isUnlocked ? -10 : -5 
                }}
                onClick={() => handleGuardianClick(guardian)}
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: guardian.color }}
                />

                {/* Card */}
                <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 h-80 flex flex-col justify-between overflow-hidden">
                  {/* Lock overlay para niveles bloqueados */}
                  {!guardian.isUnlocked && (
                    <div className="absolute inset-0 backdrop-blur-sm bg-black/30 rounded-3xl flex items-center justify-center z-10">
                      <div className="text-center">
                        <Lock size={32} className="text-white/60 mx-auto mb-2" />
                        <p className="text-white/80 text-sm">Próximamente</p>
                      </div>
                    </div>
                  )}

                  {/* Icono del guardián */}
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {guardian.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {guardian.name}
                    </h3>
                    
                    <p className="text-white/80 text-sm mb-4">
                      {guardian.description}
                    </p>
                  </div>

                  {/* Información del nivel */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Energía:</span>
                      <span 
                        className="font-semibold text-sm"
                        style={{ color: guardian.color }}
                      >
                        {guardian.energy}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Nivel:</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: guardian.level }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className="text-yellow-400 fill-current" 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Dificultad:</span>
                      <span className="text-white text-sm">
                        {guardian.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <motion.button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      guardian.isUnlocked
                        ? 'bg-gradient-to-r from-white/20 to-white/10 text-white hover:from-white/30 hover:to-white/20'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    }`}
                    style={{
                      boxShadow: guardian.isUnlocked ? `0 0 20px ${guardian.color}40` : 'none'
                    }}
                    whileHover={guardian.isUnlocked ? { scale: 1.02 } : {}}
                    whileTap={guardian.isUnlocked ? { scale: 0.98 } : {}}
                  >
                    {guardian.isUnlocked ? 'Jugar Ahora' : 'Bloqueado'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal para niveles bloqueados */}
      <AnimatePresence>
        {selectedGuardian && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md mx-4"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{selectedGuardian.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedGuardian.name}
                </h3>
                <p className="text-white/80 mb-6">
                  {selectedGuardian.longDescription}
                </p>
                
                <div className="bg-white/5 rounded-2xl p-4 mb-6">
                  <h4 className="text-white font-semibold mb-3">Próximamente:</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    {selectedGuardian.objectives.map((objective, index) => (
                      <li key={index}>• {objective}</li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={closeModal}
                  className="w-full py-3 bg-gradient-to-r from-white/20 to-white/10 text-white rounded-xl font-semibold hover:from-white/30 hover:to-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Entendido
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelSelectionPage;