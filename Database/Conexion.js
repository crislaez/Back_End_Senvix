'use strict';

//requerimos dotenv para leer los archivos de .env
require('dotenv').config();

const mysql = require('mysql');

const conexion = mysql.createConnection({
    connectionLimit: 10,
    host:process.env.SERVIDOR,
    user:process.env.USUARIO,
    password:process.env.CLAVE,
    database:process.env.BBDD
});

module.exports = conexion;
