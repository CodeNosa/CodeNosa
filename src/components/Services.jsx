// src/components/Services.jsx
import { FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import { MdDesignServices, MdSupportAgent } from "react-icons/md";
import { SiNextdotjs, SiReact, SiNodedotjs } from "react-icons/si";

const services = [
  { 
    name: { fr: "Développement Web", en: "Web Development", ar: "تطوير الويب" },
    icon: <FaLaptopCode />, 
    description: {
      fr: "Sites web modernes avec Next.js, React, performances optimales",
      en: "Modern websites with Next.js, React, optimal performance",
      ar: "مواقع ويب حديثة مع Next.js، React، أداء مثالي"
    },
    tech: [<SiNextdotjs />, <SiReact />, <SiNodedotjs />],
    features: ["Responsive Design", "SEO Optimized", "High Performance"]
  },
  { 
    name: { fr: "Applications Mobiles", en: "Mobile Apps", ar: "تطبيقات الجوال" },
    icon: <FaMobileAlt />, 
    description: {
      fr: "Applications iOS et Android natives et cross-platform",
      en: "Native and cross-platform iOS & Android applications",
      ar: "تطبيقات iOS و Android أصلية ومتعددة المنصات"
    },
    tech: [<SiReact />],
    features: ["iOS & Android", "Cross-Platform", "App Store Ready"]
  },
  { 
    name: { fr: "UI/UX Design", en: "UI/UX Design", ar: "تصميم واجهة المستخدم" },
    icon: <MdDesignServices />, 
    description: {
      fr: "Design d'interfaces utilisateur intuitives et modernes",
      en: "Intuitive and modern user interface design",
      ar: "تصميم واجهات مستخدم بديهية وحديثة"
    },
    features: ["User Research", "Wireframing", "Prototyping"]
  },
  { 
    name: { fr: "Support Technique", en: "Technical Support", ar: "الدعم الفني" },
    icon: <MdSupportAgent />, 
    description: {
      fr: "Maintenance, optimisation et support continu",
      en: "Maintenance, optimization and continuous support",
      ar: "الصيانة والتحسين والدعم المستمر"
    },
    features: ["24/7 Support", "Regular Updates", "Performance Monitoring"]
  }
];

export default function Services({ lang }) {
  const content = {
    servicesTitle: { 
      fr: "Nos Services", 
      en: "Our Services", 
      ar: "خدماتنا" 
    },
    techStack: {
      fr: "Technologies utilisées",
      en: "Technologies we use",
      ar: "التقنيات التي نستخدمها"
    }
  };

  return (
    <section id="services" className="py-16 bg-white dark:bg-night/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{content.servicesTitle[lang]}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {content.techStack[lang]}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.name[lang]} 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900 dark:text-white">
                {service.name[lang]}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.description[lang]}
              </p>
              
              <div className="flex gap-3 mb-4">
                {service.tech && service.tech.map((techIcon, i) => (
                  <span key={i} className="text-2xl text-gray-400">
                    {techIcon}
                  </span>
                ))}
              </div>
              
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}