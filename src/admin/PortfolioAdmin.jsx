// src/admin/PortfolioAdmin.jsx
import { useState, useEffect } from "react";
import { 
  FaPlus, 
  FaTimes, 
  FaTrash, 
  FaEdit, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaImage, 
  FaCalendarAlt, 
  FaUserTie, 
  FaStar, 
  FaCode,
  FaTag,
  FaGlobe,
  FaLayerGroup,
  FaDesktop,
  FaMobileAlt,
  FaPalette,
  FaCubes,
  FaSave,
  FaSpinner
} from "react-icons/fa";

export default function PortfolioAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTech, setNewTech] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const [formData, setFormData] = useState({
    titre: { francais: "", anglais: "", arabe: "" },
    client: "",
    annee: new Date().getFullYear(),
    categorie: "Web",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    technologies: [],
    mettreEnVedette: false,
    description: { francais: "", anglais: "", arabe: "" },
  });

  const API_URL = "http://localhost:5000/api/portfolios";

  // ===== Fetch projects =====
  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Erreur fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ===== Submit form =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Erreur opération");
        return;
      }

      resetForm();
      fetchProjects();
      alert(editingId ? "Projet mis à jour ✅" : "Projet ajouté ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur ou réseau");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      titre: { francais: "", anglais: "", arabe: "" },
      client: "",
      annee: new Date().getFullYear(),
      categorie: "Web",
      imageUrl: "",
      liveUrl: "",
      githubUrl: "",
      technologies: [],
      mettreEnVedette: false,
      description: { francais: "", anglais: "", arabe: "" },
    });
    setNewTech("");
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      description: project.description || { francais: "", anglais: "", arabe: "" }
    });
    setEditingId(project._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur suppression projet");
    }
  };

  const addTech = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({ 
        ...formData, 
        technologies: [...formData.technologies, newTech.trim()] 
      });
      setNewTech("");
    }
  };

  const removeTech = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleTechKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Web": return <FaDesktop className="inline mr-2" />;
      case "Mobile": return <FaMobileAlt className="inline mr-2" />;
      case "Design": return <FaPalette className="inline mr-2" />;
      default: return <FaCubes className="inline mr-2" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Web": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Mobile": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Design": return "bg-pink-100 text-pink-700 border-pink-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredProjects = activeFilter === "Tous" 
    ? projects 
    : activeFilter === "Vedette"
    ? projects.filter(p => p.mettreEnVedette)
    : projects.filter(p => p.categorie === activeFilter);

  const categories = ["Tous", "Web", "Mobile", "Design", "Autre", "Vedette"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Gestion du Portfolio</h1>
            <p className="text-gray-600">Créez et gérez vos projets professionnels</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-4 md:mt-0"
          >
            <FaPlus className="text-lg" /> Nouveau Projet
          </button>
        </div>

        {/* STATS & FILTRES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Projets</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{projects.length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaLayerGroup className="text-2xl text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Projets Web</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {projects.filter(p => p.categorie === "Web").length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaDesktop className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Projets Vedettes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {projects.filter(p => p.mettreEnVedette).length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaStar className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Projets Mobile</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {projects.filter(p => p.categorie === "Mobile").length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaMobileAlt className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* FILTRES */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat === "Vedette" && <FaStar className="inline mr-2" />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingId ? "Modifier le Projet" : "Nouveau Projet"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {editingId ? "Mettez à jour les informations du projet" : "Remplissez les détails du projet"}
                  </p>
                </div>
                <button 
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Titres multilingues */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <FaGlobe className="mr-2" /> Titres du Projet
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Français *</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Titre en français"
                        value={formData.titre.francais}
                        onChange={(e) =>
                          setFormData({ ...formData, titre: { ...formData.titre, francais: e.target.value } })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Anglais</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Titre en anglais"
                        value={formData.titre.anglais}
                        onChange={(e) =>
                          setFormData({ ...formData, titre: { ...formData.titre, anglais: e.target.value } })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Arabe</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Titre en arabe"
                        value={formData.titre.arabe}
                        onChange={(e) =>
                          setFormData({ ...formData, titre: { ...formData.titre, arabe: e.target.value } })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Informations de base */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUserTie className="inline mr-2" /> Client *
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Nom du client ou entreprise"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2" /> Année
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Année du projet"
                      value={formData.annee}
                      onChange={(e) => setFormData({ ...formData, annee: Number(e.target.value) })}
                      min="2000"
                      max={new Date().getFullYear() + 5}
                    />
                  </div>
                </div>

                {/* Catégorie et Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={formData.categorie}
                      onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    >
                      <option>Web</option>
                      <option>Mobile</option>
                      <option>Design</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaImage className="inline mr-2" /> URL de l'image *
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="https://exemple.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaExternalLinkAlt className="inline mr-2" /> URL Live
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="https://site-live.com"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaGithub className="inline mr-2" /> URL GitHub
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="https://github.com/user/repo"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCode className="inline mr-2" /> Technologies
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Ajouter une technologie (React, Node.js, etc.)"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={handleTechKeyDown}
                    />
                    <button
                      type="button"
                      onClick={addTech}
                      className="px-4 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-2 rounded-lg border border-indigo-100"
                      >
                        <FaTag className="text-xs" />
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="text-indigo-400 hover:text-indigo-700 ml-1"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGlobe className="inline mr-2" /> Description (Optionnel)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Français</label>
                      <textarea
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Description en français"
                        value={formData.description?.francais || ""}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            description: { 
                              ...formData.description, 
                              francais: e.target.value 
                            } 
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Anglais</label>
                      <textarea
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Description en anglais"
                        value={formData.description?.anglais || ""}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            description: { 
                              ...formData.description, 
                              anglais: e.target.value 
                            } 
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Arabe</label>
                      <textarea
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Description en arabe"
                        value={formData.description?.arabe || ""}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            description: { 
                              ...formData.description, 
                              arabe: e.target.value 
                            } 
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Mettre en vedette */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vedette"
                    className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                    checked={formData.mettreEnVedette}
                    onChange={(e) => setFormData({ ...formData, mettreEnVedette: e.target.checked })}
                  />
                  <label htmlFor="vedette" className="ml-3 flex items-center text-gray-700">
                    <FaStar className="text-yellow-500 mr-2" />
                    Mettre en vedette (s'affichera en premier)
                  </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        {editingId ? "Modification..." : "Création..."}
                      </>
                    ) : (
                      <>
                        {editingId ? <FaSave /> : <FaPlus />}
                        {editingId ? "Mettre à jour" : "Créer le Projet"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* LISTE DES PROJETS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Projets du Portfolio</h2>
              <div className="text-sm text-gray-500">
                {filteredProjects.length} {filteredProjects.length > 1 ? "projets" : "projet"}
              </div>
            </div>
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex flex-col items-center justify-center">
                <FaLayerGroup className="text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun projet trouvé</h3>
                <p className="text-gray-500 mb-4">{activeFilter !== "Tous" ? `Aucun projet dans la catégorie "${activeFilter}"` : "Commencez par ajouter votre premier projet"}</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  <FaPlus /> Ajouter un Projet
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Projet</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Client</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Année</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Catégorie</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Technologies</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProjects.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="h-12 w-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                              {p.imageUrl ? (
                                <img 
                                  src={p.imageUrl} 
                                  alt={p.titre.francais} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <FaImage className="text-2xl text-indigo-400" />
                              )}
                            </div>
                            {p.mettreEnVedette && (
                              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1">
                                <FaStar className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {p.titre.francais}
                              {(p.liveUrl || p.githubUrl) && (
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {p.liveUrl && (
                                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                      <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                  )}
                                  {p.githubUrl && (
                                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                                      <FaGithub className="text-xs" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {p.titre.anglais}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-gray-700">
                          <FaUserTie className="text-gray-400 mr-2" />
                          {p.client}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-gray-700">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          {p.annee}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(p.categorie)}`}>
                          {getCategoryIcon(p.categorie)} {p.categorie}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {p.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                          {p.technologies.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{p.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEdit(p)}
                            className="p-2 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50 transition-colors"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Portfolio Admin • {new Date().getFullYear()} • Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
}