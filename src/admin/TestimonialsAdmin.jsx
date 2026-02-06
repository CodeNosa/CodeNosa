// src/admin/TestimonialsAdmin.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaStar, FaTrash, FaCheck, FaTimes, FaSearch,
  FaUserCircle, FaCalendar, FaQuoteLeft, FaFilter, FaEdit
} from "react-icons/fa";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Charger les témoignages depuis MongoDB
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des témoignages :", err);
    }
  };

  // Approuver un témoignage
  const handleApprove = async (id) => {
    if (!window.confirm("Approuver ce témoignage ?")) return;
    try {
      await axios.put(`http://localhost:5000/api/testimonials/${id}`, { status: "Approuvé", approuve: true });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  // Rejeter un témoignage
  const handleReject = async (id) => {
    if (!window.confirm("Rejeter ce témoignage ?")) return;
    try {
      await axios.put(`http://localhost:5000/api/testimonials/${id}`, { status: "Rejeté", approuve: false });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  // Supprimer un témoignage
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce témoignage ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  // Vérifier un témoignage
  const handleVerify = async (testimonial) => {
    try {
      await axios.put(`http://localhost:5000/api/testimonials/${testimonial._id}`, { verifie: !testimonial.verifie });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtrage et recherche
  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch = t.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (t.entreprise || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.commentaire.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.approuve === (filterStatus === "Approuvé");
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.approuve).length,
    pending: testimonials.filter(t => !t.approuve).length,
    rejected: testimonials.filter(t => t.approuve === false && t.status === "Rejeté").length,
    averageRating: testimonials.length ? (testimonials.reduce((sum, t) => sum + t.note, 0) / testimonials.length).toFixed(1) : 0
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestion des Témoignages</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les avis et retours de vos clients</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>
          <FaQuoteLeft className="text-2xl text-blue-500" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Approuvés</p>
            <p className="text-3xl font-bold mt-2">{stats.approved}</p>
          </div>
          <FaCheck className="text-2xl text-green-500" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">En attente</p>
            <p className="text-3xl font-bold mt-2">{stats.pending}</p>
          </div>
          <FaTimes className="text-2xl text-yellow-500" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Rejetés</p>
            <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
          </div>
          <FaTimes className="text-2xl text-red-500" />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Note moyenne</p>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-3xl font-bold">{stats.averageRating}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recherche et filtre */}
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 py-3 border rounded-lg"
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border rounded-lg"
        >
          <option value="all">Tous les statuts</option>
          <option value="Approuvé">Approuvé</option>
          <option value="En attente">En attente</option>
          <option value="Rejeté">Rejeté</option>
        </select>
      </div>

      {/* Liste des témoignages */}
      <div className="space-y-4">
        {filteredTestimonials.map(t => (
          <div key={t._id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border ${t.approuve ? "border-green-200" : "border-yellow-200"} p-6`}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col md:flex-row flex-1 gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {t.nomClient.charAt(0)}
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <h3 className="text-lg font-bold">{t.nomClient}</h3>
                    {t.verifie && <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Vérifié</span>}
                    <span className={`px-3 py-1 rounded-full text-sm ${t.approuve ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                      {t.approuve ? "Approuvé" : "En attente"}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-2 text-gray-600">
                    <span className="flex gap-1 items-center"><FaUserCircle /> {t.entreprise}</span>
                    <span className="flex gap-1 items-center"><FaCalendar /> {new Date(t.date).toLocaleDateString()}</span>
                    <span className="flex gap-1 items-center"><FaStar /> {t.note}/5</span>
                  </div>
                  <p className="mt-2 italic">"{t.commentaire}"</p>
                  {t.projet && <p className="mt-2 text-sm bg-gray-100 px-2 py-1 rounded-full">Projet: {t.projet}</p>}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {!t.approuve && (
                  <>
                    <button onClick={() => handleApprove(t._id)} className="px-4 py-2 bg-green-500 text-white rounded-lg">Approuver</button>
                    <button onClick={() => handleReject(t._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Rejeter</button>
                  </>
                )}
                <button onClick={() => handleVerify(t)} className="px-3 py-2 rounded-lg bg-gray-100">{t.verifie ? "Vérifié" : "Vérifier"}</button>
                <button onClick={() => handleDelete(t._id)} className="px-3 py-2 rounded-lg bg-red-100 text-red-600">Supprimer</button>
              </div>
            </div>

            {/* Étoiles */}
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`w-5 h-5 ${i < t.note ? "text-yellow-400" : "text-gray-300"}`} />
              ))}
              <span className="ml-2">({t.note}/5)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
