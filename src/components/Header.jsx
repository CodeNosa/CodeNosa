// src/components/Header.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaChevronRight
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.jpeg";

const translations = {
  fr: { 
    home: "Accueil", 
    portfolio: "Portfolio", 
    contact: "Contact", 
    about: "À propos", 
    services: "Services",
    testimonials: "Avis"
  },
  en: { 
    home: "Home", 
    portfolio: "Portfolio", 
    contact: "Contact", 
    about: "About", 
    services: "Services",
    testimonials: "Reviews"
  },
  ar: { 
    home: "الرئيسية", 
    portfolio: "أعمالي", 
    contact: "اتصل بنا", 
    about: "من نحن", 
    services: "خدماتنا",
    testimonials: "آراء"
  },
};

export default function Header({ lang, setLang, darkMode, setDarkMode }) {
  const t = translations[lang] || translations.fr;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Mise à jour de la navigation active
      const sections = ['home', 'services', 'portfolio', 'about', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveNav(currentSection);
      }
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", name: t.home, href: "#home", icon: "🏠" },
    { id: "services", name: t.services, href: "#services", icon: "⚡" },
    { id: "portfolio", name: t.portfolio, href: "#portfolio", icon: "🎨" },
    { id: "about", name: t.about, href: "#about", icon: "👥" },
    { id: "testimonials", name: t.testimonials, href: "#testimonials", icon: "⭐" },
    { id: "contact", name: t.contact, href: "#contact", icon: "📞" },
  ];

  const socialIcons = [
    { 
      icon: <FaLinkedin />, 
      href: "https://linkedin.com/in/CodeNosa",
      label: "LinkedIn"
    },
    { 
      icon: <FaGithub />, 
      href: "https://github.com/CodeNosa",
      label: "GitHub"
    },
    { 
      icon: <FaInstagram />, 
      href: "https://instagram.com/CodeNosa",
      label: "Instagram"
    },
    { 
      icon: <FaWhatsapp />, 
      href: "https://wa.me/21656208652",
      label: "WhatsApp"
    },
    { 
      icon: <FaEnvelope />, 
      href: "mailto:CodeNosa@gmail.com",
      label: "Email"
    },
    { 
      icon: <FaFacebookMessenger />, 
      href: "https://m.me/CodeNosa.fr",
      label: "Messenger"
    },
  ];

  const handleNavClick = (id, href) => {
    setActiveNav(id);
    setOpen(false);
    // Scroll vers la section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => handleNavClick("home", "#home")}
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={logo}
              alt="CodeNosa Logo"
              className="w-10 h-10 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                CodeNosa
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {lang === "fr" ? "Agence Digital" : 
                 lang === "ar" ? "وكالة رقمية" : 
                 "Digital Agency"}
              </span>
            </div>
          </motion.a>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                  activeNav === item.id
                    ? "text-primary dark:text-accent bg-primary/5 dark:bg-accent/5"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
                {activeNav === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Burger Menu */}
            <motion.button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FaTimes className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <FaBars className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header du menu */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={logo}
                        alt="CodeNosa Logo"
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">CodeNosa</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Digital Agency</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    {lang === "fr" ? "Navigation" : 
                     lang === "ar" ? "التنقل" : 
                     "Navigation"}
                  </h3>
                  
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        onClick={() => handleNavClick(item.id, item.href)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                          activeNav === item.id
                            ? "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <FaChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.a>
                    ))}
                  </nav>

                  {/* Réseaux sociaux */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      {lang === "fr" ? "Suivez-nous" : 
                       lang === "ar" ? "تابعنا" : 
                       "Follow us"}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {socialIcons.slice(0, 6).map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer du menu */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} CodeNosa.
                    {lang === "fr" ? " Tous droits réservés." : 
                     lang === "ar" ? " جميع الحقوق محفوظة." : 
                     " All rights reserved."}
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-primary via-accent to-secondary" />
      </motion.div>
    </>
  );
}