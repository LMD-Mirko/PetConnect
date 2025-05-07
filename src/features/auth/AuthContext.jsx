import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Crear cuenta predeterminada si no existen usuarios
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.length === 0) {
      const defaultUser = {
        email: "admin@gmail.com",
        password: "admin123",
        nombre: "Administrador",
        rol: "admin",
      };
      localStorage.setItem("users", JSON.stringify([defaultUser]));
    }

    // Cargar sesión actual si existe
    const loggedUser = localStorage.getItem("currentUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const login = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );

    if (user) {
      setUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === userData.email)) {
      return false;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
