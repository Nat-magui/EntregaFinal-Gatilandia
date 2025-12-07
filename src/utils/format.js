export const ars = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(Number(n || 0));

export const normalizeProd = (p = {}) => {
  const title = p.title ?? p.name ?? "Producto";

  // 👉 siempre priorizamos imageUrl (que es lo que tiene MockAPI)
  const rawImage =
    p.imageUrl ||
    p.thumbnail ||
    p.image ||
    p.img ||
    "";

  const image =
    (rawImage || "").toString().trim() || "/images/placeholder.jpg";

  const price = Number(p.price ?? 0);

  return { ...p, title, image, price };
};
