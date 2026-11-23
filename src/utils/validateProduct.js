export function parseProductPrice(value) {
  return Number(String(value ?? "").trim().replace(",", "."));
}

export function validateProduct(values) {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  const rawPrice = String(values.price ?? "").trim();
  const price = parseProductPrice(rawPrice);

  if (!rawPrice) {
    errors.price = "Ingresá un precio";
  } else if (!Number.isFinite(price)) {
    errors.price = "El precio debe ser un número válido";
  } else if (price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  }

  if (!values.category?.trim()) {
    errors.category = "Seleccioná una categoría";
  }

  if ((values.description ?? "").trim().length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  }

  const imageUrl = (values.imageUrl ?? "").trim();

  if (!imageUrl) {
    errors.image = "Ingresá una URL de imagen";
  } else if (!isValidImageUrl(imageUrl)) {
    errors.image = "Usá una URL HTTPS o una ruta como /images/gato.webp";
  }

  return errors;
}

function isValidImageUrl(value) {
  if (value.startsWith("/images/")) {
    const imagePath = value.slice("/images/".length);

    return (
      /^[^\\%\s?#]+$/.test(imagePath) &&
      imagePath.split("/").every(
        (segment) => segment && segment !== "." && segment !== "..",
      )
    );
  }

  if (!/^https:\/\/[^/\\\s]/i.test(value) || /[\\\s]/.test(value)) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}