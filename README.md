<div align="center">

# 🐈 Gatilandia

**Tienda de demostración para explorar productos para gatos y probar un recorrido de compra completo.**

Proyecto final de **Desarrollo Frontend con JavaScript · Talento Tech**.

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![React Router 7](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![pnpm 10](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

</div>

**[Probá Gatilandia en Vercel](https://entrega-final-gatilandia.vercel.app/)** · [Arranque local](#reproducir-gatilandia-localmente) · [Pruebas manuales](#pruebas-manuales)

## Navegación

- [Proyecto](#proyecto)
- [Recorrido de la tienda](#recorrido-de-la-tienda)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura y estructura](#arquitectura-y-estructura)
- [Rutas](#rutas)
- [Reproducir Gatilandia localmente](#reproducir-gatilandia-localmente)
- [Panel de administración](#panel-de-administración)
- [Integración con MockAPI](#integración-con-mockapi)
- [Pruebas manuales](#pruebas-manuales)
- [Despliegue](#despliegue)
- [Solución de problemas](#solución-de-problemas)
- [Autoría](#autoría)

## Proyecto

Gatilandia es una tienda ficticia de productos para gatos. La interfaz reúne un catálogo con categorías, páginas de detalle, un carrito que conserva el contenido al recargar y un panel para dar de alta productos. Los precios se muestran en pesos argentinos.

El checkout es una simulación. **Finalizar compra** muestra una confirmación y vacía el carrito. El flujo prescinde de pagos y registros de pedidos.

## Recorrido de la tienda

1. Abrí la demo y explorá las categorías **Alimentos**, **Juguetes**, **Higiene** y **Accesorios**.
2. Seleccioná un producto para ver su detalle y agregalo al carrito.
3. En **Carrito**, ajustá las cantidades y revisá el subtotal de cada producto y el total.
4. Recargá la página para comprobar que los ítems se mantienen en el mismo navegador.
5. Elegí **Finalizar compra** para ver la confirmación de la demo.

## Stack tecnológico

| Tecnología | Versión o entorno | Uso |
| --- | --- | --- |
| React y React DOM | 19 | Componentes, manejo de estado y renderizado. |
| React Router | 7 | Navegación, rutas dinámicas y acceso al panel. |
| Vite | 7 | Servidor de desarrollo y compilación del frontend. |
| CSS | Por componente | Estilos de la tienda y del panel de administración. |
| Context API y `localStorage` | Navegador | Estado del carrito y sesión de demostración. |
| MockAPI | Servicio externo | Listado, detalle y alta de productos. |
| Node.js y pnpm | Node.js 24 y pnpm 10.34.9 | Entorno de desarrollo y gestión de dependencias. |
| Vercel | Despliegue estático | Publicación de la demo y apertura de rutas directas. |

## Arquitectura y estructura

La aplicación es una SPA. `BrowserRouter` selecciona la pantalla según la URL. Los componentes de catálogo, detalle y alta usan el servicio de productos para comunicarse con MockAPI. Los contextos mantienen el carrito y la sesión de demostración en el navegador. El detalle, el carrito y la pantalla de ruta desconocida se cargan bajo demanda con `React.lazy`.

| Ubicación | Responsabilidad |
| --- | --- |
| [`src/App.jsx`](src/App.jsx) | Configuración de rutas, layouts y proveedores de estado. |
| [`src/components/`](src/components/) | Vistas de catálogo, detalle, carrito, login, alta y notificaciones. |
| [`src/layouts/`](src/layouts/) | Estructura visual de la tienda y del panel. |
| [`src/context/CartContext.jsx`](src/context/CartContext.jsx) | Cantidades, total y persistencia del carrito. |
| [`src/context/AuthContext.jsx`](src/context/AuthContext.jsx) | Inicio y cierre de sesión de demostración. |
| [`src/services/products.js`](src/services/products.js) | Operaciones de lectura y alta contra MockAPI. |
| [`src/utils/validateProduct.js`](src/utils/validateProduct.js) | Validación del precio y de los demás campos del alta. |
| [`public/images/`](public/images/) | Imágenes locales disponibles bajo `/images/`. |
| [`vercel.json`](vercel.json) | Reescrituras para servir recursos estáticos y resolver rutas de la SPA. |

El carrito usa la clave `cart` en `localStorage`. Al restaurarlo, comprueba que el valor sea un arreglo y normaliza precios y cantidades. Agregar el mismo ID acumula unidades en la misma fila. Al bajar una cantidad a cero, el producto se quita del carrito. La sesión de demostración se guarda por separado en `gatilandia_auth_v1`. Ambos datos quedan asociados al navegador y al origen, por lo que ejecutarlos en local y en Vercel produce sesiones y carritos independientes.

## Rutas

| Ruta | Acceso | Pantalla |
| --- | --- | --- |
| `/` | Público | Catálogo. |
| `/category/:categoryId` | Público | Listado filtrado por categoría. |
| `/detail/:id` | Público | Detalle del producto identificado por `id`. |
| `/cart` | Público | Productos agregados, cantidades y total. |
| `/login` y `/admin` | Público | Inicio de sesión de demostración. |
| `/admin/altaproductos` | Sesión de demostración | Formulario de alta. |
| Cualquier otra ruta | Público | Pantalla de página desconocida. |

## Reproducir Gatilandia localmente

Necesitás **Git**, **Node.js 24**, **pnpm 10.34.9** y conexión a Internet para consultar MockAPI. El flujo documentado arranca sin crear un archivo `.env`.

1. Cloná el repositorio e instalá las versiones del lockfile.

   ```bash
   git clone https://github.com/Nat-magui/EntregaFinal-Gatilandia.git
   cd EntregaFinal-Gatilandia
   pnpm install --frozen-lockfile
   ```

2. Iniciá el servidor y abrí la URL que indique Vite, habitualmente [http://localhost:5173/](http://localhost:5173/).

   ```bash
   pnpm dev
   ```

3. Para probar el build de producción en local, compilá y abrí la URL de previsualización que indique Vite.

   ```bash
   pnpm build
   pnpm preview
   ```

En Windows, si PowerShell bloquea `pnpm.ps1`, usá `pnpm.cmd install --frozen-lockfile`, `pnpm.cmd run dev`, `pnpm.cmd run build` y `pnpm.cmd run preview`.

## Panel de administración

1. Abrí `/login` e iniciá sesión con el usuario de demostración `admin` y la contraseña `1234`.
2. Entrá a `/admin/altaproductos` y completá los cinco campos.
3. Elegí **Guardar producto** para enviar el alta a MockAPI.

El control de acceso es una simulación del frontend. Los productos creados se guardan en un catálogo compartido y pueden aparecer para otras personas que usen la demo.

| Campo | Validación del formulario |
| --- | --- |
| Nombre | Obligatorio. |
| Precio | Número finito mayor a cero. Admite `1500,60` y `1500.60`. |
| Categoría | Selección de una de las opciones del formulario. |
| Descripción | Al menos 10 caracteres después de quitar los espacios de los extremos. |
| Imagen | URL directa HTTPS o ruta local bajo `/images/`. |

Para usar **ImgBB**, subí la imagen manualmente en su sitio y pegá su enlace directo HTTPS. Para usar una imagen del repositorio, elegí un archivo de `public/images/` y referencialo mediante su ruta pública, por ejemplo `/images/archivo.webp`. El formulario valida el formato de la ruta o URL. Que la imagen se muestre depende de que el recurso exista y sea accesible. Este flujo funciona sin configurar una clave de ImgBB.

## Integración con MockAPI

El frontend consulta el recurso `/products`. El contrato utilizado por la tienda está representado en [`src/services/products.js`](src/services/products.js).

| Operación | Petición | Uso |
| --- | --- | --- |
| Listar productos | `GET /products` | Mostrar el catálogo completo. |
| Filtrar por categoría | `GET /products?category=alimentos` | Mostrar los resultados de una categoría. |
| Consultar un producto | `GET /products/:id` | Cargar la página de detalle. |
| Crear un producto | `POST /products` | Guardar el alta desde el panel. |

El alta envía un objeto JSON con `name`, `price`, `category`, `description` e `imageUrl`. El precio se envía como número. MockAPI proporciona el ID que se usa en la ruta de detalle.

## Pruebas manuales

| Flujo | Qué hacer | Resultado esperado |
| --- | --- | --- |
| Catálogo y filtros | Abrí la tienda y elegí **Alimentos**. | Se carga el catálogo filtrado. |
| Detalle directo | Copiá la URL de un producto real, abrila en otra pestaña y recargá. | Se mantiene el detalle del mismo producto. |
| Carrito | Agregá una unidad del mismo producto desde el catálogo y otra desde el detalle. | Aparece una fila con cantidad 2. El subtotal refleja las dos unidades. |
| Persistencia | Aumentá la cantidad y recargá `/cart`. | Se conservan los productos, las cantidades y el total. |
| Checkout | Pulsá **Finalizar compra** con productos en el carrito. | Aparece la confirmación y se vacía el carrito. |
| Acceso al admin | Abrí `/admin/altaproductos` en una ventana privada. | La aplicación redirige a `/login`. |
| Validación de precio | En el alta, completá los demás campos y usá `1e309` como precio. | Se indica que el precio es inválido antes de enviar el producto. |
| Validación de imagen | Con el resto del formulario válido, intentá guardar sin imagen o con una URL `http://`. | Se muestra un error en el campo de imagen. |

Para probar solo la validación del alta, usá valores inválidos. Un alta válida modifica el catálogo compartido.

## Despliegue

Vercel sirve la salida estática `dist/`, que se genera con `pnpm build`. El archivo [`vercel.json`](vercel.json) incluye una reescritura a `index.html` para que React Router resuelva una ruta al abrirla directamente o al recargar. Después de publicar una versión, repetí en el dominio de producción las pruebas del detalle directo, el carrito y el acceso al admin. [Abrir Gatilandia en Vercel](https://entrega-final-gatilandia.vercel.app/)

## Solución de problemas

| Síntoma | Qué revisar |
| --- | --- |
| El catálogo muestra un error de carga | Confirmá la conexión a Internet y revisá en la pestaña **Red** del navegador si MockAPI responde. |
| Una imagen aparece rota | Abrí su URL directa en una pestaña. Para una ruta local, verificá que el archivo exista en `public/images/` y que coincidan las mayúsculas y la extensión. |
| Una ruta funciona desde el menú pero falla al recargar | Revisá que el despliegue incluya `vercel.json` y sirva la salida del build. |
| El carrito cambia al abrir otra URL base | Cada origen tiene su propio almacenamiento. Compará el dominio y el puerto de ambas pestañas. |
| `pnpm preview` no encuentra el build | Ejecutá `pnpm build` desde la raíz del repositorio y volvé a iniciar la previsualización. |

## Autoría

Desarrollado por **[Magalí Aldana Suárez](https://github.com/Nat-magui)** como entrega final de **Desarrollo Frontend con JavaScript · Talento Tech**.
