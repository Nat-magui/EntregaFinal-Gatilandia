export function assetPath(path = "") {
  // Si no pasaron nada, uso un placeholder
  if (!path) return "/images/placeholder.jpg";

  const raw = path.toString().trim();

  // 1) Si ya es URL absoluta (http/https), la dejo así
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // 2) A partir de acá asumimos rutas locales:
  //    - "images/foo.webp"
  //    - "/images/foo.webp"
  //    - "foo.webp"
  // Normalizo quitando barras iniciales
  const clean = raw.replace(/^\/+/, "");

  // 3) Devuelvo SIEMPRE una ruta absoluta desde raíz
  //    Esto en Vercel significa:
  //    https://entrega-final-gatilandia.vercel.app/ + images/...
  return `/${clean}`;
}
