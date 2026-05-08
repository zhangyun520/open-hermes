import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#061625',
        tide: '#83f7ff',
        coral: '#ff9dce',
        plankton: '#b9ffd8'
      },
      boxShadow: { glow: '0 0 35px rgba(131,247,255,.28)' },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        pulseGlow: { '0%,100%': { opacity: '.72', filter: 'drop-shadow(0 0 18px rgba(131,247,255,.35))' }, '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(255,157,206,.55))' } },
        drift: { '0%,100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(16px)' } }
      }
    }
  },
  plugins: []
};
export default config;
