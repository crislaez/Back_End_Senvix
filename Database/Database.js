'use strict'

//requerimos doten donde estan las variables de entorno
require('dotenv').config();
//guiardamos el conector en una variable

const mysql = require('mysql');

//conexion
const conexion = mysql.createConnection({
    connectionLimit: 10,
    host:process.env.SERVIDOR,
    user:process.env.USUARIO,
    password:process.env.CLAVE,
    database:process.env.BBDD
})

//mostrar todos los usuarios
const allUser = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios`, ( err, res ) => {
            if(!err){
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//añadir usuario
const addUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO usuarios SET ?`, user, (err, res) => {
            if(!err){
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//loguear
const login = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(user.correo)} AND clave = ${conexion.escape(user.clave)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//añadir video 
const addVideo = (video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO video SET ?`, video, (err, res) => {
            if(!err){
                callback(null, res);
            }
        })
    }
    // conexion.end();

}

module.exports = 
    {
        allUser,
        addUser,
        login,
        addVideo
    };