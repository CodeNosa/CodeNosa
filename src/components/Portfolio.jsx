import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaStar,
  FaRocket,
  FaCode,
  FaMobileAlt,
  FaPalette,
  FaGlobe
} from "react-icons/fa";
import axios from "axios";

/* ===================== CONFIG ===================== */
const API_URL = "http://localhost:5000/api/portfolios";

/* ===================== CATEGORIES ===================== */
const categories = [
  { id: "all", label: { fr: "Tous", en: "All", ar: "الكل" }, icon: FaGlobe, color: "from-primary to-accent" },
  { id: "web", label: { fr: "Web", en: "Web", ar: "ويب" }, icon: FaCode, color: "from-blue-500 to-cyan-500" },
  { id: "mobile", label: { fr: "Mobile", en: "Mobile", ar: "جوال" }, icon: FaMobileAlt, color: "from-purple-500 to-pink-500" },
  { id: "design", label: { fr: "Design", en: "Design", ar: "تصميم" }, icon: FaPalette, color: "from-yellow-500 to-orange-500" }
];

/* ===================== ANIMATIONS ===================== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -10 }
};

export default function Portfolio({ lang = "fr" }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* ===== Mapping Backend → Front ===== */
  const mappedProjects = useMemo(() => {
    return projects.map(p => ({
      id: p._id,
      title: {
        fr: p.titre.francais,
        en: p.titre.anglais,
        ar: p.titre.arabe
      },
      description: {
        fr: p.client,
        en: p.client,
        ar: p.client
      },
      tags: p.technologies || [],
      category: p.categorie?.toLowerCase() || "web",
      year: p.annee,
      client: p.client,
      image: p.imageUrl,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      featured: p.mettreEnVedette,
      stats: {
        techs: p.technologies?.length || 0,
        status: "✔"
      },
      duration: "—"
    }));
  }, [projects]);

  /* ===== Filter ===== */
  const filteredProjects = useMemo(() => {
    return selectedCategory === "all"
      ? mappedProjects
      : mappedProjects.filter(p => p.category === selectedCategory);
  }, [selectedCategory, mappedProjects]);

  const t = obj => obj?.[lang] || obj?.en;

  const getCategoryIcon = id => {
    const c = categories.find(cat => cat.id === id);
    return c ? c.icon : FaGlobe;
  };

  if (loading) {
    return (
      <div className="py-40 text-center text-primary text-xl">
        Loading portfolio...
      </div>
    );
  }

  /* ===================== JSX ===================== */
  return (
    <section id="portfolio" className="relative py-24 bg-gradient-to-br from-night via-secondary to-primaryDark overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4">

        <div className="text-center mb-20">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <FaRocket className="text-primary mr-2" />
            <span className="text-primary font-semibold">
              {lang === "fr" ? "Réalisations Premium" : lang === "ar" ? "إنجازات مميزة" : "Premium Work"}
            </span>
          </div>

          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {lang === "fr" ? "Notre Portfolio" : lang === "ar" ? "أعمالنا" : "Our Portfolio"}
          </h2>
        </div>

        {/* ===== Categories ===== */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-xl flex items-center gap-3 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white`
                    : "bg-night/60 text-softwhite/70 border border-primary/20"
                }`}
              >
                <Icon />
                {t(cat.label)}
              </button>
            );
          })}
        </div>

        {/* ===== Grid ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map(project => {
            const Icon = getCategoryIcon(project.category);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="cursor-pointer"
              >
                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className="rounded-2xl overflow-hidden bg-night/80 border border-primary/30 shadow-2xl"
                >
                  <div className="relative h-56">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        transform: hoveredCard === project.id ? "scale(1.1)" : "scale(1)"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night to-transparent" />

                    {project.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs rounded-full flex items-center gap-1">
                        <FaStar /> Featured
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon className="text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-softwhite mb-2">
                      {t(project.title)}
                    </h3>
                    <p className="text-softwhite/70 text-sm mb-4 line-clamp-3">
                      {t(project.description)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-primary/20">
                      <span className="text-softwhite font-semibold">{project.client}</span>
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" onClick={e => e.stopPropagation()}>
                            <FaExternalLinkAlt className="text-primary" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" onClick={e => e.stopPropagation()}>
                            <FaGithub className="text-primary" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ===== Modal ===== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-night/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-secondary rounded-2xl p-8 max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-3xl font-bold mb-4 text-primary">
                {t(selectedProject.title)}
              </h3>
              <p className="text-softwhite mb-6">{t(selectedProject.description)}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
