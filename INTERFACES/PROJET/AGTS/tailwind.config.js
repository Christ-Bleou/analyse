import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Tes couleurs personnalisées
      colors: {
        'agts-primary': 'hsl(217, 100%, 34%)',
        'agts-secondary': 'hsl(46, 100%, 50%)',
        'agts-accent': 'hsl(203, 63%, 60%)',
        'agts-background': 'hsl(220, 15%, 98%)',
        'agts-foreground': 'hsl(0, 0%, 12%)',
        'agts-border': 'hsl(210, 15%, 90%)',
        'agts-success': 'hsl(142, 64%, 47%)',
        'agts-warning': 'hsl(25, 95%, 53%)',
        'agts-error': 'hsl(0, 84%, 60%)',
        'agts-muted': 'hsl(210, 15%, 90%)',
        
        // 2. MAPPING SHADCN (Indispensable pour que les composants s'affichent !)
        border: "hsl(210, 15%, 90%)",
        input: "hsl(210, 15%, 90%)",
        ring: "hsl(217, 100%, 34%)",
        background: "hsl(220, 15%, 98%)",
        foreground: "hsl(0, 0%, 12%)",
        primary: {
          DEFAULT: "hsl(217, 100%, 34%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(46, 100%, 50%)",
          foreground: "hsl(217, 100%, 34%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(210, 15%, 90%)",
          foreground: "hsl(215, 16%, 47%)",
        },
        accent: {
          DEFAULT: "hsl(203, 63%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(0, 0%, 12%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(0, 0%, 12%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'agts-gradient-blue': 'linear-gradient(135deg, hsl(217, 100%, 34%) 0%, hsl(203, 63%, 60%) 100%)',
        'agts-gradient-yellow': 'linear-gradient(135deg, hsl(46, 100%, 50%) 0%, hsl(33, 100%, 62%) 100%)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}