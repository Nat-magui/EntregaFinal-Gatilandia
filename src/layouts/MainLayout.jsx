import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="MainLayout">
      <Header />
      <main className="MainLayout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}