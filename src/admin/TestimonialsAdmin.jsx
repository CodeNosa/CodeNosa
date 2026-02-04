import { useState } from "react";
import { 
  FaStar, 
  FaTrash, 
  FaCheck, 
  FaTimes, 
  FaSearch,
  FaUserCircle,
  FaCalendar,
  FaQuoteLeft,
  FaFilter,
  FaEye,
  FaEdit
} from "react-icons/fa";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([
    { 
      id: 1, 
      clientName: "Ahmed Ben Ali", 
      company: "TechCorp Inc.",
      rating: 5,
      comment: "Excellent travail ! L'équipe de CodeNosa a su comprendre nos besoins et livrer un produit de qualité supérieure dans les délais.",
      date: "2024-01-15",
      status: "Approuvé",
      verified: true,
      project: "Site E-commerce"
    },
    { 
      id: 2, 
      clientName: "Sarah Johnson", 
      company: "Startup Innov",
      rating: 4,
      comment: "Service professionnel et réactif. Le site mobile est parfaitement fonctionnel et correspond à nos attentes.",
      date: "2024-01-10",
      status: "Approuvé",
      verified: true,
      project: "App Mobile"
    },
    { 
      id: 3, 
      clientName: "Mohamed Trabelsi", 
      company: "Digital Agency",
      rating: 5,
      comment: "Je recommande vivement CodeNosa pour leur expertise technique et leur souci du détail. Un partenariat fructueux !",
      date: "2024-01-05",
      status: "En attente",
      verified: false,
      project: "Dashboard Analytics"
    },
    { 
      id: 4, 
      clientName: "Emma Wilson", 
      company: "Creative Studio",
      rating: 3,
      comment: "Bon travail dans l'ensemble, quelques retards dans la livraison mais résultat final satisfaisant.",
      date: "2023-12-20",
      status: "Approuvé",
      verified: true,
      project: "Branding"
    },
    { 
      id: 5, 
      clientName: "Pierre Martin", 
      company: "Consulting Group",
      rating: 5,
      comment: "L'équipe a été d'une grande aide pour moderniser notre présence digitale. Les résultats sont au-delà de nos espérances.",
      date: "2023-12-15",
      status: "Rejeté",
      verified: false,
      project: "Site Vitrine"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleApprove = (id) => {
    if (window.confirm("Approuver ce témoignage ?")) {
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, status: "Approuvé" } : t
      ));
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Rejeter ce témoignage ?")) {
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, status: "Rejeté" } : t
      ));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer définitivement ce témoignage ?")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleVerify = (id) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, verified: !t.verified } : t
    ));
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || testimonial.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.status === "Approuvé").length,
    pending: testimonials.filter(t => t.status === "En attente").length,
    rejected: testimonials.filter(t => t.status === "Rejeté").length,
    averageRating: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des Témoignages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez les avis et retours de vos clients
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.total}</p>
            </div>
            <FaQuoteLeft className="text-2xl text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Approuvés</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.approved}</p>
            </div>
            <FaCheck className="text-2xl text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">En attente</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.pending}</p>
            </div>
            <FaCalendar className="text-2xl text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Rejetés</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.rejected}</p>
            </div>
            <FaTimes className="text-2xl text-red-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Note moyenne</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.averageRating}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <FaStar className="text-2xl text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un témoignage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
        </div>
        
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <option value="all">Tous les statuts</option>
          <option value="Approuvé">Approuvé</option>
          <option value="En attente">En attente</option>
          <option value="Rejeté">Rejeté</option>
        </select>
        
        <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FaFilter />
          Trier par
        </button>
      </div>

      {/* Liste des témoignages */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border ${
              testimonial.status === "Approuvé" 
                ? "border-green-200 dark:border-green-800" 
                : testimonial.status === "En attente"
                ? "border-yellow-200 dark:border-yellow-800"
                : "border-red-200 dark:border-red-800"
            }`}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Informations client */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {testimonial.clientName}
                      </h3>
                      {testimonial.verified && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                          Vérifié
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        testimonial.status === 'Approuvé' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : testimonial.status === 'En attente'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {testimonial.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <FaUserCircle />
                        {testimonial.company}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaCalendar />
                        {testimonial.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaStar />
                        {testimonial.rating}/5
                      </span>
                    </div>
                    
                    <p className="mt-4 text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.comment}"
                    </p>
                    
                    {testimonial.project && (
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                          Projet: {testimonial.project}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {testimonial.status === "En attente" && (
                    <>
                      <button
                        onClick={() => handleApprove(testimonial.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <FaCheck />
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReject(testimonial.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <FaTimes />
                        Rejeter
                      </button>
                    </>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(testimonial.id)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                        testimonial.verified
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {testimonial.verified ? "Vérifié" : "Vérifier"}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                    >
                      <FaEdit className="text-blue-500" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Étoiles de notation */}
              <div className="flex items-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  ({testimonial.rating}/5)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Modifier le témoignage</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom du client</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg"
                    defaultValue={selectedTestimonial.clientName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Entreprise</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg"
                    defaultValue={selectedTestimonial.company}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Note (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      className={`p-3 rounded-lg ${
                        rating === selectedTestimonial.rating
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {rating} ⭐
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Témoignage</label>
                <textarea 
                  className="w-full p-3 border rounded-lg h-32"
                  defaultValue={selectedTestimonial.comment}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Statut</label>
                <select className="w-full p-3 border rounded-lg">
                  <option value="Approuvé" selected={selectedTestimonial.status === "Approuvé"}>Approuvé</option>
                  <option value="En attente" selected={selectedTestimonial.status === "En attente"}>En attente</option>
                  <option value="Rejeté" selected={selectedTestimonial.status === "Rejeté"}>Rejeté</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="verified"
                  defaultChecked={selectedTestimonial.verified}
                  className="w-4 h-4"
                />
                <label htmlFor="verified" className="text-sm">Client vérifié</label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="px-5 py-2.5 border rounded-lg"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  // Logique de mise à jour
                  setSelectedTestimonial(null);
                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}