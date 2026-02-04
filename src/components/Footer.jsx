//  footer et suivi
import { useState, useEffect } from "react";
import { 
  FaWhatsapp, FaFacebookMessenger, FaInstagram, FaEnvelope, 
  FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, 
  FaChevronRight, FaArrowUp, FaGlobe 
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../assets/logo.jpeg";

const Footer = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const socials = [
    { 
      name: "WhatsApp", 
      icon: <FaWhatsapp />, 
      url: "https://wa.me/21656208652", 
      color: "from-green-400 to-green-600",
      hoverColor: "hover:from-green-500 hover:to-green-700",
      handle: "+216 56 208 652"
    },
    { 
      name: "Messenger", 
      icon: <FaFacebookMessenger />, 
      url: "https://m.me/CodeNosa.fr", 
      color: "from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-500 hover:to-blue-700",
      handle: "@CodeNosa.fr"
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram />, 
      url: "https://instagram.com/CodeNosa", 
      color: "from-pink-400 to-purple-600",
      hoverColor: "hover:from-pink-500 hover:to-purple-700",
      handle: "@CodeNosa"
    },
    { 
      name: "Email", 
      icon: <FaEnvelope />, 
      url: "mailto:CodeNosa@gmail.com", 
      color: "from-yellow-400 to-orange-500",
      hoverColor: "hover:from-yellow-500 hover:to-orange-600",
      handle: "CodeNosa@gmail.com"
    },
    { 
      name: "GitHub", 
      icon: <FaGithub />, 
      url: "https://github.com/CodeNosa", 
      color: "from-gray-800 to-gray-900",
      hoverColor: "hover:from-gray-700 hover:to-gray-800",
      handle: "@CodeNosa"
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin />, 
      url: "https://linkedin.com/in/CodeNosa", 
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:from-blue-700 hover:to-blue-900",
      handle: "CodeNosa"
    }
  ];

  const content = {
    company: {
      fr: "Agence d'Excellence Digitale",
      en: "Digital Excellence Agency",
      ar: "وكالة التميز الرقمي"
    },
    description: {
      fr: "Nous créons des solutions digitales innovantes qui transforment votre vision en succès.",
      en: "We create innovative digital solutions that transform your vision into success.",
      ar: "نصنع حلولاً رقمية مبتكرة تحول رؤيتك إلى نجاح."
    },
    quickLinks: {
      title: {
        fr: "Navigation Rapide",
        en: "Quick Navigation",
        ar: "تنقل سريع"
      },
      items: [
        { fr: "Accueil", en: "Home", ar: "الرئيسية", href: "#home" },
        { fr: "Services", en: "Services", ar: "الخدمات", href: "#services" },
        { fr: "Portfolio", en: "Portfolio", ar: "الأعمال", href: "#portfolio" },
        { fr: "À propos", en: "About", ar: "من نحن", href: "#about" },
        { fr: "Avis", en: "Reviews", ar: "آراء", href: "#testimonials" },
        { fr: "Contact", en: "Contact", ar: "اتصال", href: "#contact" }
      ]
    },
    services: {
      title: {
        fr: "Nos Expertises",
        en: "Our Expertise",
        ar: "تخصصاتنا"
      },
      items: [
        { fr: "Développement Web", en: "Web Development", ar: "تطوير الويب" },
        { fr: "Apps Mobiles", en: "Mobile Apps", ar: "تطبيقات الجوال" },
        { fr: "UI/UX Design", en: "UI/UX Design", ar: "تصميم الواجهات" },
        { fr: "E-commerce", en: "E-commerce", ar: "التجارة الإلكترونية" },
        { fr: "Marketing Digital", en: "Digital Marketing", ar: "التسويق الرقمي" },
        { fr: "Support Technique", en: "Technical Support", ar: "الدعم الفني" }
      ]
    },
    contact: {
      title: {
        fr: "Contact",
        en: "Contact",
        ar: "اتصال"
      },
      phone: "+216 56 208 652",
      email: "CodeNosa@gmail.com",
      location: {
        fr: "Tunisie - Projets internationaux",
        en: "Tunisia - International projects",
        ar: "تونس - مشاريع دولية"
      }
    },
    newsletter: {
      title: {
        fr: "Newsletter",
        en: "Newsletter",
        ar: "النشرة الإخبارية"
      },
      placeholder: {
        fr: "Votre email",
        en: "Your email",
        ar: "بريدك الإلكتروني"
      },
      button: {
        fr: "S'inscrire",
        en: "Subscribe",
        ar: "اشتراك"
      },
      message: {
        fr: "Recevez nos dernières actualités et offres",
        en: "Get our latest news and offers",
        ar: "احصل على آخر أخبارنا وعروضنا"
      }
    },
    copyright: {
      fr: "© {year} CodeNosa. Tous droits réservés.",
      en: "© {year} CodeNosa. All rights reserved.",
      ar: "© {year} CodeNosa. جميع الحقوق محفوظة."
    },
    madeWith: {
      fr: "Développé avec ❤️ en Tunisie",
      en: "Made with ❤️ in Tunisia",
      ar: "طور بحب ❤️ في تونس"
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Ajouter ici la logique d'inscription
    console.log("Newsletter subscription:", email);
    e.target.reset();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer 
      ref={ref}
      className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={logo} 
                  alt="CodeNosa Logo" 
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CodeNosa
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {content.company[lang]}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {content.description[lang]}
            </p>

            {/* Social Media */}
            <div className="pt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {lang === 'fr' ? 'Suivez-nous' : lang === 'en' ? 'Follow us' : 'تابعنا'}
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group p-3 rounded-xl bg-gradient-to-br ${social.color} ${social.hoverColor} transition-all duration-300 shadow-md hover:shadow-lg`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={social.name}
                  >
                    <div className="text-white text-xl">
                      {social.icon}
                    </div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {social.handle}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FaChevronRight className="mr-2 text-primary" />
              {content.quickLinks.title[lang]}
            </h4>
            <ul className="space-y-3">
              {content.quickLinks.items.map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item[lang]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FaChevronRight className="mr-2 text-primary" />
              {content.services.title[lang]}
            </h4>
            <ul className="space-y-3">
              {content.services.items.map((service, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-300"
                >
                  {service[lang]}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FaChevronRight className="mr-2 text-primary" />
              {content.contact.title[lang]}
            </h4>
            
            <div className="space-y-4">
              <a 
                href={`tel:${content.contact.phone}`}
                className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MdPhone className="text-primary" />
                </div>
                <span>{content.contact.phone}</span>
              </a>
              
              <a 
                href={`mailto:${content.contact.email}`}
                className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MdEmail className="text-primary" />
                </div>
                <span>{content.contact.email}</span>
              </a>
              
              <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 group">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors mt-1">
                  <MdLocationOn className="text-primary" />
                </div>
                <p className="leading-relaxed">{content.contact.location[lang]}</p>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {content.copyright[lang].replace('{year}', new Date().getFullYear())}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {content.madeWith[lang]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;