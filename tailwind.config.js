/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 游戏主色调
        primary: '#8B5CF6',      // 紫色
        'primary-soft': '#8B5CF620',
        success: '#14B8A6',      // 青色
        warning: '#FF9800',      // 橙色
        danger: '#FF5252',       // 红色
        gold: '#FFD700',         // 金色
        pink: '#F472B6',         // 粉色

        // 背景色
        'bg-page': '#FFFFFF',
        'bg-card': '#F4F4F5',
        'bg-elevated': '#E4E4E7',

        // 文字色
        'text-primary': '#18181B',
        'text-secondary': '#71717A',
        'text-tertiary': '#A1A1AA',
        'text-muted': '#D4D4D8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '24px',
        '5xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'glow': '0 4px 16px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'blob-delay-2000': 'blob 7s infinite 2s',
        'blob-delay-4000': 'blob 7s infinite 4s',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
