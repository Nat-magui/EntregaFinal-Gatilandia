import { Link } from "react-router-dom";
import { ars, normalizeProd } from "../../utils/format";
import "./Item.css";

export const Item = (raw) => {
  const p = normalizeProd(raw);
  const prettyPrice = ars(p.price);

  return (
    <article className="Item" role="article">
      <div className="Item__imgWrap">
        <img
          className="Item__img"
          src={p.image}
          alt={`Producto para gatos: ${p.title}`}
          loading="lazy"
        />
      </div>

      <div className="Item__body">
        <h3 className="Item__title">🐱 {p.title}</h3>

        {p.description && (
          <p className="Item__desc" title={p.description}>
            {p.description}
          </p>
        )}

        <div className="Item__price">{prettyPrice}</div>

        {/* CTA opcional para usar fuera de la grilla */}
        {raw.showCTA && (
          <div className="Item__actions">
            <Link className="Btn Btn--outline" to={`/detail/${p.id}`}>
              Ver detalle
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};
