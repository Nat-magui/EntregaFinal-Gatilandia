import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";
import { ars, normalizeProd } from "../../utils/format";
import { useToast } from "../Toast/ToastProvider";
import "./Cart.css";

export default function Cart() {
  const { items, totalPrice, removeItem, clear } = useCartContext();
  const { info, success } = useToast();

  if (!items.length) {
    return (
      <main className="Cart">
        <h2 className="Cart__title">Tu carrito</h2>
        <div className="Cart__emptyBox">
          <div className="Cart__emoji" aria-hidden>🛍️</div>
          <p className="Cart__empty">Aún no agregaste productos.</p>
          <Link className="Btn Btn--primary" to="/">Ver productos</Link>
        </div>
      </main>
    );
  }

  function handleRemove(p) {
    removeItem(p.id);
    info(`Quitado: ${p.title}`);
  }

  function handleClear() {
    clear();
    info("Carrito vaciado");
  }

  function handleCheckout() {
    // Simulación de compra: mostramos toast y limpiamos
    success(`¡Compra realizada! Total ${ars(totalPrice)} 🙌`);
    clear();
  }

  return (
    <main className="Cart">
      <header className="Cart__header">
        <h2 className="Cart__title">Tu carrito</h2>
        <p className="Cart__subtitle">
          {items.length} {items.length === 1 ? "producto" : "productos"}
        </p>
      </header>

      <ul className="Cart__list" role="list">
        {items.map((raw) => {
          const p = normalizeProd(raw);
          const lineTotal = (p.price || 0) * (p.qty || 1);

          return (
            <li key={p.id} className="Cart__row">
              <div className="Cart__thumb">
                <img
                  className="Cart__img"
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={92}
                  height={92}
                />
              </div>

              <div className="Cart__info">
                <strong className="Cart__name">{p.title}</strong>
                <span className="Cart__muted">Cantidad: {p.qty}</span>
              </div>

              <div className="Cart__unit">
                <span className="Cart__label">Precio</span>
                <span className="Cart__num">{ars(p.price)}</span>
              </div>

              <div className="Cart__line">
                <span className="Cart__label">Subtotal</span>
                <span className="Cart__num Cart__num--strong">{ars(lineTotal)}</span>
              </div>

              <div className="Cart__actions">
                <button
                  className="Btn"
                  onClick={() => handleRemove(p)}
                  aria-label={`Quitar ${p.title} del carrito`}
                >
                  Quitar
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="Cart__summary" aria-label="Resumen de compra">
        <div className="Cart__sumRow">
          <span>Productos</span>
          <span className="Cart__num">{items.length}</span>
        </div>
        <div className="Cart__sumRow Cart__sumRow--total">
          <span>Total</span>
          <strong className="Cart__num">{ars(totalPrice)}</strong>
        </div>
        <div className="Cart__sumActions">
          <button className="Btn Btn--ghost" onClick={handleClear}>Vaciar</button>
          <button className="Btn Btn--primary" onClick={handleCheckout}>
            Finalizar compra
          </button>
        </div>
        <p className="Cart__tiny">Los precios incluyen IVA. Envío se calcula en el checkout.</p>
      </aside>
    </main>
  );
}
