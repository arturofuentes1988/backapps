// src/controllers/proveedorController.js
const Proveedor = require('../models/proveedorModel');

// Obtener todos los proveedores
const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

// Crear un nuevo proveedor
const crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = new Proveedor(req.body);
    const savedProveedor = await nuevoProveedor.save();
    res.status(201).json(savedProveedor);
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
};

// Actualizar un proveedor existente
const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });
    if (!proveedorActualizado) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(proveedorActualizado);
  } catch (error) {
    console.error('Error al actualizar el proveedor:', error);
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

// Eliminar un proveedor
const eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedorEliminado = await Proveedor.findByIdAndDelete(id);
    if (!proveedorEliminado) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error);
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};

module.exports = { getProveedores, crearProveedor, actualizarProveedor, eliminarProveedor };
