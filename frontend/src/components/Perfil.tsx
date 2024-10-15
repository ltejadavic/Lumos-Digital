import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Instancia de Axios configurada
import { useNavigate } from 'react-router-dom'; // Para redirigir al login si falla la autenticación

const Perfil = () => {
  const [userData, setUserData] = useState({ nombre: '', rol: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage

      if (!token) {
        navigate('/login'); // Si no hay token, redirigir al login
        return;
      }

      try {
        const res = await axios.get('/perfil', {
          headers: { Authorization: `Bearer ${token}` }, // Enviar el token en el encabezado
        });
        setUserData(res.data); // Almacenar los datos del usuario en el estado
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
        setError('Error al obtener los datos del perfil. Redirigiendo a login...');
        localStorage.removeItem('token'); // Eliminar el token si no es válido
        navigate('/login'); // Redirigir al login si ocurre un error
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
      <p>Nombre: {userData.nombre}</p>
      <p>Rol: {userData.rol}</p>
    </div>
  );
};

export default Perfil;