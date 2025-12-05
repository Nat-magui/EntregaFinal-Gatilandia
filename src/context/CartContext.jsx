import { createContext, useContext, useMemo, useState, useEffect } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Cargar desde localStorage al iniciar
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  // Guardar cada cambio
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const i = prev.findIndex((p) => String(p.id) === String(product.id));
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: (copy[i].qty ?? 1) + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((p) => String(p.id) !== String(id)));
  }

  function clear() {
    setItems([]);
  }

  const totalQty = useMemo(
    () => items.reduce((acc, p) => acc + (p.qty ?? 1), 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, p) => acc + (p.qty ?? 1) * (p.price ?? 0), 0),
    [items]
  );

  function getTotalItems() {
    return totalQty;
  }

  const value = { items, addItem, removeItem, clear, totalQty, totalPrice, getTotalItems };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext debe usarse dentro de CartProvider");
  return ctx;
}
