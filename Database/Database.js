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
});


//mostrar todos los usuarios
const allUser = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios`, ( err, res ) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//añadir usuario
const addUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO usuarios SET ?`, user, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//loguear
const login = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(user.correo)} AND clave = ${conexion.escape(user.clave)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//añadir video 
const addVideo = (video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO video SET ?`, video, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//todos los videos por id usuario
const videoByIdUser = (id_usuario, callback) => {
    //conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM video INNER JOIN usuarios ON video.id_usuario = usuarios.id_usuario WHERE video.id_usuario = ${conexion.escape(id_usuario)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    //conexion.end();    
};

//usuario por id
const userById = (id_usuario, callback) => {
    //conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE id_usuario = ${conexion.escape(id_usuario)}`, (err, res) => {
            if(!err){
                callback(null, res)
            }else{
                console.log(err.code);
            }
        })
    }
    //conexion.end();
};

//borrar video
const deleteVideo = (id_video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM video WHERE id_video = ${conexion.escape(id_video)}`, (err, res) => {
            if(!err){
                callback(null, res)
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//mostrar todos los videos
const allVideos = (callback) => {
    // conexion.connect();SELECT * FROM video
    // SELECT * FROM video
    if(conexion){
        conexion.query(`SELECT * FROM video INNER JOIN usuarios ON video.id_usuario = usuarios.id_usuario`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//videos por id
const videoById = (id_video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM video INNER JOIN usuarios ON video.id_usuario = usuarios.id_usuario WHERE video.id_video = ${conexion.escape(id_video)}`, (err, res) => {
            if(!err){
                callback(null, res)
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//añadir comentario
const addComent = (coment, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO comentario SET ?`,coment, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//mostrar todos los mesajes por video
const comentByIdVideo = (id_video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM comentario WHERE id_video = ${conexion.escape(id_video)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

//buscar videos por nombre de usuario
const videoByNameUser = (id_usuario, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT id_video, usuarios.id_usuario, video, titulo_video, nombre, avatar, banner FROM video INNER JOIN usuarios ON video.id_usuario = usuarios.id_usuario WHERE usuarios.id_usuario =${conexion.escape(id_usuario)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

const checkFollow = (datos, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM seguir WHERE id_usuario_seguido = ${conexion.escape(datos.seguido)} AND id_usuario_seguidor = ${conexion.escape(datos.seguidor)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

const follow = (datos, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO seguir SET ?`,datos , (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
};

const unFollow = (datos, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM seguir WHERE id_usuario_seguido = ${conexion.escape(datos.seguido)} AND id_usuario_seguidor = ${conexion.escape(datos.seguidor)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
}

const getFolowers = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM seguir WHERE id_usuario_seguidor = ${conexion.escape(id)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }
            else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
}

const userByIdLimit = (id,callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT id_usuario, nombre, avatar FROM usuarios WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(!err){
                callback(null, res)
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
}

const addChat = (chat,callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO chat SET ?`,chat, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
}

const getChatUsers = (data, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM chat WHERE id_usuario_uno = ${conexion.escape(data.id_usuario_uno)} AND id_usuario_dos = ${conexion.escape(data.id_usuario_dos)} OR id_usuario_uno = ${conexion.escape(data.id_usuario_dos)} AND id_usuario_dos = ${conexion.escape(data.id_usuario_uno)}`, (err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
            }
        })
    }
    // conexion.end();
}

const getUserByName = (name, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT id_usuario, nombre, avatar  FROM usuarios WHERE nombre = ${conexion.escape(name)}`,(err, res) => {
            if(!err){
                callback(null, res);
            }else{
                console.log(err.code);
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
        addVideo,
        videoByIdUser,
        userById,
        deleteVideo,
        allVideos,
        videoById,
        addComent,
        comentByIdVideo,
        videoByNameUser,
        checkFollow,
        follow,
        unFollow,
        getFolowers,
        userByIdLimit,
        addChat,
        getChatUsers,
        getUserByName
    };