// Definir el middleware para verificar el rol
const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (req.user.rol !== requiredRole) {
      return res.status(403).json({ error: 'Acceso denegado. No tienes el rol adecuado.' });
    }
    next();
  };
  
  // Exportar el middleware
  module.exports = roleMiddleware;