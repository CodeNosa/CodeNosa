// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.jpg";

const translations = {
  fr: { home: "Accueil", portfolio: "Portfolio", contact: "Contact", about: "À propos" },
  en: { home: "Home", portfolio: "Portfolio", contact: "Contact", about: "About" },
  ar: { home: "الرئيسية", portfolio: "أعمالي", contact: "اتصل بنا", about: "من نحن" },
};

export default function Header({ lang, setLang, darkMode, setDarkMode }) {
  const t = translations[lang] || translations.fr;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoBig, setLogoBig] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => setLogoBig(!logoBig);

  const navItems = [
    { name: t.home, href: "#home" },
    { name: t.portfolio, href: "#portfolio" },
    { name: t.about, href: "#about" },
    { name: t.contact, href: "#contact" },
  ];

  const socialIcons = [
    { icon: <FaLinkedin />, href: "https://linkedin.com" },
    { icon: <FaGithub />, href: "https://github.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaWhatsapp />, href: "https://wa.me/21656208652" },
    { icon: <FaFacebookMessenger />, href: "https://m.me/CodeNosa.fr" },
    { icon: <FaEnvelope />, href: "mailto:CodeNosa@gmail.com" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-night/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.2)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo animé */}
          <motion.div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              ref={logoRef}
              src={logo}
              alt="CodeNosa Logo"
              className="rounded-xl object-cover cursor-pointer"
              animate={{ width: logoBig ? 160 : 40, height: logoBig ? 160 : 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
              CodeNosa
            </span>
            {logoBig && (
              <motion.span
                className="absolute -top-3 -right-3 w-4 h-4 bg-accent rounded-full shadow-lg"
                layoutId="logo-badge"
                animate={{ scale: [0, 1.2, 1] }}
              />
            )}
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 ease-out"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Burger Menu */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ${
                  open ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`}
              />
              <div
                className={`w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="fixed top-0 right-0 h-full w-72 z-50 bg-night text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Menu
              </h2>

              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-primary/20 transition-all duration-200 hover:scale-[1.05] active:scale-[1.0]"
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Réseaux</p>
                <div className="flex gap-4 text-xl">
                  {socialIcons.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition-transform duration-300 text-white"
                      whileHover={{ rotate: 10 }}
                      aria-label={`Réseau social ${idx + 1}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
 