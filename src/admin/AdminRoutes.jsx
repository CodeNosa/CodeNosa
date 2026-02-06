import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Composants
import AdminLayout from "./components/AdminLayout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PortfolioAdmin from "./PortfolioAdmin"; 
import ClientsAdmin from "./ClientsAdmin";
import TestimonialsAdmin from "./TestimonialsAdmin";
import Teams from "./TeamAdmin";

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Route publique - Login */}
        <Route path="login" element={<Login />} />

        {/* Routes admin sans protection */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<PortfolioAdmin />} />
          <Route path="clients" element={<ClientsAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="Teams" element={<Teams />} />
        </Route>

        {/* Redirection 404 pour admin */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
} 