const dbPool = require("../../config/db");
const { validationResult } = require("express-validator");

// obtiene los productos existentes
exports.agregarOrdenes = async (req, res) => {
  const db = dbPool.promise();

  try {
    const { tiempoentrega, completado, total, orden, creado } = req.body;
    // console.log(creado)

    // Agregamos orden
    const ordenQ = await db.query(
      "INSERT INTO ordenes (tiempoentrega,completado,total,creado) VALUES (?,?,?,?)",
      [tiempoentrega, completado, total, creado]
    );
    const ordenInsert = ordenQ[0].insertId;

    // Traer la data
    let ordenR = await db.query("SELECT * FROM ordenes WHERE idOrden=?", [
      ordenInsert,
    ]);
    const datos = ordenR[0][0];

    // Agregamos detalle
    orden.forEach(async (articulo) => {
      await db.query(
        "INSERT INTO detalleordenes (idOrden,idProducto,cantidad,precio) VALUES (?,?,?,?)",
        [ordenInsert, articulo.id, articulo.cantidad, articulo.precio]
      );
    });

    // Traer la data
    let detOrdenR = await db.query(
      "SELECT * FROM detalleordenes WHERE idOrden=?",
      [ordenInsert]
    );
    const detalles = detOrdenR[0];

    const returnObj = { datos, detalles };
    // console.log(returnObj);
    res.json(returnObj);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// obtiene todos los productos
exports.obtenerOrdenes = async (req, res) => {
  const db = dbPool.promise();

  try {
    const { idpedido } = req.query;

    const ordenQ = await db.query("SELECT * FROM ordenes WHERE idOrden=?", [
      idpedido,
    ]);

    let datos = ordenQ[0][0];

    const detOrdenQ = await db.query(
      "SELECT * FROM detalleordenes do, productos p WHERE do.idProducto=p.id AND idOrden=?",
      [idpedido]
    );
    let detalles = detOrdenQ[0];

    ordenes = { ...datos, orden: detalles };

    // const ordenes = await Promise.all(promises);

    // console.log(ordenes);
    res.send({ ordenes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};
