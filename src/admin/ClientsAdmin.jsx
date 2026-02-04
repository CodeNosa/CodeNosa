// src/admin/components/ClientsAdmin.jsx
import { useState, useEffect } from "react";
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaUser,
  FaEnvelope, FaPhone, FaCalendar, FaChartLine, FaFileInvoiceDollar,
  FaProjectDiagram, FaCheckCircle, FaClock, FaStar, FaBuilding,
  FaGlobe, FaSave, FaTimes, FaTag,
  FaCode, FaCalendarAlt, FaMoneyBillWave, FaPercentage,
  FaArrowLeft
} from "react-icons/fa";

// ============================================================================
// TODO POUR LE DEVELOPPEUR BACKEND :
// ============================================================================
// 
// Structure de données attendue de l'API :
// 
// CLIENT :
// {
//   _id: ObjectId,
//   name: String,
//   email: String,
//   phone: String,
//   company: String,
//   address: {
//     street: String,
//     city: String,
//     country: String
//   },
//   website: String,
//   status: String,               // "active", "pending", "inactive"
//   type: String,                 // "entreprise", "startup", "particulier", "agence"
//   industry: String,
//   notes: String,
//   joinDate: Date,
//   lastContact: Date,
//   totalSpent: Number,
//   projectsCount: Number,
//   activeProjects: Number,
//   satisfactionScore: Number,
//   tags: [String],
//   createdAt: Date,
//   updatedAt: Date
// }
// 
// PROJET :
// {
//   _id: ObjectId,
//   clientId: ObjectId,
//   name: String,
//   description: String,
//   status: String,              // "planning", "in_progress", "on_hold", "completed"
//   budget: Number,
//   startDate: Date,
//   deadline: Date,
//   technologies: [String],
//   createdAt: Date,
//   updatedAt: Date
// }
// 
// ENDPOINTS API RECOMMANDÉS :
// 
// GET    /api/admin/clients           - Liste tous les clients
// GET    /api/admin/clients/:id       - Détails d'un client
// POST   /api/admin/clients           - Créer un client
// PUT    /api/admin/clients/:id       - Mettre à jour un client
// DELETE /api/admin/clients/:id       - Supprimer un client
// 
// GET    /api/admin/projects          - Liste tous les projets
// GET    /api/admin/projects/:id      - Détails d'un projet
// POST   /api/admin/projects          - Créer un projet
// PUT    /api/admin/projects/:id      - Mettre à jour un projet
// DELETE /api/admin/projects/:id      - Supprimer un projet
// 
// GET    /api/admin/clients/:id/projects - Projets d'un client
// GET    /api/admin/stats/clients      - Statistiques
// 
// ============================================================================

