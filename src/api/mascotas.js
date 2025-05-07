const API_URL = 'https://web-production-aea20.up.railway.app/api/mascotas';

export const getMascotas = () => fetch(API_URL).then(res => res.json());

export const addMascota = async (data) => {
  try {
    console.log('Enviando datos a la API:', data);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en la petición:', {
        status: response.status,
        data: errorData
      });
      throw new Error(errorData.message || 'Error al agregar mascota');
    }
    
    const result = await response.json();
    console.log('Respuesta exitosa:', result);
    return result;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};

export const updateMascota = (id, data) => 
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteMascota = (id) => 
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());

export const getMascota = (id) => fetch(`${API_URL}/${id}`).then(res => res.json()); 