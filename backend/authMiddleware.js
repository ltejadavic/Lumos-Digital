const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extraer el token correctamente
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    console.log('Clave secreta:', process.env.SECRET_KEY);
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    console.log('Token verificado con éxito:', verified); // Log para verificar si el token se verifica correctamente
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error); // Log del error de verificación
    res.status(400).json({ error: 'Token no válido.' });
  }
};

module.exports = authMiddleware;