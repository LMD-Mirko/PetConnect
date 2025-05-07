import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/login.css";
import "../css/home.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../features/auth/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login(formData)) {
      toast.success("¡Inicio de sesión exitoso!");
      navigate("/");
    } else {
      toast.error("Credenciales inválidas");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-content">
        <div className="login-card">
          <h2>Iniciar sesión</h2>
          <p>
            ¿Eres nuevo en este sitio?{" "}
            <NavLink to="/registro">Regístrate</NavLink>
          </p>
          <form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Correo Electrónico"
              className="mb-3"
              style={{ position: "relative" }}
            >
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <FaEnvelope />
              </span>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Contraseña"
              style={{ position: "relative" }}
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <FaLock />
              </span>
            </FloatingLabel>
            <button type="submit" className="login-button">
              Acceder
            </button>
          </form>
          <div className="login-divider">o</div>
          <button className="google-button" id="btn">
            <i className="fab fa-google"></i> Continuar con Google
          </button>
        </div>
        <div className="login-image">
          <img src="/imgg/perfil.png" alt="Imagen de Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
