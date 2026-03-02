/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original Midnight Luxe preset colors
        obsidian: '#0D0D12',
        champagne: 'var(--color-champagne-hex, #C9A84C)',
        ivory: '#FAF8F5',
        slate: '#2A2A35',
        surface: '#15151A',
        neon: '#0FF0FC',

        // User's newly added colors
        midnight: {
          950: '#04040a',
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
        },
        accent: {
          DEFAULT: '#3b82f6',
          glow: '#60a5fa',
        },
        text: {
          primary: '#fafafa',
          muted: '#a1a1aa',
        }
      },
      fontFamily: {
        // Original fonts
        heading: ['Alexandria', 'sans-serif'],
        drama: ['Amiri', 'serif'],
        data: ['"JetBrains Mono"', 'monospace'],

        // User's added fonts
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.05em',
        tighter: '-.03em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'subtle-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
      })
    }
  ],
}
