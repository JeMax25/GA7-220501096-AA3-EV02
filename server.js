const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('src'));

// Rutas
const loginRoute = require('./routes/login');
app.use('/api/login', loginRoute);

const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});