import React, { useEffect, useRef } from "react";
import huellaMascota from "../assets/paw-print.svg";

const FondoAnimado = () => {
  const canvasRef = useRef(null);
  const particulas = useRef([]);

  useEffect(() => {
    const lienzo = canvasRef.current;
    const contexto = lienzo.getContext("2d");
    let idAnimacion;

    const redimensionarLienzo = () => {
      lienzo.width = window.innerWidth;
      lienzo.height = window.innerHeight;
    };

    const crearParticulas = () => {
      const cantidadParticulas = 50;
      const cantidadHuellas = 20;
      particulas.current = [];

      // Crear particulas normales
      for (let i = 0; i < cantidadParticulas; i++) {
        particulas.current.push({
          x: Math.random() * lienzo.width,
          y: Math.random() * lienzo.height,
          tamano: Math.random() * 4 + 2,
          velocidadX: (Math.random() * 3 - 1.5) * 1.5,
          velocidadY: (Math.random() * 3 - 1.5) * 1.5,
          opacidad: Math.random() * 0.6 + 0.3,
          esHuella: false,
        });
      }

      // Crear huellas de las mascotas
      for (let i = 0; i < cantidadHuellas; i++) {
        particulas.current.push({
          x: Math.random() * lienzo.width,
          y: Math.random() * lienzo.height,
          tamano: Math.random() * 8 + 12,
          velocidadX: (Math.random() * 2 - 1) * 0.8,
          velocidadY: (Math.random() * 2 - 1) * 0.8,
          opacidad: Math.random() * 0.4 + 0.2,
          rotacion: Math.random() * 360,
          esHuella: true,
        });
      }
    };

    const dibujarParticulas = () => {
      contexto.clearRect(0, 0, lienzo.width, lienzo.height);

      particulas.current.forEach((particula) => {
        if (particula.esHuella) {
          // Dibujar huella
          contexto.save();
          contexto.translate(particula.x, particula.y);
          contexto.rotate((particula.rotacion * Math.PI) / 180);
          contexto.fillStyle = `rgba(74, 144, 226, ${particula.opacidad})`;
          const imagen = new Image();
          imagen.src = huellaMascota;
          contexto.drawImage(
            imagen,
            -particula.tamano / 2,
            -particula.tamano / 2,
            particula.tamano,
            particula.tamano
          );
          contexto.restore();
        } else {
          // Dibujar partícula normal
          contexto.beginPath();
          contexto.arc(
            particula.x,
            particula.y,
            particula.tamano,
            0,
            Math.PI * 2
          );
          contexto.fillStyle = `rgba(74, 144, 226, ${particula.opacidad})`;
          contexto.fill();
        }

        // Actualizar posición
        particula.x += particula.velocidadX;
        particula.y += particula.velocidadY;

        // Rebote en los bordes
        if (particula.x < 0 || particula.x > lienzo.width)
          particula.velocidadX *= -1;
        if (particula.y < 0 || particula.y > lienzo.height)
          particula.velocidadY *= -1;
      });

      // Dibujar lineas entre partículas cercanas
      particulas.current.forEach((particula1, i) => {
        particulas.current.slice(i + 1).forEach((particula2) => {
          const dx = particula1.x - particula2.x;
          const dy = particula1.y - particula2.y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < 150) {
            contexto.beginPath();
            contexto.moveTo(particula1.x, particula1.y);
            contexto.lineTo(particula2.x, particula2.y);
            contexto.strokeStyle = `rgba(74, 144, 226, ${
              0.3 * (1 - distancia / 150)
            })`;
            contexto.lineWidth = 1.5;
            contexto.stroke();
          }
        });
      });

      idAnimacion = requestAnimationFrame(dibujarParticulas);
    };

    window.addEventListener("resize", redimensionarLienzo);
    redimensionarLienzo();
    crearParticulas();
    dibujarParticulas();

    return () => {
      window.removeEventListener("resize", redimensionarLienzo);
      cancelAnimationFrame(idAnimacion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default FondoAnimado;
