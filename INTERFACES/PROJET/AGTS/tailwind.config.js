/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agts: {
          primary: 'hsl(var(--agts-primary))',
          secondary: 'hsl(var(--agts-secondary))',
          accent: 'hsl(var(--agts-accent))',
          background: 'hsl(var(--agts-background))',
          foreground: 'hsl(var(--agts-foreground))',
          border: 'hsl(var(--agts-border))',
          success: 'hsl(var(--agts-success))',
          warning: 'hsl(var(--agts-warning))',
          error: 'hsl(var(--agts-error))',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
}