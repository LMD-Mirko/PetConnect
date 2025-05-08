import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/petbot"

const PetInfoModal = ({ visible, onClose, mascota }) => {
  const navigate = useNavigate();
  if (!mascota) return null;

  // Utilidades para mostrar iconos y textos
  const check = (
    <span style={{ color: "#1bc47d", fontSize: 20, marginRight: 4 }}>✅</span>
  );
  const cross = (
    <span style={{ color: "#e74c3c", fontSize: 20, marginRight: 4 }}>❌</span>
  );

  return (
    <div className={`petinfo-modal-bg${visible ? " show" : ""}`}>
      <div className="petinfo-modal">
        <button className="petinfo-close" onClick={onClose}>
          ×
        </button>
        <div className="petinfo-content">
          <div className="petinfo-imgside">
            <div
              className="tarjeta petinfo-card"
              style={{ boxShadow: "none", margin: 0, background: "#f5f8ff" }}
            >
              <div className="imagen-mascota">
                {mascota.imagen_url ? (
                  <img
                    src={mascota.imagen_url}
                    alt={mascota.nombre}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
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
              <h4
                style={{ marginBottom: 0, color: "#001F54", fontWeight: 700 }}
              >
                {mascota.nombre}{" "}
                <span role="img" aria-label="huella">
                  🐾
                </span>
              </h4>
              <p style={{ marginTop: 6, color: "#555", fontWeight: 500 }}>
                {mascota.raza}
              </p>
            </div>
          </div>
          <div className="petinfo-details">
            <h2 className="petinfo-title">INFORMACIÓN</h2>
            <div className="petinfo-data">
              <div>
                <b>Nombre:</b> {mascota.nombre}{" "}
                <span role="img" aria-label="huella">
                  🐾
                </span>
              </div>
              <div>
                <b>Edad:</b> {mascota.edad}{" "}
                {mascota.edad === 1 ? "año" : "años"}
              </div>
              <div>
                <b>Raza:</b> {mascota.raza}
              </div>
              <div>
                <b>Tamaño:</b> {mascota.tamaño}
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Estado de salud:</b>
              </div>
              <div style={{ marginLeft: 12, marginBottom: 2 }}>
                {mascota.vacunado ? check : cross}Vacunado{" "}
                {mascota.desparasitado ? check : cross}Desparasitado
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Personalidad:</b>
              </div>
              <div style={{ marginLeft: 12, marginBottom: 2 }}>
                {mascota.personalidad || "No especificada."}
              </div>
              <div style={{ marginTop: 8 }}>
                <span role="img" aria-label="ubicacion">
                  📍
                </span>{" "}
                <b>Ubicación:</b> {mascota.ubicacion || "No especificada."}
              </div>
              {mascota.estado && (
                <div>
                  <b>Estado:</b> {mascota.estado}
                </div>
              )}
            </div>
            <div className="petinfo-btns">
              <button
                className="petinfo-adopt-btn"
                onClick={() => navigate(`/adopcion/${mascota.id}`)}
              >
                Solicitar adopción
              </button>
              <button
                className="petinfo-ia-btn"
                title="IA: Consejos personalizados"
                onClick={() => navigate('/petbot')} // Redirige a la ruta del Pet Bot
              >
                <span
                  role="img"
                  aria-label="estrella"
                  style={{ fontSize: 22, verticalAlign: "middle" }}
                >
                  ✨
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .petinfo-modal-bg {
          position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.35); display: none; align-items: center; justify-content: center;
        }
        .petinfo-modal-bg.show { display: flex; }
        .petinfo-modal {
          background: #fff; border-radius: 28px; max-width: 820px; width: 95vw; padding: 0; box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          position: relative; animation: fadeIn .2s;
        }
        .petinfo-close {
          position: absolute; right: 18px; top: 12px; font-size: 2rem; background: none; border: none; cursor: pointer; color: #222;
        }
        .petinfo-content {
          display: flex; flex-direction: row; gap: 56px; padding: 40px 48px 32px 36px;
        }
        .petinfo-imgside { flex: 1; min-width: 220px; display: flex; align-items: center; justify-content: center; }
        .petinfo-details {
          flex: 2; min-width: 320px; max-width: 420px;
          display: flex; flex-direction: column; justify-content: flex-start;
          align-items: flex-start;
          padding-right: 24px;
        }
        .petinfo-title {
          font-size: 2rem; font-weight: 800; color: #1a2340; margin-bottom: 18px; text-align: left; letter-spacing: 1px; width: 100%;
        }
        .petinfo-data {
          font-size: 1.13rem; color: #222; text-align: left; line-height: 1.7; font-family: 'Segoe UI', Arial, sans-serif;
          width: 100%;
        }
        .petinfo-btns {
          display: flex; flex-direction: row; gap: 16px; margin-top: 32px; align-items: center;
          width: 100%;
        }
        .petinfo-adopt-btn {
          background: #112266; color: #fff; border: none; border-radius: 24px; padding: 13px 36px; font-size: 1.13rem; font-weight: 600; cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10); transition: background 0.18s;
          margin-left: 0;
        }
        .petinfo-adopt-btn:hover { background: #1a2e6c; }
        .petinfo-ia-btn {
          background: linear-gradient(90deg, #3f51b5 0%, #6a82fb 100%);
          border: none; border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(60,60,180,0.13); color: #fff; font-size: 1.3rem; margin-left: 8px; cursor: pointer;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .petinfo-ia-btn:hover {
          box-shadow: 0 4px 16px rgba(60,60,180,0.18); transform: scale(1.08);
        }
        .petinfo-card {
          background: #f5f8ff !important;
        }
        @media (max-width: 700px) {
          .petinfo-content { flex-direction: column; gap: 16px; padding: 24px 8px; }
          .petinfo-title { font-size: 1.3rem; }
        }
      `}</style>
    </div>
  );
};

export default PetInfoModal;
