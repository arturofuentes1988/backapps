const ServicioTecnico = require('../models/servicioTecnicoModel');

exports.getAllServicios = async (req, res) => {
  try {
    const servicios = await ServicioTecnico.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createServicio = async (req, res) => {
  try {
    const count = await ServicioTecnico.countDocuments();
    const nuevoNumero = String(count + 1).padStart(4, '0');
    const servicio = new ServicioTecnico({
      ...req.body,
      numeroServicioTecnico: nuevoNumero
    });
    const nuevoServicio = await servicio.save();
    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error('Error al guardar el servicio:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getServicioById = async (req, res) => {
  try {
    const servicio = await ServicioTecnico.findById(req.params.id);
    if (servicio == null) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateServicio = async (req, res) => {
  try {
    const servicio = await ServicioTecnico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (servicio == null) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(servicio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteServicio = async (req, res) => {
  try {
    const servicio = await ServicioTecnico.findByIdAndDelete(req.params.id);
    if (servicio == null) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};