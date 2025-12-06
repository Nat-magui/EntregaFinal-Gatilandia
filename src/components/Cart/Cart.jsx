import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";
import { ars, normalizeProd } from "../../utils/format";
import { assetPath } from "../../utils/assetPath.js";
import { useToast } from "../Toast/ToastProvider";
import "./Cart.css";

export default function Cart() {
  const { items, totalPrice, removeItem, clear, updateItemQty } =
    useCartContext();
  const { info, success } = useToast();

  // Si no hay items, mostramos estado vacio
  if (!items.length) {
    return (
      <main className="Cart">
        <h2 className="Cart__title">Tu carrito</h2>
        <div className="Cart__emptyBox">
          <div className="Cart__emoji" aria-hidden>
            🛍️
          </div>
          <p className="Cart__emptyText">
            Tu carrito está vacío. Empezá agregando algo rico para tu michi.
          </p>
          <Link className="Btn Btn--primary" to="/">
            Ir al catálogo
          </Link>
        </div>
      </main>
    );
  }

  // Cantidad TOTAL de unidades
  const totalUnits = items.reduce((acc, raw) => {
    const p = normalizeProd(raw);
    return acc + (p.qty || 0);
  }, 0);

  function handleRemove(p) {
    removeItem(p.id);
    info(`Quitado: ${p.title}`);
  }

  function handleClear() {
    clear();
    info("Carrito vaciado");
  }

  function handleCheckout() {
    success(`¡Compra realizada! Total ${ars(totalPrice)} 🙌`);
    clear();
  }

  function handleDecrement(p) {
    const current = p.qty || 1;
    const next = current - 1;

    if (next <= 0) {
      removeItem(p.id);
      info(`Quitado: ${p.title}`);
    } else {
      updateItemQty(p.id, next);
    }
  }

  function handleIncrement(p) {
    const current = p.qty || 1;
    const next = current + 1;
    updateItemQty(p.id, next);
  }

  return (
    <main className="Cart">
      <header className="Cart__header">
        <h2 className="Cart__title">Tu carrito</h2>
        <p className="Cart__subtitle">
          {totalUnits} {totalUnits === 1 ? "producto" : "productos"}
        </p>
      </header>

      <section className="Cart__layout">
        <ul className="Cart__list" role="list">
          {items.map((raw) => {
            const p = normalizeProd(raw);
            const lineTotal = (p.price || 0) * (p.qty || 1);

            // Para que funcione en GitHub Pages
            const imgSrc = assetPath(
              p.image || p.imageUrl || p.thumbnail || "/images/placeholder.jpg"
            );

            return (
              <li key={p.id} className="Cart__row">
                <div className="Cart__thumb">
                  <img
                    className="Cart__img"
                    src={imgSrc}
                    alt={p.title}
                    loading="lazy"
                    width={92}
                    height={92}
                  />
                </div>

                <div className="Cart__info">
                  <strong className="Cart__name">{p.title}</strong>

                  {/* Control de cantidad */}
                  <div className="Cart__qtyRow">
                    <span className="Cart__muted">Cantidad:</span>
                    <div className="Cart__qtyControl">
                      <button
                        type="button"
                        className="Cart__qtyBtn"
                        onClick={() => handleDecrement(p)}
                        aria-label={`Disminuir cantidad de ${p.title}`}
                      >
                        −
                      </button>
                      <span className="Cart__qtyValue">{p.qty}</span>
                      <button
                        type="button"
                        className="Cart__qtyBtn"
                        onClick={() => handleIncrement(p)}
                        aria-label={`Aumentar cantidad de ${p.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="Cart__priceBlock">
                  <div className="Cart__line">
                    <span className="Cart__label">Precio</span>
                    <span className="Cart__num">{ars(p.price)}</span>
                  </div>

                  <div className="Cart__line">
                    <span className="Cart__label">Subtotal</span>
                    <span className="Cart__num Cart__num--strong">
                      {ars(lineTotal)}
                    </span>
                  </div>

                  <div className="Cart__actions">
                    <button
                      className="Cart__removeChip"
                      onClick={() => handleRemove(p)}
                      aria-label={`Quitar ${p.title} del carrito`}
                    >
                      🗑️ <span className="Cart__removeText">Quitar</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="Cart__summary" aria-label="Resumen de compra">
          <div className="Cart__sumRow">
            <span>Productos</span>
            <span className="Cart__num">{totalUnits}</span>
          </div>
          <div className="Cart__sumRow Cart__sumRow--total">
            <span>Total</span>
            <strong className="Cart__num">{ars(totalPrice)}</strong>
          </div>
          <div className="Cart__sumActions">
            <button className="Btn Btn--ghost" onClick={handleClear}>
              Vaciar
            </button>
            <button className="Btn Btn--primary" onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}