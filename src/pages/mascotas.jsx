import React, { useEffect, useState, useMemo } from 'react';
import '../css/mascotas.css';
import '../css/home.css';
import { getMascotas } from '../api/mascotas';
import PetCard from '../components/PetCard';
import PetInfoModal from '../components/PetInfoModal';
import Navbar from '../components/Navbar';

function Mascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);

  // Filtros
  const [filtros, setFiltros] = useState({
    ubicacion: '',
    edadMin: '',
    edadMax: '',
    tamaño: ''
  });
  
  // Buscador
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true);
      try {
        const res = await getMascotas();
        if (res && res.success && Array.isArray(res.data)) {
          setMascotas(res.data);
        } else if (Array.isArray(res)) {
          setMascotas(res);
        } else {
          setMascotas([]);
        }
      } catch (err) {
        setMascotas([]);
      }
      setLoading(false);
    };
    fetchMascotas();
  }, []);

  // Obtener valores únicos para los filtros
  const ubicaciones = useMemo(() => Array.from(new Set(mascotas.map(m => m.ubicacion).filter(Boolean))), [mascotas]);
  const tamanios = useMemo(() => Array.from(new Set(mascotas.map(m => m.tamaño).filter(Boolean))), [mascotas]);

  // Filtrado de mascotas SOLO DISPONIBLES y por búsqueda
  const mascotasFiltradas = useMemo(() => {
    return mascotas.filter(m => {
      if (m.estado !== 'Disponible') return false;
      // Filtro de búsqueda SOLO por nombre y raza
      const texto = busqueda.trim().toLowerCase();
      if (texto) {
        const campos = [m.nombre, m.raza];
        if (!campos.some(c => c && c.toLowerCase().includes(texto))) return false;
      }
      if (filtros.ubicacion && m.ubicacion !== filtros.ubicacion) return false;
      if (filtros.tamaño && m.tamaño !== filtros.tamaño) return false;
      if (filtros.edadMin && Number(m.edad) < Number(filtros.edadMin)) return false;
      if (filtros.edadMax && Number(m.edad) > Number(filtros.edadMax)) return false;
      return true;
    });
  }, [mascotas, filtros, busqueda]);

  // filtros
  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  //  búsqueda
  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  // Función para resaltar coincidencias
  function resaltarCoincidencia(texto, busqueda) {
    if (!busqueda) return texto;
    const partes = texto.split(new RegExp(`(${busqueda})`, 'gi'));
    return partes.map((parte, i) =>
      parte.toLowerCase() === busqueda.toLowerCase() ? <span key={i} style={{ background: '#ffe082', fontWeight: 600 }}>{parte}</span> : parte
    );
  }

  return (
    <div>
      <Navbar />
      
      {/* Sección principal de mascotas */}
      <main className="mascotas-main">
        <h2 className="mascotas-titulo">Mascotas esperando por ti</h2>
        <p className="mascotas-descripcion">
          En PetConnect creemos que cada mascota merece un hogar lleno de amor y cuidados. Nuestra misión es ayudarte a
          encontrar a ese compañero peludo que encaje con tu estilo de vida, tus gustos y tu corazón. Explora, conéctate
          y descubre miles de historias que esperan por un nuevo comienzo. Adoptar es más que dar un hogar: es cambiar dos
          vidas para siempre.
        </p>

        {/* Buscador */}
        <div style={{maxWidth: 400, margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', gap: 10, position: 'relative'}}>
          <span style={{position:'absolute', left: 12, top: 10, color:'#888', fontSize:18}}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            type="text"
            value={busqueda}
            onChange={handleBusqueda}
            placeholder="Buscar por nombre o raza..."
            style={{width: '100%', padding: '10px 14px 10px 38px', borderRadius: 8, border: '1.5px solid #bcd', fontSize: '1rem'}}
          />
          {busqueda && (
            <button onClick={()=>setBusqueda('')} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',color:'#888'}}>×</button>
          )}
        </div>
        {/* Contador de resultados */}
        <div style={{textAlign:'center', color:'#1976d2', fontWeight:600, marginBottom:10, fontSize:'1.08rem'}}>
          {mascotasFiltradas.length} resultado{mascotasFiltradas.length === 1 ? '' : 's'} encontrado{mascotasFiltradas.length === 1 ? '' : 's'}
        </div>

        <div className="mascotas-contenido">
          {/* Filtros */}
          <aside className="filtros">
            <div className="filtros-header">
              <span className="icono">⏷</span> Filtrar
            </div>
            <div style={{marginBottom: 12}}>
              <label style={{fontWeight:600}}>Localidad</label>
              <select name="ubicacion" value={filtros.ubicacion} onChange={handleFiltro} style={{width:'100%',marginTop:4,marginBottom:8}}>
                <option value="">Todas</option>
                {ubicaciones.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div style={{marginBottom: 12}}>
              <label style={{fontWeight:600}}>Edad</label>
              <div style={{display:'flex',gap:6}}>
                <input type="number" name="edadMin" value={filtros.edadMin} onChange={handleFiltro} placeholder="Mín" min={0} style={{width: '48%'}} />
                <input type="number" name="edadMax" value={filtros.edadMax} onChange={handleFiltro} placeholder="Máx" min={0} style={{width: '48%'}} />
              </div>
            </div>
            <div style={{marginBottom: 12}}>
              <label style={{fontWeight:600}}>Tamaño</label>
              <select name="tamaño" value={filtros.tamaño} onChange={handleFiltro} style={{width:'100%',marginTop:4,marginBottom:8}}>
                <option value="">Todos</option>
                {tamanios.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button style={{marginTop:8, width:'100%', background:'#112266', color:'#fff', border:'none', borderRadius:8, padding:'8px 0', fontWeight:600, cursor:'pointer'}} onClick={()=>setFiltros({ubicacion:'',edadMin:'',edadMax:'',tamaño:''})}>Limpiar filtros</button>
          </aside>

          {/* Tarjetas de mascotas divididas en dos filas visuales */}
          <div style={{width: '100%'}}>
            <div className="tarjetas-mascotas fila-mascotas-1">
              {loading ? (
                <div>Cargando mascotas...</div>
              ) : mascotasFiltradas.length === 0 ? (
                <div style={{color:'#888', fontWeight:500, padding:'18px 0'}}>No encontramos mascotas que coincidan con tu búsqueda.</div>
              ) : (
                mascotasFiltradas.slice(0, 4).map((mascota) => (
                  <PetCard
                    key={mascota.id}
                    imagen_url={mascota.imagen_url}
                    nombre={
                      busqueda ? resaltarCoincidencia(mascota.nombre, busqueda) : mascota.nombre
                    }
                    raza={
                      busqueda ? resaltarCoincidencia(mascota.raza, busqueda) : mascota.raza
                    }
                    onClick={() => { setSelectedMascota(mascota); setModalVisible(true); }}
                  />
                ))
              )}
            </div>
            <div className="tarjetas-mascotas fila-mascotas-2">
              {loading ? null : (
                mascotasFiltradas.slice(4).map((mascota) => (
                  <PetCard
                    key={mascota.id}
                    imagen_url={mascota.imagen_url}
                    nombre={
                      busqueda ? resaltarCoincidencia(mascota.nombre, busqueda) : mascota.nombre
                    }
                    raza={
                      busqueda ? resaltarCoincidencia(mascota.raza, busqueda) : mascota.raza
                    }
                    onClick={() => { setSelectedMascota(mascota); setModalVisible(true); }}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <PetInfoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          mascota={selectedMascota}
        />
      </main>

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
              <a href="#instagram" className="social-icon" aria-label="Instagram">
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
        <p className="footer-copyright">© 2025 PetConnect. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Mascotas;
