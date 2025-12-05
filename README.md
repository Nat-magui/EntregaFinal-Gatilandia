
# 🐈 Gatilandia – Tienda de productos para gatos

Proyecto final de React del curso **Talento Tech – Desarrollo Frontend con JavaScript**.  
Gatilandia es un pequeño e-commerce ficticio de productos para gatos que permite:

- Navegar por un catálogo de productos.
- Filtrar por categorías.
- Ver el detalle de cada producto.
- Agregar ítems al carrito de compras.
- Simular un login de administrador y proteger rutas.

> 💡 Es un proyecto educativo, sin fines comerciales. La marca y el logo de “Gatilandia” son ficticios.

---

## ✨ Funcionalidades principales

- **Catálogo de productos**
  - Listado principal de productos en la página de inicio.
  - Filtro por categoría desde la navegación: `Alimentos`, `Juguetes`, `Higiene`, `Accesorios`.
  - Datos obtenidos desde una API Mock (MockAPI).

- **Detalle de producto**
  - Ruta dinámica `/detail/:id`.
  - Muestra imagen, nombre, descripción y precio del producto.
  - Posibilidad de sumar el producto al carrito desde el detalle.

- **Carrito de compras**
  - Agregar productos desde el listado y el detalle.
  - Ver cantidad total de productos en el ícono del carrito.
  - Listado de productos seleccionados, cantidades y total.
  - El carrito está manejado con **Context** para poder usarlo en toda la app.

- **Autenticación simulada**
  - Pantalla de **login** con formulario estilizado.
  - Autenticación manejada con **AuthContext** (sin backend real).
  - Usuario demo:
    - Usuario: `admin` **o** `admin@example.com`
    - Contraseña: `1234`
  - Sesión guardada en `localStorage` durante la navegación.

- **Rutas protegidas**
  - El carrito (`/cart`) es una **ruta protegida**.
  - Si el usuario no está logueado, se lo redirige a `/login`.
  - Luego del login se lo devuelve a la página que intentó visitar.

- **Diseño**
  - Diseño responsive y limpio, inspirado en interfaces modernas de e-commerce.
  - Header con navegación y logo de Gatilandia.
  - Cards de productos con imagen, título, descripción corta y precio.

---

## 🧱 Tecnologías utilizadas

- [React](https://react.dev/) (con Vite)
- [React Router DOM](https://reactrouter.com/)
- Context API para:
  - `CartContext` (carrito)
  - `AuthContext` (autenticación)
- CSS puro (componentes estilizados con archivos `.css`)
- [MockAPI](https://mockapi.io/) para simular API REST (`GET /products`)
- JavaScript (ES6+)

---

## 📂 Estructura general del proyecto

```text
src/
  components/
    Nav/
      Nav.jsx
      Nav.css
    ItemListContainer/
      ItemListContainer.jsx
      ItemListContainer.css
    ItemList/
      ItemList.jsx
      ItemList.css
    Item/
      Item.jsx
      Item.css
    ItemDetailContainer/
      ItemDetailContainer.jsx
      ItemDetailContainer.css
    ItemDetail/
      ItemDetail.jsx
      ItemDetail.css
    Cart/
      Cart.jsx
      Cart.css
    Login/
      Login.jsx
      Login.css
  context/
    CartContext.jsx
    AuthContext.jsx
  services/
    products.js
  App.jsx
  main.jsx

public/
  images/          # Imágenes de los productos (formato .webp)
  logo-gatilandia.png
````

---

## 🌐 API de productos (MockAPI)

Los productos se obtienen desde MockAPI con la URL:

```txt
https://6932e537e5a9e342d271399b.mockapi.io/products
```

Cada producto tiene esta estructura básica:

```json
{
  "id": "1",
  "name": "Alimento seco premium gato adulto 3kg",
  "price": 18999,
  "category": "alimentos",
  "description": "Balanceado premium con taurina y omega 3/6 para gatos adultos.",
  "imageUrl": "/images/cat-food-premium-adulto-3kg.webp"
}
```

* `category` se usa para filtrar en las rutas:

  * `/category/alimentos`
  * `/category/juguetes`
  * `/category/higiene`
  * `/category/accesorios`
* `imageUrl` apunta a archivos dentro de `public/images`.

El acceso a la API está encapsulado en `src/services/products.js` con funciones como:

* `getProducts()` – obtiene el listado completo.
* `getProductById(id)` – obtiene un producto específico.

---

## 🔐 Autenticación demo

La autenticación está simulada en el front usando `AuthContext`.

* Usuario demo:

  * **Usuario:** `admin` *o* `admin@example.com`
  * **Contraseña:** `1234`
* Si las credenciales son válidas, se almacena un objeto usuario en `localStorage` bajo la key:

```txt
gatilandia_auth_v1
```

La ruta `/cart` está protegida y requiere estar logueado.
Si el usuario no tiene sesión activa y entra a `/cart`, se lo redirige a `/login`.

---

## 🧪 Rutas principales

* `/` → Home, listado de todos los productos.
* `/category/:categoryId`

  * `alimentos`, `juguetes`, `higiene`, `accesorios`.
* `/detail/:id` → Detalle de un producto.
* `/cart` → Carrito (ruta protegida).
* `/login` → Pantalla de login.

---

## 💻 Requisitos previos

* Node.js **>= 18** (recomendado)
* npm o pnpm (en este proyecto se usa npm en los ejemplos)

---

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/usuario/mi-repo-gatilandia.git
cd mi-repo-gatilandia
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

La aplicación suele abrirse en `http://localhost:5173/` (o el puerto que indique Vite).

4. Crear build de producción:

```bash
npm run build
```

5. Probar el build:

```bash
npm run preview
```

---

## ✅ Relación con las consignas del TP

Este proyecto cumple con los puntos principales solicitados en el trabajo práctico de React:

* Uso de **Create React App / Vite** y componentes funcionales.
* Navegación con **React Router** y **rutas dinámicas**.
* Componente de **lista** e **ItemDetail**.
* Manejo de estado con **hooks** (`useState`, `useEffect`, `useContext`).
* Consumo de datos desde una **API externa (MockAPI)**.
* Implementación de un **carrito de compras**.
* Manejo global de estado con **Context** (carrito y autenticación).
* **Rutas protegidas** y pantalla de login simulada.
* Estilos personalizados (CSS) y diseño responsive básico.

---

## 🚧 Posibles mejoras futuras

* Persistir el carrito en `localStorage`.
* Agregar cantidad de productos por ítem en el carrito.
* Agregar formulario de checkout y validaciones.
* Integrar un backend real con base de datos.
* Vista de administración para crear/editar productos directamente desde la app.

---

## 👩‍💻 Autora

Proyecto desarrollado por **Magalí Aldana Suárez**
para el curso **React – Talento Tech** (entrega final).

🐾 Gracias por visitar Gatilandia.
