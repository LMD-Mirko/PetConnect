# Plataforma Mascotas - Frontend
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" width="100" height="100" alt="React"/>  

</p>

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.5-purple.svg)
![React Router](https://img.shields.io/badge/React%20Router-7.5.3-green.svg)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-blue.svg)

Frontend de la Plataforma Mascotas, una aplicación web moderna y elegante construida con React para la gestión y adopción de mascotas.

## 🚀 Características

- Interfaz de usuario moderna y responsiva
- Navegación fluida con React Router
- Componentes reutilizables con React Bootstrap y Ant Design
- Carousel interactivo para mostrar mascotas
- **Notificaciones modernas y alertas con Ant Design**
- Diseño optimizado para todos los dispositivos

## 📋 Prerrequisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Area-de-Desarrollo-React-Jueves/Plataforma-Mascotas.git
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta las pruebas
- `npm run build`: Genera la versión de producción
- `npm run eject`: Expone la configuración de webpack (operación irreversible)

## 🏗️ Estructura del Proyecto

```
frontend/
├── public/          # Archivos estáticos
├── src/             # Código fuente
│   ├── components/  # Componentes reutilizables
│   ├── pages/       # Páginas de la aplicación
│   ├── features/    # Funcionalidades principales (CRUD, admin, etc)
│   └── App.js       # Componente principal
└── package.json     # Dependencias y scripts
```

## 📦 Dependencias Principales

- React 19.1.0
- Ant Design 5.x
- React Bootstrap 2.10.9
- React Router DOM 7.5.3
- Bootstrap 5.3.5
- React Slick 0.30.3
- Font Awesome 6.7.2

## 🔔 Notificaciones y Alertas (Ant Design)

El sistema de notificaciones utiliza el componente [`Alert`](https://ant.design/components/alert/) de Ant Design para mostrar mensajes de éxito, error, información y advertencia en la parte superior central de la pantalla.

- **Mensajes cortos y claros**: Ejemplo: "Agregado correctamente", "Editado correctamente", "Eliminado correctamente".
- **Diseño original de Ant Design**: Colores, iconos y animaciones oficiales.
- **Cierre automático y manual**: Las alertas desaparecen solas tras unos segundos o pueden cerrarse manualmente.

### Personalización

Puedes personalizar los textos y el tipo de alerta modificando las llamadas a la función de notificación en los archivos de CRUD, por ejemplo:
```js
mostrarNotif('success', 'Agregado correctamente', '');
mostrarNotif('error', 'Error al eliminar', errorMsg);
```

Si deseas cambiar la duración, ajusta la prop `duracion` en el componente `NotificacionCustom`.

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## ✨ Contacto

Para cualquier consulta o sugerencia, por favor contacta al equipo de desarrollo.
