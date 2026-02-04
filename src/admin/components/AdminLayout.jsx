// src/admin/components/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const { updateSession } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('adminDarkMode') === 'true' || false;
  });

  // Renouveler la session périodiquement
  useEffect(() => {
    const interval = setInterval(() => {
      updateSession();
    }, 30 * 60 * 1000); // Toutes les 30 minutes

    return () => clearInterval(interval);
  }, [updateSession]);

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

  // Initialiser le dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Session warning */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Session active • Auto-renouvellement activé
          </p>
        </div>
      </div>
    </div>
  );
}