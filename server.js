const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventario'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});

// Obtener productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar producto
app.post('/api/productos', (req, res) => {
  const { nombre, cantidad, precio } = req.body;
  const sql = 'INSERT INTO producto (nombre, cantidad, precio) VALUES (?, ?, ?)';
  db.query(sql, [nombre, cantidad, precio], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nombre, cantidad, precio });
  });
});

// Actualizar producto
app.put('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, cantidad, precio } = req.body;
  const sql = 'UPDATE producto SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?';
  db.query(sql, [nombre, cantidad, precio, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Producto actualizado correctamente' });
  });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM producto WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Producto eliminado correctamente' });
  });
});


app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
