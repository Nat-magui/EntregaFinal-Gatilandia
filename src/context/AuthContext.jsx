import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "gatilandia_auth_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // { username: "admin" } o null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.username) {
          setUser(parsed);
        }
      }
    } catch {
      // si falla, simplemente no hay sesión
    } finally {
      setLoading(false);
    }
  }, []);

  // Login simulado: usuario admin o admin@example.com / pass 1234
  async function login(username, password) {
    setError(null);

    const normalized = String(username).trim().toLowerCase();

    const isUserValid =
      normalized === "admin" || normalized === "admin@example.com";

    if (isUserValid && password === "1234") {
      const loggedUser = { username: normalized, role: "admin" };
      setUser(loggedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
      return true;
    } else {
      setError("Usuario o contraseña incorrectos");
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
