import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-bootstrap/Carousel";
import "../css/home.css";
import Navbar from "../components/Navbar";

function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      <Navbar />

      {/* Carrusel de mascotas */}
      <div style={{ marginTop: "25px" }}></div>
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="carrusel-img"
            src="/imgg/img1.jpg"
            alt="Primera mascota"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carrusel-img"
            src="/imgg/img2.jpg"
            alt="Segunda mascota"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carrusel-img"
            src="/imgg/img3.png"
            alt="Tercera mascota"
          />
        </Carousel.Item>
      </Carousel>

      {/* Sección Adopta */}
      <section className="adopta-section">
        <h2 className="adopta-title">Adopta</h2>
        <p className="adopta-subtitle">
          ¡Cientos de mascotas esperan por un hogar!
        </p>

        <div className="adopta-buttons">
          <div className="adopta-card">
            <img src="/imgg/perro.png" alt="Perro" className="adopta-icon" />
            <p>Perros</p>
          </div>

          <div className="adopta-card">
            <img src="/imgg/gato.png" alt="Gato" className="adopta-icon" />
            <p>Gatos</p>
          </div>

          <div className="adopta-card">
            <img src="/imgg/otros.png" alt="Otros" className="adopta-icon" />
            <p>Otros</p>
          </div>
        </div>
      </section>

      {/* frase destacada */}
      <section className="frase-section">
        <h3>
          "Cada mirada, una historia.
          <br />
          Cada historia, una oportunidad."
        </h3>
      </section>

      {/* Carrusel de imágenes de mascotas */}
      <section className="carrusel-section">
        <div className="carrusel-container">
          <div className="carrusel-titulo"></div>
          <Slider {...settings}>
            <div className="carrusel-card">
              <img src="/imgg/masc1.jpg" alt="Mascota 1" />
            </div>
            <div className="carrusel-card">
              <img src="/imgg/masc2.jpg" alt="Mascota 2" />
            </div>
            <div className="carrusel-card">
              <img src="/imgg/masc3.jpg" alt="Mascota 3" />
            </div>
            <div className="carrusel-card">
              <img src="/imgg/masc4.jpg" alt="Mascota 4" />
            </div>
          </Slider>
        </div>
      </section>

      {/* Sección ¿Qué es PetConnect? */}
      <section className="que-es-section">
        <div className="que-es-content">
          <div className="que-es-img-container">
            <img
              src="/imgg/portada.jpg"
              alt="Imagen de PetConnect"
              className="que-es-img"
            />
          </div>
          <div className="que-es-text-container">
            <h2>¿Qué es PetConnect?</h2>
            <p>
              "Un espacio digital donde humanos y peluditos se encuentran.
              PetConnect nace para simplificar el proceso de adopción, conectar
              refugios con familias, y brindar a cada mascota el hogar que
              merece."
            </p>
            <div className="que-es-links">
              <a href="#adopta">🐕 Adopta con propósito</a>
              <a href="#refugios">📍Encuentra refugios locales</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section petconnect-section">
            <h3 className="petconnect-title">PetConnect</h3>
            <div className="social-icons">
              <a href="#youtube" className="social-icon" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#facebook" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#instagram"
                className="social-icon"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#github" className="social-icon" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Navegación</h3>
            <ul>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#explorar">Explorar Mascotas</a>
              </li>
              <li>
                <a href="#sobre-nosotros">Sobre Nosotros</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Recursos</h3>
            <ul>
              <li>
                <a href="#adoptar">¿Cómo adoptar?</a>
              </li>
              <li>
                <a href="#refugio">Registra tu refugio</a>
              </li>
              <li>
                <a href="#preguntas">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="#privacidad">Políticas de privacidad</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Ayuda</h3>
            <ul>
              <li>
                <a href="#comunicacion">Comunícate con nosotros</a>
              </li>
              <li>
                <a href="#asesoria">Asesoría</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-copyright">
          © 2025 PetConnect. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default Home;
