// src/admin/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Code admin (à mettre dans des variables d'environnement en production)
const ADMIN_CODE = "admin@23";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('adminAuth');
      if (!authData) {
        setUser(null);
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(authData);
      const now = Date.now();

      // Vérifier l'expiration (24h)
      if (now > parsed.expires) {
        logout();
        return;
      }

      setUser({
        token: parsed.token,
        loggedAt: parsed.loggedAt,
        expires: parsed.expires
      });
    } catch (error) {
      console.error('Erreur de vérification d\'authentification:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (code) => {
    setLoading(true);
    
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 800));

    if (code === ADMIN_CODE) {
      const authData = {
        token: btoa(`admin:${Date.now()}`),
        loggedAt: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24h
      };

      localStorage.setItem('adminAuth', JSON.stringify(authData));
      setUser({
        token: authData.token,
        loggedAt: authData.loggedAt,
        expires: authData.expires
      });
      
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Code incorrect. Essayez: admin@23' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setUser(null);
    navigate('/admin/login');
  };

  const updateSession = () => {
    if (user) {
      const updatedAuthData = {
        token: user.token,
        loggedAt: user.loggedAt,
        expires: Date.now() + (24 * 60 * 60 * 1000) // Renouveler pour 24h
      };

      localStorage.setItem('adminAuth', JSON.stringify(updatedAuthData));
      setUser(prev => ({
        ...prev,
        expires: updatedAuthData.expires
      }));
    }
  };

  const isAuthenticated = () => {
    if (!user) return false;
    
    const now = Date.now();
    return now < user.expires;
  };

  const getUserInfo = () => {
    if (!user) return null;
    
    return {
      isAdmin: true,
      loggedAt: new Date(user.loggedAt).toLocaleDateString('fr-FR'),
      sessionExpires: new Date(user.expires).toLocaleTimeString('fr-FR'),
      sessionDuration: Math.floor((user.expires - Date.now()) / (1000 * 60 * 60)) + 'h'
    };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    getUserInfo,
    updateSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
  }
  return context;
}