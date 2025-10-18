// Utilidades de audio para generar sonidos sintéticos para cada guardiana
class AudioUtils {
  constructor() {
    this.audioContext = null;
    this.backgroundMusic = null;
    this.isMusicPlaying = false;
    this.musicGainNode = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API no soportada:', error);
    }
  }

  // Función para crear música de fondo continua estilo videojuego
  createBackgroundMusic() {
    if (!this.audioContext || this.isMusicPlaying) return;

    // Melodía principal inspirada en videojuegos clásicos
    const melody = [
      { note: 523.25, duration: 0.4 }, // C5
      { note: 659.25, duration: 0.4 }, // E5
      { note: 783.99, duration: 0.4 }, // G5
      { note: 1046.5, duration: 0.4 }, // C6
      { note: 783.99, duration: 0.4 }, // G5
      { note: 659.25, duration: 0.4 }, // E5
      { note: 587.33, duration: 0.4 }, // D5
      { note: 523.25, duration: 0.8 }, // C5

      { note: 440.00, duration: 0.4 }, // A4
      { note: 523.25, duration: 0.4 }, // C5
      { note: 659.25, duration: 0.4 }, // E5
      { note: 783.99, duration: 0.4 }, // G5
      { note: 659.25, duration: 0.4 }, // E5
      { note: 523.25, duration: 0.4 }, // C5
      { note: 440.00, duration: 0.4 }, // A4
      { note: 392.00, duration: 0.8 }, // G4
    ];

    // Bajo armónico
    const bassLine = [
      { note: 130.81, duration: 1.6 }, // C3
      { note: 164.81, duration: 1.6 }, // E3
      { note: 196.00, duration: 1.6 }, // G3
      { note: 130.81, duration: 1.6 }, // C3
      { note: 110.00, duration: 1.6 }, // A2
      { note: 130.81, duration: 1.6 }, // C3
      { note: 146.83, duration: 1.6 }, // D3
      { note: 98.00, duration: 1.6 },  // G2
    ];

    this.isMusicPlaying = true;
    this.playMelodyLoop(melody, bassLine);
  }

  playMelodyLoop(melody, bassLine) {
    if (!this.audioContext || !this.isMusicPlaying) return;

    let melodyIndex = 0;
    let bassIndex = 0;
    let currentTime = this.audioContext.currentTime;

    // Crear nodo de ganancia principal para controlar el volumen
    this.musicGainNode = this.audioContext.createGain();
    this.musicGainNode.connect(this.audioContext.destination);
    this.musicGainNode.gain.setValueAtTime(0.15, currentTime); // Volumen bajo para música de fondo

    const playNextNote = () => {
      if (!this.isMusicPlaying) return;

      // Tocar nota de melodía
      if (melodyIndex < melody.length) {
        const note = melody[melodyIndex];
        this.createMusicTone(note.note, note.duration, 'triangle', 0.1);
        melodyIndex++;
      } else {
        melodyIndex = 0; // Reiniciar melodía
      }

      // Tocar nota de bajo (más lenta)
      if (currentTime % 1.6 < 0.1) { // Cada 1.6 segundos
        if (bassIndex < bassLine.length) {
          const bassNote = bassLine[bassIndex];
          this.createMusicTone(bassNote.note, bassNote.duration, 'sawtooth', 0.08);
          bassIndex++;
        } else {
          bassIndex = 0; // Reiniciar bajo
        }
      }

      // Programar siguiente nota
      setTimeout(playNextNote, melody[melodyIndex % melody.length]?.duration * 1000 || 400);
    };

    playNextNote();
  }

  createMusicTone(frequency, duration, type = 'sine', volume = 0.1) {
    if (!this.audioContext || !this.musicGainNode) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.musicGainNode);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    // Filtro suave para sonido más cálido
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
    filter.Q.setValueAtTime(1, this.audioContext.currentTime);

    // Envelope suave
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Controles de música de fondo
  startBackgroundMusic() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    if (!this.isMusicPlaying) {
      this.createBackgroundMusic();
    }
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicGainNode) {
      this.musicGainNode.disconnect();
      this.musicGainNode = null;
    }
  }

  toggleBackgroundMusic() {
    if (this.isMusicPlaying) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
    return this.isMusicPlaying;
  }

  // Función base para crear tonos (efectos de sonido)
  createTone(frequency, duration, type = 'sine', volume = 0.3) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    // Envelope para suavizar el sonido
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Sonido para Inti (Solar) - Tono cálido y brillante
  playIntiSound() {
    if (!this.audioContext) return;
    
    // Acorde solar: Do mayor con armónicos
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    const duration = 0.4;

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createTone(freq, duration * 0.8, 'triangle', 0.15);
      }, index * 50);
    });

    // Brillo adicional con frecuencias altas
    setTimeout(() => {
      this.createTone(1046.5, 0.2, 'sine', 0.1); // C6
    }, 100);
  }

  // Sonido para Wayra (Eólica) - Sonido aéreo y fluido
  playWayraSound() {
    if (!this.audioContext) return;

    // Sonido de viento con modulación
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.3);
    oscillator.type = 'sawtooth';

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
    filter.frequency.linearRampToValueAtTime(1200, this.audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  // Sonido para Tierra Viva (Circular) - Tono orgánico y profundo
  playTierraVivaSound() {
    if (!this.audioContext) return;

    // Sonido terrestre con sub-bass y armónicos naturales
    const baseFreq = 110; // A2
    const duration = 0.6;

    // Fundamental
    this.createTone(baseFreq, duration, 'triangle', 0.25);
    
    // Armónicos naturales
    setTimeout(() => {
      this.createTone(baseFreq * 2, duration * 0.7, 'sine', 0.15); // Octava
    }, 50);
    
    setTimeout(() => {
      this.createTone(baseFreq * 3, duration * 0.5, 'sine', 0.1); // Quinta
    }, 100);

    // Resonancia de tierra
    setTimeout(() => {
      this.createTone(baseFreq * 0.5, duration * 0.8, 'triangle', 0.2); // Sub-bass
    }, 25);
  }

  // Sonido para Kallpuna (Colectiva) - Armonía mística y envolvente
  playKallpunaSound() {
    if (!this.audioContext) return;

    // Acorde místico con reverb sintético
    const frequencies = [440, 554.37, 659.25, 830.61]; // A4, C#5, E5, G#5
    const duration = 0.7;

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        // Tono principal
        this.createTone(freq, duration, 'sine', 0.12);
        
        // Eco sutil
        setTimeout(() => {
          this.createTone(freq, duration * 0.6, 'sine', 0.06);
        }, 150);
      }, index * 80);
    });

    // Campana mística al final
    setTimeout(() => {
      this.createTone(880, 0.4, 'triangle', 0.1);
    }, 300);
  }

  // Función principal para reproducir sonido según el tipo de guardiana
  playGuardianSound(guardianType) {
    // Reanudar contexto de audio si está suspendido (requerido por algunos navegadores)
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    switch (guardianType) {
      case 'solar':
        this.playIntiSound();
        break;
      case 'wind':
        this.playWayraSound();
        break;
      case 'earth':
        this.playTierraVivaSound();
        break;
      case 'unity':
        this.playKallpunaSound();
        break;
      default:
        console.warn('Tipo de guardiana no reconocido:', guardianType);
    }
  }
}

// Instancia singleton
const audioUtils = new AudioUtils();

export default audioUtils;