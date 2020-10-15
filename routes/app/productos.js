const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/app/productoController');
// const auth = require('../middleware/auth');
// const {check} = require('express-validator');

// api/app/productos

// Obtiene productos
router.get('/',
  productoController.obtenerProductos
);

module.exports = router;