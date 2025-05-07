import React, { useEffect, useRef } from "react";
import { Alert } from "antd";

const estilos = {
  success: {
    border: "1.5px solid #b7eb8f",
    background: "#f6ffed",
    color: "#389e0d",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        style={{ marginRight: 12 }}
      >
        <circle cx="11" cy="11" r="11" fill="#b7eb8f" />
        <path
          d="M7 11.5l3 3 5-5"
          stroke="#389e0d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  info: {
    border: "1.5px solid #91d5ff",
    background: "#e6f7ff",
    color: "#096dd9",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        style={{ marginRight: 12 }}
      >
        <circle cx="11" cy="11" r="11" fill="#91d5ff" />
        <text
          x="11"
          y="16"
          textAnchor="middle"
          fontSize="13"
          fill="#096dd9"
          fontWeight="bold"
        >
          i
        </text>
      </svg>
    ),
  },
  warning: {
    border: "1.5px solid #ffe58f",
    background: "#fffbe6",
    color: "#d48806",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        style={{ marginRight: 12 }}
      >
        <circle cx="11" cy="11" r="11" fill="#ffe58f" />
        <path
          d="M11 7v5"
          stroke="#d48806"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="11" cy="16" r="1" fill="#d48806" />
      </svg>
    ),
  },
  error: {
    border: "1.5px solid #ffa39e",
    background: "#fff1f0",
    color: "#cf1322",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        style={{ marginRight: 12 }}
      >
        <circle cx="11" cy="11" r="11" fill="#ffa39e" />
        <path
          d="M8 8l6 6M14 8l-6 6"
          stroke="#cf1322"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

export default function NotificacionCustom({
  visible,
  tipo = "success",
  mensaje,
  descripcion,
  onClose,
  duracion = 2000,
}) {
  const notifRef = useRef();
  useEffect(() => {
    if (visible) {
      notifRef.current &&
        (notifRef.current.style.animation = "fadeInAntd 0.35s");
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duracion);
      return () => clearTimeout(timer);
    }
  }, [visible, duracion, onClose]);
  if (!visible) return null;
  return (
    <div
      ref={notifRef}
      style={{
        position: "fixed",
        top: 38,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        minWidth: 340,
        maxWidth: 440,
        animation: "fadeInAntd 0.35s",
      }}
    >
      <Alert
        message={mensaje}
        description={descripcion}
        type={tipo}
        showIcon
        closable
        onClose={onClose}
        style={{ fontSize: 16, fontWeight: 500 }}
      />
      <style>{`
        @keyframes fadeInAntd {
          from { opacity: 0; transform: translateY(-18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
