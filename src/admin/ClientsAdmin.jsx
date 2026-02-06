import { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaTrash, FaEdit, FaEye, FaBuilding, FaUser, FaLink, FaPhone, FaEnvelope, FaTag, FaIndustry, FaStickyNote, FaCheckCircle, FaPauseCircle, FaHourglassHalf, FaSave } from "react-icons/fa";

export default function ClientsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);

  const [formData, setFormData] = useState({
    nomComplet: "",
    email: "",
    telephone: "",
    entreprise: "",
    siteWeb: "",
    statut: "Actif",
    type: "Entreprise",
    secteurActivite: "",
    notes: "",
    tags: [],
  });

  const API_URL = "http://localhost:5000/api/clients";

  // ===== Fetch clients depuis le backend =====
  const fetchClients = async () => {
    setFetching(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error("Erreur fetch clients:", err);
      alert("Erreur récupération clients");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ===== Insert client =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingClient ? `${API_URL}/${editingClient._id}` : API_URL;
      const method = editingClient ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de l'opération");
        return;
      }

      alert(editingClient ? "Client modifié ✅" : "Client ajouté ✅");
      resetForm();
      fetchClients(); // refresh table
    } catch (err) {
      console.error(err);
      alert("Erreur serveur ou réseau");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nomComplet: "",
      email: "",
      telephone: "",
      entreprise: "",
      siteWeb: "",
      statut: "Actif",
      type: "Entreprise",
      secteurActivite: "",
      notes: "",
      tags: [],
    });
    setEditingClient(null);
    setViewingClient(null);
    setShowModal(false);
  };

  // ===== Pré-remplir formulaire pour modification =====
  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      nomComplet: client.nomComplet || "",
      email: client.email || "",
      telephone: client.telephone || "",
      entreprise: client.entreprise || "",
      siteWeb: client.siteWeb || "",
      statut: client.statut || "Actif",
      type: client.type || "Entreprise",
      secteurActivite: client.secteurActivite || "",
      notes: client.notes || "",
      tags: client.tags || [],
    });
    setShowModal(true);
  };

  // ===== Afficher les détails d'un client =====
  const handleView = (client) => {
    setViewingClient(client);
  };

  // ===== Delete client =====
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce client ?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setClients(clients.filter((c) => c._id !== id));
      if (viewingClient && viewingClient._id === id) {
        setViewingClient(null);
      }
      if (editingClient && editingClient._id === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert("Erreur suppression client");
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "Actif": return "bg-green-100 text-green-800 border border-green-200";
      case "Inactif": return "bg-red-100 text-red-800 border border-red-200";
      case "En attente": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Fonction pour obtenir l'icône du statut
  const getStatusIcon = (status) => {
    switch (status) {
      case "Actif": return <FaCheckCircle className="inline mr-1" />;
      case "Inactif": return <FaPauseCircle className="inline mr-1" />;
      case "En attente": return <FaHourglassHalf className="inline mr-1" />;
      default: return null;
    }
  };

  // Fonction pour obtenir l'icône du type
  const getTypeIcon = (type) => {
    switch (type) {
      case "Entreprise": return <FaBuilding className="inline mr-1" />;
      case "Particulier": return <FaUser className="inline mr-1" />;
      case "Startup": return <FaBuilding className="inline mr-1" />;
      case "Agence": return <FaBuilding className="inline mr-1" />;
      default: return <FaUser className="inline mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Gestion des Clients</h1>
            <p className="text-gray-600">Administrez votre base de données clients en toute simplicité</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-4 md:mt-0"
          >
            <FaPlus className="text-lg" /> Ajouter un Client
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Clients</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{clients.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUser className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Clients Actifs</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {clients.filter(c => c.statut === "Actif").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Entreprises</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {clients.filter(c => c.type === "Entreprise").length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaBuilding className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FORMULAIRE */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingClient ? "Modifier le Client" : "Nouveau Client"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {editingClient ? "Modifiez les informations du client" : "Remplissez les informations du client"}
                  </p>
                </div>
                <button 
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaUser className="inline mr-2" /> Nom complet *
                      </label>
                      <input
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="John Doe"
                        value={formData.nomComplet}
                        onChange={(e) =>
                          setFormData({ ...formData, nomComplet: e.target.value })
                        }
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaEnvelope className="inline mr-2" /> Email *
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="contact@exemple.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaPhone className="inline mr-2" /> Téléphone *
                      </label>
                      <input
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="+33 1 23 45 67 89"
                        value={formData.telephone}
                        onChange={(e) =>
                          setFormData({ ...formData, telephone: e.target.value })
                        }
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaLink className="inline mr-2" /> Site web
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="https://www.exemple.com"
                        value={formData.siteWeb}
                        onChange={(e) =>
                          setFormData({ ...formData, siteWeb: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaBuilding className="inline mr-2" /> Entreprise
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Nom de l'entreprise"
                        value={formData.entreprise}
                        onChange={(e) =>
                          setFormData({ ...formData, entreprise: e.target.value })
                        }
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaIndustry className="inline mr-2" /> Secteur d'activité
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Technologie, Finance, etc."
                        value={formData.secteurActivite}
                        onChange={(e) =>
                          setFormData({ ...formData, secteurActivite: e.target.value })
                        }
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Statut</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          value={formData.statut}
                          onChange={(e) =>
                            setFormData({ ...formData, statut: e.target.value })
                          }
                        >
                          <option>Actif</option>
                          <option>Inactif</option>
                          <option>En attente</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option>Entreprise</option>
                          <option>Particulier</option>
                          <option>Startup</option>
                          <option>Agence</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        <FaTag className="inline mr-2" /> Tags (séparés par virgule)
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="VIP, Récurrent, Potentiel"
                        value={formData.tags.join(",")}
                        onChange={(e) =>
                          setFormData({ ...formData, tags: e.target.value.split(",") })
                        }
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    <FaStickyNote className="inline mr-2" /> Notes
                  </label>
                  <textarea
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Informations supplémentaires..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t">
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
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingClient ? "Modification..." : "Insertion..."}
                      </>
                    ) : (
                      <>
                        {editingClient ? <FaSave /> : <FaPlus />}
                        {editingClient ? "Mettre à jour" : "Créer le Client"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DETAILS */}
        {viewingClient && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Détails du Client</h2>
                  <p className="text-gray-500 text-sm mt-1">Informations complètes</p>
                </div>
                <button 
                  onClick={() => setViewingClient(null)}
                  className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-2xl">
                      {viewingClient.nomComplet?.charAt(0).toUpperCase() || "C"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{viewingClient.nomComplet}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewingClient.statut)}`}>
                        {getStatusIcon(viewingClient.statut)} {viewingClient.statut}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                        {getTypeIcon(viewingClient.type)} {viewingClient.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">COORDONNÉES</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-400 mr-3 w-5" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{viewingClient.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="text-gray-400 mr-3 w-5" />
                          <div>
                            <p className="text-sm text-gray-500">Téléphone</p>
                            <p className="font-medium">{viewingClient.telephone}</p>
                          </div>
                        </div>
                        {viewingClient.siteWeb && (
                          <div className="flex items-center">
                            <FaLink className="text-gray-400 mr-3 w-5" />
                            <div>
                              <p className="text-sm text-gray-500">Site web</p>
                              <a href={viewingClient.siteWeb} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                                {viewingClient.siteWeb}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">ENTREPRISE</h4>
                      <div className="space-y-3">
                        {viewingClient.entreprise && (
                          <div className="flex items-center">
                            <FaBuilding className="text-gray-400 mr-3 w-5" />
                            <div>
                              <p className="text-sm text-gray-500">Nom</p>
                              <p className="font-medium">{viewingClient.entreprise}</p>
                            </div>
                          </div>
                        )}
                        {viewingClient.secteurActivite && (
                          <div className="flex items-center">
                            <FaIndustry className="text-gray-400 mr-3 w-5" />
                            <div>
                              <p className="text-sm text-gray-500">Secteur d'activité</p>
                              <p className="font-medium">{viewingClient.secteurActivite}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {viewingClient.tags && viewingClient.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">TAGS</h4>
                        <div className="flex flex-wrap gap-2">
                          {viewingClient.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {viewingClient.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          <FaStickyNote className="inline mr-2" /> NOTES
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700 whitespace-pre-line">{viewingClient.notes}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">DATE DE CRÉATION</h4>
                      <p className="text-gray-700">
                        {viewingClient.createdAt ? new Date(viewingClient.createdAt).toLocaleDateString('fr-FR') : "Non spécifiée"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button 
                    onClick={() => setViewingClient(null)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  <button 
                    onClick={() => {
                      handleEdit(viewingClient);
                      setViewingClient(null);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <FaEdit /> Modifier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Liste des Clients</h2>
              <div className="text-sm text-gray-500">
                {clients.length} {clients.length > 1 ? "clients" : "client"}
              </div>
            </div>
          </div>
          
          {fetching ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Chargement des clients...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Client</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Coordonnées</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Entreprise</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Statut</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center">
                          <FaUser className="text-4xl text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun client trouvé</h3>
                          <p className="text-gray-500 mb-4">Commencez par ajouter votre premier client</p>
                          <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            <FaPlus /> Ajouter un Client
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    clients.map((c) => (
                      <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-bold">
                                {c.nomComplet?.charAt(0).toUpperCase() || "C"}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{c.nomComplet}</div>
                              {c.tags && c.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {c.tags.slice(0, 2).map((tag, index) => (
                                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      {tag.trim()}
                                    </span>
                                  ))}
                                  {c.tags.length > 2 && (
                                    <span className="text-xs text-gray-500 px-1">
                                      +{c.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center text-gray-700">
                              <FaEnvelope className="text-gray-400 mr-2 text-sm" />
                              <span className="text-sm truncate max-w-[150px]">{c.email}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <FaPhone className="text-gray-400 mr-2 text-sm" />
                              <span className="text-sm">{c.telephone}</span>
                            </div>
                            {c.siteWeb && (
                              <div className="flex items-center text-blue-600">
                                <FaLink className="mr-2 text-sm" />
                                <span className="text-sm truncate max-w-[150px]">{c.siteWeb}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium">{c.entreprise || "—"}</div>
                          {c.secteurActivite && (
                            <div className="text-sm text-gray-500">{c.secteurActivite}</div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                            {getTypeIcon(c.type)} {c.type}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(c.statut)}`}>
                            {getStatusIcon(c.statut)} {c.statut}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleView(c)}
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                              title="Voir les détails"
                            >
                              <FaEye />
                            </button>
                            <button 
                              onClick={() => handleEdit(c)}
                              className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                              title="Modifier"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(c._id)}
                              className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                              title="Supprimer"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FOOTER INFO */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Gestion des Clients • {new Date().getFullYear()} • Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
}