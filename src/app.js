// src/app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar configuración de .env
dotenv.config();

// Inicializar la app
const app = express();
app.use(cors()); // Configuración básica de CORS
app.use(express.json());

// Importar rutas
const productosRoutes = require('./routes/exampleRoutes');
const proveedoresRoutes = require('./routes/proveedorRoutes');
const integracionesRoutes = require('./routes/integracionRoutes');

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB', err));

// Usar rutas
app.use('/api/productos', productosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/integraciones', integracionesRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
