// src/components/AboutPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
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
  FaGlobe,
  FaBrain,
  FaDatabase,
  FaNetworkWired,
  FaCogs,
  FaUserCheck,
  FaChartLine,
} from "react-icons/fa";

// ================= API CONFIG =================
const API_BASE_URL = "http://localhost:5000";
const TEAM_API = `${API_BASE_URL}/api/team`;

// Mapping des icônes pour les compétences
const COMPETENCE_ICONS = {
  applicationsWeb: <FaGlobe />,
  applicationsMobile: <FaMobileAlt />,
  uiUx: <FaPalette />,
  optimisationPerformance: <FaRocket />,
  frontEnd: <FaReact />,
  responsive: <FaMobileAlt />,
  accessibilite: <FaUserCheck />,
};

// Mapping des labels pour les compétences
const COMPETENCE_LABELS = {
  applicationsWeb: {
    fr: "Applications Web",
    en: "Web Applications",
    ar: "تطبيقات الويب"
  },
  applicationsMobile: {
    fr: "Applications Mobile",
    en: "Mobile Applications",
    ar: "تطبيقات المحمول"
  },
  uiUx: {
    fr: "UI/UX Design",
    en: "UI/UX Design",
    ar: "تصميم واجهة المستخدم"
  },
  optimisationPerformance: {
    fr: "Optimisation Performance",
    en: "Performance Optimization",
    ar: "تحسين الأداء"
  },
  frontEnd: {
    fr: "Front-End",
    en: "Front-End",
    ar: "واجهة أمامية"
  },
  responsive: {
    fr: "Responsive Design",
    en: "Responsive Design",
    ar: "تصميم متجاوب"
  },
  accessibilite: {
    fr: "Accessibilité",
    en: "Accessibility",
    ar: "إمكانية الوصول"
  },
};

// Icônes par spécialité
const SPECIALITE_ICONS = {
  "Développement Front-End": <FaReact />,
  "Développement Back-End": <FaServer />,
  "Full-Stack": <FaCogs />,
  "UI/UX Design": <FaPalette />,
  "DevOps": <FaNetworkWired />,
  "Data Science": <FaBrain />,
  "Cloud Architecture": <FaCloud />,
  "Mobile Development": <FaMobileAlt />,
  "Database": <FaDatabase />,
  "Security": <FaShieldAlt />,
  "Performance": <FaChartLine />,
  "API Development": <FaCode />,
};

