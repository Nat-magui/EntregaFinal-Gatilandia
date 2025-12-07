// utils/assetPath.js
export function assetPath(path = "") {
  if (!path) return "/images/placeholder.jpg";

  const raw = path.toString().trim();

  // 1) Si ya es una URL absoluta (http/https), la dejamos así
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // 2) Para rutas locales, usamos BASE_URL pero asegurando una barra inicial
  const clean = raw.replace(/^\/+/, ""); // saco barras / de adelante

  const base = import.meta.env.BASE_URL || "/";

  // normalizo base: siempre termina en "/"
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  // Resultado:
  // - en dev/Vercel => "/" + "images/..."  => "/images/..."
  // - en GitHub Pages (si algún día pones base="/EntregaFinal-Gatilandia/")
  //   => "/EntregaFinal-Gatilandia/images/..."
  return `${normalizedBase}${clean}`;
}