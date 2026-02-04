import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Composants
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PortfolioAdmin from "./PortfolioAdmin"; 
import ClientsAdmin from "./ClientsAdmin";
import TestimonialsAdmin from "./TestimonialsAdmin";

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Route publique - Login */}
        <Route 
          path="login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } 
        />

        {/* Routes protégées - Admin */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<PortfolioAdmin />} />
          <Route path="clients" element={<ClientsAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
        </Route>

        {/* Redirection 404 pour admin */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
