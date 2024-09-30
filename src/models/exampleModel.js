// src/models/exampleModel.js
const mongoose = require('mongoose');

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, index: true },
  producto: { type: String, required: true, index: true },
  costo: { type: Number, required: true },
  precio: { type: Number, required: true },
  proveedor: { type: String, required: true },
  canalVentaLink: { type: String, required: true },
  variante: { type: String, required: true },
  ubicacion: { type: String, required: true },
  ubicacion2: { type: String },
  ubicacion3: { type: String },
  descripcion: { type: String },
  imagenes: [{ nombre: String, url: String }],
  cantidadCliente: { type: Number, required: true },
  stockReal: { type: Number, required: true },
  canalesVenta: [{ nombre: String, link: String }]
}, { collection: 'productos' });

// Crear índices
productoSchema.index({ sku: 1 }, { unique: true });
productoSchema.index({ producto: 1 });

module.exports = mongoose.model('Producto', productoSchema);
