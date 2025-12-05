import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ lista = [] }) => {
  if (!lista.length) {
    return <p className="ItemList__empty">No hay productos para mostrar.</p>;
  }

  return (
    <section className="ItemList__grid">
      {lista.map((p) => (
        <Link
          key={p.id}
          to={`/detail/${p.id}`}
          className="ItemList__link"
          aria-label={`Ver detalle de ${p.title ?? p.name ?? "producto"}`}
        >
          <Item {...p} />
        </Link>
      ))}
    </section>
  );
};
