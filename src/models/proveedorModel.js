// src/models/proveedorModel.js
const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String },
  email: { type: String },
}, { collection: 'proveedores' });

module.exports = mongoose.model('Proveedor', proveedorSchema);
