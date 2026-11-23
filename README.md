# 🐈 Gatilandia

**[Demo en Vercel · despliegues del proyecto](https://github.com/Nat-magui/EntregaFinal-Gatilandia/deployments)**

<!-- Cuando el despliegue esté verificado, reemplazá el enlace de arriba por la URL pública de Vercel. -->

Gatilandia es una tienda ficticia de productos para gatos. Podés explorar el catálogo, filtrar por categoría, ver el detalle de un producto y completar el recorrido de compra desde el carrito. El proyecto se desarrolló como entrega final del curso **Desarrollo Frontend con JavaScript de Talento Tech**.

## Probá la tienda

1. Explorá el catálogo o elegí una categoría: Alimentos, Juguetes, Higiene o Accesorios.
2. Abrí un producto y agregalo al carrito.
3. Desde el carrito, ajustá la cantidad, revisá el subtotal y el total, y recargá la página para comprobar que se conservan los ítems en el mismo navegador.
4. Elegí **Finalizar compra** para ver la confirmación. El checkout es simulado y no procesa pagos.

## Ejecutá el proyecto en local

**Requisitos:** Git, Node.js 24 y pnpm 10.34.9.

```bash
git clone https://github.com/Nat-magui/EntregaFinal-Gatilandia.git
cd EntregaFinal-Gatilandia
pnpm install --frozen-lockfile
pnpm dev
```

Abrí la URL que indique Vite, habitualmente `http://localhost:5173/`. El catálogo usa MockAPI y requiere conexión a Internet.

Para compilar y probar el build de producción:

```bash
pnpm build
pnpm preview
```

En Windows, si PowerShell bloquea el script `pnpm.ps1`, usá `pnpm.cmd install --frozen-lockfile`, `pnpm.cmd run dev`, `pnpm.cmd run build` y `pnpm.cmd run preview`.

## Panel de administración

Entrá a `/login` con el usuario de prueba `admin` y la contraseña `1234`. La ruta `/admin/altaproductos` permite cargar un producto con nombre, precio, categoría, descripción e imagen.

- El precio está expresado en ARS. El formulario acepta decimales con coma o punto y exige un número finito mayor a cero.
- La imagen puede ser una URL directa HTTPS o una ruta `/images/archivo.webp` que corresponda a un archivo dentro de `public/images/`. Si usás ImgBB, subí la imagen desde su sitio y pegá el enlace directo en el formulario. Gatilandia funciona sin configurar una clave de ImgBB.
- El inicio de sesión se simula en el navegador. Las altas se guardan en una MockAPI compartida, así que los productos creados pueden aparecer en el catálogo de otros visitantes.

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Catálogo |
| `/category/:categoryId` | Productos de una categoría |
| `/detail/:id` | Detalle de un producto |
| `/cart` | Carrito |
| `/login` | Acceso de demostración |
| `/admin/altaproductos` | Alta de productos tras iniciar sesión |

## Tecnologías y estructura

- **React y Vite** para la interfaz y el build.
- **React Router** para la navegación y las rutas dinámicas.
- **Context API y localStorage** para la sesión de demostración y la persistencia del carrito.
- **MockAPI** para listar, consultar y dar de alta productos.
- **CSS por componente** para los estilos y **pnpm** para las dependencias.

| Archivo o carpeta | Responsabilidad |
| --- | --- |
| `src/components/` | Catálogo, detalle, carrito, login, formulario de alta y notificaciones |
| `src/context/` | Estado del carrito y de la sesión |
| `src/services/products.js` | Consultas y altas de productos en MockAPI |
| `src/utils/validateProduct.js` | Validación del formulario de alta |
| `public/images/` | Imágenes disponibles dentro del proyecto |
| `vercel.json` | Configuración para abrir directamente las rutas de la aplicación en Vercel |

Desarrollado por **Magalí Aldana Suárez**.
