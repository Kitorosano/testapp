const dbPool = require("../../config/db");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
  // Revisar si hay errores
  // const errores = validationResult(req);
  // if (!errores.isEmpty()) {
  //   return res.status(400).json({ errores: errores.array() });
  // }

  const db = dbPool.promise();
  const { nombre, precio, categoria, descripcion, existencia } = req.body;
  console.log(req.body);

  try {
    // Guardar creador via JWT
    // const creador = req.usuario.id;

    // Guardamos producto
    const [results] = await db.query(
      "INSERT INTO productos (`nombre`, `precio`, `categoria`, `descripcion`, `existencia`) VALUES (?,?,?,?,?)",
      [nombre, precio, categoria, descripcion, existencia]
    );
    // Traer la data
    const [rows] = await db.query("SELECT * FROM productos WHERE id=?", [
      results.insertId,
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// obtiene todos los productos
exports.obtenerProductos = async (req, res) => {
  const db = dbPool.promise();

  try {
    let [rows] = await db.query("SELECT * FROM productos");
    res.send({ rows });
    console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.actualizarProductos = async (req, res) => {
  const db = dbPool.promise();
  const {existencia} = req.body;

  try {
    // Si la tarea existe o no
    let existePlatillo = await db.query(
      "SELECT * FROM productos WHERE id=?",
      [req.params.id]
    );
    // si la tarea existe o no
    if(existePlatillo[0].length == 0){
      return res.status(404).json({msg: 'No existe esa tarea'})
    }


    // actualizar
    await db.query(
      "UPDATE productos SET existencia=? WHERE id=?",
      [existencia, req.params.id]
    );
    // Traer la data
    const [rows] = await db.query(
      "SELECT * FROM productos WHERE id=?",
      [req.params.id]
    );
    // console.log(rows)
    res.json( rows[0] );

  } catch (error) {
    console.log(error);
    res.status(500).send({msg: 'Hubo un error'})
  }
}