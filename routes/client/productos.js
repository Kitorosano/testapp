const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/client/productoController');
// const auth = require('../middleware/auth');
// const {check} = require('express-validator');

// api/client/productos

// Crea un producto
router.post('/',
  productoController.crearProducto
);

// Obtiene productos
router.get('/',
  productoController.obtenerProductos
);

// Actualiza disponibilidad de los productos
router.put('/:id',
  productoController.actualizarProductos
);

module.exports = router;