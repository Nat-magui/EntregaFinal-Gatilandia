// utils/assetPath.js
export function assetPath(path = "") {
  if (!path) return "/images/placeholder.jpg";

  const raw = path.toString().trim();

  // 1) Si ya es una URL absoluta (http/https), la dejamos así
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // 2) Si es relativa a /images, usamos BASE_URL para GitHub Pages / Vercel
  const base = import.meta.env.BASE_URL || "/";

  // quitamos una barra inicial para evitar //images
  const clean = raw.startsWith("/") ? raw.slice(1) : raw;

  return `${base}${clean}`;
}