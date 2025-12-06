import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="AdminLayout">
      <header className="AdminLayout-header">
        <div className="AdminLayout-headerRow">
          <Link to="/" className="AdminLayout-back">
            ← Volver a la tienda
          </Link>

          <div>
            <h1 className="AdminLayout-title">Panel de administración</h1>
            <p className="AdminLayout-subtitle">
              Desde acá vas a poder gestionar los productos de Gatilandia.
            </p>
          </div>
        </div>
      </header>

      <main className="AdminLayout-main">
        <Outlet />
      </main>
    </div>
  );
}