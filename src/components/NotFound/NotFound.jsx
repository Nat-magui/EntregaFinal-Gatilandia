import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="NF">
      <h2>❌ Página no encontrada</h2>
      <p className="NF__muted">La ruta no existe o fue movida.</p>
      <Link className="Btn" to="/">Volver al inicio</Link>
    </main>
  );
}
