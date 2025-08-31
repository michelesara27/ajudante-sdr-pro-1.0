import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">Ajudante SDR PRO</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            🏠 Início
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={location.pathname === "/projects" ? "active" : ""}
          >
            📋 Projetos
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className={location.pathname === "/chat" ? "active" : ""}
          >
            💬 Conversas
          </Link>
        </li>
        <li>
          <Link
            to="/admin"
            className={location.pathname === "/admin" ? "active" : ""}
          >
            ⚙️ Admin
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className={location.pathname === "/register" ? "active" : ""}
          >
            👤 Entrar
          </Link>
        </li>

        {/* Botão de Toggle do Tema */}
        <li>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Alternar tema"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
