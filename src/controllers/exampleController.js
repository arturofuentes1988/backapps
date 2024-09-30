// src/controllers/exampleController.js
const Producto = require('../models/exampleModel');

// Función para escapar caracteres especiales en regex
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// Obtener productos con búsqueda opcional
const getProductos = async (req, res) => {
  try {
    const { search } = req.query;
    console.log('Received search query:', search); // Log para depuración

    let productos;

    if (search) {
      const searchTerm = search.trim();

      if (searchTerm.startsWith('#')) {
        const skuSearch = searchTerm.slice(1).trim();
        console.log('Searching by SKU:', skuSearch); // Log

        if (skuSearch) {
          // Buscar SKU exactamente
          productos = await Producto.find({ sku: skuSearch });
          console.log(`Productos encontrados por SKU: ${productos.length}`); // Log
        } else {
          productos = [];
          console.log('No SKU proporcionado después de #');
        }
      } else {
        const nombreSearch = searchTerm;
        console.log('Searching by product name:', nombreSearch); // Log

        // Buscar productos que contengan el término de búsqueda, insensible a mayúsculas
        const regex = new RegExp(escapeRegex(nombreSearch), 'i');
        productos = await Producto.find({ producto: regex });
        console.log(`Productos encontrados por nombre: ${productos.length}`); // Log
      }
    } else {
      // Sin término de búsqueda, devolver todos los productos
      productos = await Producto.find();
      console.log(`Productos encontrados sin búsqueda: ${productos.length}`); // Log
    }

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const savedProducto = await nuevoProducto.save();
    res.status(201).json(savedProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar un producto existente
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = { getProductos, crearProducto, actualizarProducto, eliminarProducto };
