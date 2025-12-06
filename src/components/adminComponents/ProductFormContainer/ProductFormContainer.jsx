import { useState } from "react";
import { createProduct } from "../../../services/products.js";
import { uploadImage } from "../../../services/uploadImage.js";
import { validateProduct } from "../../../utils/validateProduct.js";
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
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { success, error: showError, info } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const newFile = e.target.files?.[0] || null;
    setFile(newFile);
    // si subímos archivo, no necesitamos la URL manual
    if (newFile && values.imageUrl) {
      setValues((prev) => ({ ...prev, imageUrl: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateProduct(values, { hasFile: !!file });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      let finalImageUrl = values.imageUrl.trim();

      // ⬇️ NORMALIZAR PRECIO
      const rawPrice = String(values.price).trim().replace(",", ".");
      const numericPrice = Number(rawPrice);

      if (Number.isNaN(numericPrice)) {
        throw new Error("El precio no es válido. Revisalo 😉");
      }

      // Si hay archivo, intentamos subirlo a ImgBB
      if (file) {
        info("Subiendo imagen…");
        finalImageUrl = await uploadImage(file);
      }

      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        price: numericPrice,
        imageUrl: finalImageUrl || undefined,
      };

      const created = await createProduct(payload);

      success(
        `Producto "${created?.name || payload.name}" creado con éxito 🐾`
      );

      // Reseteo
      setValues(INITIAL_VALUES);
      setFile(null);
    } catch (err) {
      console.error(err);
      showError(err.message || "No se pudo crear el producto");
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
        {/* ====== Header interno ====== */}
        <div className="ProductForm__cardHeader">
          <h3 className="ProductForm__sectionTitle">Datos del producto</h3>
          <span className="ProductForm__pill">Nuevo</span>
        </div>

        {/* BLOQUE: datos básicos */}
        <div className="ProductForm__block">
          {/* Nombre */}
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

        {/* Precio + categoria */}
        <div className="ProductForm__field ProductForm__field--inline">
          <div>
            <label className="ProductForm__label">
              Precio (ARS)
              <input
                type="number"
                name="price"
                className="ProductForm__input"
                placeholder="18999.50"
                value={values.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                inputMode="decimal"  // tip: ayuda en mobile
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
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
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

        {/* Descripcion */}
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

        {/* ====== Seccion imagenes ====== */}
        <h3 className="ProductForm__sectionTitle ProductForm__sectionTitle--sub">
          Imágenes
        </h3>

        <div className="ProductForm__field ProductForm__field--image">
          <div className="ProductForm__imageCol">
            <label className="ProductForm__label">
              Imagen (archivo)
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="ProductForm__input ProductForm__input--file"
              />
            </label>
            <p className="ProductForm__hint">
              Podés subir una imagen desde tu PC (se envía a ImgBB).
            </p>
          </div>

          <div className="ProductForm__imageCol">
            <label className="ProductForm__label">
              URL de imagen (alternativa)
              <input
                type="url"
                name="imageUrl"
                className="ProductForm__input"
                placeholder="/images/cat-food-premium-adulto-3kg.webp o URL completa"
                value={values.imageUrl}
                onChange={handleChange}
                disabled={!!file}
              />
            </label>
            <p className="ProductForm__hint">
              Si no querés usar ImgBB, podés pegar acá una URL (por ejemplo una
              imagen del propio proyecto).
            </p>
          </div>
        </div>

        {errors.image && (
          <p
            className="ProductForm__error ProductForm__error--image"
            role="alert"
          >
            {errors.image}
          </p>
        )}

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