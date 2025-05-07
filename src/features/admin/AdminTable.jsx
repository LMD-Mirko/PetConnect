// Mascotas.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, message, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  AppstoreOutlined,
  NumberOutlined,
  FontSizeOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AddModal from "./modals/AddModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import "../../css/panelAd.css";
import NotificacionCustom from "../../components/NotificacionCustom";
import Navbar from "../../components/Navbar";

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [notif, setNotif] = useState({
    visible: false,
    tipo: "success",
    mensaje: "",
    descripcion: "",
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    // Configura el contenedor de notificaciones para que aparezca centrado arriba
    notification.config({
      placement: "top",
      top: 80,
      rtl: false,
      duration: 2,
    });
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://web-production-aea20.up.railway.app/api/mascotas"
      );
      if (res.data && res.data.success) {
        setMascotas(res.data.data);
      } else {
        message.error("Error al obtener mascotas");
      }
    } catch (err) {
      message.error("No se pudo conectar con la API");
    }
    setLoading(false);
  };

  function resaltarCoincidencia(texto, busqueda) {
    if (!busqueda) return texto;
    const partes = String(texto).split(new RegExp(`(${busqueda})`, "gi"));
    return partes.map((parte, i) =>
      parte.toLowerCase() === busqueda.toLowerCase() ? (
        <span key={i} style={{ background: "#ffe082", fontWeight: 600 }}>
          {parte}
        </span>
      ) : (
        parte
      )
    );
  }

  const mascotasFiltradas = mascotas.filter((m) => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return true;
    const campos = [
      m.nombre,
      m.raza,
      m.edad,
      m.tamaño,
      m.ubicacion,
      m.estado,
      m.personalidad,
    ];
    return campos.some((c) => c && String(c).toLowerCase().includes(texto));
  });

  // Estilo personalizado de las celtas de la tabla
  const cellStyle = {
    fontSize: "0.95rem",
    padding: "16px 12px",
    color: "#1a237e",
    transition: "all 0.3s ease",
    borderBottom: "1px solid #e8eaf6",
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
      render: (text) => (
        <b
          style={{
            color: "#3f51b5",
            background: "#e8eaf6",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "0.9rem",
          }}
        >
          {resaltarCoincidencia(text, busqueda)}
        </b>
      ),
      onCell: () => ({ style: { ...cellStyle, fontWeight: 600 } }),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      render: (text, record) => (
        <span style={{ fontWeight: 500, color: "#283593" }}>
          {resaltarCoincidencia(text, busqueda)}
        </span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Raza",
      dataIndex: "raza",
      key: "raza",
      align: "center",
      render: (text, record) => (
        <span>{resaltarCoincidencia(text, busqueda)}</span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Edad",
      dataIndex: "edad",
      key: "edad",
      align: "center",
      render: (text, record) => (
        <span>{resaltarCoincidencia(text, busqueda)}</span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Tamaño",
      dataIndex: "tamaño",
      key: "tamaño",
      align: "center",
      render: (text, record) => (
        <span>{resaltarCoincidencia(text, busqueda)}</span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
      key: "ubicacion",
      align: "center",
      render: (text, record) => (
        <span>{resaltarCoincidencia(text, busqueda)}</span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      render: (text, record) => (
        <span>{resaltarCoincidencia(text, busqueda)}</span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Personalidad",
      dataIndex: "personalidad",
      key: "personalidad",
      align: "center",
      render: (text, record) => (
        <span>{resaltarCoincidencia(text, busqueda)}</span>
      ),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Acciones",
      key: "acciones",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Editar" placement="top">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              type="primary"
              style={{
                background: "#3f51b5",
                border: "none",
                boxShadow: "0 2px 8px rgba(63, 81, 181, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#283593",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
                },
              }}
              onClick={() => {
                setSelectedMascota(record);
                setEditVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Eliminar" placement="top">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              style={{
                background: "#fff",
                borderColor: "#ff4d4f",
                boxShadow: "0 2px 8px rgba(255, 77, 79, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#ff4d4f",
                  borderColor: "#ff4d4f",
                  color: "#fff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(255, 77, 79, 0.3)",
                },
              }}
              onClick={() => {
                setSelectedMascota(record);
                setDeleteVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const mostrarNotif = (tipo, mensaje, descripcion) => {
    setNotif({ visible: true, tipo, mensaje, descripcion });
  };

  const handleAddSuccess = () => {
    setAddVisible(false);
    fetchMascotas();
    mostrarNotif("success", "Agregado correctamente", "");
  };
  const handleEditSuccess = () => {
    setEditVisible(false);
    fetchMascotas();
    mostrarNotif("success", "Editado correctamente", "");
  };

  return (
    <div
      className="main-container"
      style={{
        background: "linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)",
      }}
    >
      <Navbar />
      <NotificacionCustom
        visible={notif.visible}
        tipo={notif.tipo}
        mensaje={notif.mensaje}
        descripcion={notif.descripcion}
        onClose={() => setNotif((n) => ({ ...n, visible: false }))}
        duracion={2200}
      />
      {/* Tabla de mascotas */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "32px 24px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2
                style={{
                  color: "#1a237e",
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: 1,
                  fontSize: "2rem",
                  textTransform: "uppercase",
                }}
              >
                Panel de Mascotas
              </h2>
              <p style={{ color: "#5c6bc0", margin: 0, fontSize: "1.1rem" }}>
                Gestiona el registro de mascotas en adopción
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative" }}>
                <SearchOutlined
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#5c6bc0",
                    fontSize: 20,
                  }}
                />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar mascotas..."
                  style={{
                    width: 280,
                    padding: "12px 16px 12px 44px",
                    borderRadius: 12,
                    border: "2px solid #e8eaf6",
                    fontSize: "1rem",
                    backgroundColor: "white",
                    color: "#1a237e",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(63, 81, 181, 0.08)",
                    "&:hover": {
                      borderColor: "#c5cae9",
                      boxShadow: "0 4px 12px rgba(63, 81, 181, 0.12)",
                    },
                    "&:focus": {
                      outline: "none",
                      borderColor: "#3f51b5",
                      boxShadow: "0 4px 12px rgba(63, 81, 181, 0.16)",
                    },
                    "&::placeholder": {
                      color: "#9fa8da",
                      opacity: 0.8,
                    },
                  }}
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda("")}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#e8eaf6",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#3f51b5",
                      fontSize: 16,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "#c5cae9",
                      },
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{
                  fontWeight: 600,
                  borderRadius: 12,
                  padding: "0 24px",
                  height: 48,
                  fontSize: "1.1rem",
                  background: "#3f51b5",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "#283593",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(63, 81, 181, 0.3)",
                  },
                }}
                onClick={() => setAddVisible(true)}
              >
                Agregar mascota
              </Button>
            </div>
          </div>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={mascotasFiltradas.map((m) => ({ ...m, key: m.id }))}
              loading={loading}
              bordered
              pagination={{ pageSize: 8, position: ["bottomCenter"] }}
              style={{
                background: "white",
                borderRadius: 20,
                padding: 0,
                minWidth: 900,
                boxShadow: "0 12px 28px rgba(63, 81, 181, 0.12)",
                overflow: "hidden",
                border: "1px solid #e8eaf6",
              }}
              scroll={{ x: true }}
              rowClassName={() => "ant-table-row-custom"}
              title={() => null}
              className="ant-table-blue-header"
              onRow={(record) => ({
                style: {
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                },
              })}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        background: "#3f51b5",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "1rem",
                        padding: "20px 12px",
                        transition: "all 0.3s ease",
                        borderBottom: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    />
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
      {/* Modales CRUD */}
      <AddModal
        visible={addVisible}
        onClose={() => setAddVisible(false)}
        onSuccess={handleAddSuccess}
        onNotify={mostrarNotif}
      />
      <EditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        mascota={selectedMascota}
        onSuccess={handleEditSuccess}
        onNotify={mostrarNotif}
      />
      <DeleteModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        mascota={selectedMascota}
        onSuccess={fetchMascotas}
        onNotify={mostrarNotif}
      />
    </div>
  );
};

export default Mascotas;
