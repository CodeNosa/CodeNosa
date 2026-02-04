// src/admin/components/PortfolioAdmin.jsx
import { useState, useEffect } from "react";
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaStar, 
  FaRegStar, FaGlobe, FaCalendar, FaUser, FaClock, FaCode,
  FaMobileAlt, FaPalette, FaExternalLinkAlt, FaGithub, FaSave
} from "react-icons/fa";

// TODO: Installer react-hot-toast pour les notifications
// npm install react-hot-toast
// Puis décommentez cette ligne :
// import { toast } from "react-hot-toast";

export default function PortfolioAdmin() {
  // Fonction de notification temporaire en attendant react-hot-toast
  const showToast = (message, type = "success") => {
    console.log(`${type.toUpperCase()}: ${message}`);
    // Créer une notification simple
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg ${
      type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    } z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // TODO: Remplacer par un appel API
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Catégories pour le filtre
  const categories = [
    { id: "all", name: "Toutes catégories", icon: FaGlobe, color: "blue" },
    { id: "web", name: "Web", icon: FaCode, color: "blue" },
    { id: "mobile", name: "Mobile", icon: FaMobileAlt, color: "purple" },
    { id: "design", name: "Design", icon: FaPalette, color: "yellow" }
  ];

  // Charger les projets
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // const response = await fetch('/api/admin/portfolio');
      // const data = await response.json();
      // setProjects(data);
      
      // Données de démo
      const demoProjects = [
        {
          id: 1,
          title: { fr: "Site E-commerce", en: "E-commerce Website", ar: "موقع تجارة إلكترونية" },
          description: { 
            fr: "Site e-commerce moderne avec paiement sécurisé", 
            en: "Modern e-commerce website with secure payment",
            ar: "موقع تجارة إلكترونية حديث مع دفع آمن"
          },
          tags: ["React", "Node.js", "MongoDB", "Stripe"],
          category: "web",
          year: "2024",
          client: "Client 1",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
          liveUrl: "#",
          githubUrl: "#",
          featured: true,
          status: "active",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15"
        },
        {
          id: 2,
          title: { fr: "App Mobile", en: "Mobile App", ar: "تطبيق جوال" },
          description: { 
            fr: "Application mobile cross-platform", 
            en: "Cross-platform mobile application",
            ar: "تطبيق جوال متعدد المنصات"
          },
          tags: ["React Native", "Firebase", "Expo"],
          category: "mobile",
          year: "2024",
          client: "Client 2",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
          liveUrl: "#",
          githubUrl: "#",
          featured: false,
          status: "active",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-10"
        }
      ];
      
      setProjects(demoProjects);
      showToast("Projets chargés avec succès", "success");
    } catch (error) {
      showToast("Erreur lors du chargement des projets", "error");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  // Créer un projet
  const handleCreateProject = async (projectData) => {
    try {
      // TODO: Implémenter l'appel API
      const newProject = { 
        ...projectData, 
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        status: "active"
      };
      
      setProjects([...projects, newProject]);
      showToast("Projet créé avec succès", "success");
    } catch (error) {
      showToast("Erreur lors de la création", "error");
      console.error("Erreur:", error);
    }
  };

  // Mettre à jour un projet
  const handleUpdateProject = async (id, projectData) => {
    try {
      // TODO: Implémenter l'appel API
      setProjects(projects.map(p => 
        p.id === id ? { 
          ...p, 
          ...projectData, 
          updatedAt: new Date().toISOString().split('T')[0] 
        } : p
      ));
      showToast("Projet mis à jour", "success");
    } catch (error) {
      showToast("Erreur lors de la mise à jour", "error");
      console.error("Erreur:", error);
    }
  };

  // Supprimer un projet
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;
    
    try {
      // TODO: Implémenter l'appel API
      setProjects(projects.filter(p => p.id !== id));
      showToast("Projet supprimé", "success");
    } catch (error) {
      showToast("Erreur lors de la suppression", "error");
      console.error("Erreur:", error);
    }
  };

  // Toggle featured
  const toggleFeatured = async (id) => {
    const project = projects.find(p => p.id === id);
    const updatedData = { ...project, featured: !project.featured };
    await handleUpdateProject(id, updatedData);
  };

  // Filtrer les projets
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title?.fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Ouvrir modal d'ajout
  const openAddModal = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  // Ouvrir modal d'édition
  const openEditModal = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Gestion du Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {projects.length} projets au total • {filteredProjects.length} filtrés
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
        >
          <FaPlus />
          Nouveau projet
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre, client, technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Liste des projets */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FaSearch className="text-gray-400 text-xl" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-2">Aucun projet trouvé</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProjects.map((project) => {
              const CategoryIcon = categories.find(c => c.id === project.category)?.icon || FaGlobe;
              
              return (
                <div key={project.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Image miniature */}
                    <div className="w-full md:w-24 h-40 md:h-24 flex-shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title?.fr || 'Projet'}
                        className="w-full h-full object-cover rounded-lg shadow"
                      />
                    </div>

                    {/* Informations */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
                            {project.title?.fr || 'Sans titre'}
                          </h3>
                          {project.featured && (
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-bold">
                              <FaStar className="inline mr-1" /> Vedette
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 ml-auto">
                          <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                            <CategoryIcon className="text-gray-500" />
                            {project.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {project.year}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {project.description?.fr || 'Pas de description'}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <FaUser /> {project.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendar /> Créé le {project.createdAt}
                        </span>
                        {project.tags?.length > 0 && (
                          <span className="flex items-center gap-1">
                            {project.tags.length} technologies
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {project.tags?.slice(0, 4).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {project.tags?.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => toggleFeatured(project.id)}
                        className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                          project.featured
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        title={project.featured ? "Retirer des vedettes" : "Mettre en vedette"}
                      >
                        <FaStar />
                      </button>
                      
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/40 rounded-lg"
                          title="Voir en ligne"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      
                      <button
                        onClick={() => openEditModal(project)}
                        className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/40 rounded-lg"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/40 rounded-lg"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal d'ajout/édition */}
      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateProject}
          onUpdate={handleUpdateProject}
        />
      )}
    </div>
  );
}

// Composant Modal
function ProjectModal({ project, onClose, onCreate, onUpdate }) {
  const [formData, setFormData] = useState({
    title: { fr: "", en: "", ar: "" },
    description: { fr: "", en: "", ar: "" },
    category: "web",
    tags: [],
    client: "",
    year: new Date().getFullYear().toString(),
    image: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    ...project
  });

  const [newTag, setNewTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.title.fr.trim()) {
      alert("Le titre français est obligatoire");
      return;
    }
    
    if (!formData.client.trim()) {
      alert("Le client est obligatoire");
      return;
    }
    
    try {
      if (project) {
        await onUpdate(project.id, formData);
      } else {
        await onCreate(formData);
      }
      onClose();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue");
    }
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {project ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titres multilingues */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Titres</h3>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Français *
              </label>
              <input
                type="text"
                value={formData.title.fr || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  title: { ...formData.title, fr: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Titre en français"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  English
                </label>
                <input
                  type="text"
                  value={formData.title.en || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: { ...formData.title, en: e.target.value }
                  })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="Title in English"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  العربية
                </label>
                <input
                  type="text"
                  value={formData.title.ar || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: { ...formData.title, ar: e.target.value }
                  })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="العنوان بالعربية"
                />
              </div>
            </div>
          </div>

          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Client *
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Nom du client"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Année *
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="2024"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                required
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="design">Design</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                URL de l'image *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="https://exemple.com/image.jpg"
                required
              />
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                URL Live
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="https://site.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                URL GitHub
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Technologies
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ajouter une technologie (React, Node.js, etc.)"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Checkbox featured */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <label htmlFor="featured" className="font-medium text-gray-700 dark:text-gray-300">
                Mettre en vedette
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ce projet sera mis en avant sur la page portfolio
              </p>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <FaSave />
              {project ? 'Mettre à jour' : 'Créer le projet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Styles CSS pour les animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}
`;

// Ajouter les styles à la page
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}