const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para login 
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
    }

    // Usuario encontrado
    const user = results[0];
    res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username } });
  });
});

module.exports = router;
