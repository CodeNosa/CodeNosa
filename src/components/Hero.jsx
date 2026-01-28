// src/components/Hero.jsx
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const heroTexts = {
  ar: {
    title: "لننشئ موقعك معاً",
    subtitle: [
      "تصميم عصري",
      "سريع",
      "حسب الطلب",
      "سعر مناسب",
      "دعم سريع",
      "SEO محسن",
      "آمن وموثوق",
      "متوافق مع جميع الأجهزة",
    ],
    cta: "شاهد أعمالنا",
    features: [
      { icon: "⚡", text: "موقع سريع وفعال" },
      { icon: "🎨", text: "تصميم عصري وفريد" },
      { icon: "💰", text: "سعر مناسب لجميع الميزانيات" },
      { icon: "🛠️", text: "صيانة ودعم سريع" },
      { icon: "🔒", text: "آمن وموثوق" },
      { icon: "📱", text: "متوافق مع الجوال والتابلت" },
      { icon: "🚀", text: "SEO محسن لزيادة ظهورك" },
    ],
  },
  fr: {
    title: "Créons ensemble votre site web",
    subtitle: [
      "Design moderne",
      "Rapide",
      "Sur mesure",
      "Prix raisonnable",
      "Support réactif",
      "SEO optimisé",
      "Sécurisé",
      "Responsive",
    ],
    cta: "Voir nos réalisations",
    features: [
      { icon: "⚡", text: "Site rapide et performant" },
      { icon: "🎨", text: "Design unique et moderne" },
      { icon: "💰", text: "Prix adapté à votre budget" },
      { icon: "🛠️", text: "Support et maintenance rapide" },
      { icon: "🔒", text: "Sécurisé et fiable" },
      { icon: "📱", text: "Compatible mobile et tablette" },
      { icon: "🚀", text: "SEO optimisé pour visibilité maximale" },
    ],
  },
  en: {
    title: "Let's build your website together",
    subtitle: [
      "Modern",
      "Fast",
      "Custom",
      "Affordable",
      "Quick support",
      "SEO optimized",
      "Secure",
      "Mobile friendly",
    ],
    cta: "See our work",
    features: [
      { icon: "⚡", text: "Fast and high-performing website" },
      { icon: "🎨", text: "Unique and modern design" },
      { icon: "💰", text: "Affordable pricing" },
      { icon: "🛠️", text: "Quick support and maintenance" },
      { icon: "🔒", text: "Secure and reliable" },
      { icon: "📱", text: "Responsive on all devices" },
      { icon: "🚀", text: "SEO optimized for maximum visibility" },
    ],
  },
};

export default function Hero({ lang }) {
  const t = heroTexts[lang] || heroTexts.fr;

  // State pour typewriter effect
  const [currentSub, setCurrentSub] = useState("");
  const [subIndex, setSubIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // State pour effet souris 3D
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Effet typewriter
    const timeout = setTimeout(() => {
      if (charIndex < t.subtitle[subIndex].length) {
        setCurrentSub((prev) => prev + t.subtitle[subIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        // Pause avant de passer au mot suivant
        setTimeout(() => {
          setCurrentSub("");
          setCharIndex(0);
          setSubIndex((subIndex + 1) % t.subtitle.length);
        }, 1500);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [charIndex, subIndex, t.subtitle]);

  // Effet souris 3D
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative py-28 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-400/8 rounded-full blur-3xl animate-pulse delay-300 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 -z-10" />

      {/* Effet souris 3D en dessous */}
      <div 
        className="absolute top-1/2 left-0 right-0 h-96 -z-5"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {/* Grille 3D interactive */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute left-0 right-0 h-px bg-gray-300"
              style={{
                top: `${(i + 1) * 8}%`,
                transform: `translateY(${mousePosition.y * 0.5}px)`,
              }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute top-0 bottom-0 w-px bg-gray-300"
              style={{
                left: `${(i + 1) * 8}%`,
                transform: `translateX(${mousePosition.x * 0.5}px)`,
              }}
            />
          ))}
        </div>

        {/* Points 3D qui suivent la souris */}
        <div 
          className="absolute w-64 h-64 rounded-full border-2 border-primary/30 opacity-30"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`,
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full border border-accent/20 opacity-20"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translateX(${mousePosition.x * 1.5}px) translateY(${mousePosition.y * 1.5}px)`,
          }}
        />
      </div>

      {/* Cadre Agence Digital Premium */}
      <div className="relative mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-lg"
          style={{
            transform: `translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`,
          }}
        >
          {/* Point vert animé */}
          <div className="relative mr-3">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
          </div>
          
          {/* Texte */}
          <span className="text-sm font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {lang === "fr" ? "Agence Digital Premium" : 
             lang === "ar" ? "وكالة رقمية متميزة" : 
             "Premium Digital Agency"}
          </span>
          
          {/* Éléments décoratifs du cadre */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary/50 rounded-tl" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-accent/50 rounded-tr" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-secondary/50 rounded-bl" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary/50 rounded-br" />
        </motion.div>
        
        {/* Ligne de connexion vers le titre */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      {/* Hero content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        style={{
          transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`,
        }}
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 h-10 mb-10"
        style={{
          transform: `translateX(${mousePosition.x * 0.05}px) translateY(${mousePosition.y * 0.05}px)`,
        }}
      >
        {currentSub}
        <span className="border-r-2 border-gray-600 ml-1 animate-blink"></span>
      </motion.p>

      <motion.a
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 120 }}
        href="#portfolio"
        className="relative inline-block px-10 py-4 bg-primary text-white font-semibold rounded-full shadow-2xl overflow-hidden group hover:bg-primaryDark transition-all transform hover:scale-110"
        style={{
          transform: `translateX(${mousePosition.x * 0.2}px) translateY(${mousePosition.y * 0.2}px)`,
        }}
      >
        {t.cta}
        <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-30 transition-all" />
        
        {/* Effet 3D sur le bouton */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
          }}
        />
      </motion.a>

      {/* Features en grille avec effet 3D léger */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-16 max-w-5xl"
      >
        {t.features.map((feature, index) => (
          <div
            key={index}
            className="p-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/30 hover:border-primary/50 transition-colors text-center"
            style={{
              transform: `translateX(${mousePosition.x * (0.02 * (index + 1))}px) translateY(${mousePosition.y * (0.02 * (index + 1))}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{feature.text}</div>
          </div>
        ))}
      </motion.div>

      {/* Points de lumière qui suivent la souris */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
          style={{
            left: `${50 + mousePosition.x * 2}%`,
            top: `${50 + mousePosition.y * 2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-lg"
          style={{
            left: `${40 + mousePosition.x * 1.5}%`,
            top: `${60 + mousePosition.y * 1.5}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Animations supplémentaires CSS */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      `}</style>
    </section>
  );
}