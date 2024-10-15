import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: string[]; // allowedRoles es opcional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // Asumimos que el rol del usuario está almacenado

  // Imprime el rol del usuario en la consola para depuración
  console.log('Rol del usuario:', userRole);
  console.log('Roles permitidos para esta ruta:', allowedRoles);

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Si hay roles permitidos y el rol del usuario no está en la lista, redirigir a /access-denied
    if (!allowedRoles.includes(userRole || '')) {
      return <Navigate to="/access-denied" />;
    }
  }

  // Si el usuario tiene el rol adecuado, renderizar el componente
  return children;
};

export default ProtectedRoute;