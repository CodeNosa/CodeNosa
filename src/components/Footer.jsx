// src/components/Footer.jsx
import { FaChevronRight, FaGlobe, FaArrowUp } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpeg";

export default function Footer({ lang }) {
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
        { fr: "Avis", en: "Reviews", ar: "آراء", href: "#testimonial" },
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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-4">
              <img 
                src={logo} 
                alt="CodeNosa Logo" 
                className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  CodeNosa
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {content.company[lang]}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {content.description[lang]}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {content.quickLinks.title[lang]}
            </h4>
            <ul className="space-y-2">
              {content.quickLinks.items.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors flex items-center"
                  >
                    <FaChevronRight className="mr-2 text-primary text-xs" />
                    {item[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {content.services.title[lang]}
            </h4>
            <ul className="space-y-2">
              {content.services.items.map((service, idx) => (
                <li key={idx} className="text-gray-600 dark:text-gray-400">
                  {service[lang]}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {content.contact.title[lang]}
            </h4>
            <div className="space-y-3">
              <a 
                href={`tel:${content.contact.phone}`}
                className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
              >
                <MdPhone className="text-primary" />
                <span>{content.contact.phone}</span>
              </a>
              
              <a 
                href={`mailto:${content.contact.email}`}
                className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
              >
                <MdEmail className="text-primary" />
                <span>{content.contact.email}</span>
              </a>
              
              <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                <MdLocationOn className="text-primary mt-1" />
                <p>{content.contact.location[lang]}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className=" centertext-sm text-gray-600 dark:text-gray-400">
                {content.copyright[lang].replace('{year}', new Date().getFullYear())}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {content.madeWith[lang]}
              </p>
            </div>
            
         
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}