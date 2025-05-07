import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Paper, Typography, IconButton, TextField, Button, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PetsIcon from '@mui/icons-material/Pets';
import '../css/petbot.css';
import '../css/home.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../movimiento/AnimatedBackground';

const API_URL = process.env.REACT_APP_API_URL || 'https://apiinteligencia-artificial-production.up.railway.app/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(18, 35, 91, 0.15)',
  overflow: 'hidden',
  border: '1px solid rgba(18, 35, 91, 0.1)'
}));

const MessageBubble = styled(Box)(({ theme, owner }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5),
  borderRadius: owner === 'usuario' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
  background: owner === 'usuario' ? theme.palette.primary.main : '#f5f5f5',
  color: owner === 'usuario' ? '#fff' : theme.palette.text.primary,
  marginLeft: owner === 'usuario' ? 'auto' : '0',
  marginRight: owner === 'usuario' ? '0' : 'auto',
  marginBottom: theme.spacing(1),
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    [owner === 'usuario' ? 'right' : 'left']: -10,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: owner === 'usuario' ? '0 0 10px 10px' : '0 10px 10px 0',
    borderColor: owner === 'usuario' 
      ? `transparent transparent transparent ${theme.palette.primary.main}`
      : 'transparent #f5f5f5 transparent transparent'
  }
}));

const SuggestionChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.light,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  cursor: 'pointer'
}));

