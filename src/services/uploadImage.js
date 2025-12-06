/**
 * Sube un archivo a ImgBB y devuelve la URL publica de la imagen.
 * Necesita la variable de entorno: VITE_IMGBB_API_KEY
 */
export async function uploadImage(file) {
  if (!file) {
    throw new Error("No se recibió ninguna imagen");
  }

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Falta configurar VITE_IMGBB_API_KEY para subir imágenes a ImgBB"
    );
  }

  // Leemos el archivo como base64
  const base64 = await readFileAsBase64(file);
  // readAsDataURL devuelve "data:image/xxx;base64,AAAA", nos quedamos con la parte base64
  const base64Data = base64.split(",")[1];

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", base64Data);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data = await res.json();
  const url = data?.data?.url;

  if (!url) {
    throw new Error("ImgBB no devolvió una URL válida");
  }

  return url;
}

// Ayuda interna del sistema agregado para fallas
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () =>
      reject(new Error("No se pudo leer el archivo de imagen"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
