/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        aurora: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        energy: {
          solar: '#FACC15',
          solarEnd: '#F59E0B',
          wind: '#3B82F6',
          windEnd: '#0EA5E9',
          earth: '#10B981',
          earthEnd: '#F59E0B',
          unity: '#8B5CF6',
          unityEnd: '#C084FC',
          accent: '#F472B6',
          hero: '#60E0FF',
          background: '#0D0B20'
        }
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-solar': '0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)',
        'glow-wind': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(14, 165, 233, 0.3)',
        'glow-earth': '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)',
        'glow-unity': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(192, 132, 252, 0.3)',
        'glow-hero': '0 0 30px rgba(96, 224, 255, 0.6), 0 0 60px rgba(96, 224, 255, 0.4)',
        'cosmic': '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
        'glassmorphism': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'aurora-flow': 'aurora-flow 8s ease-in-out infinite',
        'particle-float': 'particle-float 6s ease-in-out infinite',
        'energy-pulse': 'energy-pulse 3s ease-in-out infinite',
        'card-hover': 'cardHover 0.3s ease-out forwards',
        'card-leave': 'cardLeave 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'rotate-y-180': 'rotateY180 0.7s ease-in-out forwards'
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(96, 224, 255, 0.4)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(96, 224, 255, 0.8)',
            transform: 'scale(1.02)'
          }
        },
        'aurora-flow': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'translateX(-50%) rotate(0deg)'
          },
          '50%': { 
            opacity: '0.7',
            transform: 'translateX(-50%) rotate(180deg)'
          }
        },
        'particle-float': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.4'
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(180deg)',
            opacity: '0.8'
          }
        },
        'energy-pulse': {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)'
          }
        },
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-10px) scale(1.05)' }
        },
        cardLeave: {
          '0%': { transform: 'translateY(-10px) scale(1.05)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        },
        rotateY180: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f0c29 50%, #0D0B20 100%)',
        'aurora-gradient': 'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(244, 114, 182, 0.1) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      }
    },
  },
  plugins: [],
}