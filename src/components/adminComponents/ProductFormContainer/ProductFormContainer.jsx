import { useState } from "react";
import { createProduct } from "../../../services/products.js";
import {
  parseProductPrice,
  validateProduct,
} from "../../../utils/validateProduct.js";
import { useToast } from "../../Toast/ToastProvider.jsx";
import "./ProductFormContainer.css";

const INITIAL_VALUES = {
  name: "",
  price: "",
  category: "",
  description: "",
  imageUrl: "",
};

const CATEGORY_OPTIONS = [
  { value: "alimentos", label: "Alimentos" },
  { value: "juguetes", label: "Juguetes" },
  { value: "accesorios", label: "Accesorios" },
  { value: "higiene", label: "Higiene" },
];

export default function ProductFormContainer() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { success, error: showError } = useToast();

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateProduct(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        price: parseProductPrice(values.price),
        imageUrl: values.imageUrl.trim(),
      };

      const created = await createProduct(payload);

      success(
        `Producto "${created?.name || payload.name}" creado con éxito 🐾`,
      );
      setValues(INITIAL_VALUES);
    } catch (error) {
      console.error(error);
      showError(error.message || "No se pudo crear el producto");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="ProductForm">
      <h2 className="ProductForm__title">Alta de productos</h2>
      <p className="ProductForm__subtitle">
        Completá los datos para sumar un nuevo producto a Gatilandia.
      </p>

      <form className="ProductForm__card" onSubmit={handleSubmit} noValidate>
        <div className="ProductForm__cardHeader">
          <h3 className="ProductForm__sectionTitle">Datos del producto</h3>
          <span className="ProductForm__pill">Nuevo</span>
        </div>

        <div className="ProductForm__block">
          <div className="ProductForm__field">
            <label className="ProductForm__label">
              Nombre
              <input
                type="text"
                name="name"
                className="ProductForm__input"
                placeholder="Alimento premium gato adulto 3kg"
                value={values.name}
                onChange={handleChange}
                required
              />
            </label>
            {errors.name && (
              <p className="ProductForm__error" role="alert">
                {errors.name}
              </p>
            )}
          </div>
        </div>

        <div className="ProductForm__field ProductForm__field--inline">
          <div>
            <label className="ProductForm__label">
              Precio (ARS)
              <input
                type="text"
                name="price"
                className="ProductForm__input"
                placeholder="18999,50"
                value={values.price}
                onChange={handleChange}
                inputMode="decimal"
                required
              />
            </label>
            {errors.price && (
              <p className="ProductForm__error" role="alert">
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <label className="ProductForm__label">
              Categoría
              <select
                name="category"
                className="ProductForm__input"
                value={values.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleccioná una opción</option>
                {CATEGORY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {errors.category && (
              <p className="ProductForm__error" role="alert">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        <div className="ProductForm__field">
          <label className="ProductForm__label">
            Descripción
            <textarea
              name="description"
              className="ProductForm__textarea"
              rows={4}
              placeholder="Descripción corta del producto, beneficios, etc."
              value={values.description}
              onChange={handleChange}
              required
            />
          </label>
          <p className="ProductForm__hint">
            Ideal: 1–3 frases claras sobre características y beneficios.
          </p>
          {errors.description && (
            <p className="ProductForm__error" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div className="ProductForm__field">
          <label className="ProductForm__label">
            URL de imagen
            <input
              type="text"
              name="imageUrl"
              className="ProductForm__input"
              placeholder="https://ejemplo.com/gato.webp o /images/gato.webp"
              value={values.imageUrl}
              onChange={handleChange}
              aria-describedby={
                errors.image ? "product-image-hint product-image-error" : "product-image-hint"
              }
              aria-invalid={Boolean(errors.image)}
              required
            />
          </label>
          <p id="product-image-hint" className="ProductForm__hint">
            Pegá una URL HTTPS o una ruta que empiece con /images/.
          </p>
          {errors.image && (
            <p id="product-image-error" className="ProductForm__error" role="alert">
              {errors.image}
            </p>
          )}
        </div>

        <div className="ProductForm__actions">
          <button
            type="submit"
            className="Btn Btn--primary ProductForm__submit"
            disabled={submitting}
          >
            {submitting ? "Guardando…" : "Guardar producto"}
          </button>
        </div>
      </form>
    </section>
  );
}