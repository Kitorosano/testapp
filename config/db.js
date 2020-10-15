const mysql = require('mysql2');
require('dotenv').config({path: 'variables.env'});

const dbPool = mysql.createPool(process.env.DB_MYSQL);

module.exports = dbPool;