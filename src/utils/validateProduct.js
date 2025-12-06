export function validateProduct(values, { hasFile = false } = {}) {
  const errors = {};

  // === Nombre ===
  if (!values.name || !values.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  // === Precio (acepta 1234,56 o 1234.56) ===
  const rawPrice = String(values.price ?? "")
    .trim()
    .replace(",", ".");

  const priceNum = Number(rawPrice);

  if (!rawPrice) {
    errors.price = "Ingresá un precio";
  } else if (Number.isNaN(priceNum)) {
    errors.price = "El precio debe ser un número válido";
  } else if (priceNum <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  }

  // === Categoria ===
  if (!values.category || !values.category.trim()) {
    errors.category = "Seleccioná una categoría";
  }

  // === Descripcion ===
  if (!values.description || values.description.trim().length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  }

  // === Imagen: archivo o URL ===
  const url = (values.imageUrl || "").trim();
  if (!hasFile && !url) {
    errors.image = "Agregá una imagen o una URL de imagen";
  }

  return errors;
}