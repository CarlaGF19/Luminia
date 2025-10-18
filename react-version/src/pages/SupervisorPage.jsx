import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  RefreshCw, 
  FileText, 
  HelpCircle, 
  User, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Award, 
  AlertTriangle,
  BookOpen,
  Target,
  Activity,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Edit3,
  Save,
  Download
} from 'lucide-react';

const SupervisorPage = () => {
  const navigate = useNavigate();
  
  // Estados del dashboard
  const [selectedStudent, setSelectedStudent] = useState('todos');
  const [timeRange, setTimeRange] = useState('semana');
  const [demoData, setDemoData] = useState({});
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [tutorNotes, setTutorNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Función para generar datos demo aleatorios
  const generateDemoData = () => {
    const students = ['Ana García', 'Carlos López', 'María Rodríguez', 'Diego Martín', 'Sofía Chen'];
    const levels = ['Inti (Solar)', 'Wayra (Eólica)', 'Tierra Viva (Circular)', 'Kallpuna (Colectiva)'];
    
    return {
      totalStudents: Math.floor(Math.random() * 50) + 20,
      activeToday: Math.floor(Math.random() * 30) + 15,
      completedQuizzes: Math.floor(Math.random() * 200) + 150,
      averageScore: Math.floor(Math.random() * 30) + 70,
      studyTime: Math.floor(Math.random() * 120) + 180,
      achievements: Math.floor(Math.random() * 50) + 25,
      
      levelProgress: levels.map(level => ({
        name: level,
        completed: Math.floor(Math.random() * 80) + 20,
        inProgress: Math.floor(Math.random() * 30) + 10,
        notStarted: Math.floor(Math.random() * 20) + 5
      })),
      
      recentQuizzes: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        student: students[Math.floor(Math.random() * students.length)],
        level: levels[Math.floor(Math.random() * levels.length)],
        score: Math.floor(Math.random() * 40) + 60,
        time: `${Math.floor(Math.random() * 10) + 1} min`,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
      })),
      
      recentActivity: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        student: students[Math.floor(Math.random() * students.length)],
        action: ['Completó quiz', 'Inició nivel', 'Obtuvo logro', 'Revisó material'][Math.floor(Math.random() * 4)],
        level: levels[Math.floor(Math.random() * levels.length)],
        time: `Hace ${Math.floor(Math.random() * 60) + 1} min`
      })),
      
      achievementsList: Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        title: ['Eco Explorador', 'Maestro Solar', 'Guardián del Viento', 'Protector Verde'][i],
        description: ['Completó 10 quizzes', 'Dominó energía solar', 'Experto en eólica', 'Campeón circular'][i],
        students: Math.floor(Math.random() * 15) + 5,
        icon: ['🌱', '☀️', '🌬️', '♻️'][i]
      })),
      
      alerts: [
        {
          id: 1,
          type: 'warning',
          message: `${students[0]} lleva 3 días sin actividad`,
          time: 'Hace 2 horas'
        },
        {
          id: 2,
          type: 'success',
          message: `${students[1]} completó todos los niveles`,
          time: 'Hace 1 hora'
        },
        {
          id: 3,
          type: 'info',
          message: 'Nuevo material disponible en Wayra',
          time: 'Hace 30 min'
        }
      ]
    };
  };

  // Inicializar datos demo
  useEffect(() => {
    setDemoData(generateDemoData());
    setTutorNotes('Notas del tutor:\n\n• Revisar progreso de estudiantes con bajo rendimiento\n• Actualizar material de Wayra con nuevos ejercicios\n• Programar sesión grupal para nivel Kallpuna\n• Celebrar logros de la semana en próxima clase');
  }, []);

  // Función para refrescar datos demo
  const refreshDemoData = () => {
    setDemoData(generateDemoData());
  };

  // Función para exportar PDF (simulada)
  const exportToPDF = () => {
    alert('📄 Exportando reporte en PDF...\n\n✅ El reporte se descargará en breve con:\n• Estadísticas generales\n• Progreso por estudiante\n• Análisis de rendimiento\n• Recomendaciones');
  };

  // Función para guardar notas
  const saveNotes = () => {
    setIsEditingNotes(false);
    alert('💾 Notas guardadas exitosamente');
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Fondo cósmico animado */}
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
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Estrellas animadas */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header del Panel */}
      <motion.header
        className="relative z-20 p-6 border-b border-purple-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
          backdropFilter: 'blur(20px)',
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                         backdrop-blur-md rounded-full border border-purple-400/30 text-purple-300 
                         hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50
                         transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Volver</span>
            </motion.button>
            
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Panel del Tutor
              </h1>
              <p className="text-purple-300">Dashboard de seguimiento y análisis</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={refreshDemoData}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
                         backdrop-blur-md rounded-full border border-blue-400/30 text-blue-300 
                         hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50
                         transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={18} />
              <span>Actualizar Demo</span>
            </motion.button>

            <motion.button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
                         backdrop-blur-md rounded-full border border-green-400/30 text-green-300 
                         hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50
                         transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              <span>Exportar PDF</span>
            </motion.button>

            <motion.button
              onClick={() => setShowTutorial(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 
                         backdrop-blur-md rounded-full border border-yellow-400/30 text-yellow-300 
                         hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-400/50
                         transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={18} />
              <span>Tutorial</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Barra de Control */}
      <motion.div
        className="relative z-10 p-6 border-b border-purple-500/10"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 7, 100, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <User className="text-purple-400" size={20} />
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white
                           focus:border-purple-400 focus:outline-none backdrop-blur-md"
              >
                <option value="todos">Todos los estudiantes</option>
                <option value="ana">Ana García</option>
                <option value="carlos">Carlos López</option>
                <option value="maria">María Rodríguez</option>
                <option value="diego">Diego Martín</option>
                <option value="sofia">Sofía Chen</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-purple-400" size={20} />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white
                           focus:border-purple-400 focus:outline-none backdrop-blur-md"
              >
                <option value="hoy">Hoy</option>
                <option value="semana">Esta semana</option>
                <option value="mes">Este mes</option>
                <option value="trimestre">Trimestre</option>
              </select>
            </div>
          </div>

          {isDemoMode && (
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 
                           rounded-full text-yellow-300 text-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Modo Demo</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="relative z-10 p-6 space-y-6">
        
        {/* Tarjetas KPI */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { 
              title: 'Estudiantes Totales', 
              value: demoData.totalStudents, 
              icon: Users, 
              color: 'from-blue-500 to-cyan-500',
              change: '+12%'
            },
            { 
              title: 'Activos Hoy', 
              value: demoData.activeToday, 
              icon: Activity, 
              color: 'from-green-500 to-emerald-500',
              change: '+8%'
            },
            { 
              title: 'Quizzes Completados', 
              value: demoData.completedQuizzes, 
              icon: CheckCircle, 
              color: 'from-purple-500 to-pink-500',
              change: '+15%'
            },
            { 
              title: 'Promedio General', 
              value: `${demoData.averageScore}%`, 
              icon: TrendingUp, 
              color: 'from-yellow-500 to-orange-500',
              change: '+3%'
            }
          ].map((kpi, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl border border-purple-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
                backdropFilter: 'blur(20px)',
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color} bg-opacity-20`}>
                  <kpi.icon className="text-white" size={24} />
                </div>
                <span className="text-green-400 text-sm font-medium">{kpi.change}</span>
              </div>
              <h3 className="text-gray-300 text-sm mb-2">{kpi.title}</h3>
              <p className="text-3xl font-bold text-white">{kpi.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progreso por Nivel */}
        <motion.div
          className="p-6 rounded-2xl border border-purple-500/20"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="text-purple-400" />
            Progreso por Nivel
          </h2>
          
          <div className="space-y-4">
            {demoData.levelProgress?.map((level, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{level.name}</span>
                  <span className="text-gray-300 text-sm">
                    {level.completed + level.inProgress + level.notStarted} estudiantes
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div className="h-full flex">
                    <div 
                      className="bg-green-500 transition-all duration-1000"
                      style={{ width: `${(level.completed / (level.completed + level.inProgress + level.notStarted)) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-yellow-500 transition-all duration-1000"
                      style={{ width: `${(level.inProgress / (level.completed + level.inProgress + level.notStarted)) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-gray-500 transition-all duration-1000"
                      style={{ width: `${(level.notStarted / (level.completed + level.inProgress + level.notStarted)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>✅ Completado: {level.completed}</span>
                  <span>🔄 En progreso: {level.inProgress}</span>
                  <span>⏳ Sin iniciar: {level.notStarted}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grid de Secciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Detalles de Quizzes */}
          <motion.div
            className="p-6 rounded-2xl border border-purple-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="text-purple-400" />
              Quizzes Recientes
            </h2>
            
            <div className="space-y-3">
              {demoData.recentQuizzes?.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{quiz.student}</p>
                    <p className="text-gray-300 text-sm">{quiz.level}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${quiz.score >= 80 ? 'text-green-400' : quiz.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {quiz.score}%
                    </p>
                    <p className="text-gray-400 text-xs">{quiz.time} • {quiz.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actividad Reciente */}
          <motion.div
            className="p-6 rounded-2xl border border-purple-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="text-purple-400" />
              Actividad Reciente
            </h2>
            
            <div className="space-y-3">
              {demoData.recentActivity?.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.student}</span> {activity.action.toLowerCase()}
                    </p>
                    <p className="text-gray-400 text-xs">{activity.level} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Logros y Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Logros */}
          <motion.div
            className="p-6 rounded-2xl border border-purple-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="text-purple-400" />
              Logros Desbloqueados
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {demoData.achievementsList?.map((achievement) => (
                <div key={achievement.id} className="p-4 bg-purple-900/20 rounded-lg text-center">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="text-white font-medium text-sm mb-1">{achievement.title}</h3>
                  <p className="text-gray-400 text-xs mb-2">{achievement.description}</p>
                  <span className="text-yellow-400 text-xs font-bold">{achievement.students} estudiantes</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alertas */}
          <motion.div
            className="p-6 rounded-2xl border border-purple-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="text-purple-400" />
              Alertas y Notificaciones
            </h2>
            
            <div className="space-y-3">
              {demoData.alerts?.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-900/20 border-yellow-400' :
                  alert.type === 'success' ? 'bg-green-900/20 border-green-400' :
                  'bg-blue-900/20 border-blue-400'
                }`}>
                  <p className="text-white text-sm">{alert.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Notas del Tutor */}
        <motion.div
          className="p-6 rounded-2xl border border-purple-500/20"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 7, 100, 0.2) 100%)',
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Edit3 className="text-purple-400" />
              Notas del Tutor
            </h2>
            <div className="flex gap-2">
              {isEditingNotes ? (
                <motion.button
                  onClick={saveNotes}
                  className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-400/30 
                             rounded-lg text-green-300 hover:bg-green-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} />
                  <span>Guardar</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setIsEditingNotes(true)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 
                             rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 size={16} />
                  <span>Editar</span>
                </motion.button>
              )}
            </div>
          </div>
          
          {isEditingNotes ? (
            <textarea
              value={tutorNotes}
              onChange={(e) => setTutorNotes(e.target.value)}
              className="w-full h-32 bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 text-white
                         focus:border-purple-400 focus:outline-none backdrop-blur-md resize-none"
              placeholder="Escribe tus notas aquí..."
            />
          ) : (
            <div className="bg-purple-900/20 rounded-lg p-4">
              <pre className="text-gray-300 whitespace-pre-wrap font-sans">{tutorNotes}</pre>
            </div>
          )}
        </motion.div>

        {/* Footer del Panel */}
        <motion.div
          className="text-center py-6 border-t border-purple-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p className="text-gray-400 text-sm">
            Panel del Tutor - Luminia • Última actualización: {new Date().toLocaleString()}
          </p>
          <p className="text-purple-300 text-xs mt-1">
            Datos en tiempo real • Modo Demo Activo
          </p>
        </motion.div>
      </div>

      {/* Modal Tutorial */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 max-w-2xl w-full
                         border border-purple-500/30 backdrop-blur-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <HelpCircle className="text-purple-400" />
                Tutorial del Panel del Tutor
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🎯 Funcionalidades Principales:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Monitoreo en tiempo real del progreso estudiantil</li>
                    <li>Análisis detallado por nivel y estudiante</li>
                    <li>Sistema de alertas y notificaciones</li>
                    <li>Exportación de reportes en PDF</li>
                    <li>Gestión de notas y observaciones</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">📊 Interpretación de Datos:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Verde: Rendimiento excelente (80%+)</li>
                    <li>Amarillo: Rendimiento moderado (60-79%)</li>
                    <li>Rojo: Necesita atención (menos de 60%)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🔄 Modo Demo:</h3>
                  <p className="text-sm">
                    Los datos mostrados son simulados para demostración. 
                    Usa el botón "Actualizar Demo" para generar nuevos datos de ejemplo.
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={() => setShowTutorial(false)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg 
                           text-white font-medium hover:from-purple-600 hover:to-pink-600 
                           transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Entendido
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupervisorPage;