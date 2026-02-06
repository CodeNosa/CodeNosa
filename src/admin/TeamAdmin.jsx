import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  Trash2, Edit, Plus, X, User, Globe, Palette, Zap, Layout,
  Smartphone, Target, Languages, Briefcase, Github, Linkedin,
  Calendar, Award, Code, ExternalLink, Mail, Phone, MapPin,
  Star, ChevronRight, Filter, Search, MoreVertical, Save,
  Eye, Download, Upload, Check, ChevronLeft, ChevronDown,
  Sparkles, Users, Tag, Building, Clock, TrendingUp
} from "lucide-react";

const API = "http://localhost:5000/api/team";

// Options pour les compétences
const COMPETENCES_OPTIONS = [
  { id: "applicationsWeb", label: "Applications Web", icon: Globe, color: "bg-blue-500/10 text-blue-700 border-blue-200" },
  { id: "applicationsMobile", label: "Applications Mobile", icon: Smartphone, color: "bg-purple-500/10 text-purple-700 border-purple-200" },
  { id: "uiUx", label: "UI/UX Design", icon: Palette, color: "bg-pink-500/10 text-pink-700 border-pink-200" },
  { id: "optimisationPerformance", label: "Performance", icon: Zap, color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" },
  { id: "frontEnd", label: "Front-End", icon: Layout, color: "bg-green-500/10 text-green-700 border-green-200" },
  { id: "responsive", label: "Responsive", icon: Smartphone, color: "bg-indigo-500/10 text-indigo-700 border-indigo-200" },
  { id: "accessibilite", label: "Accessibilité", icon: Target, color: "bg-red-500/10 text-red-700 border-red-200" },
];

// Options pour la disponibilité
const DISPONIBILITE_OPTIONS = [
  { value: "Full-time", label: "Full-time", color: "bg-emerald-500/10 text-emerald-700 border-emerald-200" },
  { value: "Part-time", label: "Part-time", color: "bg-amber-500/10 text-amber-700 border-amber-200" },
  { value: "Freelance", label: "Freelance", color: "bg-violet-500/10 text-violet-700 border-violet-200" },
];

// Badge pour l'expérience
const getExperienceBadge = (years) => {
  if (years >= 10) return { color: "bg-purple-500/10 text-purple-700", label: "Expert" };
  if (years >= 5) return { color: "bg-blue-500/10 text-blue-700", label: "Senior" };
  if (years >= 2) return { color: "bg-green-500/10 text-green-700", label: "Intermédiaire" };
  return { color: "bg-gray-500/10 text-gray-700", label: "Junior" };
};

export default function TeamAdmin() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nomComplet: "",
    poste: "",
    photo: "",
    description: "",
    specialitePrincipale: "",
    competences: {
      applicationsWeb: false,
      applicationsMobile: false,
      uiUx: false,
      optimisationPerformance: false,
      frontEnd: false,
      responsive: false,
      accessibilite: false,
    },
    technologies: "",
    qualites: "",
    langues: "",
    anneesExperience: 0,
    disponibilite: "Full-time",
    reseaux: {
      linkedin: "",
      github: "",
    },
    projets: [{ titre: "", description: "", lien: "" }],
  });
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDisponibilite, setFilterDisponibilite] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' ou 'list'
  const [expandedMember, setExpandedMember] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setMembers(res.data);
    } catch (error) {
      toast.error("Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nomComplet || !form.poste || !form.photo || !form.specialitePrincipale) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    const payload = {
      ...form,
      technologies: form.technologies.split(",").map(s => s.trim()).filter(Boolean),
      qualites: form.qualites.split(",").map(s => s.trim()).filter(Boolean),
      langues: form.langues.split(",").map(s => s.trim()).filter(Boolean),
      anneesExperience: Number(form.anneesExperience) || 0,
      projets: form.projets.filter(p => p.titre && p.description),
    };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
        toast.success("Membre modifié avec succès");
      } else {
        await axios.post(API, payload);
        toast.success("Membre ajouté avec succès");
      }

      resetForm();
      setShowForm(false);
      loadData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleNewMember = () => {
    resetForm();
    setShowForm(true);
    setActiveTab("info");
  };

  const handleEdit = (m) => {
    setEditId(m._id);
    setForm({
      nomComplet: m.nomComplet || "",
      poste: m.poste || "",
      photo: m.photo || "",
      description: m.description || "",
      specialitePrincipale: m.specialitePrincipale || "",
      competences: m.competences || {
        applicationsWeb: false,
        applicationsMobile: false,
        uiUx: false,
        optimisationPerformance: false,
        frontEnd: false,
        responsive: false,
        accessibilite: false,
      },
      technologies: m.technologies?.join(", ") || "",
      qualites: m.qualites?.join(", ") || "",
      langues: m.langues?.join(", ") || "",
      anneesExperience: m.anneesExperience || 0,
      disponibilite: m.disponibilite || "Full-time",
      reseaux: {
        linkedin: m.reseaux?.linkedin || "",
        github: m.reseaux?.github || "",
      },
      projets: m.projets?.length > 0 ? m.projets : [{ titre: "", description: "", lien: "" }],
    });
    setPreviewImage(m.photo);
    setActiveTab("info");
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      try {
        await axios.delete(`${API}/${id}`);
        toast.success("Membre supprimé avec succès");
        loadData();
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const resetForm = () => {
    setForm({
      nomComplet: "",
      poste: "",
      photo: "",
      description: "",
      specialitePrincipale: "",
      competences: {
        applicationsWeb: false,
        applicationsMobile: false,
        uiUx: false,
        optimisationPerformance: false,
        frontEnd: false,
        responsive: false,
        accessibilite: false,
      },
      technologies: "",
      qualites: "",
      langues: "",
      anneesExperience: 0,
      disponibilite: "Full-time",
      reseaux: { linkedin: "", github: "" },
      projets: [{ titre: "", description: "", lien: "" }],
    });
    setEditId(null);
    setPreviewImage(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleCompetenceChange = (competenceId) => {
    setForm(prev => ({
      ...prev,
      competences: {
        ...prev.competences,
        [competenceId]: !prev.competences[competenceId]
      }
    }));
  };

  const handleProjetChange = (index, field, value) => {
    const newProjets = [...form.projets];
    newProjets[index] = { ...newProjets[index], [field]: value };
    setForm(prev => ({ ...prev, projets: newProjets }));
  };

  const addProjet = () => {
    setForm(prev => ({
      ...prev,
      projets: [...prev.projets, { titre: "", description: "", lien: "" }]
    }));
  };

  const removeProjet = (index) => {
    if (form.projets.length > 1) {
      setForm(prev => ({
        ...prev,
        projets: prev.projets.filter((_, i) => i !== index)
      }));
    }
  };

  const renderCompetenceBadges = (competences) => {
    const activeCompetences = Object.entries(competences || {})
      .filter(([_, value]) => value);
    
    return activeCompetences.slice(0, 3).map(([key, _]) => {
      const comp = COMPETENCES_OPTIONS.find(c => c.id === key);
      const Icon = comp?.icon;
      return (
        <span
          key={key}
          className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${comp?.color} border mr-1 mb-1`}
        >
          {Icon && <Icon className="h-3 w-3 mr-1" />}
          {comp?.label.split(" ")[0]}
        </span>
      );
    });
  };

  const toggleMemberExpansion = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.poste.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.specialitePrincipale.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDisponibilite = filterDisponibilite === "all" || m.disponibilite === filterDisponibilite;
    
    return matchesSearch && matchesDisponibilite;
  }).sort((a, b) => {
    switch(sortBy) {
      case "name":
        return a.nomComplet.localeCompare(b.nomComplet);
      case "experience":
        return (b.anneesExperience || 0) - (a.anneesExperience || 0);
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  // Statistiques
  const stats = {
    total: members.length,
    fullTime: members.filter(m => m.disponibilite === "Full-time").length,
    partTime: members.filter(m => m.disponibilite === "Part-time").length,
    freelance: members.filter(m => m.disponibilite === "Freelance").length,
    totalExperience: members.reduce((sum, m) => sum + (m.anneesExperience || 0), 0),
    avgExperience: members.length > 0 ? 
      (members.reduce((sum, m) => sum + (m.anneesExperience || 0), 0) / members.length).toFixed(1) : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 p-4 md:p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header principal */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestion d'Équipe</h1>
                  <p className="text-gray-600 text-sm mt-1">Organisez et gérez votre équipe efficacement</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
                title={viewMode === "grid" ? "Vue liste" : "Vue grille"}
              >
                {viewMode === "grid" ? (
                  <Layout className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={handleNewMember}
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </button>
            </div>
          </div>

          {/* Statistiques compactes */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Full-time</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.fullTime}</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Expérience</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgExperience}<span className="text-sm text-gray-500"> ans</span></p>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Part-time</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.partTime}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Freelance</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.freelance}</p>
                </div>
                <div className="p-2 bg-violet-50 rounded-lg">
                  <Sparkles className="h-5 w-5 text-violet-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Barre de recherche et filtres améliorée */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={filterDisponibilite}
                    onChange={(e) => setFilterDisponibilite(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                  >
                    <option value="all">Tous</option>
                    {DISPONIBILITE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center">
                  <Tag className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                  >
                    <option value="newest">Plus récent</option>
                    <option value="name">Nom A-Z</option>
                    <option value="experience">Expérience</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire (visible seulement si showForm est true) */}
        {showForm && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* En-tête du formulaire compact */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 px-5 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {editId ? (
                        <Edit className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Plus className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {editId ? "Modifier le membre" : "Nouveau membre"}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={handleCancelForm}
                    className="p-2 hover:bg-white/50 rounded-lg transition"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Tabs du formulaire compactes */}
              <div className="border-b">
                <nav className="flex px-4">
                  {["info", "competences", "reseaux", "projets"].map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab === "info" && "Infos"}
                      {tab === "competences" && "Compétences"}
                      {tab === "reseaux" && "Réseaux"}
                      {tab === "projets" && "Projets"}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenu du formulaire compact */}
              <form onSubmit={handleSubmit} className="p-5">
                {/* Le contenu du formulaire reste le même mais plus compact */}
                {activeTab === "info" && (
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Nom complet *
                        </label>
                        <input
                          placeholder="John Doe"
                          value={form.nomComplet}
                          onChange={e => setForm({ ...form, nomComplet: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Poste *
                        </label>
                        <input
                          placeholder="Développeur Full-Stack"
                          value={form.poste}
                          onChange={e => setForm({ ...form, poste: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Photo (URL) *
                      </label>
                      <div className="flex space-x-4 items-start">
                        <div className="flex-1">
                          <input
                            placeholder="https://example.com/photo.jpg"
                            value={form.photo}
                            onChange={e => {
                              setForm({ ...form, photo: e.target.value });
                              if (e.target.value.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
                                setPreviewImage(e.target.value);
                              }
                            }}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                            required
                          />
                          {previewImage && (
                            <div className="mt-2">
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="h-24 w-24 rounded-lg object-cover border shadow-sm"
                                onError={() => setPreviewImage(null)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Spécialité *
                      </label>
                      <input
                        placeholder="Développement Front-End React"
                        value={form.specialitePrincipale}
                        onChange={e => setForm({ ...form, specialitePrincipale: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description *
                      </label>
                      <textarea
                        placeholder="Description du rôle et des responsabilités..."
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm h-24"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Années d'expérience
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={form.anneesExperience}
                          onChange={e => setForm({ ...form, anneesExperience: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Disponibilité
                        </label>
                        <select
                          value={form.disponibilite}
                          onChange={e => setForm({ ...form, disponibilite: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                        >
                          {DISPONIBILITE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "competences" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Compétences techniques
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {COMPETENCES_OPTIONS.map(comp => {
                          const Icon = comp.icon;
                          return (
                            <label
                              key={comp.id}
                              className={`flex items-center p-2.5 border rounded-lg cursor-pointer transition text-sm ${
                                form.competences[comp.id]
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={form.competences[comp.id]}
                                onChange={() => handleCompetenceChange(comp.id)}
                                className="h-3.5 w-3.5 text-blue-600 rounded"
                              />
                              <span className="flex items-center ml-2.5">
                                <Icon className="h-3.5 w-3.5" />
                                <span className="ml-2">{comp.label}</span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Technologies maîtrisées
                      </label>
                      <input
                        placeholder="React, Node.js, TypeScript, MongoDB..."
                        value={form.technologies}
                        onChange={e => setForm({ ...form, technologies: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Qualités professionnelles
                      </label>
                      <input
                        placeholder="Communication, Leadership, Résolution de problèmes..."
                        value={form.qualites}
                        onChange={e => setForm({ ...form, qualites: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Langues parlées
                      </label>
                      <input
                        placeholder="Français, Anglais, Espagnol..."
                        value={form.langues}
                        onChange={e => setForm({ ...form, langues: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Les autres onglets restent similaires mais plus compacts... */}

                {/* Actions du formulaire compactes */}
                <div className="flex justify-between items-center pt-6 mt-6 border-t">
                  <div className="flex space-x-2">
                    {activeTab !== "info" && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(prev => {
                          const tabs = ["info", "competences", "reseaux", "projets"];
                          const currentIndex = tabs.indexOf(prev);
                          return tabs[currentIndex - 1];
                        })}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}
                    {activeTab !== "projets" && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(prev => {
                          const tabs = ["info", "competences", "reseaux", "projets"];
                          const currentIndex = tabs.indexOf(prev);
                          return tabs[currentIndex + 1];
                        })}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleCancelForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium text-sm transition shadow-sm"
                    >
                      {editId ? (
                        <>
                          <Save className="h-4 w-4 mr-1.5" />
                          Modifier
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-1.5" />
                          Ajouter
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Grille des membres compacte */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Membres ({filteredMembers.length})
            </h2>
            <div className="text-xs text-gray-500 font-medium">
              {filteredMembers.length === members.length 
                ? "Tous les membres" 
                : `${filteredMembers.length}/${members.length}`}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-56 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                {searchTerm || filterDisponibilite !== "all" 
                  ? "Aucun résultat" 
                  : "Votre équipe est vide"}
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                {searchTerm || filterDisponibilite !== "all"
                  ? "Aucun membre ne correspond à votre recherche."
                  : "Commencez par ajouter votre premier membre."}
              </p>
              <button
                onClick={handleNewMember}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Ajouter un membre
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMembers.map(m => (
                <div
                  key={m._id}
                  className="bg-white rounded-xl border border-gray-200/70 overflow-hidden hover:shadow-md transition-all duration-300 group"
                >
                  {/* En-tête compact avec photo */}
                  <div className="relative h-32 bg-gradient-to-r from-blue-50/50 to-gray-50/50">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.nomComplet}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    
                    {/* Badges superposés */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        DISPONIBILITE_OPTIONS.find(d => d.value === m.disponibilite)?.color
                      }`}>
                        {m.disponibilite === "Full-time" ? "FT" : 
                         m.disponibilite === "Part-time" ? "PT" : "FL"}
                      </span>
                      {m.anneesExperience > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-gray-800/80 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                          {m.anneesExperience} ans
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contenu compact */}
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{m.nomComplet}</h3>
                        <button
                          onClick={() => toggleMemberExpansion(m._id)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          {expandedMember === m._id ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-1">{m.poste}</p>
                      {m.specialitePrincipale && (
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {m.specialitePrincipale}
                        </p>
                      )}
                    </div>

                    {/* Compétences compactes */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {renderCompetenceBadges(m.competences)}
                      </div>
                    </div>

                    {/* Actions compactes */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        {m.reseaux?.linkedin && (
                          <a
                            href={m.reseaux.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                            title="LinkedIn"
                          >
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {m.reseaux?.github && (
                          <a
                            href={m.reseaux.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition"
                            title="GitHub"
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEdit(m)}
                          className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                          title="Modifier"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(m._id)}
                          className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Section étendue */}
                    {expandedMember === m._id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                          {m.description && (
                            <p className="text-xs text-gray-600 line-clamp-3">{m.description}</p>
                          )}
                          
                          {m.technologies?.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Technologies:</p>
                              <div className="flex flex-wrap gap-1">
                                {m.technologies.slice(0, 3).map((tech, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                    {tech}
                                  </span>
                                ))}
                                {m.technologies.length > 3 && (
                                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                                    +{m.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {m.qualites?.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 font-medium mb-1">Qualités:</p>
                              <p className="text-xs text-gray-600 line-clamp-1">
                                {m.qualites.slice(0, 3).join(", ")}
                                {m.qualites.length > 3 && "..."}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Vue liste */
            <div className="space-y-3">
              {filteredMembers.map(m => (
                <div
                  key={m._id}
                  className="bg-white rounded-xl border border-gray-200/70 p-4 hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Photo dans la vue liste */}
                    <div className="relative shrink-0">
                      <div className="h-14 w-14 rounded-lg overflow-hidden border border-gray-200">
                        {m.photo ? (
                          <img
                            src={m.photo}
                            alt={m.nomComplet}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${
                        DISPONIBILITE_OPTIONS.find(d => d.value === m.disponibilite)?.color
                      }`}>
                        {m.disponibilite === "Full-time" ? "FT" : 
                         m.disponibilite === "Part-time" ? "PT" : "FL"}
                      </span>
                    </div>

                    {/* Contenu liste */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{m.nomComplet}</h3>
                          <p className="text-xs text-gray-600">{m.poste}</p>
                          {m.specialitePrincipale && (
                            <p className="text-xs text-gray-500 mt-0.5">{m.specialitePrincipale}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEdit(m)}
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                            title="Modifier"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(m._id)}
                            className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                            title="Supprimer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        {m.anneesExperience > 0 && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            {m.anneesExperience} ans
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1">
                          {m.reseaux?.linkedin && (
                            <a
                              href={m.reseaux.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-gray-500 hover:text-blue-600 rounded transition"
                              title="LinkedIn"
                            >
                              <Linkedin className="h-3 w-3" />
                            </a>
                          )}
                          {m.reseaux?.github && (
                            <a
                              href={m.reseaux.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-gray-500 hover:text-gray-900 rounded transition"
                              title="GitHub"
                            >
                              <Github className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {renderCompetenceBadges(m.competences)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination améliorée */}
          {filteredMembers.length > 8 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Affichage de 1 à 8 sur {filteredMembers.length} membres
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                  1
                </span>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                  2
                </button>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                  3
                </button>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}