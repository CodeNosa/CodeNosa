// src/components/AboutPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPalette,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaCode,
  FaMobileAlt,
  FaReact,
  FaCloud,
} from "react-icons/fa";

import samarImg from "../assets/samar.jpeg";
import nourhenImg from "../assets/nourhen.jpeg";

// ================= DATA  nbdlou lna=================
const profiles = [
  {
    id: "samar",
    name: { fr: "Samar Gharbi", en: "Samar Gharbi", ar: "سمر الغربي" },
    role: {
      fr: "Développeuse Front-End & Applications Mobiles",
      en: "Front-End & Mobile App Developer",
      ar: "مطوّرة واجهات أمامية وتطبيقات هاتف"
    },
    bio: {
      fr: "Je transforme vos idées en expériences digitales exceptionnelles, alliant design intuitif et performance technique. Spécialisée dans la création d'interfaces qui captivent et convertissent, j'optimise chaque pixel pour maximiser l'engagement utilisateur.",
      en: "I transform your ideas into exceptional digital experiences, combining intuitive design and technical performance. Specialized in creating interfaces that captivate and convert, I optimize every pixel to maximize user engagement.",
      ar: "أحوّل أفكارك إلى تجارب رقمية استثنائية، أجمع بين التصميم البديهي والأداء التقني. متخصصة في إنشاء واجهات تجذب وتحول، وأحسّن كل عنصر لتحقيق أقصى قدر من تفاعل المستخدم."
    },
    img: samarImg,
    expertise: [
      { icon: <FaReact />, label: { fr: "Applications Web & Mobile", en: "Web & Mobile Applications", ar: "تطبيقات الويب والمحمول" } },
      { icon: <FaPalette />, label: { fr: "Design Centré Utilisateur", en: "User-Centered Design", ar: "تصميم يركز على المستخدم" } },
      { icon: <FaRocket />, label: { fr: "Optimisation des performances", en: "Performance Optimization", ar: "تحسين الأداء" } },
      { icon: <FaMobileAlt />, label: { fr: "Applications Responsives", en: "Responsive Applications", ar: "تطبيقات متجاوبة" } },
    ],
    github: "https://github.com/samargh",
    linkedin: "https://linkedin.com/in/samar",
  },
  {
    id: "nourhen",
    name: { fr: "Nourhen Ben Halima", en: "Nourhen Ben Halima", ar: "نورهان بن حليمة" },
    role: {
      fr: "Architecte Back-End & Infrastructure",
      en: "Back-End & Infrastructure Architect",
      ar: "مهندسة البنية التحتية والنظم الخلفية"
    },
    bio: {
      fr: "Je construis l'architecture technique robuste qui soutient vos ambitions digitales. Expert en développement de systèmes sécurisés, scalables et haute performance, je garantis la stabilité et l'évolution de vos plateformes.",
      en: "I build the robust technical architecture that supports your digital ambitions. Expert in developing secure, scalable, and high-performance systems, I ensure the stability and evolution of your platforms.",
      ar: "أبني البنية التقنية القوية التي تدعم طموحاتك الرقمية. خبيرة في تطوير أنظمة آمنة وقابلة للتوسع وعالية الأداء، أضمن استقرار وتطور منصاتك."
    },
    img: nourhenImg,
    expertise: [
      { icon: <FaServer />, label: { fr: "Architecture Cloud", en: "Cloud Architecture", ar: "هندسة السحابة" } },
      { icon: <FaShieldAlt />, label: { fr: "Sécurité Avancée", en: "Advanced Security", ar: "أمن متقدم" } },
      { icon: <FaCode />, label: { fr: "APIs & Microservices", en: "APIs & Microservices", ar: "واجهات برمجة والخدمات المصغرة" } },
      { icon: <FaCloud />, label: { fr: "DevOps & Scalabilité", en: "DevOps & Scalability", ar: "ديف أوبس وقابلية التوسع" } },
    ],
    github: "https://github.com/nourhen",
    linkedin: "https://linkedin.com/in/nourhen",
  },
];


