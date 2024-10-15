require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Conexión a la base de datos
const authMiddleware = require('./authMiddleware'); // Asegúrate de tener el middleware de autenticación
const roleMiddleware = require('./roleMiddleware'); // Importa roleMiddleware

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Ruta de registro de usuario
app.post('/register', async (req, res) => {
  const { nombre, email, contrasena, rol } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, hashedPassword, rol]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(contrasena, user.rows[0].contrasena);
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.rows[0].id, rol: user.rows[0].rol }, SECRET_KEY);
    res.json({ token, rol: user.rows[0].rol });
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

app.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const user = await pool.query('SELECT nombre, rol FROM usuarios WHERE id = $1', [req.user.id]);
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la información del perfil' });
  }
});

// Ruta del administrador
app.get('/admin-dashboard', authMiddleware, roleMiddleware('Administrador'), (req, res) => {
  res.json({ message: 'Bienvenido, Administrador' });
});

// Ruta del profesor
app.get('/profesor-dashboard', authMiddleware, roleMiddleware('Profesor'), (req, res) => {
  res.json({ message: 'Bienvenido, Profesor' });
});

// Ruta del alumno
app.get('/alumno-dashboard', authMiddleware, roleMiddleware('Alumno'), (req, res) => {
  res.json({ message: 'Bienvenido, Alumno' });
});

// Iniciar el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});