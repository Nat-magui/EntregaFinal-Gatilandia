import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";
import { getProductById } from "../../services/products";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const safeId = useMemo(() => {
    try { return decodeURIComponent(String(id)); } catch { return String(id); }
  }, [id]);

  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!safeId) {
      setStatus("error");
      setError("ID de producto inválido");
      return;
    }

    let isMounted = true;
    setStatus("loading");
    setError(null);

    (async () => {
      try {
        // 👇 ahora vamos directo a MockAPI (DE ESTE MODO TRABAJAMOS CON EL)
        const data = await getProductById(safeId);

        if (!isMounted) return;

        if (!data || !data.id) {
          setDetail(null);
          setStatus("error");
          setError("Producto no encontrado");
          return;
        }

        setDetail(data);
        setStatus("success");
      } catch (e) {
        if (!isMounted) return;

        console.error(e);
        setStatus("error");
        setError(e?.message || "Error al cargar el producto");
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [safeId]);

  // Título dinámico
  useEffect(() => {
    const base = "Gatilandia 🐱";
    const name = detail?.name ?? detail?.title;
    document.title = name ? `${base} · ${name}` : base;
  }, [detail]);

  return (
    <main className="IDC">
      {status === "loading" && (
        <div className="IDC__skeleton">
          <div className="IDC__imgSk" />
          <div className="IDC__textSk" />
          <div className="IDC__textSk IDC__textSk--short" />
        </div>
      )}
      {status === "error" && (
        <p className="IDC__error" role="alert">❌ {error}</p>
      )}
      {status === "success" && detail && (
        <ItemDetail detail={detail} />
      )}
    </main>
  );
}
