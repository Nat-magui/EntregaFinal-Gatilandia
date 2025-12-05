import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__inner">
        {/* Nav queda fuera de <Routes> porque lo renderiza el Header */}
        <Nav />
      </div>
    </header>
  );
};
