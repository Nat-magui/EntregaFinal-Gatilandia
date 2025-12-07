// utils/assetPath.js
export function assetPath(path = "") {
  if (!path) return "/images/placeholder.jpg";

  const raw = path.toString().trim();

  // 1) Si ya es una URL absoluta (http/https), la dejamos así
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // 2) Para rutas locales, usamos BASE_URL pero asegurando una barra inicial
  const clean = raw.replace(/^\/+/, ""); // saco barras iniciales por prolijidad

  const base = import.meta.env.BASE_URL || "/";

  // Normalizo el base: siempre termina en "/"
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  // Ahora SIEMPRE vas a obtener algo tipo:
  // "/" + "images/..."  => "/images/..."
  // "/EntregaFinal-Gatilandia/" + "images/..." => "/EntregaFinal-Gatilandia/images/..."
  return `${normalizedBase}${clean}`;
}