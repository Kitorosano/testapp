const dbPool = require("../../config/db");
const { validationResult } = require("express-validator");

// obtiene todos los productos
exports.obtenerOrdenes = async (req, res) => {
  const db = dbPool.promise();

  try {
    const ordenQ = await db.query(
      "SELECT * FROM ordenes WHERE completado=false"
    );
    let datos = ordenQ[0];

    const promises = datos.map(async (element) => {
      const detOrdenQ = await db.query(
        "SELECT * FROM detalleordenes do, productos p WHERE do.idProducto=p.id AND idOrden=?",
        [element.idOrden]
      );
      let detalles = detOrdenQ[0];

      return (element = { ...element, orden: detalles });
    });

    const ordenes = await Promise.all(promises);

    // console.log(ordenes);
    res.send({ ordenes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.actualizarOrdenes = async (req, res) => {
  const db = dbPool.promise();

  // Extrar la informacion del tarea
  const { tiempoentrega } = req.body;

  try {
    if (tiempoentrega) {
      // actualizar tiempo entrega
      await db.query("UPDATE ordenes SET tiempoentrega=? WHERE idOrden=?", [
        tiempoentrega,
        req.params.id,
      ]);
    } else {
      // Actualizar estado completado
      await db.query("UPDATE ordenes SET completado=true WHERE idOrden=?", [
        req.params.id,
      ]);
    }

      res.json({ msg: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};
