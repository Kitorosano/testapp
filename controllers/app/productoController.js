const dbPool = require("../../config/db");
const { validationResult } = require("express-validator");

// obtiene los productos existentes
exports.obtenerProductos = async (req, res) => {
  const db = dbPool.promise();

  try {
    let [rows] = await db.query("SELECT * FROM productos WHERE existencia=true");
    res.send({ rows });
    // console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};
