'use strict'

require('dotenv').config();

const mysql = require('mysql');

const conexion = mysql.createConnection({
    connectionLimit: 10,
    host:process.env.SERVIDOR,
    user:process.env.USUARIO,
    password:process.env.CLAVE,
    database:process.env.BBDD
})

const allUser = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios`, ( err, res ) => {
            if(!err){
                callback(null, {data:res});
            }
        })
    }
    // conexion.end();
}
module.exports = 
    {
        allUser
    };