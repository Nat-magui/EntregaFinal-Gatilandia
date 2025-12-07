import { useState } from "react";
import { useCartContext } from "../../context/CartContext.jsx";
import { ars, normalizeProd } from "../../utils/format";
import { useToast } from "../Toast/ToastProvider";
import { assetPath } from "../../utils/assetPath.js";
import "./ItemDetail.css";

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCartContext();
  const { success, info } = useToast();

  const [qty, setQty] = useState(1);

  const p = normalizeProd(detail);
  const prettyPrice = ars(p.price);
  const maxQty = Math.max(1, Number(p.stock ?? 9999));
  const canAdd = qty >= 1 && qty <= maxQty;

  const imgSrc = assetPath(
    p.image ||
    p.imageUrl ||
    detail.thumbnail ||
    detail.image ||
    "/images/placeholder.jpg"
  );


  function onChangeQty(v) {
    const n = Math.max(1, Math.min(maxQty, Number(v) || 1));
    setQty(n);
  }

  function handleAdd() {
    if (!canAdd) return;

    // 👉 Tomamos la mejor imagen disponible
    const mainImage =
      p.image ||
      p.imageUrl ||
      detail.thumbnail ||
      detail.image ||
      "";

    const productForCart = {
      ...p,
      thumbnail: mainImage,
      imageUrl: mainImage,
    };

    addItem(productForCart, qty);
    success(`Agregado: ${p.title} × ${qty}`);
  }

  function handleReset() {
    setQty(1);
    info("Cantidad restablecida");
  }

  return (
    <section className="ID__wrap">
      <div className="ID__media">
        <img
          className="ID__img"
          src={imgSrc}
          alt={`Detalle: ${p.title}`}
          loading="eager"
        />
      </div>

      <div className="ID__info">
        <h2 className="ID__title">🐾 {p.title}</h2>
        {p.brand && <p className="ID__brand">Marca: {p.brand}</p>}
        {p.category && <p className="ID__cat">Categoría: {p.category}</p>}
        {p.description && (
          <p className="ID__desc">{p.description}</p>
        )}

        <div className="ID__price">{prettyPrice}</div>
        <div className="ID__stock">
          {Number.isFinite(p.stock)
            ? `Stock: ${p.stock}`
            : "Stock disponible"}
        </div>

        <div className="ID__actions">
          <div className="Qty">
            <button
              className="Qty__btn"
              type="button"
              onClick={() => onChangeQty(qty - 1)}
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <input
              className="Qty__input"
              type="number"
              min={1}
              max={maxQty}
              value={qty}
              onChange={(e) => onChangeQty(e.target.value)}
              aria-label="Cantidad"
            />
            <button
              className="Qty__btn"
              type="button"
              onClick={() => onChangeQty(qty + 1)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <button
            className="Btn Btn--primary"
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
          >
            Agregar al carrito 🐈
          </button>

          <button
            className="Btn Btn--ghost"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};