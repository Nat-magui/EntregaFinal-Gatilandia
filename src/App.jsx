import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Login from "./components/Login/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


// Contexto + layout
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastProvider } from "./components/Toast/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Rutas ligeras
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";

// Rutas pesadas: lazy
const ItemDetailContainer = lazy(() => import("./components/ItemDetailContainer/ItemDetailContainer"));
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastProvider>
            <Header />
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<ItemListContainer titulo="Gatilandia 🐱" />} />
                  <Route path="/category/:categoryId" element={<ItemListContainer titulo="Productos" />} />
                  <Route path="/detail/:id" element={<ItemDetailContainer />} />

                  {/* 🔐 Carrito PROTEGIDO */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />

                  {/* 🧑‍💻 Login público */}
                  <Route path="/login" element={<Login />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>

              </Suspense>
            </ErrorBoundary>
            <Footer />
          </ToastProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
