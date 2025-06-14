/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#e6e7ff',
          100: '#cdceff',
          200: '#9b9dff',
          300: '#696dff',
          400: '#373cff',
          500: '#0409ff',
          600: '#4D9CFF',
          700: '#020599',
          800: '#020366',
          900: '#010133',
        },
        primary: {
          50: '#f1e8ff',
          100: '#e3d0ff',
          200: '#c7a2ff',
          300: '#ab74ff',
          400: '#8f46ff',
          500: '#7318ff',
          600: '#5c13cc',
          700: '#450e99',
          800: '#2e0a66',
          900: '#170533',
        },
        accent: {
          50: '#fff0e5',
          100: '#ffe1cc',
          200: '#ffc399',
          300: '#ffa566',
          400: '#ff8733',
          500: '#ff6900',
          600: '#cc5400',
          700: '#993f00',
          800: '#662a00',
          900: '#331500',
        },
        success: {
          50: '#e5ffe6',
          100: '#ccffcd',
          200: '#99ff9b',
          300: '#66ff69',
          400: '#33ff37',
          500: '#00ff04',
          600: '#00cc03',
          700: '#009902',
          800: '#006601',
          900: '#003301',
        },
        warning: {
          50: '#fff7e5',
          100: '#ffeecb',
          200: '#ffdd98',
          300: '#ffcc64',
          400: '#ffbb31',
          500: '#ffaa00',
          600: '#cc8800',
          700: '#996600',
          800: '#664400',
          900: '#332200',
        },
        error: {
          50: '#fff0f0',
          100: '#ffe5e5',
          200: '#ffc6c6',
          300: '#ffa6a6',
          400: '#ff7e7e',
          500: '#ff4d4d',
          600: '#cc3e3e',
          700: '#992e2e',
          800: '#661f1f',
          900: '#330f0f',
        },
        dark: {
          50: '#e6e6e6',
          100: '#cccccc',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          background: '#121212',
          surface: '#1e1e1e',
          border: '#333333',
        },
      },
      fontFamily: {
        sans: ['Graphic', 'sans-serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
     function ({ addUtilities }) {
      addUtilities({
        '.gradient-text': {
          backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)', // blue to violet
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      });
    }
  ],
}