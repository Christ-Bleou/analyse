/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          // Tes couleurs personnalisées AGTS
          'agts-primary': 'hsl(0, 84%, 60%)',     // Rouge principal (remplace le bleu)
          'agts-secondary': 'hsl(46, 100%, 50%)',
          'agts-accent': 'hsl(0, 70%, 50%)',
          'agts-background': 'hsl(0, 0%, 98%)',   // Fond très clair (presque blanc)
          'agts-foreground': 'hsl(0, 0%, 12%)',
          'agts-border': 'hsl(0, 30%, 90%)',
          'agts-error': 'hsl(0, 84%, 60%)',      // Ton rouge destructif

          // === MAPPING SHADCN/UI (IMPORTANT : doit suivre agts-primary) ===
          primary: {
            DEFAULT: "hsl(0, 84%, 60%)",         // Rouge pour boutons, actifs sidebar
            foreground: "hsl(0, 0%, 100%)",      // Texte blanc sur fond rouge
          },
          destructive: {
            DEFAULT: "hsl(0, 84%, 60%)",
            foreground: "hsl(0, 0%, 100%)",
          },
          ring: "hsl(0, 84%, 60%)",              // Contour focus rouge
          background: "hsl(0, 0%, 98%)",
          foreground: "hsl(0, 0%, 12%)",
          border: "hsl(0, 30%, 90%)",
          muted: {
            DEFAULT: "hsl(0, 20%, 95%)",         // Fond hover dans sidebar
            foreground: "hsl(0, 0%, 40%)",
          },
          card: {
            DEFAULT: "hsl(0, 0%, 100%)",
            foreground: "hsl(0, 0%, 12%)",
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