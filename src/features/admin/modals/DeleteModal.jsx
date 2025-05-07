import React from "react";
import { Modal } from "antd";
import { deleteMascota } from "../../../api/mascotas";

const DeleteModal = ({ visible, onClose, mascota, onSuccess, onNotify }) => {
  const handleOk = async () => {
    try {
      await deleteMascota(mascota.id);
      onNotify && onNotify("success", "Eliminado correctamente", "");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error al eliminar mascota:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al eliminar mascota";
      onNotify && onNotify("error", "Error al eliminar", msg);
    }
  };
  return (
    <Modal
      title="Eliminar Mascota"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Eliminar"
      okButtonProps={{ danger: true }}
      cancelText="Cancelar"
    >
      ¿Estás seguro que deseas eliminar la mascota <b>{mascota?.nombre}</b>?
    </Modal>
  );
};
export default DeleteModal;
