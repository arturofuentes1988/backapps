const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
});

const servicioTecnicoSchema = new mongoose.Schema({
  numeroServicioTecnico: {
    type: String,
    required: true,
    unique: true
  },
  numeroCompra: {
    type: String,
    required: true
  },
  cliente: {
    type: String,
    required: true
  },
  telefonoCliente: {
    type: String,
    required: true
  },
  correoCliente: {
    type: String,
    required: true
  },
  productos: [productoSchema],
  estado: {
    type: String,
    enum: ['Ingresado', 'En Reparación', 'Listo', 'Entregado'],
    default: 'Ingresado'
  },
  prioridad: {
    type: String,
    enum: ['Alta', 'Media', 'Baja'],
    required: true
  },
  fechaIngreso: {
    type: Date,
    default: Date.now
  },
  descripcionFalla: {
    type: String,
    required: true
  },
  observaciones: {
    type: String
  },
  resolucion: {
    type: String
  },
  tipoResolucion: {
    type: String,
    enum: ['Devolución', 'Reparación', 'Rechazo Garantía', 'Cambio']
  },
  fechaReparacion: {
    type: Date
  },
  tecnicoResolucion: {
    type: String
  }
});

module.exports = mongoose.model('ServicioTecnico', servicioTecnicoSchema);