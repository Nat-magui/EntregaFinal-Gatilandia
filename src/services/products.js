// Esta es tu URL de MockAPI
const BASE_URL = "https://6932e537e5a9e342d271399b.mockapi.io/products";

// funcion interna para hacer fetch y manejar errores basicos
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Error al comunicarse con el servidor");
  }

  return res.json();
}

/**
 * Traer lista de productos.
 * Si viene una categoria, filtra por category.
 */
export async function getProducts(category) {
  let url = BASE_URL;

  if (category) {
    const encoded = encodeURIComponent(category);
    url += `?category=${encoded}`;
  }

  return fetchJSON(url);
}

/**
 * Traer UN producto por id.
 */
export async function getProductById(id) {
  if (!id) {
    throw new Error("Se requiere un id de producto");
  }

  const url = `${BASE_URL}/${encodeURIComponent(id)}`;
  return fetchJSON(url);
}

/**
 * Crear un producto nuevo en MockAPI.
 * product es un objeto con { name, price, category, description, imageUrl }
 */
export async function createProduct(product) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return res.json();
}
