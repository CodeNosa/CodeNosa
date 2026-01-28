/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#0FB9B1",      // turquoise logo
        primaryDark: "#0A6E6B",
        secondary: "#0B3C44",    // dark blue
        night: "#041F24",        // very dark
        softwhite: "#E0F7F6",
        accent: "#6D28D9",       // purple from logo
      },

      animation: {
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'gradient': 'gradient 4s ease infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
      },

      keyframes: {
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(15,185,177,0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(109,40,217,0.8)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },

  plugins: [],
};