export default function ClientsAdmin() {
  // États principaux
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("clients"); // "clients" ou "projects"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Chargement des données
  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  const fetchClients = async () => {
    try {
      // TODO: Remplacer par l'appel API
      const demoClients = [
        {
          id: 1,
          name: "TechCorp Inc.",
          email: "contact@techcorp.com",
          phone: "+216 12 345 678",
          company: "TechCorp",
          website: "https://techcorp.com",
          status: "active",
          type: "entreprise",
          industry: "Technologie",
          notes: "Client important, payer régulièrement",
          joinDate: "2023-03-15",
          lastContact: "2024-01-10",
          totalSpent: 15000,
          projectsCount: 3,
          activeProjects: 1,
          satisfactionScore: 95,
          tags: ["VIP", "Tech", "Fidèle"]
        },
        {
          id: 2,
          name: "Startup Innov",
          email: "ceo@startupinnov.com",
          phone: "+216 23 456 789",
          company: "Startup Innov",
          website: "https://startupinnov.com",
          status: "active",
          type: "startup",
          industry: "SaaS",
          notes: "Startup prometteuse, besoin d'accompagnement",
          joinDate: "2023-06-22",
          lastContact: "2024-01-05",
          totalSpent: 8500,
          projectsCount: 2,
          activeProjects: 1,
          satisfactionScore: 88,
          tags: ["Startup", "SaaS", "Croissance"]
        },
        {
          id: 3,
          name: "Digital Agency",
          email: "info@digitalagency.com",
          phone: "+216 34 567 890",
          company: "Digital Agency SARL",
          website: "https://digitalagency.com",
          status: "pending",
          type: "agence",
          industry: "Marketing",
          notes: "En attente de réponse pour le devis",
          joinDate: "2023-11-30",
          lastContact: "2023-12-20",
          totalSpent: 5000,
          projectsCount: 1,
          activeProjects: 0,
          satisfactionScore: 0,
          tags: ["Agence", "Marketing"]
        },
        {
          id: 4,
          name: "Mohamed Ben Ali",
          email: "mohamed@example.com",
          phone: "+216 98 765 432",
          company: "Freelance",
          website: "",
          status: "inactive",
          type: "particulier",
          industry: "Consulting",
          notes: "Ancien client, pas de contact depuis 6 mois",
          joinDate: "2022-08-10",
          lastContact: "2023-06-15",
          totalSpent: 3000,
          projectsCount: 2,
          activeProjects: 0,
          satisfactionScore: 75,
          tags: ["Ancien", "Consultant"]
        }
      ];
      
      setClients(demoClients);
    } catch (error) {
      console.error("Erreur lors du chargement des clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      // TODO: Remplacer par l'appel API
      const demoProjects = [
        { 
          id: 1, 
          clientId: 1, 
          name: "Site E-commerce", 
          status: "completed", 
          budget: 8000, 
          startDate: "2023-09-01",
          deadline: "2023-12-15",
          description: "Site e-commerce avec paiement sécurisé et gestion des stocks",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        { 
          id: 2, 
          clientId: 1, 
          name: "Application Mobile", 
          status: "in_progress", 
          budget: 5000, 
          startDate: "2024-01-15",
          deadline: "2024-06-30",
          description: "App mobile cross-platform pour gestion des ventes",
          technologies: ["React Native", "Firebase", "Redux"]
        },
        { 
          id: 3, 
          clientId: 1, 
          name: "Refonte Branding", 
          status: "completed", 
          budget: 2000, 
          startDate: "2023-08-01",
          deadline: "2023-10-30",
          description: "Nouvelle identité visuelle et charte graphique",
          technologies: ["Figma", "Adobe Creative Suite"]
        },
        { 
          id: 4, 
          clientId: 2, 
          name: "Site Vitrine Corporate", 
          status: "completed", 
          budget: 3500, 
          startDate: "2023-07-01",
          deadline: "2023-09-15",
          description: "Site corporate avec blog intégré",
          technologies: ["WordPress", "PHP", "MySQL"]
        },
        { 
          id: 5, 
          clientId: 2, 
          name: "Dashboard Analytics", 
          status: "in_progress", 
          budget: 5000, 
          startDate: "2024-02-01",
          deadline: "2024-05-31",
          description: "Dashboard de suivi des performances avec reporting",
          technologies: ["Vue.js", "Express.js", "PostgreSQL"]
        },
        { 
          id: 6, 
          clientId: 3, 
          name: "Campagne Marketing", 
          status: "planning", 
          budget: 3000, 
          startDate: "2024-03-01",
          deadline: "2024-04-30",
          description: "Campagne digitale réseaux sociaux",
          technologies: ["Meta Ads", "Google Ads", "Analytics"]
        }
      ];
      
      setProjects(demoProjects);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  };

  // Fonctions utilitaires
  const getClientProjects = (clientId) => {
    return projects.filter(p => p.clientId === clientId);
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      active: { label: "Actif", color: "green", bgColor: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-600 dark:text-green-400", icon: <FaCheckCircle /> },
      pending: { label: "En attente", color: "yellow", bgColor: "bg-yellow-100 dark:bg-yellow-900/30", textColor: "text-yellow-600 dark:text-yellow-400", icon: <FaClock /> },
      inactive: { label: "Inactif", color: "gray", bgColor: "bg-gray-100 dark:bg-gray-700", textColor: "text-gray-600 dark:text-gray-400", icon: <FaTimes /> }
    };
    return statusMap[status] || { label: "Inconnu", color: "gray", bgColor: "bg-gray-100 dark:bg-gray-700", textColor: "text-gray-600 dark:text-gray-400", icon: <FaClock /> };
  };

  const getProjectStatusInfo = (status) => {
    const statusMap = {
      planning: { label: "Planification", color: "blue", bgColor: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-600 dark:text-blue-400", icon: <FaClock /> },
      in_progress: { label: "En cours", color: "yellow", bgColor: "bg-yellow-100 dark:bg-yellow-900/30", textColor: "text-yellow-600 dark:text-yellow-400", icon: <FaChartLine /> },
      on_hold: { label: "En pause", color: "orange", bgColor: "bg-orange-100 dark:bg-orange-900/30", textColor: "text-orange-600 dark:text-orange-400", icon: <FaClock /> },
      completed: { label: "Terminé", color: "green", bgColor: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-600 dark:text-green-400", icon: <FaCheckCircle /> }
    };
    return statusMap[status] || { label: "Inconnu", color: "gray", bgColor: "bg-gray-100 dark:bg-gray-700", textColor: "text-gray-600 dark:text-gray-400", icon: <FaClock /> };
  };

  // Filtres
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || client.status === selectedStatus;
    const matchesType = selectedType === "all" || client.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredProjects = projects.filter(project => {
    const client = clients.find(c => c.id === project.clientId);
    if (!client) return false;
    
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === "active").length,
    totalRevenue: clients.reduce((sum, client) => sum + client.totalSpent, 0),
    activeProjects: projects.filter(p => p.status === "in_progress").length,
    averageSatisfaction: clients.length > 0 
      ? Math.round(clients.reduce((sum, client) => sum + client.satisfactionScore, 0) / clients.length)
      : 0,
    pendingClients: clients.filter(c => c.status === "pending").length,
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === "completed").length,
    totalBudget: projects.reduce((sum, project) => sum + project.budget, 0)
  };

  // Handlers
  const handleAddClient = () => {
    setSelectedClient(null);
    setShowClientModal(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ? Tous ses projets seront également supprimés.")) return;
    
    try {
      // TODO: Appel API DELETE
      const newProjects = projects.filter(p => p.clientId !== id);
      setProjects(newProjects);
      
      setClients(clients.filter(c => c.id !== id));
      alert("Client et ses projets supprimés avec succès");
    } catch (error) {
      alert("Erreur lors de la suppression");
      console.error(error);
    }
  };

  const handleAddProject = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client);
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${projectName}" ?`)) return;
    
    try {
      // TODO: Appel API DELETE
      const project = projects.find(p => p.id === projectId);
      setProjects(projects.filter(p => p.id !== projectId));
      
      // Mettre à jour le compteur de projets du client
      if (project) {
        setClients(prevClients => 
          prevClients.map(c => 
            c.id === project.clientId 
              ? { 
                  ...c, 
                  projectsCount: Math.max(0, c.projectsCount - 1),
                  activeProjects: project.status === "in_progress" 
                    ? Math.max(0, c.activeProjects - 1)
                    : c.activeProjects
                }
              : c
          )
        );
      }
      
      alert("Projet supprimé avec succès");
    } catch (error) {
      alert("Erreur lors de la suppression");
      console.error(error);
    }
  };

  const handleViewClientDetails = (client) => {
    setSelectedClient(client);
    setActiveTab("client-details");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Chargement des clients...</p>
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
            Gestion des Clients
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos clients et leurs projets
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab(activeTab === "clients" ? "projects" : "clients")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {activeTab === "clients" ? <FaProjectDiagram /> : <FaUser />}
            {activeTab === "clients" ? "Voir les projets" : "Voir les clients"}
          </button>
          <button
            onClick={handleAddClient}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            <FaPlus />
            Nouveau client
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Clients totaux</p>
              <p className="text-3xl font-bold mt-2">{stats.totalClients}</p>
              <p className="text-xs opacity-75 mt-1">{stats.activeClients} actifs • {stats.pendingClients} en attente</p>
            </div>
            <FaUser className="text-2xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Projets</p>
              <p className="text-3xl font-bold mt-2">{stats.totalProjects}</p>
              <p className="text-xs opacity-75 mt-1">{stats.activeProjects} en cours • {stats.completedProjects} terminés</p>
            </div>
            <FaProjectDiagram className="text-2xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Chiffre d'affaires</p>
              <p className="text-3xl font-bold mt-2">
                ${stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs opacity-75 mt-1">Budget total: ${stats.totalBudget.toLocaleString()}</p>
            </div>
            <FaFileInvoiceDollar className="text-2xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Satisfaction</p>
              <p className="text-3xl font-bold mt-2">{stats.averageSatisfaction}%</p>
              <p className="text-xs opacity-75 mt-1">Score moyen des clients</p>
            </div>
            <FaStar className="text-2xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "clients"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            <FaUser className="inline mr-2" />
            Clients ({clients.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "projects"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            <FaProjectDiagram className="inline mr-2" />
            Projets ({projects.length})
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Rechercher un ${activeTab === "clients" ? "client" : "projet"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              {activeTab === "clients" ? (
                <>
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="inactive">Inactif</option>
                </>
              ) : (
                <>
                  <option value="planning">Planification</option>
                  <option value="in_progress">En cours</option>
                  <option value="on_hold">En pause</option>
                  <option value="completed">Terminé</option>
                </>
              )}
            </select>
            
            {activeTab === "clients" && (
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="entreprise">Entreprise</option>
                <option value="startup">Startup</option>
                <option value="particulier">Particulier</option>
                <option value="agence">Agence</option>
              </select>
            )}
            
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStatus("all");
                setSelectedType("all");
              }}
              className="px-3 py-2.5 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <FaTimes />
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === "clients" && (
        <ClientsListView 
          clients={filteredClients}
          projects={projects}
          onAddProject={handleAddProject}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
          onViewClientDetails={handleViewClientDetails}
          getClientProjects={getClientProjects}
          getStatusInfo={getStatusInfo}
        />
      )}

      {activeTab === "projects" && (
        <ProjectsListView 
          projects={filteredProjects}
          clients={clients}
          onDeleteProject={handleDeleteProject}
          onAddProject={handleAddProject}
          getProjectStatusInfo={getProjectStatusInfo}
        />
      )}

      {activeTab === "client-details" && selectedClient && (
        <ClientDetailsView 
          client={selectedClient}
          projects={getClientProjects(selectedClient.id)}
          onBack={() => setActiveTab("clients")}
          onAddProject={() => handleAddProject(selectedClient.id)}
          onEditClient={() => handleEditClient(selectedClient)}
          getStatusInfo={getStatusInfo}
          getProjectStatusInfo={getProjectStatusInfo}
        />
      )}

      {/* Modals */}
      {showClientModal && (
        <ClientModal
          client={selectedClient}
          onClose={() => setShowClientModal(false)}
          onSave={(clientData) => {
            if (selectedClient) {
              // TODO: Appel API PUT
              setClients(clients.map(c => 
                c.id === selectedClient.id ? { ...c, ...clientData } : c
              ));
            } else {
              // TODO: Appel API POST
              const newClient = { 
                ...clientData, 
                id: Date.now(),
                joinDate: new Date().toISOString().split('T')[0],
                lastContact: new Date().toISOString().split('T')[0],
                projectsCount: 0,
                activeProjects: 0,
                satisfactionScore: 0,
                totalSpent: 0,
                tags: clientData.tags || []
              };
              setClients([...clients, newClient]);
            }
            setShowClientModal(false);
          }}
        />
      )}

      {showProjectModal && selectedClient && (
        <ProjectModal
          client={selectedClient}
          onClose={() => setShowProjectModal(false)}
          onSave={(projectData) => {
            // TODO: Appel API POST pour le projet
            const newProject = { 
              ...projectData, 
              id: Date.now(),
              clientId: selectedClient.id
            };
            
            setProjects([...projects, newProject]);
            
            // Mettre à jour le client
            setClients(prevClients => 
              prevClients.map(c => 
                c.id === selectedClient.id 
                  ? { 
                      ...c, 
                      projectsCount: c.projectsCount + 1,
                      activeProjects: projectData.status === "in_progress" 
                        ? c.activeProjects + 1 
                        : c.activeProjects,
                      totalSpent: c.totalSpent + (projectData.status === "completed" ? projectData.budget : 0)
                    }
                  : c
              )
            );
            
            setShowProjectModal(false);
          }}
        />
      )}
    </div>
  );
}

// Composant pour la liste des clients
function ClientsListView({ clients, onAddProject, onEditClient, onDeleteClient, onViewClientDetails, getClientProjects, getStatusInfo }) {
  if (clients.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <FaSearch className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">Aucun client trouvé</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Client</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Contact</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Statut</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Projets</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">CA</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {clients.map((client) => {
              const statusInfo = getStatusInfo(client.status);
              const clientProjects = getClientProjects(client.id);
              const activeProjects = clientProjects.filter(p => p.status === "in_progress").length;
              
              return (
                <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{client.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <FaBuilding className="text-xs" /> {client.company}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {client.tags?.slice(0, 2).map((tag, index) => (
                              <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {client.tags?.length > 2 && (
                              <span className="text-xs px-2 py-0.5 text-gray-500">+{client.tags.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <FaEnvelope className="text-gray-400" />
                        <a href={`mailto:${client.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 truncate">
                          {client.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <FaPhone className="text-gray-400" />
                        {client.phone}
                      </p>
                      {client.website && (
                        <p className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                          <FaGlobe className="text-gray-400" />
                          <a href={client.website} target="_blank" rel="noopener noreferrer" className="truncate">
                            {client.website.replace(/^https?:\/\//, '')}
                          </a>
                        </p>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 w-fit ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                      <p className="text-xs text-gray-500">Depuis {client.joinDate}</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{client.projectsCount} projets</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {activeProjects} en cours
                        </span>
                        {client.satisfactionScore > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            {client.satisfactionScore}% satisfait
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => onViewClientDetails(client)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
                      >
                        Voir les projets →
                      </button>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        ${client.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{client.industry}</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddProject(client.id)}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors flex items-center gap-1"
                        title="Ajouter un projet"
                      >
                        <FaPlus className="text-xs" />
                        Projet
                      </button>
                      <button 
                        onClick={() => onEditClient(client)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => onDeleteClient(client.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Composant pour la liste des projets
function ProjectsListView({ projects, clients, onDeleteProject, onAddProject, getProjectStatusInfo }) {
  // Grouper les projets par client
  const projectsByClient = projects.reduce((acc, project) => {
    const client = clients.find(c => c.id === project.clientId);
    if (!client) return acc;
    
    if (!acc[client.id]) {
      acc[client.id] = {
        client,
        projects: []
      };
    }
    
    acc[client.id].projects.push(project);
    return acc;
  }, {});

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <FaProjectDiagram className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">Aucun projet trouvé</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.values(projectsByClient).map(({ client, projects: clientProjects }) => (
        <div key={client.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{client.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{client.company}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onAddProject(client.id)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus />
                Nouveau projet
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientProjects.map(project => {
                const statusInfo = getProjectStatusInfo(project.status);
                
                return (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition-all bg-white dark:bg-gray-800 group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ID: {project.id}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                          <FaMoneyBillWave /> Budget
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-lg text-gray-800 dark:text-white">
                            ${project.budget.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                          <FaCalendarAlt /> Dates
                        </p>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Début: {project.startDate}</span>
                          <span>Échéance: {project.deadline}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                            <FaCode /> Technologies
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs px-2 py-1 text-gray-500">+{project.technologies.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm transition-colors">
                          Détails
                        </button>
                        <button 
                          onClick={() => onDeleteProject(project.id, project.name)}
                          className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/40 rounded-lg text-sm transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Composant Vue Détails du Client
function ClientDetailsView({ client, projects, onBack, onAddProject, onEditClient, getStatusInfo, getProjectStatusInfo }) {
  const statusInfo = getStatusInfo(client.status);
  const activeProjects = projects.filter(p => p.status === "in_progress").length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* En-tête */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <FaArrowLeft />
            Retour à la liste
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEditClient}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <FaEdit />
              Modifier
            </button>
            <button
              onClick={onAddProject}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <FaPlus />
              Nouveau projet
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
            {client.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{client.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{client.company}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                {statusInfo.icon}
                {statusInfo.label}
              </span>
              {client.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Informations du client */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaEnvelope /> Email
            </p>
            <p className="font-medium">
              <a href={`mailto:${client.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {client.email}
              </a>
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaPhone /> Téléphone
            </p>
            <p className="font-medium">{client.phone}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaBuilding /> Secteur
            </p>
            <p className="font-medium">{client.industry || "Non spécifié"}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaCalendar /> Date d'ajout
            </p>
            <p className="font-medium">{client.joinDate}</p>
          </div>
        </div>
        
        {client.website && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaGlobe /> Site web
            </p>
            <a 
              href={client.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {client.website}
            </a>
          </div>
        )}
        
        {client.notes && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Notes</p>
            <p className="text-gray-700 dark:text-gray-300">{client.notes}</p>
          </div>
        )}
      </div>

      {/* Statistiques projets */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Statistiques des projets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{projects.length}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">En cours</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{activeProjects}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Terminés</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedProjects}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Budget total</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${totalBudget.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Liste des projets */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Projets ({projects.length})</h3>
        
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FaProjectDiagram className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">Aucun projet pour ce client</p>
            <button
              onClick={onAddProject}
              className="mt-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mx-auto"
            >
              <FaPlus />
              Ajouter un premier projet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map(project => {
              const statusInfo = getProjectStatusInfo(project.status);
              
              return (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-800 dark:text-white">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">Budget: ${project.budget.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dates</p>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm">Début: {project.startDate}</span>
                          <span className="text-sm">Échéance: {project.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Composant Modal pour Client
function ClientModal({ client, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    status: "active",
    type: "entreprise",
    industry: "",
    notes: "",
    tags: [],
    ...client
  });

  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* En-tête fixe */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {client ? 'Modifier le client' : 'Nouveau client'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Contenu avec défilement */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                  placeholder="contact@exemple.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                  placeholder="+216 12 345 678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Entreprise *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Site web
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="https://exemple.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Secteur d'activité
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="Technologie, Marketing, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Statut *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                >
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                >
                  <option value="entreprise">Entreprise</option>
                  <option value="startup">Startup</option>
                  <option value="particulier">Particulier</option>
                  <option value="agence">Agence</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="Ajouter un tag (VIP, Tech, etc.)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors whitespace-nowrap"
                >
                  Ajouter
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex items-center gap-2"
                    >
                      <FaTag className="text-xs" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-500 hover:text-red-500 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 h-32"
                placeholder="Informations supplémentaires sur le client..."
              />
            </div>
          </form>
        </div>

        {/* Pied de page fixe */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <FaSave />
              {client ? 'Mettre à jour' : 'Créer le client'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Modal pour Projet - SIMPLIFIÉ
function ProjectModal({ client, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    budget: 0,
    startDate: new Date().toISOString().split('T')[0],
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    technologies: []
  });

  const [errors, setErrors] = useState({});
  const [newTech, setNewTech] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom du projet est requis";
    }
    
    if (formData.budget <= 0) {
      newErrors.budget = "Le budget doit être supérieur à 0";
    }
    
    const startDate = new Date(formData.startDate);
    const deadline = new Date(formData.deadline);
    
    if (deadline < startDate) {
      newErrors.deadline = "L'échéance doit être après la date de début";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech("");
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* En-tête fixe */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Nouveau projet</h2>
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Client:</span> {client.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {client.company} • {client.email}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Contenu avec défilement */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom du projet */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Nom du projet *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                required
                placeholder="Ex: Site E-commerce TechCorp"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Budget ($) *
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 ${
                  errors.budget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                required
                min="100"
                step="100"
              />
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Date de début *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Échéance *
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 ${
                    errors.deadline ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                  min={formData.startDate}
                />
                {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
              </div>
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Statut *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                required
              >
                <option value="planning">Planification</option>
                <option value="in_progress">En cours</option>
                <option value="on_hold">En pause</option>
                <option value="completed">Terminé</option>
              </select>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Technologies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="Ex: React, Node.js, MongoDB"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors whitespace-nowrap"
                >
                  Ajouter
                </button>
              </div>
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex items-center gap-2"
                    >
                      <FaCode className="text-xs" />
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-gray-500 hover:text-red-500 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 h-32"
                placeholder="Description détaillée du projet, objectifs, fonctionnalités..."
                required
              />
            </div>
          </form>
        </div>

        {/* Pied de page fixe */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <FaPlus />
              Créer le projet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}