import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import "../css/home.css";

function Navbar() {
  const { user, logout } = useAuth();
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="logo">PetConnect</div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/mascotas"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Explorar mascotas
        </NavLink>
        <NavLink
          to="/petbot"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Petbot
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/panelAd"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Panel Administrativo
            </NavLink>
            <NavLink
              to="/vacunas"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Panel De Vacunas
            </NavLink>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <div
            className="auth-menu"
            onMouseEnter={() => setShowAuthMenu(true)}
            onMouseLeave={() => setShowAuthMenu(false)}
          >
            <button className="auth-button">Iniciar sesión</button>
            {showAuthMenu && (
              <div className="auth-menu-content">
                <NavLink to="/login">Iniciar sesión</NavLink>
                <NavLink to="/registro">Crear cuenta</NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
