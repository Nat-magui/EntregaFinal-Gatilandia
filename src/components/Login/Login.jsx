import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

export default function Login() {
  const { login, error, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/altaproductos";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const ok = await login(username, password);
    setSubmitting(false);

    if (ok) {
      navigate(from, { replace: true });
    }
  };


  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="LoginPage">
      <section className="LoginCard">
        <div className="LoginCard__header">
          <span className="LoginCard__icon" aria-hidden="true">
            🐱
          </span>
          <div>
            <h2 className="LoginCard__title">Ingresar a Gatilandia</h2>
            <p className="LoginCard__subtitle">
              Área para humanos autorizados cargadores de croquetas.
            </p>
          </div>
        </div>

        <div className="LoginCard__demo">
          <span className="LoginCard__chip">Demo</span>
          <span>
            Usuario: <b>admin</b> o <b>admin@example.com</b> · Contraseña:{" "}
            <b>1234</b>
          </span>
        </div>

        <form className="LoginForm" onSubmit={handleSubmit}>
          <label className="LoginForm__field">
            <span>Usuario</span>
            <input
              type="text"
              placeholder="admin o admin@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className="LoginForm__field">
            <span>Contraseña</span>
            <div className="LoginForm__passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="LoginForm__togglePwd"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {error && (
            <p className="LoginForm__error" role="alert">
              ❌ {error}
            </p>
          )}

          <button
            type="submit"
            className="LoginForm__button"
            disabled={submitting}
          >
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}