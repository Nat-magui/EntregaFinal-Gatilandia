// src/utils/assetPath.js
export function assetPath(path) {
  if (!path) return "";

  // Si ya es absoluta (HTTP), la devolvemos tal cual
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";

  // Normalizamos para evitar dobles barras
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}