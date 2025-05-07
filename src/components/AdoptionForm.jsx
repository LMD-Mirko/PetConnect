import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  FaPaw,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdoptionForm = ({ pet }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_completo: "",
    email: "",
    direccion: "",
    telefono: "",
    tipo_vivienda: "",
    fecha_tramite: "",
    tiene_mascotas: "",
    motivo_adopcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/adopciones", {
        ...formData,
        mascota_id: pet.id,
      });
      alert("Solicitud enviada exitosamente");
      navigate("/mascotas");
    } catch (error) {
      alert("Error al enviar la solicitud");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="adoption-page">
      <Navbar />

      <div className="adoption-content">
        <div className="adoption-left">
          <div className="pet-card">
            <img src={pet.imagen_url} alt={pet.nombre} className="pet-img" />
            <h2>
              {pet.nombre} <FaPaw className="paw-icon" />
            </h2>
            <p className="breed">{pet.raza}</p>
          </div>
          <div className="shelter-location">
            <FaMapMarkerAlt className="location-icon" />
            <div>
              <strong>Sede Central PetConnect</strong>
              <br />
              Av. Las Mascotas 1234, Urb. Los Jardines,
              <br />
              Lima 41, Perú
            </div>
          </div>
        </div>

        <div className="adoption-right">
          <form onSubmit={handleSubmit} className="adopter-form">
            <h2>Información del adoptante</h2>
            <div className="form-group">
              <FaUser />
              <input
                type="text"
                name="nombre_completo"
                placeholder="Nombre completo"
                value={formData.nombre_completo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <FaMapMarkerAlt />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <FaPhone />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <FaHome />
              <select
                name="tipo_vivienda"
                value={formData.tipo_vivienda}
                onChange={handleChange}
                required
              >
                <option value="">Tipo de vivienda</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha de trámite</label>
              <input
                type="date"
                name="fecha_tramite"
                value={formData.fecha_tramite}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>¿Tienes otras mascotas?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="tiene_mascotas"
                    value="si"
                    checked={formData.tiene_mascotas === "si"}
                    onChange={handleChange}
                  />{" "}
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="tiene_mascotas"
                    value="no"
                    checked={formData.tiene_mascotas === "no"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="motivo_adopcion"
                placeholder="¿Por qué quieres adoptar?"
                value={formData.motivo_adopcion}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="cancel"
                onClick={() => navigate("/mascotas")}
              >
                Cancelar
              </button>
              <button type="submit" className="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .navbar {
          background: #12235B;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 36px;
          height: 70px;
          box-shadow: 0 4px 24px rgba(30,60,180,0.10), 0 1.5px 6px rgba(0,0,0,0.07);
          position: relative;
          z-index: 1000;
          border-bottom: 1.5px solid #dbeafe;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
          letter-spacing: 1px;
        }
        .nav-links {
          display: flex;
          gap: 20px;
        }
        .nav-links a {
          color: #fff;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.18s;
          border: 1.5px solid transparent;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .nav-links a:hover {
          background: rgba(255, 255, 255, 0.95);
          border: 1.5px solid #dbeafe;
          font-weight: bold;
        }
        .nav-links a.active {
          background: rgba(255, 255, 255, 0.95);
          border: 1.5px solid #fff;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(60,60,180,0.10);
        }
        .adoption-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f5f5f5;
        }
        .adoption-content {
          display: flex;
          gap: 48px;
          max-width: 1200px;
          width: 100%;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          padding: 48px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          margin: 40px auto;
        }
        .adoption-left {
          flex: 1;
          min-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          padding: 20px;
        }
        .pet-card {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          box-shadow: 0 12px 48px rgba(18, 35, 91, 0.12);
          padding: 32px 28px 24px 28px;
          text-align: center;
          width: 100%;
          max-width: 320px;
        }
        .pet-img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px #0001;
        }
        .pet-card h2 {
          font-size: 1.8rem;
          margin: 0 0 8px 0;
          color: #1976d2;
        }
        .paw-icon {
          color: #1976d2;
          margin-left: 8px;
          vertical-align: middle;
          font-size: 1.4rem;
        }
        .breed {
          color: #555;
          font-size: 1.2rem;
          margin-top: 4px;
        }
        .shelter-location {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 12px;
          box-shadow: 0 2px 8px #0001;
          padding: 24px;
          font-size: 1.1rem;
          color: #333;
          width: 100%;
          max-width: 320px;
        }
        .location-icon {
          color: #1976d2;
          font-size: 1.8rem;
          margin-top: 3px;
        }
        .shelter-location div {
          text-align: left;
        }
        .shelter-location strong {
          font-size: 1.2rem;
          color: #1976d2;
          display: block;
          margin-bottom: 8px;
        }
        .adoption-right {
          flex: 1.2;
          min-width: 350px;
        }
        .adopter-form {
          background: linear-gradient(145deg, #ffffff 0%, #f5f9ff 100%);
          border-radius: 28px;
          box-shadow: 0 12px 48px rgba(18, 35, 91, 0.12);
          padding: 48px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .adopter-form h2 {
          text-align: center;
          color: #1976d2;
          margin-bottom: 10px;
          font-size: 1.3rem;
        }
        .form-group {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 8px 24px rgba(18, 35, 91, 0.08);
        }
        .form-group label {
          min-width: 140px;
          color: #1976d2;
          font-weight: 500;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          border: none;
          outline: none;
          background: transparent;
          font-size: 1rem;
          flex: 1;
          padding: 6px 0;
        }
        .form-group textarea {
          min-height: 60px;
          resize: vertical;
        }
        .radio-group {
          display: flex;
          gap: 32px;
          margin-left: 10px;
        }
        .form-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 10px;
        }
        button.cancel {
          background: linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%);
          color: #444;
          border: none;
          border-radius: 8px;
          padding: 8px 22px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(18, 35, 91, 0.08);
          transition: background 0.2s;
        }
        button.cancel:hover {
          background: #bdbdbd;
        }
        button.submit {
          background: linear-gradient(145deg, #1a2e6c 0%, #12235B 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 22px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(18, 35, 91, 0.08);
          transition: background 0.2s;
        }
        button.submit:hover {
          background: #1976d2;
        }
        @media (max-width: 900px) {
          .adoption-content {
            flex-direction: column;
            padding: 24px;
            margin: 20px;
          }
          .adoption-left {
            align-items: center;
          }
          .navbar {
            padding: 0 20px;
          }
          .nav-links {
            gap: 10px;
          }
          .nav-links a {
            padding: 4px 8px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdoptionForm;
