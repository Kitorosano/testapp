const express = require('express');
const dbPool = require('./config/db');
const cors = require('cors');

// Crear el servidor
const app = express();

// Conectar a la base de datos 
try {
  dbPool.getConnection((err, conn) => {
    if (err) throw err; // not connected!
    console.log('DB Conectada')
  });
} catch (error) {
  console.log(error);
  process.exit(1); //Detener la app
}


// Habilitar cors
app.use(cors())

// Habilitar express.json
app.use(express.json({extended: true}))

// puerto de la app
const port = process.env.PORT || 4000;


// Importar rutas

// RUTAS CLIENT
app.use('/api/client/productos', require('./routes/client/productos'));
app.use('/api/client/ordenes', require('./routes/client/ordenes'));

// RUTAS APP
app.use('/api/app/productos', require('./routes/app/productos'));
app.use('/api/app/ordenes', require('./routes/app/ordenes'));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
