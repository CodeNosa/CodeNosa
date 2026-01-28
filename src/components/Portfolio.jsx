// src/components/Portfolio.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaStar, FaFilter, FaRocket, FaCode, FaMobileAlt, FaPalette, FaGlobe } from "react-icons/fa";

const portfolioData = [
  {
    id: 1,
    title: { fr: "Plateforme E-commerce Luxe", en: "Luxury E-commerce Platform", ar: "منصة تجارة فاخرة" },
    description: {
      fr: "Plateforme e-commerce haut de gamme avec paiement sécurisé et interface utilisateur intuitive",
      en: "High-end e-commerce platform with secure payments and intuitive user interface",
      ar: "منصة تجارة إلكترونية فاخرة مع مدفوعات آمنة وواجهة مستخدم بديهية"
    },
    tags: ["React", "Next.js", "Shopify", "Stripe", "UI/UX"],
    category: "web",
    year: "2024",
    client: "LuxeBrand",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    stats: { traffic: "+40%", conversion: "+25%", satisfaction: "98%" },
    featured: true,
    duration: "3 mois"
  },
  {
    id: 2,
    title: { fr: "Application Mobile Fitness", en: "Fitness Mobile App", ar: "تطبيق لياقة بدنية" },
    description: {
      fr: "Application mobile de fitness avec suivi d'activité et programmes personnalisés",
      en: "Fitness mobile app with activity tracking and personalized programs",
      ar: "تطبيق لياقة بدنية بتتبع النشاط وبرامج مخصصة"
    },
    tags: ["React Native", "Firebase", "Node.js", "UI Design"],
    category: "mobile",
    year: "2023",
    client: "FitLife",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    stats: { downloads: "50K+", rating: "4.9", retention: "85%" },
    featured: true,
    duration: "4 mois"
  },
  {
    id: 3,
    title: { fr: "Dashboard Analytics Entreprise", en: "Enterprise Analytics Dashboard", ar: "لوحة تحليلات المؤسسات" },
    description: {
      fr: "Dashboard analytique en temps réel pour la prise de décision business",
      en: "Real-time analytics dashboard for business decision making",
      ar: "لوحة تحليلية فورية لاتخاذ القرارات التجارية"
    },
    tags: ["Vue.js", "D3.js", "Express", "MongoDB", "DataViz"],
    category: "web",
    year: "2023",
    client: "DataCorp",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    stats: { efficiency: "+60%", users: "500+", accuracy: "99.8%" },
    featured: false,
    duration: "5 mois"
  },
  {
    id: 4,
    title: { fr: "Application de Voyage", en: "Travel Application", ar: "تطبيق سفر" },
    description: {
      fr: "Application complète de voyage avec réservation et planification d'itinéraire",
      en: "Complete travel application with booking and itinerary planning",
      ar: "تطبيق سفر متكامل مع حجوزات وتخطيط المسارات"
    },
    tags: ["Flutter", "GraphQL", "AWS", "Mapbox", "Payment"],
    category: "mobile",
    year: "2024",
    client: "TravelPlus",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    stats: { bookings: "10K+", rating: "4.8", countries: "50+" },
    featured: true,
    duration: "6 mois"
  },
  {
    id: 5,
    title: { fr: "Site Corporate IA", en: "AI Corporate Website", ar: "موقع شركة بالذكاء الاصطناعي" },
    description: {
      fr: "Site web corporate intégrant des fonctionnalités d'IA pour l'expérience utilisateur",
      en: "Corporate website with integrated AI features for user experience",
      ar: "موقع شركة بميزات الذكاء الاصطناعي لتحسين تجربة المستخدم"
    },
    tags: ["Next.js", "AI/ML", "Three.js", "WebGL", "Animation"],
    category: "web",
    year: "2024",
    client: "TechVision",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    stats: { engagement: "+75%", performance: "95%", innovation: "100%" },
    featured: false,
    duration: "4 mois"
  },
  {
    id: 6,
    title: { fr: "Application Finance", en: "Finance Application", ar: "تطبيق مالي" },
    description: {
      fr: "Application de gestion financière avec analyses prédictives et sécurité avancée",
      en: "Financial management application with predictive analytics and advanced security",
      ar: "تطبيق إدارة مالية مع تحليلات تنبؤية وأمان متقدم"
    },
    tags: ["React Native", "Python", "Blockchain", "Security", "FinTech"],
    category: "mobile",
    year: "2023",
    client: "FinancePlus",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    stats: { growth: "+300%", security: "100%", users: "200K+" },
    featured: true,
    duration: "8 mois"
  }
];

