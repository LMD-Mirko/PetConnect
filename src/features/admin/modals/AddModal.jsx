import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { addMascota } from "../../../api/mascotas";

const { Option } = Select;

const AddModal = ({ visible, onClose, onSuccess, onNotify }) => {
  const [form] = Form.useForm();

  // Establecer valores iniciales cuando el modal se abre
  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        vacunado: 0,
        desparasitado: 0,
        estado: "Disponible",
      });
    }
  }, [visible, form]);

  const handleOk = async () => {
    try {
      let values = await form.validateFields();

      // Crear objeto con los datos exactos que espera el api backend
      const mascotaData = {
        nombre: values.nombre?.trim() || "",
        edad: Number(values.edad) || 0,
        raza: values.raza?.trim() || "",
        tamaño: values.tamaño?.trim() || "",
        vacunado: Number(values.vacunado) || 0,
        desparasitado: Number(values.desparasitado) || 0,
        personalidad: values.personalidad?.trim() || "",
        ubicacion: values.ubicacion?.trim() || "",
        imagen_url: values.imagen_url?.trim() || "",
        estado: values.estado?.trim() || "Disponible",
      };

      // Enviar datos al backend
      await addMascota(mascotaData);

      form.resetFields();
      onSuccess();
      setTimeout(() => {
        onClose();
      }, 1800);
      onNotify && onNotify("success", "Agregado correctamente", "");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al agregar mascota";
      onNotify && onNotify("error", "Error al agregar", msg);
    }
  };

  return (
    <Modal
      title="Agregar Mascota"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      okText="Agregar"
      cancelText="Cancelar"
      centered
      width={420}
      bodyStyle={{ padding: 20 }}
      style={{ top: 40 }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          estado: "Disponible",
          vacunado: 0,
          desparasitado: 0,
        }}
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
          <Select>
            <Option value="Pequeño">Pequeño</Option>
            <Option value="Mediano">Mediano</Option>
            <Option value="Grande">Grande</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="vacunado"
          label="¿Vacunado?"
          rules={[{ required: true, message: "Seleccione una opción" }]}
          initialValue={0}
        >
          <Select>
            <Option value={1}>Sí</Option>
            <Option value={0}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="desparasitado"
          label="¿Desparasitado?"
          rules={[{ required: true, message: "Seleccione una opción" }]}
          initialValue={0}
        >
          <Select>
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
          initialValue="Disponible"
        >
          <Select>
            <Option value="Disponible">Disponible</Option>
            <Option value="Adoptado">Adoptado</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
