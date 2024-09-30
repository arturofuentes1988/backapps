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
const servicioTecnicoRoutes = require('./routes/servicioTecnicoRoutes');

// Conectar a MongoDB y luego iniciar el servidor
const mongoURI = process.env.MONGO_URI;
console.log('Intentando conectar a MongoDB con URI:', mongoURI);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Conectado a MongoDB');

    // Usar rutas
    app.use('/api/productos', productosRoutes);
    app.use('/api/proveedores', proveedoresRoutes);
    app.use('/api/integraciones', integracionesRoutes);
    app.use('/api/serviciotecnico', servicioTecnicoRoutes);

    // Iniciar el servidor después de conectar a la base de datos
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB', err);
    process.exit(1); // Detener la aplicación si la conexión falla
  });

// Manejar eventos de la conexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a la base de datos');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose conexión error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado');
});
