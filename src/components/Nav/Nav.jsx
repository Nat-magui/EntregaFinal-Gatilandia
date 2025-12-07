import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { assetPath } from "../../utils/assetPath.js";
import "./Nav.css";

export default function Nav() {
  const { getTotalItems } = useCartContext();
  const total = getTotalItems();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // (/ en local, /gatilandia-react/ en GH Pages)
  const logoUrl = assetPath("/images/logo-gatilandia.png");

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const activeStyle = ({ isActive }) => ({
    textDecoration: "none",
    borderColor: isActive ? "rgba(0,0,0,.2)" : "transparent",
    background: isActive ? "rgba(0,0,0,.06)" : "transparent",
  });

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`Nav ${isOpen ? "Nav--open" : ""}`}
      aria-label="Navegación principal"
    >
      {/* Izquierda: marca + links */}
      <div className="Nav__left">
        <Link
          to="/"
          className="Nav__brand"
          aria-label="Ir al inicio de Gatilandia"
          onClick={closeMenu}
        >
          <img
            src={logoUrl}
            alt="Logo de Gatilandia"
            className="Nav__logo"
          />
        </Link>

        {/* Botón hamburguesa (se ve solo en mobile por CSS) */}
        <button
          type="button"
          className={`Nav__toggle ${isOpen ? "Nav__toggle--open" : ""}`}
          onClick={toggleMenu}
          aria-label={
            isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
          }
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className="Nav__list">
          <li>
            <NavLink
              to="/"
              className="Nav__link"
              style={activeStyle}
              onClick={closeMenu}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/alimentos"
              className="Nav__link"
              style={activeStyle}
              onClick={closeMenu}
            >
              Alimentos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/juguetes"
              className="Nav__link"
              style={activeStyle}
              onClick={closeMenu}
            >
              Juguetes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/higiene"
              className="Nav__link"
              style={activeStyle}
              onClick={closeMenu}
            >
              Higiene
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/accesorios"
              className="Nav__link"
              style={activeStyle}
              onClick={closeMenu}
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
          onClick={closeMenu}
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
            <Link
              to="/login"
              className="Nav__authBtn Nav__authBtn--login"
              onClick={closeMenu}
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}