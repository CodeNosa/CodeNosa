// src/components/Hero.jsx
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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
  },
};

export default function Hero({ lang }) {
  const t = useMemo(() => heroTexts[lang] || heroTexts.fr, [lang]);

  // ===== State pour features depuis MongoDB =====
  const [dbFeatures, setDbFeatures] = useState([]);

  // ===== Fetch features depuis API =====
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/features");
        setDbFeatures(res.data);
      } catch (err) {
        console.error("Erreur fetch features:", err);
      }
    };
    fetchFeatures();
  }, []);

  // ===== Typewriter =====
  const [currentSub, setCurrentSub] = useState("");
  const [subIndex, setSubIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < t.subtitle[subIndex].length) {
        setCurrentSub((prev) => prev + t.subtitle[subIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCurrentSub("");
          setCharIndex(0);
          setSubIndex((subIndex + 1) % t.subtitle.length);
        }, 1500);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [charIndex, subIndex, t.subtitle]);

  // ===== Mouse effect =====
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;
    const throttleDelay = 16;

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > throttleDelay) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 10;
          const y = (e.clientY / window.innerHeight - 0.5) * 10;
          setMousePosition({ x, y });
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const titleTransform = `translateX(${mousePosition.x * 0.05}px) translateY(${mousePosition.y * 0.05}px)`;
  const subtitleTransform = `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.03}px)`;
  const buttonTransform = `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`;
  const badgeTransform = `translateX(${mousePosition.x * 0.15}px) translateY(${mousePosition.y * 0.15}px)`;

  return (
    <section
      id="home"
      className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-10 left-5 sm:left-10 w-48 h-48 sm:w-64 sm:h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-5 sm:right-10 w-56 h-56 sm:w-72 sm:h-72 bg-green-300/15 dark:bg-green-500/10 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-40 dark:opacity-15 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#00000008_1px,transparent_1px),linear-gradient(#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(90deg,#ffffff05_1px,transparent_1px),linear-gradient(#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900 -z-20" />

      {/* Badge */}
      <div className="relative mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          style={{ transform: badgeTransform }}
        >
          <div className="relative mr-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {lang === "fr"
              ? "Agence Digital"
              : lang === "ar"
              ? "وكالة رقمية"
              : "Digital Agency"}
          </span>
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4"
        style={{ transform: titleTransform }}
      >
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t.title}
        </span>
      </motion.h1>

      {/* Subtitle Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-8 sm:h-10 mb-6 sm:mb-8"
        style={{ transform: subtitleTransform }}
      >
        <span className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
          {currentSub}
        </span>
        <span className="ml-1 inline-block w-[2px] h-6 sm:h-8 bg-current animate-blink" />
      </motion.div>

      {/* CTA Button */}
      <motion.a
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        href="#portfolio"
        className="relative inline-block px-6 py-3 sm:px-8 sm:py-4 font-semibold rounded-full overflow-hidden group mb-12 sm:mb-16"
        style={{ transform: buttonTransform }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full" />
        <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        <span className="relative text-white font-bold text-base sm:text-lg">
          {t.cta}
        </span>
      </motion.a>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {dbFeatures.length > 0
            ? dbFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-3 sm:p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-2xl sm:text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature.title}
                  </div>
                </div>
              ))
            : t.subtitle.map((text, i) => (
                <div key={i} className="text-xs">
                  {text}
                </div>
              ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      {/* CSS inline minimal */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
}
