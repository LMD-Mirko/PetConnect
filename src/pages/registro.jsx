// src/pages/registro.jsx - Camila Fuentes Rivera
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import "../css/registro.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../features/auth/AuthContext";
import Navbar from "../components/Navbar";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    if (register(formData)) {
      toast.success(`¡Registro exitoso! Bienvenido ${formData.nombre}`);
      navigate("/login");
    } else {
      toast.error("El correo electrónico ya está registrado");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="registro-content">
        <div className="registro-card">
          <h2>Regístrate</h2>
          <p>
            ¿Ya tienes un perfil personal?{" "}
            <NavLink to="/login">Iniciar sesión</NavLink>
          </p>
          <form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingName"
              label="Nombre"
              className="mb-3"
              style={{ position: "relative" }}
            >
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <FaUser />
              </span>
            </FloatingLabel>

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
              className="mb-3"
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

            <div className="terms-container mb-3 d-flex align-items-center justify-content-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="terms">
                Acepto los Términos y Condiciones
              </label>
            </div>

            <button type="submit" className="registro-button">
              Crear cuenta
            </button>
          </form>
          <div className="registro-divider">o</div>
          <button className="google-button" id="btn">
            <i className="fab fa-google"></i> Continuar con Google
          </button>
        </div>
        <div className="registro-image">
          <img src="/imgg/perfil.png" alt="Imagen de Registro" />
        </div>
      </div>
    </div>
  );
}

export default Registro;
