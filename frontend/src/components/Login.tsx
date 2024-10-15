import React, { useState } from 'react';
import axios from '../axios'; // Asegúrate de que axios esté correctamente configurado
import { TextInput, Button } from './FormElements'; // Componentes reutilizables
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login exitoso

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    contrasena: '',
  });
  const [error, setError] = useState<string>(''); // Estado para manejar el mensaje de error
  const navigate = useNavigate(); // Hook de navegación para redirigir

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Realiza la solicitud al backend para el login
      const res = await axios.post('/login', formData);
      
      // Asumiendo que la respuesta contiene { token, rol }
      localStorage.setItem('token', res.data.token); // Almacena el token JWT en localStorage
      localStorage.setItem('userRole', res.data.rol); // Almacena el rol del usuario en localStorage
      
      console.log('Login exitoso, token y rol almacenados');
      setError(''); // Limpia cualquier mensaje de error previo
      navigate('/perfil'); // Redirige al perfil del usuario después del login exitoso
    } catch (error) {
      // Maneja cualquier error en el proceso de login
      console.error('Error en el inicio de sesión:', error);
      setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.'); // Mensaje de error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <TextInput
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        type="email"
      />
      <TextInput
        label="Contraseña"
        value={formData.contrasena}
        onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
        type="password"
      />
      <Button text="Iniciar Sesión" type="submit" onClick={() => {}} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
    </form>
  );
};

export default Login;