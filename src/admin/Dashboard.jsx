// src/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaChartLine, 
  FaProjectDiagram, 
  FaUserFriends, 
  FaComments,
  FaCalendarCheck,
  FaHome,
  FaTrash,
  FaEdit,
  FaPlus,
  FaCog,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner
} from "react-icons/fa";

const API_FEATURES = "http://localhost:5000/api/features";
const API_STATS = "http://localhost:5000/api/dashboard-stats";
const API_SERVICES = "http://localhost:5000/api/services";

export default function Dashboard() {
  const navigate = useNavigate();

  // ===== Dashboard Stats =====
  const [statsData, setStatsData] = useState({
    projects: 0,
    clients: 0,
    testimonials: 0,
    projectsThisMonth: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const res = await fetch(API_STATS, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }
        });
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        setStatsData(data);
      } catch (err) {
        console.error("Erreur fetch stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { 
      label: "Projets actifs", 
      value: statsData.projects, 
      icon: <FaProjectDiagram />, 
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    { 
      label: "Clients", 
      value: statsData.clients, 
      icon: <FaUserFriends />, 
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
    },
    { 
      label: "Témoignages", 
      value: statsData.testimonials, 
      icon: <FaComments />, 
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"
    },
    { 
      label: "Projets ce mois", 
      value: statsData.projectsThisMonth, 
      icon: <FaCalendarCheck />, 
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
    },
  ];

  // ===== Features Admin =====
  const [features, setFeatures] = useState([]);
  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [newFeature, setNewFeature] = useState({ title: "", icon: "" });

  const fetchFeatures = async () => {
    try {
      setLoadingFeatures(true);
      const res = await axios.get(API_FEATURES);
      setFeatures(res.data);
    } catch (err) {
      console.error("Erreur récupération features:", err);
    } finally {
      setLoadingFeatures(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    if (!newFeature.title.trim() || !newFeature.icon.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    try {
      const res = await axios.post(API_FEATURES, newFeature);
      setFeatures([...features, res.data]);
      setNewFeature({ title: "", icon: "" });
    } catch (err) {
      console.error("Erreur ajout feature:", err);
      alert("Erreur lors de l'ajout");
    }
  };

  const handleUpdateFeature = async () => {
    if (!selectedFeature.title.trim() || !selectedFeature.icon.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    try {
      const res = await axios.put(`${API_FEATURES}/${selectedFeature._id}`, selectedFeature);
      setFeatures(features.map(f => f._id === res.data._id ? res.data : f));
      setSelectedFeature(null);
    } catch (err) {
      console.error("Erreur modification feature:", err);
      alert("Erreur lors de la modification");
    }
  };

  const handleDeleteFeature = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette fonctionnalité ?")) return;
    try {
      await axios.delete(`${API_FEATURES}/${id}`);
      setFeatures(features.filter(f => f._id !== id));
    } catch (err) {
      console.error("Erreur suppression feature:", err);
      alert("Erreur lors de la suppression");
    }
  };

  // ===== Services Admin =====
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({ title: "", description: "", features: [] });

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await axios.get(API_SERVICES);
      setServices(res.data);
    } catch (err) {
      console.error("Erreur récupération services:", err);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async () => {
    if (!newService.title.trim()) {
      alert("Titre requis !");
      return;
    }
    try {
      const res = await axios.post(API_SERVICES, {
        ...newService,
        features: newService.features.filter(f => f.trim() !== "")
      });
      setServices([...services, res.data]);
      setNewService({ title: "", description: "", features: [] });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout du service");
    }
  };

  const handleUpdateService = async () => {
    if (!selectedService.title.trim()) {
      alert("Titre requis !");
      return;
    }
    try {
      const res = await axios.put(`${API_SERVICES}/${selectedService._id}`, {
        ...selectedService,
        features: selectedService.features.filter(f => f.trim() !== "")
      });
      setServices(services.map(s => s._id === res.data._id ? res.data : s));
      setSelectedService(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
    try {
      await axios.delete(`${API_SERVICES}/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header Dashboard */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tableau de Bord Admin</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Gérez votre contenu et suivez vos statistiques</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <FaChartLine className="text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Dernière connexion : {new Date().toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Aperçu des statistiques</h2>
        {loadingStats ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-3xl text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 transition-transform duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`text-3xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{ width: `${Math.min(stat.value * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Features Management Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Gestion des Fonctionnalités</h2>
            <FaCog className="text-gray-400" />
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Titre de la fonctionnalité"
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={selectedFeature ? selectedFeature.title : newFeature.title}
                onChange={e => selectedFeature
                  ? setSelectedFeature({ ...selectedFeature, title: e.target.value })
                  : setNewFeature({ ...newFeature, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Icône (ex: ⚡, 🎨)"
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-center text-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={selectedFeature ? selectedFeature.icon : newFeature.icon}
                onChange={e => selectedFeature
                  ? setSelectedFeature({ ...selectedFeature, icon: e.target.value })
                  : setNewFeature({ ...newFeature, icon: e.target.value })}
              />
              <div className="flex gap-2">
                {selectedFeature ? (
                  <>
                    <button 
                      onClick={handleUpdateFeature}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      <FaEdit /> Mettre à jour
                    </button>
                    <button 
                      onClick={() => setSelectedFeature(null)}
                      className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      <FaTimesCircle />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleAddFeature}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all"
                  >
                    <FaPlus /> Ajouter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Features List */}
          {loadingFeatures ? (
            <div className="flex justify-center items-center h-32">
              <FaSpinner className="animate-spin text-2xl text-blue-500" />
            </div>
          ) : (
            <div className="space-y-3">
              {features.map(f => (
                <div 
                  key={f._id} 
                  className="group flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{f.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">{f.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">ID: {f._id?.substring(0, 8)}...</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedFeature(f)}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteFeature(f._id)}
                      className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Services Management Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Gestion des Services</h2>
            <FaStar className="text-amber-500" />
          </div>

          {/* Service Form */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Titre du service"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={selectedService ? selectedService.title : newService.title}
              onChange={e => selectedService
                ? setSelectedService({ ...selectedService, title: e.target.value })
                : setNewService({ ...newService, title: e.target.value })}
            />
            <textarea
              placeholder="Description du service"
              rows="3"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              value={selectedService ? selectedService.description : newService.description}
              onChange={e => selectedService
                ? setSelectedService({ ...selectedService, description: e.target.value })
                : setNewService({ ...newService, description: e.target.value })}
            />

            {/* Features List */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Points clés du service
              </label>
              <div className="space-y-2">
                {(selectedService ? selectedService.features : newService.features).map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition"
                        value={point}
                        onChange={e => {
                          const updatedPoints = [...(selectedService ? selectedService.features : newService.features)];
                          updatedPoints[index] = e.target.value;
                          selectedService
                            ? setSelectedService({ ...selectedService, features: updatedPoints })
                            : setNewService({ ...newService, features: updatedPoints });
                        }}
                        placeholder={`Point ${index + 1}`}
                      />
                    </div>
                    <button
                      onClick={() => {
                        const updatedPoints = [...(selectedService ? selectedService.features : newService.features)];
                        updatedPoints.splice(index, 1);
                        selectedService
                          ? setSelectedService({ ...selectedService, features: updatedPoints })
                          : setNewService({ ...newService, features: updatedPoints });
                      }}
                      className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                    >
                      Suppr
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updatedPoints = [...(selectedService ? selectedService.features : newService.features), ""];
                    selectedService
                      ? setSelectedService({ ...selectedService, features: updatedPoints })
                      : setNewService({ ...newService, features: updatedPoints });
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
                >
                  <FaPlus /> Ajouter un point
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              {selectedService ? (
                <>
                  <button
                    onClick={handleUpdateService}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Mettre à jour le service
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddService}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <FaPlus /> Créer un nouveau service
                </button>
              )}
            </div>
          </div>

          {/* Services List */}
          {loadingServices ? (
            <div className="flex justify-center items-center h-32">
              <FaSpinner className="animate-spin text-2xl text-blue-500" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FaStar className="text-4xl mx-auto mb-4 opacity-50" />
              <p>Aucun service disponible</p>
              <p className="text-sm mt-1">Commencez par créer votre premier service</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {services.map(s => (
                <div 
                  key={s._id} 
                  className="group p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">{s.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{s.description}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedService(s)}
                        className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteService(s._id)}
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {s.features && s.features.length > 0 && (
                    <ul className="space-y-1">
                      {s.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FaCheckCircle className="text-green-500 text-xs" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}