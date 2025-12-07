import { Link } from "react-router-dom";
import { ars, normalizeProd } from "../../utils/format";
import { assetPath } from "../../utils/assetPath.js";
import "./Item.css";

export const Item = ({ showCTA, ...raw }) => {
  // Normalizamos el producto
  const p = normalizeProd(raw);
  const prettyPrice = ars(p.price);

  // Siempre tratamos de sacar la mejor imagen posible
  const imgSrc = assetPath(
    p.image ||
      p.imageUrl ||
      raw.thumbnail ||
      raw.image ||
      "/images/placeholder.jpg"
  );

  return (
    <article className="Item" role="article">
      <div className="Item__imgWrap">
        <img
          className="Item__img"
          src={imgSrc}
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

        {showCTA && (
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