export default function PetBotChat() {
  const [mensajeUsuario, setMensajeUsuario] = useState('');
  const [mensajes, setMensajes] = useState([
    {
      tipo: 'ia',
      texto: '¡Hola! Soy PetBot, el asistente virtual de PetConnect. ¿En qué puedo ayudarte hoy con tu mascota?',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [cargando, setCargando] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);
  const [estadoServidor, setEstadoServidor] = useState({ status: 'desconocido', mensaje: '' });
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [mensajes]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const verificarServidor = async () => {
      try {
        const response = await axios.get(`${API_URL}/status`);
        setErrorConexion(!response.data.apiConectada);
        setEstadoServidor({ 
          status: response.data.status, 
          mensaje: response.data.apiConectada ? 'Conectado' : 'API desconectada'
        });
      } catch (error) {
        console.error('Error al verificar estado del servidor:', error);
        setErrorConexion(true);
        setEstadoServidor({ 
          status: 'error', 
          mensaje: 'Servidor desconectado' 
        });
      }
    };
    
    verificarServidor();
    const intervalo = setInterval(verificarServidor, 60000);
    
    return () => clearInterval(intervalo);
  }, []);

  const manejarTeclaPresionada = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  const enviarMensaje = async () => {
    if (!mensajeUsuario.trim() || cargando || errorConexion) return;

    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMensajes((prevMensajes) => [
      ...prevMensajes,
      { tipo: 'usuario', texto: mensajeUsuario, hora: horaActual },
    ]);
    setCargando(true);
    
    const mensajeParaEnviar = mensajeUsuario.trim();
    
    setMensajeUsuario('');

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        mensaje: mensajeParaEnviar,
      }, {
        timeout: 30000 
      });

      setMensajes((prevMensajes) => [
        ...prevMensajes,
        { 
          tipo: 'ia', 
          texto: response.data.respuesta,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      
      let mensajeError = 'Lo siento, hubo un error al procesar tu solicitud.';
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED') {
        mensajeError = 'No puedo conectarme al servidor. ¿El servidor está ejecutándose?';
        setErrorConexion(true);
      } else if (error.response) {
        switch(error.response.status) {
          case 500:
            mensajeError = 'Hay un problema con el servicio de IA. El equipo técnico ha sido notificado.';
            break;
          case 503:
            mensajeError = 'El servicio de IA no está disponible en este momento. Por favor, intenta más tarde.';
            break;
          case 504:
            mensajeError = 'La respuesta está tomando demasiado tiempo. Por favor, intenta con una pregunta más corta.';
            break;
          default:
            mensajeError = `Error ${error.response.status}: ${error.response.data.mensaje || 'Error desconocido'}`;
        }
      }
      
      setMensajes((prevMensajes) => [
        ...prevMensajes,
        { 
          tipo: 'ia', 
          texto: mensajeError, 
          esError: true,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setCargando(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const reiniciarChat = async () => {
    try {
      const response = await axios.post(`${API_URL}/chat/reiniciar`);
      
      setMensajes([
        {
          tipo: 'ia',
          texto: response.data.respuesta || '¡Conversación reiniciada! ¿En qué puedo ayudarte?',
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
      
      await verificarEstadoServidor();
    } catch (error) {
      console.error('Error al reiniciar chat:', error);
      setMensajes((prevMensajes) => [
        ...prevMensajes,
        { 
          tipo: 'ia', 
          texto: 'Hubo un problema al reiniciar la conversación.', 
          esError: true,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        },
      ]);
    }
  };

  const verificarEstadoServidor = async () => {
    try {
      const response = await axios.get(`${API_URL}/status`);
      setErrorConexion(!response.data.apiConectada);
      return response.data.apiConectada;
    } catch (error) {
      console.error('Error al verificar estado:', error);
      setErrorConexion(true);
      return false;
    }
  };

  const sugerencias = [
    "¿Cómo adoptar una mascota?",
    "Vacunas para cachorros",
    "Cuidados básicos para gatos",
    "Esterilización de mascotas",
    "Alimentos recomendados para perros"
  ];

  const usarSugerencia = (sugerencia) => {
    setMensajeUsuario(sugerencia);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#EEF6FF',
      position: 'relative'
    }}>
      <AnimatedBackground />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
        <StyledPaper elevation={3}>
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <PetsIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" component="h1">PetBot</Typography>
                <Typography variant="body2" color="text.secondary">
                  Tu asistente virtual para mascotas
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={estadoServidor.mensaje}
                color={errorConexion ? 'error' : 'success'}
                size="small"
                variant="outlined"
              />
              <IconButton 
                onClick={reiniciarChat}
                disabled={errorConexion}
                color="primary"
                size="small"
              >
                <RestartAltIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Chat Messages */}
          <Box
            ref={chatBodyRef}
            sx={{
              height: '500px',
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {mensajes.map((mensaje, index) => (
              <MessageBubble key={index} owner={mensaje.tipo}>
                <Typography variant="body1">{mensaje.texto}</Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    textAlign: mensaje.tipo === 'usuario' ? 'right' : 'left',
                    mt: 0.5,
                    opacity: 0.7
                  }}
                >
                  {mensaje.hora}
                </Typography>
              </MessageBubble>
            ))}
            {cargando && (
              <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </Box>
            )}
          </Box>

          {/* Suggestions */}
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {sugerencias.map((sugerencia, index) => (
                <SuggestionChip
                  key={index}
                  label={sugerencia}
                  onClick={() => usarSugerencia(sugerencia)}
                  disabled={errorConexion || cargando}
                />
              ))}
            </Box>
          </Box>

          {/* Input Area */}
          <Box sx={{ 
            p: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            gap: 2
          }}>
            <TextField
              inputRef={inputRef}
              fullWidth
              variant="outlined"
              placeholder={errorConexion ? "Servidor desconectado..." : "Escribe tu mensaje aquí..."}
              value={mensajeUsuario}
              onChange={(e) => setMensajeUsuario(e.target.value)}
              onKeyDown={manejarTeclaPresionada}
              disabled={errorConexion || cargando}
              size="small"
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={enviarMensaje}
              disabled={!mensajeUsuario.trim() || cargando || errorConexion}
            >
              Enviar
            </Button>
          </Box>
        </StyledPaper>
      </Container>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #4A90E2;
          border-radius: 50%;
          animation: bounce 0.5s infinite;
          opacity: 0.7;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.1s; }
        .typing-dot:nth-child(3) { animation-delay: 0.2s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </Box>
  );
}