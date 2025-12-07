// utils/assetPath.js
export function assetPath(path = "") {
  if (!path) return "/images/placeholder.jpg";

  const raw = path.toString().trim();

  // 1) Si ya es una URL absoluta (http/https), la dejamos tal cual
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // 2) Para rutas locales, usamos BASE_URL pero asegurando barra inicial
  //    Ej: raw = "/images/foo.webp"  -> clean = "images/foo.webp"
  const clean = raw.replace(/^\/+/, "");

  const base = import.meta.env.BASE_URL || "/";

  // Normalizamos el base: siempre termina en "/"
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  // Resultado final SIEMPRE ABSOLUTO:
  // - en dev / Vercel (base = "/")        -> "/images/foo.webp"
  // - en GitHub Pages (base="/EntregaFinal-Gatilandia/")
  //   -> "/EntregaFinal-Gatilandia/images/foo.webp"
  return `${normalizedBase}${clean}`;
}