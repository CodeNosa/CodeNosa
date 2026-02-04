import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaChartLine, 
  FaProjectDiagram, 
  FaUserFriends, 
  FaComments,
  FaCalendarCheck,
  FaRocket,
  FaHome
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  // Vérifier l'authentification
  useEffect(() => {
    const authData = localStorage.getItem("adminAuth");
    if (!authData) {
      navigate("/admin/login");
      return;
    }
    try {
      const parsed = JSON.parse(authData);
      if (Date.now() > parsed.expires) {
        localStorage.removeItem("adminAuth");
        navigate("/admin/login");
      }
    } catch {
      navigate("/admin/login");
    }
  }, [navigate]);

  const stats = [
    { label: "Projets actifs", value: "12", icon: <FaProjectDiagram />, color: "blue" },
    { label: "Clients", value: "8", icon: <FaUserFriends />, color: "green" },
    { label: "Témoignages", value: "24", icon: <FaComments />, color: "purple" },
    { label: "Projets ce mois", value: "3", icon: <FaCalendarCheck />, color: "orange" },
  ];

  const colorMap = {
    blue: "text-blue-500 bg-blue-500",
    green: "text-green-500 bg-green-500",
    purple: "text-purple-500 bg-purple-500",
    orange: "text-orange-500 bg-orange-500",
  };

  

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bienvenue dans votre espace d'administration
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaChartLine />
          <span>Dernière connexion: Aujourd'hui</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`text-2xl ${colorMap[stat.color]}`}>
                {stat.icon}
              </div>
            </div>
           
          </div>
        ))}
      </div>

    

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate("/admin/portfolio")}
              className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl hover:shadow-md transition-all border border-blue-200 dark:border-blue-800"
            >
              <FaProjectDiagram className="text-blue-500 text-xl mb-2" />
              <p className="font-medium text-gray-800 dark:text-white">Ajouter un projet</p>
            </button>

            <button 
              onClick={() => navigate("/admin/clients")}
              className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl hover:shadow-md transition-all border border-green-200 dark:border-green-800"
            >
              <FaUserFriends className="text-green-500 text-xl mb-2" />
              <p className="font-medium text-gray-800 dark:text-white">Gérer les clients</p>
            </button>

            <button 
              onClick={() => navigate("/admin/testimonials")}
              className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl hover:shadow-md transition-all border border-purple-200 dark:border-purple-800"
            >
              <FaComments className="text-purple-500 text-xl mb-2" />
              <p className="font-medium text-gray-800 dark:text-white">Voir les avis</p>
            </button>

            <button 
              onClick={() => window.open("/", "_blank")}
              className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl hover:shadow-md transition-all border border-orange-200 dark:border-orange-800"
            >
              <FaHome className="text-orange-500 text-xl mb-2" />
              <p className="font-medium text-gray-800 dark:text-white">Voir le site</p>
            </button>
          </div>
        </div>
      </div>
 
  );
}
