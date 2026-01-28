// src/components/Contact.jsx
import { 
  FaWhatsapp, FaFacebookMessenger, FaInstagram, FaEnvelope, 
  FaGithub, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaPhoneAlt, 
  FaChevronRight
} from "react-icons/fa";
import { useState } from "react";

const socials = [
  { 
    name: "WhatsApp", 
    icon: <FaWhatsapp />, 
    url: "https://wa.me/21656208652", 
    color: "from-green-400 to-green-600",
    handle: "+216 56 208 652"
  },
  { 
    name: "Messenger", 
    icon: <FaFacebookMessenger />, 
    url: "https://m.me/CodeNosa.fr", 
    color: "from-blue-400 to-blue-600",
    handle: "@CodeNosa.fr"
  },
  { 
    name: "Instagram", 
    icon: <FaInstagram />, 
    url: "https://instagram.com/CodeNosa", 
    color: "from-pink-400 to-purple-600",
    handle: "@CodeNosa"
  },
  { 
    name: "Email", 
    icon: <FaEnvelope />, 
    url: "mailto:CodeNosa@gmail.com", 
    color: "from-yellow-400 to-orange-500",
    handle: "CodeNosa@gmail.com"
  },
  { 
    name: "GitHub", 
    icon: <FaGithub />, 
    url: "https://github.com/CodeNosa", 
    color: "from-gray-800 to-gray-900",
    handle: "@CodeNosa"
  },
  { 
    name: "LinkedIn", 
    icon: <FaLinkedin />, 
    url: "https://linkedin.com/in/CodeNosa", 
    color: "from-blue-600 to-blue-800",
    handle: "CodeNosa"
  }
];

export default function Contact({ lang }) {
  const content = {
    titles: { 
      fr: "Contactez-nous", 
      en: "Get in Touch", 
      ar: "اتصل بنا" 
    },
    subtitle: {
      fr: "Transformons vos idées en solutions digitales exceptionnelles",
      en: "Let's transform your ideas into exceptional digital solutions",
      ar: "لنحول أفكارك إلى حلول رقمية استثنائية"
    },
    socialTitle: {
      fr: "Suivez-nous",
      en: "Follow Us",
      ar: "تابعنا"
    },
    ctaButton: {
      fr: "Commencer un projet",
      en: "Start a Project",
      ar: "ابدأ مشروعاً"
    },
    locations: {
      fr: "Nous sommes basés en Tunisie et travaillons à l'international",
      en: "Based in Tunisia, working internationally",
      ar: "مقيمون في تونس، نعمل دولياً"
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-night">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {content.titles[lang]}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {content.subtitle[lang]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:CodeNosa@gmail.com"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <span>{content.ctaButton[lang]}</span>
                <FaChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="tel:+21656208652"
                className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary dark:text-accent font-semibold rounded-xl hover:bg-primary/10 transition-all duration-300"
              >
                <FaPhoneAlt className="mr-2" />
                +216 56 208 652
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Socials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FaGlobe className="text-primary text-xl mr-3" />
                  <h3 className="text-3xl font-bold">{content.titles[lang]}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.locations[lang]}
                </p>
                
                {/* Contact Cards */}
                <div className="space-y-6">
                  <div className="flex items-start bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
                      <FaPhoneAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Phone / WhatsApp</h4>
                      <p className="text-gray-600 dark:text-gray-300">+216 56 208 652</p>
                      <a 
                        href="https://wa.me/21656208652" 
                        className="inline-flex items-center text-sm text-accent hover:underline mt-2"
                      >
                        <FaWhatsapp className="mr-2" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
                      <FaEnvelope className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">CodeNosa@gmail.com</p>
                      <a 
                        href="mailto:CodeNosa@gmail.com" 
                        className="inline-flex items-center text-sm text-accent hover:underline mt-2"
                      >
                        Send an email
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
                      <FaMapMarkerAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Tunisia</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Available for international projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-3xl font-bold mb-8">{content.socialTitle[lang]}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                  >
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${social.color}`} />
                    <div className="relative flex flex-col items-center text-center">
                      <span className="text-3xl mb-2">{social.icon}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{social.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{social.handle}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-2xl">
                <h4 className="text-2xl font-bold mb-6">{lang === "fr" ? "Nos Chiffres" : lang === "ar" ? "أرقامنا" : "Our Numbers"}</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                    <div className="text-gray-600 dark:text-gray-300">{lang === "fr" ? "Projets" : lang === "ar" ? "مشاريع" : "Projects"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-gray-600 dark:text-gray-300">{lang === "fr" ? "Satisfaction" : lang === "ar" ? "رضا" : "Satisfaction"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-gray-600 dark:text-gray-300">{lang === "fr" ? "Support" : lang === "ar" ? "دعم" : "Support"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <div className="text-gray-600 dark:text-gray-300">{lang === "fr" ? "Avis" : lang === "ar" ? "آراء" : "Reviews"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            {lang === "fr" ? "Prêt à lancer votre projet ?" : 
             lang === "ar" ? "مستعد لبدء مشروعك؟" : 
             "Ready to start your project?"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            {lang === "fr" ? "Contactez-nous pour un devis gratuit et personnalisé" :
             lang === "ar" ? "اتصل بنا للحصول على عرض مجاني ومخصص" :
             "Contact us for a free personalized quote"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:CodeNosa@gmail.com"
              className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
            >
              {lang === "fr" ? "Obtenir un devis" : 
               lang === "ar" ? "الحصول على عرض" : 
               "Get a Quote"}
            </a>
            <a
              href="tel:+21656208652"
              className="px-10 py-4 border-2 border-primary text-primary dark:text-accent font-bold rounded-xl hover:bg-primary/10 transition-all duration-300 text-lg"
            >
              {lang === "fr" ? "Appeler maintenant" : 
               lang === "ar" ? "اتصل الآن" : 
               "Call Now"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}