// ================= ANIMATION =================
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ================= COMPONENT =================
export default function AboutPage({ lang = "fr" }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données depuis MongoDB
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(TEAM_API);
      console.log("Données reçues:", response.data); // Debug
      
      // Transformer les données de MongoDB en format compatible
      const formattedMembers = response.data.map(member => ({
        id: member._id,
        name: {
          fr: member.nomComplet || "",
          en: member.nomComplet || "",
          ar: member.nomComplet || ""
        },
        role: {
          fr: member.poste || "",
          en: member.poste || "",
          ar: member.poste || ""
        },
        bio: {
          fr: member.description || "",
          en: member.description || "",
          ar: member.description || ""
        },
        img: member.photo || "",
        specialitePrincipale: member.specialitePrincipale || "",
        expertise: transformCompetencesToExpertise(member.competences || {}, member.technologies || []),
        technologies: member.technologies || [],
        qualites: member.qualites || [],
        langues: member.langues || [],
        anneesExperience: member.anneesExperience || 0,
        disponibilite: member.disponibilite || "Full-time",
        reseaux: {
          linkedin: member.reseaux?.linkedin || "",
          github: member.reseaux?.github || "",
        },
        projets: member.projets || [],
        competences: member.competences || {},
      }));
      
      console.log("Membres formatés:", formattedMembers); // Debug
      setMembers(formattedMembers);
    } catch (err) {
      console.error("Erreur lors du chargement des membres:", err);
      setError("Impossible de charger les données de l'équipe");
      
      // Données de secours
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Transformer les compétences booléennes en format d'expertise
  const transformCompetencesToExpertise = (competences, technologies) => {
    const expertiseList = [];
    
    // Ajouter les compétences activées
    Object.entries(competences || {}).forEach(([key, value]) => {
      if (value && COMPETENCE_ICONS[key] && COMPETENCE_LABELS[key]) {
        expertiseList.push({
          icon: COMPETENCE_ICONS[key],
          label: COMPETENCE_LABELS[key],
          type: "competence"
        });
      }
    });
    
    // Ajouter les 3 premières technologies comme expertises
    technologies.slice(0, 3).forEach(tech => {
      expertiseList.push({
        icon: <FaCode />,
        label: {
          fr: tech,
          en: tech,
          ar: tech
        },
        type: "technologie"
      });
    });
    
    return expertiseList;
  };

  useEffect(() => {
    fetchTeamMembers();
    
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
  const isTablet = windowWidth >= 768 && windowWidth < 1030;
  const isLarge = windowWidth >= 1030 && windowWidth < 1280;
  const isExtraLarge = windowWidth >= 1280;

  // Fonction pour obtenir l'icône par spécialité
  const getSpecialiteIcon = (specialite) => {
    for (const [key, icon] of Object.entries(SPECIALITE_ICONS)) {
      if (specialite?.includes(key)) {
        return icon;
      }
    }
    return <FaBrain />; // Icône par défaut
  };

  // État de chargement
  if (loading) {
    return (
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {lang === "fr" && "Chargement de l'équipe..."}
            {lang === "en" && "Loading team..."}
            {lang === "ar" && "جارٍ تحميل الفريق..."}
          </p>
        </div>
      </section>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {lang === "fr" && "Erreur de chargement"}
            {lang === "en" && "Loading Error"}
            {lang === "ar" && "خطأ في التحميل"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error}
          </p>
          <button
            onClick={fetchTeamMembers}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {lang === "fr" && "Réessayer"}
            {lang === "en" && "Retry"}
            {lang === "ar" && "إعادة المحاولة"}
          </button>
        </div>
      </section>
    );
  }

  // État vide
  if (members.length === 0) {
    return (
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {lang === "fr" && "Aucun membre d'équipe"}
            {lang === "en" && "No team members"}
            {lang === "ar" && "لا يوجد أعضاء في الفريق"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {lang === "fr" && "Commencez par ajouter des membres via le panneau d'administration."}
            {lang === "en" && "Start by adding members via the admin panel."}
            {lang === "ar" && "ابدأ بإضافة أعضاء عبر لوحة الإدارة."}
          </p>
        </div>
      </section>
    );
  }

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
            {lang === "fr" && "Notre Équipe d'Experts"}
            {lang === "en" && "Our Expert Team"}
            {lang === "ar" && "فريق خبرائنا"}
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
            {lang === "fr" && "Découvrez les talents qui donnent vie à vos projets digitaux"}
            {lang === "en" && "Meet the talents who bring your digital projects to life"}
            {lang === "ar" && "تعرف على المواهب التي تحيي مشاريعك الرقمية"}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {members.length} {lang === "fr" ? "membres" : lang === "en" ? "members" : "أعضاء"}
          </div>
        </motion.div>

        {/* Profile Cards */}
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
          {members.map((member) => (
            <motion.article
              key={member.id}
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
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name[lang]}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name[lang])}&background=random`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                          {member.name[lang]?.charAt(0) || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Badge spécialité */}
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
                    {getSpecialiteIcon(member.specialitePrincipale)}
                  </div>
                </div>

                {/* Profile Info */}
                <div className={`
                  flex-1
                  ${isTablet && windowWidth < 850 ? "text-center" : ""}
                  ${isExtraSmall || isSmall || isMedium ? "text-center" : ""}
                `}>
                  {/* Badge disponibilité et expérience */}
                  <div className={`
                    mb-3 flex flex-wrap gap-2
                    ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "justify-center" : ""}
                  `}>
                    {/* Badge disponibilité */}
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${member.disponibilite === "Full-time" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : member.disponibilite === "Part-time"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      }
                    `}>
                      {member.disponibilite}
                    </span>
                    
                    {/* Badge expérience */}
                    {member.anneesExperience > 0 && (
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
                        <Calendar className="h-3 w-3 mr-1" />
                        {member.anneesExperience} {lang === "fr" ? "ans" : lang === "en" ? "years" : "سنوات"}
                      </span>
                    )}
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
                    {member.name[lang]}
                  </h3>

                  {/* Role */}
                  <div className="mb-3">
                    <p className={`
                      text-gray-700 dark:text-gray-300 font-medium
                      ${isTablet ? `
                        ${windowWidth >= 850 ? "text-base" : "text-sm"}
                      ` :
                      isExtraSmall ? "text-sm" :
                      isSmall ? "text-sm" :
                      isMedium ? "text-base" :
                      isLarge ? "text-base" :
                      "text-lg"}
                    `}>
                      {member.role[lang]}
                    </p>
                    {member.specialitePrincipale && (
                      <p className={`
                        text-gray-600 dark:text-gray-400
                        ${isTablet ? `
                          ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                        ` :
                        isExtraSmall ? "text-xs" :
                        isSmall ? "text-xs" :
                        isMedium ? "text-sm" :
                        isLarge ? "text-sm" :
                        "text-base"}
                      `}>
                        {member.specialitePrincipale}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
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
                    {member.bio[lang]}
                  </p>

                  {/* Expertise Tags */}
                  <div className={`
                    flex flex-wrap gap-2 mb-6
                    ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "justify-center" : ""}
                  `}>
                    {member.expertise?.slice(0, 5).map((expertise, index) => (
                      <span
                        key={index}
                        className={`
                          flex items-center gap-1.5
                          bg-gradient-to-r from-gray-50 to-white 
                          dark:from-gray-800 dark:to-gray-900 
                          border border-gray-200 dark:border-gray-700 
                          rounded-full font-medium group-hover:border-blue-300 
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
                          text-blue-600 dark:text-blue-400
                          ${isTablet ? `
                            ${windowWidth >= 850 ? "text-sm" : "text-xs"}
                          ` :
                          isExtraSmall ? "text-xs" :
                          isSmall ? "text-xs" :
                          isMedium ? "text-sm" :
                          isLarge ? "text-base" :
                          "text-lg"}
                        `}>
                          {expertise.icon}
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
                          {expertise.label[lang] || expertise.label}
                        </span>
                      </span>
                    ))}
                    {member.expertise?.length > 5 && (
                      <span className={`
                        inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 
                        text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium
                      `}>
                        +{member.expertise.length - 5} {lang === "fr" ? "de plus" : lang === "en" ? "more" : "المزيد"}
                      </span>
                    )}
                  </div>

                  {/* Technologies rapides */}
                  {member.technologies?.length > 0 && (
                    <div className="mb-4">
                      <p className={`
                        text-xs text-gray-500 dark:text-gray-400 mb-2
                        ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "text-center" : ""}
                      `}>
                        {lang === "fr" && "Technologies :"}
                        {lang === "en" && "Technologies:"}
                        {lang === "ar" && "التقنيات:"}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {member.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                            +{member.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {(member.reseaux?.linkedin || member.reseaux?.github) && (
                    <div className={`
                      flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800
                      ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "flex-col" : "flex-row"}
                      ${(isTablet && windowWidth < 850) || isExtraSmall || isSmall || isMedium ? "items-center" : ""}
                    `}>
                      {member.reseaux?.github && (
                        <a
                          href={member.reseaux.github}
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
                      )}
                      {member.reseaux?.linkedin && (
                        <a
                          href={member.reseaux.linkedin}
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
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        
      </div>

      {/* CSS pour améliorer la flexibilité */}
      <style jsx>{`
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
        
        [lang="ar"] {
          direction: rtl;
          text-align: right;
        }
        
        [lang="ar"] .flex-row {
          direction: ltr;
        }
      `}</style>
    </section>
  );
}

// Composant Calendar icon (ajouter en import)
function Calendar({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}