import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { updateMascota } from "../../../api/mascotas";

const { Option } = Select;

const EditModal = ({ visible, onClose, mascota, onSuccess, onNotify }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (mascota) form.setFieldsValue(mascota);
  }, [mascota, form]);
  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.edad = Number(values.edad);
      values.vacunado = Number(values.vacunado);
      values.desparasitado = Number(values.desparasitado);
      await updateMascota(mascota.id, values);
      setTimeout(() => {
        onClose();
      }, 1800);
      onNotify && onNotify("success", "Editado correctamente", "");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al actualizar mascota";
      onNotify && onNotify("error", "Error al editar", msg);
    }
  };
  return (
    <Modal
      title="Editar Mascota"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      okText="Guardar"
      cancelText="Cancelar"
      centered
      width={420}
      bodyStyle={{ padding: 20 }}
      style={{ top: 40 }}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 370, margin: "0 auto" }}
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: "Ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="edad"
          label="Edad"
          rules={[{ required: true, message: "Ingrese la edad" }]}
        >
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item
          name="raza"
          label="Raza"
          rules={[{ required: true, message: "Ingrese la raza" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tamaño"
          label="Tamaño"
          rules={[{ required: true, message: "Seleccione el tamaño" }]}
        >
          <Select placeholder="Seleccione tamaño">
            <Option value="Pequeño">Pequeño</Option>
            <Option value="Mediano">Mediano</Option>
            <Option value="Grande">Grande</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="vacunado"
          label="¿Vacunado?"
          rules={[{ required: true, message: "Seleccione una opción" }]}
        >
          <Select placeholder="Vacunado?">
            <Option value={1}>Sí</Option>
            <Option value={0}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="desparasitado"
          label="¿Desparasitado?"
          rules={[{ required: true, message: "Seleccione una opción" }]}
        >
          <Select placeholder="Desparasitado?">
            <Option value={1}>Sí</Option>
            <Option value={0}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="personalidad"
          label="Personalidad"
          rules={[{ required: true, message: "Ingrese la personalidad" }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="ubicacion"
          label="Ubicación"
          rules={[{ required: true, message: "Ingrese la ubicación" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imagen_url"
          label="Imagen (URL/Base64)"
          rules={[{ required: true, message: "Ingrese la imagen" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: "Seleccione el estado" }]}
        >
          <Select placeholder="Seleccione estado">
            <Option value="Disponible">Disponible</Option>
            <Option value="Adoptado">Adoptado</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditModal;
