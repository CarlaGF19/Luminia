import React from 'react';

const WayraAvatar = ({ emotion, message }) => {
  const getEmotionClass = () => {
    switch (emotion) {
      case 'happy':
        return 'animate-bounce';
      case 'excited':
        return 'animate-bounce scale-110';
      case 'sad':
        return 'opacity-90';
      case 'thinking':
        return 'animate-pulse';
      default:
        return 'animate-bounce';
    }
  };

  const getEmotionEmoji = () => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'excited':
        return '🌟';
      case 'sad':
        return '😅';
      case 'thinking':
        return '🤔';
      default:
        return '🌬️';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3 max-w-sm">
      {message && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg border border-white/20">
          <p className="text-sm font-semibold text-gray-800 flex items-start gap-2 leading-relaxed">
            <span className="text-2xl flex-shrink-0">{getEmotionEmoji()}</span>
            <span>{message}</span>
          </p>
        </div>
      )}
      <div className={`relative ${getEmotionClass()} transition-all duration-300`}>
        {/* Aura suave */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-green-400 opacity-20 blur-lg" />
        
        {/* Avatar principal */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-green-500 p-1 shadow-lg">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🌬️</span>
          </div>
        </div>
        
        {/* Efectos según emoción */}
        {emotion === 'excited' && (
          <>
            <span className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</span>
            <span className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💫</span>
          </>
        )}
        {emotion === 'sad' && (
          <span className="absolute -top-1 right-0 text-2xl">😅</span>
        )}
      </div>
    </div>
  );
};

export default WayraAvatar;