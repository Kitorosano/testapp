const express = require('express');
const router = express.Router();
const ordenController = require('../../controllers/client/ordenController');
// const auth = require('../middleware/auth');
// const {check} = require('express-validator');

// api/client/ordenes

// Obtiene ordens
router.get('/',
  ordenController.obtenerOrdenes
);

// Actualiza disponibilidad de los ordenes
router.put('/:id',
  ordenController.actualizarOrdenes
);

module.exports = router;