// ================= ANIMATION =================
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ================= COMPONENT =================
export default function AboutPage({ lang = "fr" }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Définir les breakpoints critiques
  const isExtraSmall = windowWidth < 400;
  const isSmall = windowWidth >= 400 && windowWidth < 640;
  const isMedium = windowWidth >= 640 && windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1030; // Zone critique
  const isLarge = windowWidth >= 1030 && windowWidth < 1280;
  const isExtraLarge = windowWidth >= 1280;

  return (
    <section
      id="about"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 xs:px-6 sm:px-8 md:px-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background decoration responsive */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className={`absolute ${
          isExtraSmall ? "-top-16 -right-16 w-32 h-32" :
          isSmall ? "-top-20 -right-20 w-40 h-40" :
          isMedium ? "-top-28 -right-28 w-52 h-52" :
          isTablet ? "-top-32 -right-32 w-64 h-64" :
          "-top-40 -right-40 w-80 h-80"
        } bg-blue-400 rounded-full mix-blend-multiply filter ${
          isExtraSmall ? "blur-xl" :
          isSmall ? "blur-2xl" :
          "blur-3xl"
        }`}></div>
        <div className={`absolute ${
          isExtraSmall ? "-bottom-16 -left-16 w-32 h-32" :
          isSmall ? "-bottom-20 -left-20 w-40 h-40" :
          isMedium ? "-bottom-28 -left-28 w-52 h-52" :
          isTablet ? "-bottom-32 -left-32 w-64 h-64" :
          "-bottom-40 -left-40 w-80 h-80"
        } bg-purple-400 rounded-full mix-blend-multiply filter ${
          isExtraSmall ? "blur-xl" :
          isSmall ? "blur-2xl" :
          "blur-3xl"
        }`}></div>
      </div>

      <div className={`w-full mx-auto relative z-10 ${
        isExtraSmall ? "max-w-xs" :
        isSmall ? "max-w-sm" :
        isMedium ? "max-w-2xl" :
        isTablet ? "max-w-4xl" :
        isLarge ? "max-w-5xl" :
        "max-w-6xl"
      }`}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className={`
            font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6
            ${isExtraSmall ? "text-xl" :
            isSmall ? "text-2xl" :
            isMedium ? "text-3xl" :
            isTablet ? "text-3xl md:text-4xl" :
            "text-4xl lg:text-5xl"}
            ${isTablet ? "px-2" : "px-0"}
          `}>
            {lang === "fr" && "L'Excellence Technique au Service de Votre Vision"}
            {lang === "en" && "Technical Excellence Serving Your Vision"}
            {lang === "ar" && "التميز التقني في خدمة رؤيتك"}
          </h2>
          <p className={`
            text-gray-600 dark:text-gray-300 mx-auto
            ${isExtraSmall ? "text-xs max-w-xs" :
            isSmall ? "text-sm max-w-sm" :
            isMedium ? "text-base max-w-md" :
            isTablet ? "text-lg max-w-2xl" :
            "text-xl max-w-3xl"}
            ${isTablet ? "px-4" : "px-2"}
            leading-relaxed
          `}>
            {lang === "fr" && "Une équipe d'experts dédiés à transformer vos projets digitaux en succès tangibles"}
            {lang === "en" && "A team of experts dedicated to transforming your digital projects into tangible success"}
            {lang === "ar" && "فريق من الخبراء مكرس لتحويل مشاريعك الرقمية إلى نجاح ملموس"}
          </p>
        </motion.div>

        {/* Profile Cards - Optimisé pour la zone critique 768-1030px */}
        <div className={`
          grid gap-6 sm:gap-8 
          ${isTablet ? `
            grid-cols-1 lg:grid-cols-2 
            ${windowWidth >= 850 ? "gap-10" : "gap-8"}
          ` : 
          isExtraSmall ? "grid-cols-1 gap-4" :
          isSmall ? "grid-cols-1 gap-6" :
          isMedium ? "grid-cols-1 gap-8" :
          isLarge ? "grid-cols-2 gap-10" :
          "grid-cols-2 gap-12"}
        `}>
          {profiles.map((p) => (
            <motion.article
              key={p.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className={`
                group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                border border-gray-200 dark:border-gray-800 
                transition-all duration-300 hover:-translate-y-1
                ${isTablet ? `
                  ${windowWidth >= 900 ? "rounded-3xl" : "rounded-2xl"}
                  ${windowWidth >= 900 ? "p-8" : "p-6"}
                  shadow-xl hover:shadow-2xl
                ` :
                isExtraSmall ? "rounded-xl p-4 shadow-lg" :
                isSmall ? "rounded-xl p-5 shadow-lg" :
                isMedium ? "rounded-2xl p-6 shadow-lg" :
                isLarge ? "rounded-3xl p-8 shadow-xl" :
                "rounded-3xl p-10 shadow-2xl"}
              `}
            >
              {/* Layout flexible pour tablette */}
              <div className={`
                ${isTablet ? `
                  ${windowWidth >= 850 ? "flex md:flex-row" : "flex flex-col"}
                  ${windowWidth >= 850 ? "gap-8" : "gap-6"}
                ` :
                isExtraSmall || isSmall || isMedium ? "flex flex-col items-center text-center" :
                "flex md:flex-row gap-8 lg:gap-10"}
              `}>
                
                {/* Profile Image Container */}
                <div className={`
                  ${isTablet ? `
                    ${windowWidth >= 850 ? "shrink-0" : "mx-auto mb-4"}
                  ` : 
                  isExtraSmall || isSmall || isMedium ? "mb-4" : "shrink-0"}
                  relative
                `}>
                  <div className={`
                    overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg
                    ${isTablet ? `
                      ${windowWidth >= 850 ? "w-28 h-28" : "w-32 h-32"}
                      ${windowWidth >= 900 ? "rounded-2xl" : "rounded-xl"}
                    ` :
                    isExtraSmall ? "w-24 h-24 rounded-lg" :
                    isSmall ? "w-28 h-28 rounded-lg" :
                    isMedium ? "w-32 h-32 rounded-xl" :
                    isLarge ? "w-36 h-36 rounded-2xl" :
                    "w-40 h-40 rounded-2xl"}
                  `}>
                    <img
                      src={p.img}
                      alt={p.name[lang]}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className={`
                    absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 
                    rounded-full flex items-center justify-center
                    ${isTablet ? `
                      ${windowWidth >= 850 ? "w-10 h-10" : "w-12 h-12"}
                    ` :
                    isExtraSmall ? "w-8 h-8" :
                    isSmall ? "w-9 h-9" :
                    isMedium ? "w-10 h-10" :
                    isLarge ? "w-11 h-11" :
                    "w-12 h-12"}
                  `}>
                    {p.id === "samar" ? (
                      <FaReact className={`
                        text-white 
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-base" : "text-lg"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-sm" :
                        isMedium ? "text-base" :
                        isLarge ? "text-lg" :
                        "text-xl"}
                      `} />
                    ) : (
                      <FaServer className={`
                        text-white 
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-base" : "text-lg"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-sm" :
                        isMedium ? "text-base" :
                        isLarge ? "text-lg" :
                        "text-xl"}
                      `} />
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className={`
                  flex-1
                  ${isTablet && windowWidth < 850 ? "text-center" : ""}
                  ${isExtraSmall || isSmall || isMedium ? "text-center" : ""}
                `}>
                  {/* Role badge */}
                  <div className={`
                    mb-3 
                    ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "flex justify-center" : ""}
                  `}>
                    <span className={`
                      inline-block bg-gradient-to-r from-blue-100 to-purple-100 
                      dark:from-blue-900/30 dark:to-purple-900/30 
                      text-blue-700 dark:text-blue-300 rounded-full font-semibold
                      ${isTablet ? `
                        ${windowWidth >= 850 ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs"}
                      ` :
                      isExtraSmall ? "px-2 py-0.5 text-xs" :
                      isSmall ? "px-3 py-1 text-xs" :
                      isMedium ? "px-3 py-1 text-sm" :
                      isLarge ? "px-4 py-1.5 text-sm" :
                      "px-4 py-1.5 text-base"}
                    `}>
                      {p.role[lang]}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className={`
                    font-bold text-gray-900 dark:text-white mb-2
                    ${isTablet ? `
                      ${windowWidth >= 850 ? "text-2xl" : "text-xl"}
                    ` :
                    isExtraSmall ? "text-lg" :
                    isSmall ? "text-xl" :
                    isMedium ? "text-2xl" :
                    isLarge ? "text-2xl" :
                    "text-3xl"}
                  `}>
                    {p.name[lang]}
                  </h3>

                  {/* Bio - Optimisé pour tablette */}
                  <p className={`
                    text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed
                    ${isTablet ? `
                      ${windowWidth >= 850 ? 
                        "text-sm line-clamp-4" : 
                        "text-base line-clamp-3"}
                    ` :
                    isExtraSmall ? "text-xs line-clamp-3" :
                    isSmall ? "text-sm line-clamp-3" :
                    isMedium ? "text-base line-clamp-4" :
                    isLarge ? "text-base" :
                    "text-lg"}
                  `}>
                    {p.bio[lang]}
                  </p>

                  {/* Expertise Tags - Layout amélioré pour tablette */}
                  <div className={`
                    flex flex-wrap gap-2 mb-6
                    ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "justify-center" : ""}
                  `}>
                    {p.expertise.map((e, i) => (
                      <span
                        key={i}
                        className={`
                          flex items-center gap-1.5
                          bg-gradient-to-r from-gray-50 to-white 
                          dark:from-gray-800 dark:to-gray-900 
                          border border-gray-200 dark:border-gray-700 
                          rounded-full font-medium group-hover:border-primary/30 
                          transition-colors
                          ${isTablet ? `
                            ${windowWidth >= 850 ? 
                              "px-3 py-1.5 text-xs" : 
                              "px-2.5 py-1 text-xs"}
                            ${windowWidth >= 850 ? "flex-nowrap" : "flex-shrink-0"}
                          ` :
                          isExtraSmall ? "px-2 py-1 text-xs" :
                          isSmall ? "px-2.5 py-1 text-xs" :
                          isMedium ? "px-3 py-1.5 text-xs" :
                          isLarge ? "px-3 py-1.5 text-sm" :
                          "px-4 py-2 text-sm"}
                          ${isTablet && windowWidth < 850 ? "max-w-[180px]" : ""}
                        `}
                      >
                        <span className={`
                          text-primary
                          ${isTablet ? `
                            ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                          ` :
                          isExtraSmall ? "text-xs" :
                          isSmall ? "text-xs" :
                          isMedium ? "text-sm" :
                          isLarge ? "text-base" :
                          "text-lg"}
                        `}>
                          {e.icon}
                        </span>
                        <span className={`
                          text-gray-700 dark:text-gray-300 whitespace-nowrap
                          ${isTablet ? `
                            ${windowWidth >= 850 ? "text-xs" : "text-xs"}
                            ${windowWidth >= 850 ? "truncate max-w-[100px]" : "truncate max-w-[120px]"}
                          ` :
                          isExtraSmall ? "text-xs truncate max-w-[80px]" :
                          isSmall ? "text-xs truncate max-w-[90px]" :
                          isMedium ? "text-xs truncate max-w-[110px]" :
                          isLarge ? "text-sm truncate max-w-[130px]" :
                          "text-sm"}
                        `}>
                          {e.label[lang]}
                        </span>
                      </span>
                    ))}
                  </div>

                  {/* Social Links - Optimisé pour tablette */}
                  <div className={`
                    flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800
                    ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "flex-col" : "flex-row"}
                    ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "items-center" : ""}
                  `}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center justify-center gap-2 
                        bg-gray-900 text-white rounded-lg hover:bg-black 
                        transition-colors group
                        ${isTablet ? `
                          ${windowWidth >= 850 ? 
                            "px-4 py-2.5 text-sm" : 
                            "px-4 py-2 text-sm w-full"}
                        ` :
                        isExtraSmall ? "px-3 py-2 text-xs w-full" :
                        isSmall ? "px-4 py-2 text-xs w-full" :
                        isMedium ? "px-4 py-2.5 text-sm w-full" :
                        isLarge ? "px-4 py-2.5 text-sm" :
                        "px-5 py-3 text-base"}
                        ${(isTablet && windowWidth >= 850) || isLarge || isExtraLarge ? "w-auto" : "w-full"}
                      `}
                    >
                      <FaGithub className={`
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-xs" :
                        isMedium ? "text-sm" :
                        isLarge ? "text-base" :
                        "text-lg"}
                      `} />
                      <span className={`
                        font-medium
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-xs" :
                        isMedium ? "text-sm" :
                        isLarge ? "text-sm" :
                        "text-base"}
                      `}>
                        GitHub
                      </span>
                    </a>
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center justify-center gap-2 
                        bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                        transition-colors group
                        ${isTablet ? `
                          ${windowWidth >= 850 ? 
                            "px-4 py-2.5 text-sm" : 
                            "px-4 py-2 text-sm w-full"}
                        ` :
                        isExtraSmall ? "px-3 py-2 text-xs w-full" :
                        isSmall ? "px-4 py-2 text-xs w-full" :
                        isMedium ? "px-4 py-2.5 text-sm w-full" :
                        isLarge ? "px-4 py-2.5 text-sm" :
                        "px-5 py-3 text-base"}
                        ${(isTablet && windowWidth >= 850) || isLarge || isExtraLarge ? "w-auto" : "w-full"}
                      `}
                    >
                      <FaLinkedin className={`
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-xs" :
                        isMedium ? "text-sm" :
                        isLarge ? "text-base" :
                        "text-lg"}
                      `} />
                      <span className={`
                        font-medium
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-xs" :
                        isMedium ? "text-sm" :
                        isLarge ? "text-sm" :
                        "text-base"}
                      `}>
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          className={`
            mt-10 sm:mt-12 lg:mt-16 text-center
            ${isTablet ? "px-4" : ""}
          `}
        >
          <div className={`
            inline-block bg-gradient-to-r from-blue-500 to-purple-600 
            ${isTablet ? `
              ${windowWidth >= 850 ? "rounded-2xl px-6 py-3" : "rounded-xl px-4 py-2"}
            ` :
            isExtraSmall ? "rounded-lg px-3 py-2" :
            isSmall ? "rounded-lg px-4 py-2" :
            isMedium ? "rounded-xl px-5 py-3" :
            isLarge ? "rounded-2xl px-6 py-3" :
            "rounded-2xl px-8 py-4"}
          `}>
            <p className={`
              text-white font-semibold
              ${isTablet ? `
                ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                ${windowWidth < 850 ? "whitespace-normal" : "whitespace-nowrap"}
              ` :
              isExtraSmall ? "text-xs whitespace-normal" :
              isSmall ? "text-xs whitespace-nowrap" :
              isMedium ? "text-sm whitespace-nowrap" :
              isLarge ? "text-base whitespace-nowrap" :
              "text-lg whitespace-nowrap"}
            `}>
              {lang === "fr" && "🔒 Garantie de qualité - 📱 Support multi-plateforme - ⚡ Livraison rapide"}
              {lang === "en" && "🔒 Quality guarantee - 📱 Multi-platform support - ⚡ Fast delivery"}
              {lang === "ar" && "🔒 ضمان الجودة - 📱 دعم متعدد المنصات - ⚡ تسليم سريع"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* CSS pour améliorer la flexibilité */}
      <style jsx>{`
        /* Utilitaire line-clamp */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Optimisations pour la zone critique */
        @media (min-width: 768px) and (max-width: 1030px) {
          /* Ajustement fluide des tailles de police */
          .fluid-text {
            font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          }
          
          /* Images proportionnelles */
          .fluid-image {
            width: clamp(100px, 20vw, 140px);
            height: clamp(100px, 20vw, 140px);
          }
        }
        
        /* Support pour le texte arabe */
        [lang="ar"] {
          direction: rtl;
          text-align: right;
        }
        
        [lang="ar"] .flex-row {
          direction: ltr;
        }
        
        /* Smooth scrolling pour les tags */
        .expertise-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
        }
        
        .expertise-container::-webkit-scrollbar {
          height: 4px;
        }
        
        .expertise-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .expertise-container::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}