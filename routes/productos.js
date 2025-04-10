const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar producto
router.post('/', (req, res) => {
  const { nombre, cantidad, precio } = req.body;
  const sql = 'INSERT INTO producto (nombre, cantidad, precio) VALUES (?, ?, ?)';
  db.query(sql, [nombre, cantidad, precio], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nombre, cantidad, precio });
  });
});

// Actualizar producto
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, cantidad, precio } = req.body;
  const sql = 'UPDATE producto SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?';
  db.query(sql, [nombre, cantidad, precio, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Producto actualizado correctamente' });
  });
});

// Eliminar producto
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM producto WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Producto eliminado correctamente' });
  });
});

module.exports = router;