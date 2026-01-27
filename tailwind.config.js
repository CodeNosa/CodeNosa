/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

theme: {
  extend: {
    colors: {
          primary: "#0FB9B1",
          primaryDark: "#0A6E6B",
          secondary: "#0B3C44",
          night: "#041F24",
          softwhite: "#E0F7F6",
          accent: "#18D4C5",
    },
  },
},
// Dans theme.extend
animation: {
   'neon-pulse': 'neonPulse 2s ease-in-out infinite',
  'fade-in': 'fadeIn 1s ease-out',
},
keyframes: {
  fadeIn: {
    neonPulse: {
        '0%, 100%': { boxShadow: '0 0 10px rgba(15, 185, 177, 0.5)' },
        '50%': { boxShadow: '0 0 20px rgba(15, 185, 177, 0.8)' },
      },
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
},
 

}
