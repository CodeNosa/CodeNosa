// src/components/Portfolio.jsx
const portfolioData = [
  {
    id: 1,
    title: { fr: "E-commerce Luxe", en: "Luxury E-commerce", ar: "متجر فاخر" },
    tags: ["React", "Shopify", "UI/UX"],
    image: "/img1.jpg", // placeholder
  },
  {
    id: 2,
    title: { fr: "Startup SaaS", en: "SaaS Startup", ar: "منصة برمجية" },
    tags: ["Next.js", "Tailwind", "API"],
    image: "/img2.jpg",
  },
  // Ajoute plus…
];

export default function Portfolio({ lang }) {
  const t = (obj) => obj[lang] || obj.fr;

  return (
    <section id="portfolio" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Réalisations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-transform duration-500 hover:scale-[1.02]"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">Image du projet</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <h3 className="text-white text-xl font-bold">{t(project.title)}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Laisser de la place pour les liens externes */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
          🔗 *Liens vers les sites live seront ajoutés ici*
        </div>
      </div>
    </section>
  );
}