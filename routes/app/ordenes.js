const express = require('express');
const router = express.Router();
const ordenController = require('../../controllers/app/ordenController');
// const auth = require('../middleware/auth');
// const {check} = require('express-validator');

// api/app/ordenes

// Obtiene ordens
router.get('/',
  ordenController.obtenerOrdenes
);


// Agrega ordenes
router.post('/',
  ordenController.agregarOrdenes
);

module.exports = router;