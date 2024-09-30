// src/controllers/integracionController.js
const Integracion = require('../models/integracionModel');

// Obtener todas las integraciones
const getIntegraciones = async (req, res) => {
  try {
    const integraciones = await Integracion.find();
    res.json(integraciones);
  } catch (error) {
    console.error('Error al obtener integraciones:', error);
    res.status(500).json({ error: 'Error al obtener integraciones' });
  }
};

// Actualizar el estado de una integración
const updateIntegracionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const integracionActualizada = await Integracion.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!integracionActualizada) {
      return res.status(404).json({ error: 'Integración no encontrada' });
    }
    res.json(integracionActualizada);
  } catch (error) {
    console.error('Error al actualizar la integración:', error);
    res.status(500).json({ error: error.message || 'Error al actualizar la integración' });
  }
};

// Actualizar detalles de una integración (nombre)
const actualizarIntegracionDetalles = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Solo estamos actualizando el nombre

    // Validar que el nombre no esté vacío
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre de la integración es requerido y debe ser una cadena de texto válida.' });
    }

    console.log(`Actualizando integración ID: ${id} con nombre: ${name}`);

    const integracionActualizada = await Integracion.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true, runValidators: true }
    );

    if (!integracionActualizada) {
      return res.status(404).json({ error: 'Integración no encontrada' });
    }

    res.json(integracionActualizada);
  } catch (error) {
    console.error('Error al actualizar los detalles de la integración:', error);
    res.status(500).json({ error: error.message || 'Error al actualizar los detalles de la integración' });
  }
};

module.exports = {
  getIntegraciones,
  updateIntegracionStatus,
  actualizarIntegracionDetalles,
};
