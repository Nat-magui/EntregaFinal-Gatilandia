import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // mientras carga el localStorage
    return <p style={{ padding: "2rem" }}>Verificando sesión...</p>;
  }

  if (!isAuthenticated) {
    // si no está logueado, lo mando a /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // si está logueado, muestro el contenido protegido
  return children;
}