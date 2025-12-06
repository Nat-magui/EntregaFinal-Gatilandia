import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import ProductFormContainer from "./components/adminComponents/ProductFormContainer/ProductFormContainer.jsx";
import Login from "./components/Login/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

// Contextos
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./components/Toast/ToastProvider";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Otros componentes
import Loader from "./components/Loader/Loader.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

// Rutas ligeras
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer.jsx";

// Rutas pesadas: lazy
const ItemDetailContainer = lazy(() =>
  import("./components/ItemDetailContainer/ItemDetailContainer.jsx")
);
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastProvider>
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* RUTAS PUBLICAS (MainLayout: Header + Footer) */}
                  <Route element={<MainLayout />}>
                    <Route
                      path="/"
                      element={<ItemListContainer titulo="Gatilandia 🐱" />}
                    />
                    <Route
                      path="/category/:categoryId"
                      element={<ItemListContainer titulo="Productos" />}
                    />
                    <Route
                      path="/detail/:id"
                      element={<ItemDetailContainer />}
                    />

                    {/* Carrito protegido */}
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* RUTAS DE ADMIN (AdminLayout) */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Login />} />

                    <Route
                      path="altaproductos"
                      element={
                        <ProtectedRoute>
                          <ProductFormContainer />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* Alias directo a /login */}
                  <Route path="/login" element={<Login />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </ToastProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}