// src/routes/integracionRoutes.js
const express = require('express');
const router = express.Router();
const {
  getIntegraciones,
  updateIntegracionStatus,
  actualizarIntegracionDetalles,
} = require('../controllers/integracionController');

router.get('/', getIntegraciones);
router.put('/:id', updateIntegracionStatus);
router.put('/:id/detalles', actualizarIntegracionDetalles); // Nueva ruta para actualizar detalles

module.exports = router;
