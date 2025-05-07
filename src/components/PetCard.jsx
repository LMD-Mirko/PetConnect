import React from "react";
import "../css/mascotas.css";

const PetCard = ({ imagen_url, nombre, raza, onClick }) => {
  return (
    <div
      className="tarjeta"
      onClick={onClick}
      style={{ cursor: "pointer", transition: "box-shadow 0.2s" }}
    >
      <div className="imagen-mascota">
        {imagen_url ? (
          <img
            src={imagen_url}
            alt={nombre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/imgg/masc1.jpg";
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#eee",
              borderRadius: "12px",
            }}
          />
        )}
      </div>
      <h4>
        {nombre}{" "}
        <span role="img" aria-label="huella">
          🐾
        </span>
      </h4>
      <p>{raza}</p>
    </div>
  );
};

export default PetCard;
