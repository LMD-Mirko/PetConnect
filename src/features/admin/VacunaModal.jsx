// src/components/VacunasPanel.js
import React, { useState, useEffect } from 'react';
import '../../css/MascotasPanelEstilos.css';
import '../../css/PetCardEstilos.css'; // Estilos para la tarjeta originales
import '../../css/panelAd.css';
import Navbar from '../../components/Navbar';

const MascotasPanel = () => {
  const PetCard = ({ nombre, raza, ubicacion, vacunasNecesarias, efecto, onClick }) => {
    return (
      <div className={`pet-card ${efecto}`} onClick={onClick}>
        <div className="pet-info">
          <h3 className="pet-name">{nombre}</h3>
          <p className="pet-breed">Raza: {raza}</p>
          {ubicacion && <p className="pet-location">📍 {ubicacion}</p>}
          {vacunasNecesarias && vacunasNecesarias.length > 0 && (
            <div className="pet-vaccines">
              <p className="pet-vaccines-title">Necesita:</p>
              <ul className="pet-vaccines-list">
                {vacunasNecesarias.map((vacuna, index) => (
                  <li key={index}>{vacuna}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await fetch('https://web-production-aea20.up.railway.app/api/mascotas');
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const json = await response.json();

        const mascotasFiltradas = json.data
          .filter(m => m.vacunado === 0 || m.desparasitado === 0)
          .map(mascota => {
            const vacunas = [];
            if (mascota.vacunado === 0) vacunas.push('Vacunación');
            if (mascota.desparasitado === 0) vacunas.push('Desparasitación');

            let efecto = '';
            if (vacunas.length === 1) efecto = 'hover-leve';
            if (vacunas.length === 2) efecto = 'hover-rojo';

            return {
              ...mascota,
              vacunasNecesarias: vacunas,
              efecto
            };
          });

        setMascotas(mascotasFiltradas);
      } catch (error) {
        console.error('Error al obtener los datos de las mascotas:', error);
      }
    };
    fetchMascotas();
  }, []);

  return (
    <div className="mascotas-panel-container">
      <Navbar />

      {/* Estilos solo para efectos hover */}
      <style>
        {`
          .hover-leve:hover {
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
            transition: all 0.3s ease;
          }

          .hover-rojo:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
            transition: all 0.3s ease;
            border: 2px solid red;
            background-color: #ffe5e5;
          }
        `}
      </style>

      <div className="mascotas-panel-content">
        <h1>PANEL DE MASCOTAS</h1>
        <p className="panel-description">Gestión de Mascotas que necesitan atención inmediata.</p>
        <div className="mascotas-grid-nuevo">
          {mascotas.map((mascota) => (
            <PetCard
              key={mascota.id}
              nombre={mascota.nombre}
              raza={mascota.raza}
              ubicacion={mascota.ubicacion}
              vacunasNecesarias={mascota.vacunasNecesarias}
              efecto={mascota.efecto}
              onClick={() => console.log(`Ver detalles de ${mascota.nombre}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MascotasPanel;