const categories = [
  { id: "all", label: { fr: "Tous", en: "All", ar: "الكل" }, icon: FaGlobe, color: "from-primary to-accent" },
  { id: "web", label: { fr: "Web", en: "Web", ar: "ويب" }, icon: FaCode, color: "from-blue-500 to-cyan-500" },
  { id: "mobile", label: { fr: "Mobile", en: "Mobile", ar: "جوال" }, icon: FaMobileAlt, color: "from-purple-500 to-pink-500" },
  { id: "design", label: { fr: "Design", en: "Design", ar: "تصميم" }, icon: FaPalette, color: "from-yellow-500 to-orange-500" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const cardHoverVariants = {
  initial: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
  hover: { 
    scale: 1.05,
    y: -10,
    rotateX: 5,
    rotateY: 2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export default function Portfolio({ lang = "fr" }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return selectedCategory === "all"
      ? portfolioData
      : portfolioData.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const t = (obj) => obj[lang] || obj.en;

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : FaGlobe;
  };

  return (
    
    <section  id="portfolio"
    className="relative py-24 overflow-hidden bg-gradient-to-br from-night via-secondary to-primaryDark">
      {/* Background 3D Elements */}
      <div id="portfolio" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-accent/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm">
            <FaRocket className="text-primary mr-2" />
            <span className="text-sm font-semibold text-primary">
              {lang === "fr" ? "Réalisations Premium" : 
               lang === "ar" ? "إنجازات مميزة" : 
               "Premium Work"}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent">
              {lang === "fr" ? "Notre Portfolio" : 
               lang === "ar" ? "معرض أعمالنا" : 
               "Our Portfolio"}
            </span>
          </h2>
          
          <p className="text-xl text-softwhite/80 max-w-3xl mx-auto">
            {lang === "fr" ? "Découvrez nos projets innovants qui repoussent les limites du digital" :
             lang === "ar" ? "اكتشف مشاريعنا المبتكرة التي تدفع حدود الرقمية" :
             "Discover our innovative projects pushing digital boundaries"}
          </p>
        </motion.div>

        {/* Category Filters - Enhanced 3D */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  rotateX: 5
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 transform-gpu ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl`
                    : "bg-night/50 backdrop-blur-sm text-softwhite/70 hover:bg-night/70 border border-primary/20"
                }`}
                style={{
                  perspective: "1000px"
                }}
              >
                <Icon className="text-lg" />
                <span className="font-semibold">
                  {t(category.label)}
                </span>
                {selectedCategory === category.id && (
                  <motion.span
                    layoutId="activeCategory"
                    className="w-2 h-2 rounded-full bg-primary animate-pulse"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid - 3D Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => {
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedProject(project)}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Card Glow Effect */}
                <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500 ${
                  project.featured 
                    ? 'bg-gradient-to-r from-primary via-accent to-purple-600' 
                    : 'bg-gradient-to-r from-primaryDark to-secondary'
                }`} />

                {/* Main Card */}
                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`relative rounded-2xl overflow-hidden border ${
                    project.featured 
                      ? 'border-primary/50 bg-gradient-to-br from-night/90 to-secondary/90' 
                      : 'border-primary/30 bg-night/80'
                  } backdrop-blur-sm shadow-2xl`}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center gap-2 shadow-lg">
                        <FaStar className="text-xs text-yellow-300" />
                        <span className="text-xs font-bold text-white">FEATURED</span>
                      </div>
                    </div>
                  )}

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-lg bg-primary/90 backdrop-blur-sm shadow-lg">
                      <span className="text-xs font-bold text-white">{project.year}</span>
                    </div>
                  </div>

                  {/* Image Container with 3D Effect */}
                  <div className="relative h-56 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${project.image})`,
                        transform: hoveredCard === project.id ? 'translateZ(20px)' : 'translateZ(0)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm">
                        <span className="text-xs text-softwhite">{project.duration}</span>
                      </div>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute bottom-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                        <CategoryIcon className="text-white text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6"
                    style={{
                      transform: 'translateZ(10px)'
                    }}
                  >
                    {/* Title and Description */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-softwhite mb-3 line-clamp-2">
                        {t(project.title)}
                      </h3>
                      <p className="text-softwhite/70 text-sm leading-relaxed line-clamp-3">
                        {t(project.description)}
                      </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary mb-1">
                            {value}
                          </div>
                          <div className="text-xs text-softwhite/50 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer with Client and Links */}
                    <div className="flex items-center justify-between pt-5 border-t border-primary/20">
                      <div>
                        <div className="text-xs text-softwhite/50 mb-1">
                          {lang === "fr" ? "Client" : lang === "ar" ? "عميل" : "Client"}
                        </div>
                        <div className="font-bold text-softwhite">
                          {project.client}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-night transition-all duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-night transition-all duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Inner Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at var(--x) var(--y), rgba(15, 185, 177, 0.15) 0%, transparent 50%)'
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

       
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              className="relative w-full max-w-4xl bg-gradient-to-br from-night to-secondary rounded-2xl overflow-hidden shadow-2xl border border-primary/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors border border-primary/30"
                >
                  <span className="text-2xl text-primary">×</span>
                </button>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t(selectedProject.title)}
                </h3>
                <p className="text-softwhite/80 mb-6">{t(selectedProject.description)}</p>
                
                <div className="flex gap-4 mb-8">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl text-center hover:shadow-xl transition-shadow"
                  >
                    {lang === "fr" ? "Voir le projet" : 
                     lang === "ar" ? "عرض المشروع" : 
                     "View Project"}
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-night/50 text-softwhite font-semibold rounded-xl text-center hover:bg-night/70 transition-colors border border-primary/30"
                  >
                    {lang === "fr" ? "Code Source" : 
                     lang === "ar" ? "الكود المصدري" : 
                     "Source Code"}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}