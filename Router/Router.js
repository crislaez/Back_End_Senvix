'use strict';

const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

//******** */

function endPoint(app){
    const router = express.Router();

    app.use('/api', router);

    //todos los usuarios ruta -> http://localhost:3001/api/allUsers
    router.get('/allUsers', (req, res) => {

        Database.allUser( (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `usuarios no encontrados`});

            res.status(200).json({success:true, data:data});
        })
    });
    
    //ingresar usuarios ruta -> http://localhost:3001/api/addUser
    router.post('/addUser', (req, res) => {
        let user = 
            {
                id_usuario: '',
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacimiento: req.body.nacimiento,
                sexo: req.body.sexo,
                correo: req.body.correo,
                clave: req.body.clave   
            }

        Database.addUser(user, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `usuarios no ingresado`});

            res.status(200).json({sucess:true, data:data});
        })
    });

    //loguear usuarios rute -> http://localhost:3001/api/login
    router.post('/login', (req, res) => {
        let user = 
            {
                correo: req.body.correo,
                clave: req.body.clave
            }

        Database.login(user, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `usuario no logueado`});

            res.status(200).json({success:true, data:data});
        })
    });

    //añadir videos rute -> http://localhost:3001/api/addVideo
    router.post('/addVideo',multipartMiddleware, (req, res) => {
        let aux = req.files.video.path.split('\\');

        let video = 
            {
                id_usuario: req.body.id_usuario,
                id_video: '',
                video: 'http://localhost:3001/video/'+aux[1],
                titulo_video: req.body.titulo_video
            };
        
        Database.addVideo(video, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al ingresar el video`});

            res.status(200).json({success:true});
        })
    })

}

module.exports = endPoint;