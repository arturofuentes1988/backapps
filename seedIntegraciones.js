// seedIntegraciones.js
const mongoose = require('mongoose');
const Integracion = require('.src/models/integracionModel'); // Ajusta la ruta según tu estructura
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Conectado a MongoDB');

  // Datos iniciales para integraciones
  const integrationsData = [
    { name: 'Shopify', status: 'No Conectado', category: 'Canal de Venta' },
    { name: 'Woocommerce', status: 'No Conectado', category: 'Canal de Venta' },
    { name: 'Mercadolibre', status: 'No Conectado', category: 'Canal de Venta' },
    { name: 'Openfactura', status: 'No Conectado', category: 'Facturador' },
    { name: 'Envíame', status: 'No Conectado', category: 'Método de Envío' },
    { name: 'Correos de Chile', status: 'No Conectado', category: 'Método de Envío' },
    { name: 'Chilexpress', status: 'No Conectado', category: 'Método de Envío' },
  ];

  try {
    // Limpiar datos existentes
    await Integracion.deleteMany({});
    console.log('Integraciones existentes eliminadas.');

    // Insertar nuevos datos
    await Integracion.insertMany(integrationsData);
    console.log('Datos de integraciones insertados correctamente.');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error al insertar datos de integraciones:', error);
    mongoose.disconnect();
  }
})
.catch((err) => {
  console.error('Error al conectar a MongoDB:', err);
});
