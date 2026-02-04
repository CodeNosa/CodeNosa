import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Si on essaie d'accéder au login alors qu'on est connecté → redirection rapide
  if (!requireAuth && isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Si loading, afficher spinner rapide
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Vérification...</p>
        </div>
      </div>
    );
  }

  // Si route protégée et non authentifié → redirection vers login
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Sinon, afficher le composant enfant
  return children;
}
