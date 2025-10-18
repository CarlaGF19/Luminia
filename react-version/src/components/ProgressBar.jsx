import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 relative z-10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xl font-bold text-primary">
          Pregunta {current} de {total}
        </p>
        <div className="flex items-center gap-2">
          <motion.div
            className="text-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🌀
          </motion.div>
          <span className="text-xl font-bold text-primary">{Math.round(percentage)}%</span>
        </div>
      </div>
      <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;