import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";
import { getProducts } from "../../services/products";

export const ItemListContainer = ({ titulo = "Productos" }) => {
  const { categoryId } = useParams(); // /category/:categoryId  -> alimentos | higiene | juguetes | accesorios
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const catLabel = useMemo(() => {
    if (!categoryId) return null;
    try {
      const dec = decodeURIComponent(String(categoryId));
      return dec.charAt(0).toUpperCase() + dec.slice(1);
    } catch {
      return categoryId;
    }
  }, [categoryId]);

  useEffect(() => {
    let isMounted = true; // para no actualizar estado si el componente se desmonta

    setStatus("loading");
    setError(null);

    (async () => {
      try {
        // ahora llamamos a MockAPI, no al JSON local (NOTAS DE MOCKAPI)
        const list = await getProducts(categoryId);

        if (!isMounted) return;

        // getProducts ya recibe la categoryId, asi que no hace falta filtrar acá
        setProducts(Array.isArray(list) ? list : []);
        setStatus("success");
      } catch (e) {
        if (!isMounted) return;

        console.error(e);
        setError(e?.message || "Error inesperado");
        setStatus("error");
      }
    })();

    // cleanup del effect
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  // Titulo dinamico
  useEffect(() => {
    const base = "Gatilandia 🐱";
    // Priorizamos categoria si existe; si no, usa el titulo pasado por props
    document.title = categoryId
      ? `${base} · ${catLabel}`
      : (titulo ? `${base} · ${titulo}` : base);
  }, [categoryId, catLabel, titulo]);

  return (
    <main className="ILC">
      <header className="ILC__header">
        <h2 className="ILC__title">{titulo}</h2>
        {catLabel && <span className="ILC__pill">{catLabel}</span>}
      </header>

      {status === "loading" && (
        <div className="ILC__status">
          <div className="ILC__skeleton" />
          <div className="ILC__skeleton" />
          <div className="ILC__skeleton" />
        </div>
      )}

      {status === "error" && (
        <p className="ILC__error" role="alert">
          ❌ {error}
        </p>
      )}

      {status === "success" &&
        (products.length ? (
          <ItemList lista={products} />
        ) : (
          <p className="ILC__empty">No encontramos productos en esta categoría.</p>
        ))}
    </main>
  );
};