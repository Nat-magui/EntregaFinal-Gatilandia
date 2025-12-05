import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "/public/images/logo-gatilandia.png";
import "./Nav.css";

export default function Nav() {
  const { getTotalItems } = useCartContext();
  const total = getTotalItems();

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const activeStyle = ({ isActive }) => ({
    textDecoration: "none",
    borderColor: isActive ? "rgba(0,0,0,.2)" : "transparent",
    background: isActive ? "rgba(0,0,0,.06)" : "transparent",
  });

  return (
    <nav className="Nav" aria-label="Navegación principal">
      {/* Izquierda: marca + links */}
      <div className="Nav__left">
        <Link
          to="/"
          className="Nav__brand"
          aria-label="Ir al inicio de Gatilandia"
        >
          <img
            src={logo}
            alt="Logo de Gatilandia"
            className="Nav__logo"
          />
        </Link>

        <ul className="Nav__list">
          <li>
            <NavLink to="/" className="Nav__link" style={activeStyle}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/alimentos"
              className="Nav__link"
              style={activeStyle}
            >
              Alimentos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/juguetes"
              className="Nav__link"
              style={activeStyle}
            >
              Juguetes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/higiene"
              className="Nav__link"
              style={activeStyle}
            >
              Higiene
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/accesorios"
              className="Nav__link"
              style={activeStyle}
            >
              Accesorios
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Derecha: carrito + login/logout */}
      <div className="Nav__right">
        <Link
          to="/cart"
          className="Nav__cart"
          aria-label={`Carrito con ${total} productos`}
        >
          🛒{" "}
          {total > 0 && (
            <span className="Nav__badge" aria-hidden="true">
              {total}
            </span>
          )}
        </Link>

        <div className="Nav__auth">
          {isAuthenticated ? (
            <>
              <span className="Nav__user">
                Hola, {user?.username || "admin"} 👋
              </span>
              <button
                type="button"
                className="Nav__authBtn Nav__authBtn--logout"
                onClick={handleLogoutClick}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="Nav__authBtn Nav__authBtn--login">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
