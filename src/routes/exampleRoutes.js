// src/routes/exampleRoutes.js
const express = require('express');
const router = express.Router();
const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/exampleController');

// Ruta para obtener productos (con búsqueda opcional)
router.get('/', getProductos);

// Ruta para crear un nuevo producto
router.post('/', crearProducto);

// Ruta para actualizar un producto existente
router.put('/:id', actualizarProducto);

// Ruta para eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;
