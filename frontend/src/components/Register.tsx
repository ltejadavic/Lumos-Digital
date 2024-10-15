import React, { useState } from 'react';
import axios from '../axios';
import { TextInput, Button } from './FormElements'; // Importa los componentes reutilizables

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    rol: 'Alumno', // Predeterminado para alumnos
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', formData);
      console.log('Usuario registrado:', res.data);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <TextInput
        label="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />
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
      <div className="form-group">
        <label>Rol</label>
        <select
          value={formData.rol}
          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
          className="form-control"
        >
          <option value="Alumno">Alumno</option>
          <option value="Profesor">Profesor</option>
          <option value="Administrador">Administrador</option>
        </select>
      </div>
      <Button text="Registrar" type="submit" onClick={() => {}} />
    </form>
  );
};

export default Register;