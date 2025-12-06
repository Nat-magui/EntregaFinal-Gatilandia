import { createContext, useContext, useMemo, useRef, useState } from "react";
import "./Toast.css";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  function push(message, type = "info", { duration = 2500 } = {}) {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, type }]);
    // autocierre
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  }

  const api = useMemo(
    () => ({
      show: push,
      success: (m, o) => push(m, "success", o),
      info: (m, o) => push(m, "info", o),
      error: (m, o) => push(m, "error", o),
      remove: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    }),
    []
  );

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="Toast__wrap" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`Toast Toast--${t.type}`}>
            <span className="Toast__msg">{t.message}</span>
            <button
              className="Toast__close"
              onClick={() => api.remove(t.id)}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  // si no hay Provider, devolvemos no-ops
  if (!ctx) {
    const noop = () => {};
    return {
      show: noop,
      success: noop,
      info: noop,
      error: noop,
      remove: noop,
    };
  }
  return ctx;
}
