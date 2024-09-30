// src/models/integracionModel.js
const mongoose = require('mongoose');

const integracionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ['Conectado', 'No Conectado'], default: 'No Conectado' },
    category: { type: String, required: true }, // Ejemplo: 'Canal de Venta', 'Facturador', 'Método de Envío'
    apiKey: { type: String }, // Campo API Key (opcional)
    // Puedes agregar más campos de credenciales según tus necesidades
  },
  { collection: 'integraciones' }
);

module.exports = mongoose.model('Integracion', integracionSchema);
