// src/admin/components/AdminNavbarSimple.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserCircle,
  FaHome,
  FaShieldAlt
} from "react-icons/fa";

export default function AdminNavbarSimple() {
  const { logout, getUserInfo } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('adminDarkMode') === 'true' || false;
  });
  
  const userInfo = getUserInfo();

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('adminDarkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };

  // Initialiser le dark mode
  useState(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  });

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Partie gauche - Logo et titre */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <FaShieldAlt className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-800 dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  CodeNosa • Gestion
                </p>
              </div>
            </div>

            {/* Menu rapide - Desktop */}
            <div className="hidden md:flex items-center gap-1 ml-8">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/portfolio"
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/admin/clients"
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Clients
              </NavLink>
              <NavLink
                to="/admin/testimonials"
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Témoignages
              </NavLink>
            </div>
          </div>

          {/* Partie droite - Actions */}
          <div className="flex items-center gap-4">
            {/* Lien vers site public */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              title="Voir le site public"
            >
              <FaHome />
              <span className="hidden lg:inline">Voir le site</span>
            </a>

            {/* Toggle Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
              title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {/* Avatar utilisateur avec bouton déconnexion */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <FaUserCircle className="text-white text-lg" />
              </div>
              
              {/* Info utilisateur (desktop seulement) */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Administrateur
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Connecté
                </p>
              </div>

              {/* Bouton déconnexion */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                title="Déconnexion"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div className="flex md:hidden items-center justify-around gap-1 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => 
              `flex-1 text-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/portfolio"
            className={({ isActive }) => 
              `flex-1 text-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) => 
              `flex-1 text-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            Clients
          </NavLink>
          <NavLink
            to="/admin/testimonials"
            className={({ isActive }) => 
              `flex-1 text-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            Témoignages
          </NavLink>
        </div>
      </div>
    </header>
  );
}