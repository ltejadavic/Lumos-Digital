import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Perfil from './components/Perfil';
import AdminDashboard from './components/AdminDashboard';
import ProfesorDashboard from './components/ProfesorDashboard';
import AlumnoDashboard from './components/AlumnoDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Ruta protegida
import AccessDenied from './components/AccessDenied'; // Importar el componente de Acceso Denegado

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Administrador']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profesor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Profesor']}>
              <ProfesorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumno-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Alumno']}>
              <AlumnoDashboard />
            </ProtectedRoute>
          }
        />
        {/* Añadimos la ruta para acceso denegado */}
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
};

export default App;