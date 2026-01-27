// src/components/Contact.jsx
import { FaWhatsapp, FaFacebookMessenger, FaInstagram, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  { 
    name: "WhatsApp", 
    icon: <FaWhatsapp />,
    url: "https://wa.me/21656208652",
    color: "from-green-400 to-green-600" 
  },
  { 
    name: "Messenger", 
    icon: <FaFacebookMessenger />,
    url: "https://m.me/CodeNosa.fr",
    color: "from-blue-400 to-blue-600" 
  },
  { 
    name: "Instagram", 
    icon: <FaInstagram />,
    url: "https://instagram.com/CodeNosa",
    color: "from-pink-400 to-purple-600" 
  },
  { 
    name: "Email", 
    icon: <FaEnvelope />,
    url: "mailto:CodeNosa@gmail.com",
    color: "from-yellow-400 to-orange-500" 
  },
  { 
    name: "GitHub", 
    icon: <FaGithub />,
    url: "https://github.com/CodeNosa",
    color: "from-gray-400 to-gray-700" 
  },
  { 
    name: "LinkedIn", 
    icon: <FaLinkedin />,
    url: "https://linkedin.com/in/CodeNosa",
    color: "from-sky-400 to-sky-600" 
  }
];

export default function Contact({ lang }) {
  const titles = {
    fr: "Contactez-nous",
    en: "Get in touch",
    ar: "اتصل بنا",
  };

  return (
    <>
      <section
        id="contact"
        className="relative py-28 px-6 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 dark:from-night dark:via-secondary/30 dark:to-primaryDark/40"
      >
        {/* Glow background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-300" />

        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {titles[lang] || titles.fr}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Disponible sur toutes les plateformes – اتصل بنا في أي وقت
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 place-items-center">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                {/* Glow */}
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r ${s.color}`} />

                {/* Card */}
                <div className="
                  relative w-28 h-28 rounded-2xl
                  bg-white/80 dark:bg-white/10 backdrop-blur-xl
                  border border-white/20
                  flex flex-col items-center justify-center
                  shadow-xl
                  transform transition-all duration-500
                  group-hover:scale-110 group-hover:-translate-y-2
                  group-hover:rotate-3
                ">
                  <span className="text-4xl mb-1 animate-float">{s.icon}</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    {s.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Animation float */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-100 dark:bg-night px-6 py-6 text-center text-gray-700 dark:text-gray-300">
        <p className="mb-2">&copy; {new Date().getFullYear()} CodeNosa. Tous droits réservés.</p>
       
      </footer>
    </>
  );
}
