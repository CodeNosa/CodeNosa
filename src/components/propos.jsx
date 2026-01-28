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

// ================= DATA =================
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {lang === "fr" && "L'Excellence Technique au Service de Votre Vision"}
            {lang === "en" && "Technical Excellence Serving Your Vision"}
            {lang === "ar" && "التميز التقني في خدمة رؤيتك"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {lang === "fr" && "Une équipe d'experts dédiés à transformer vos projets digitaux en succès tangibles"}
            {lang === "en" && "A team of experts dedicated to transforming your digital projects into tangible success"}
            {lang === "ar" && "فريق من الخبراء مكرس لتحويل مشاريعك الرقمية إلى نجاح ملموس"}
          </p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {profiles.map((p) => (
            <motion.article
              key={p.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                    <img
                      src={p.img}
                      alt={p.name[lang]}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
                    {p.id === "samar" ? (
                      <FaReact className="text-white text-xl" />
                    ) : (
                      <FaServer className="text-white text-xl" />
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  {/* Role en haut */}
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                      {p.role[lang]}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {p.name[lang]}
                  </h3>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {p.bio[lang]}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {p.expertise.map((e, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium group-hover:border-primary/30 transition-colors"
                      >
                        <span className="text-primary text-lg">{e.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300">{e.label[lang]}</span>
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors group"
                    >
                      <FaGithub className="text-lg" />
                      <span className="font-medium">GitHub</span>
                    </a>
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
                    >
                      <FaLinkedin className="text-lg" />
                      <span className="font-medium">LinkedIn</span>
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
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
            <p className="text-white text-lg md:text-xl font-semibold">
              {lang === "fr" && "🔒 Garantie de qualité - 📱 Support multi-plateforme - ⚡ Livraison rapide"}
              {lang === "en" && "🔒 Quality guarantee - 📱 Multi-platform support - ⚡ Fast delivery"}
              {lang === "ar" && "🔒 ضمان الجودة - 📱 دعم متعدد المنصات - ⚡ تسليم سريع"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
