const express = require('express');
const router = express.Router();
const servicioTecnicoController = require('../controllers/servicioTecnicoController');

router.get('/', servicioTecnicoController.getAllServicios);
router.post('/', servicioTecnicoController.createServicio);
router.get('/:id', servicioTecnicoController.getServicioById);
router.put('/:id', servicioTecnicoController.updateServicio);
router.delete('/:id', servicioTecnicoController.deleteServicio);

module.exports = router;