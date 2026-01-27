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
    title: "Let’s build your website together",
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

  useEffect(() => {
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

  return (
    <section
      id="home"
      className="relative py-28 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-400/8 rounded-full blur-3xl animate-pulse delay-300 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 -z-10" />

      {/* Hero content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 h-10 mb-10"
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
      >
        {t.cta}
        <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-30 transition-all" />
      </motion.a>

      {/* Animations supplémentaires CSS */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
}
