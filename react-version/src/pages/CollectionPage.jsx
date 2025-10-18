import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CosmicBackground from '../components/CosmicBackground';
import BadgeCard from '../components/BadgeCard';

const CollectionPage = () => {
  const navigate = useNavigate();

  // Badges de ejemplo con diferentes rarezas y tipos
  const sampleBadges = [
    {
      id: 1,
      name: "Guardiana del Sol",
      description: "Completaste el camino de la energía solar",
      icon: "🌞",
      rarity: 4, // Legendario
      element: "energía solar",
      dateObtained: "15 de Enero, 2024",
      energyLevel: 95,
      inspirationalQuote: "El sol nunca deja de brillar, como tu determinación"
    },
    {
      id: 2,
      name: "Tejedora de Vientos",
      description: "Dominaste los secretos de la energía eólica",
      icon: "🌬️",
      rarity: 3, // Épico
      element: "energía eólica",
      dateObtained: "22 de Enero, 2024",
      energyLevel: 87,
      inspirationalQuote: "Como el viento, tu sabiduría no conoce fronteras"
    },
    {
      id: 3,
      name: "Semilla del Conocimiento",
      description: "Aprendiste los fundamentos de la energía",
      icon: "🌱",
      rarity: 2, // Raro
      element: "conocimiento básico",
      dateObtained: "8 de Enero, 2024",
      energyLevel: 72,
      inspirationalQuote: "Cada gran árbol comenzó siendo una pequeña semilla"
    },
    {
      id: 4,
      name: "Chispa Inicial",
      description: "Diste tus primeros pasos en Lumina",
      icon: "⚡",
      rarity: 1, // Común
      element: "iniciación",
      dateObtained: "1 de Enero, 2024",
      energyLevel: 45,
      inspirationalQuote: "Todo viaje comienza con un solo paso"
    },
    {
      id: 5,
      name: "Corazón de la Pachamama",
      description: "Conectaste profundamente con la Madre Tierra",
      icon: "🌍",
      rarity: 5, // Mítico
      element: "conexión ancestral",
      dateObtained: "30 de Enero, 2024",
      energyLevel: 100,
      inspirationalQuote: "Somos uno con la Pachamama, guardianes de su energía sagrada"
    },
    {
      id: 6,
      name: "Explorador Cósmico",
      description: "Descubriste nuevos horizontes energéticos",
      icon: "🚀",
      rarity: 3, // Épico
      element: "exploración",
      dateObtained: "12 de Febrero, 2024",
      energyLevel: 89,
      inspirationalQuote: "El cosmos es infinito, como tu potencial"
    },
    {
      id: 7,
      name: "Maestro de la Unidad",
      description: "Armonizaste todas las energías elementales",
      icon: "🔋",
      rarity: 4, // Legendario
      element: "unidad energética",
      dateObtained: "Pendiente",
      energyLevel: 0,
      isLocked: true
    },
    {
      id: 8,
      name: "Sabio Ancestral",
      description: "Alcanzaste la sabiduría de los antiguos",
      icon: "📚",
      rarity: 5, // Mítico
      element: "sabiduría ancestral",
      dateObtained: "Pendiente",
      energyLevel: 0,
      isLocked: true
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Fondo cósmico */}
      <CosmicBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen p-8">
        
        {/* Botón de regreso */}
        <motion.button
          onClick={() => navigate('/')}
          className="fixed top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 
                     bg-white/10 backdrop-blur-md rounded-full border border-white/20
                     text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span className="font-inter">Volver</span>
        </motion.button>

        {/* Encabezado */}
        <motion.header
          className="text-center pt-20 pb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl font-space font-bold text-energy-hero mb-4"
            animate={{
              textShadow: [
                '0 0 20px rgba(96, 224, 255, 0.6)',
                '0 0 40px rgba(96, 224, 255, 0.8)',
                '0 0 60px rgba(96, 224, 255, 1.0)',
                '0 0 40px rgba(96, 224, 255, 0.8)',
                '0 0 20px rgba(96, 224, 255, 0.6)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Colección de Logros Sagrados
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 font-inter max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Cada carta representa un hito en tu viaje energético. 
            Haz clic en las cartas para descubrir sus secretos.
          </motion.p>
        </motion.header>

        {/* Carrusel de badges */}
        <motion.main
          className="pb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          {/* Contenedor del carrusel */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-8">
              <div className="flex gap-8 px-8 min-w-max">
                {sampleBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 100, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <BadgeCard badge={badge} isLocked={badge.isLocked} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Indicador de scroll */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <p className="text-white/60 text-sm font-inter">
                ← Desliza para ver más logros →
              </p>
            </motion.div>
          </div>

          {/* Estadísticas de la colección */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Badges Obtenidos", value: "6/8", color: "#60E0FF" },
                { label: "Energía Total", value: "488/800", color: "#FACC15" },
                { label: "Rareza Máxima", value: "Mítico", color: "#EC4899" },
                { label: "Progreso", value: "75%", color: "#22C55E" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/70 text-sm font-inter mb-2">{stat.label}</p>
                  <p 
                    className="text-2xl font-bold font-space"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.main>
      </div>

      {/* Partículas cósmicas adicionales */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`cosmic-particle-${i}`}
            className="absolute w-1 h-1 bg-energy-hero rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Estilo para ocultar scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CollectionPage;