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
    router.post('/addUser',multipartMiddleware, (req, res) => {
        let aux = req.files.avatar.path.split('\\');
        let aux2 = req.files.banner.path.split('\\');
        let user = 
            {
                id_usuario: '',
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacimiento: req.body.nacimiento,
                sexo: req.body.sexo,
                correo: req.body.correo,
                clave: req.body.clave,
                avatar: 'http://localhost:3001/video/'+aux[1],
                banner: 'http://localhost:3001/video/'+aux2[1],
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

            res.status(200).json({success:true, data:data});
        })
    });

    //mostrar videos por id de usuario rute -> http://localhost:3001/api/video/:id
    router.get('/video/:id', (req, res) => {
        let id_usuario = req.params.id;
        Database.videoByIdUser(id_usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al mostrar los videos`});

            res.status(200).json({success: true, data:data});
        })
    });

    //mostrar usuario por id rute -> http://localhost:3001/api/user/:id
    router.get('/user/:id', (req, res) => {
        let id_usuario = req.params.id;

        Database.userById(id_usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al mostrar el usuario`});

            res.status(200).json({sucess:true, data:data});
        })
    });

    //borrar video por id rute -> http://localhost:3001/api/deleteVideo/:id
    router.delete('/deleteVideo/:id', (req, res) => {
        let id_video = req.params.id;

        Database.deleteVideo(id_video, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al mostrar el usuario`});

            res.status(200).json({success:true, data:'Borrado'})
        })
    });

    //mostrar todos los videos rute -> http://localhost:3001/api/allVideo
    router.get('/allVideo', (req, res) => {
        Database.allVideos( (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al mostrar los videos`});

            res.status(200).json({sucess:true, data:data});
        })
    });

    //mostramos video por id rute -> http://localhost:3001/api/getVideo/:id
    router.get('/getVideo/:id', (req, res) => {
        let id_video = req.params.id;

        Database.videoById(id_video, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al mostrar el video`});

            res.status(200).json({success:true, data:data});
        })
    });

    //añadir comentarios rute -> http://localhost:3001/api/addComent
    router.post('/addComent', (req, res) => {
        let coment = 
            {
                id_video: req.body.id_video,
                id_comentario: '',
                comentario: req.body.comentario,
                usuario: req.body.usuario
            }

        Database.addComent(coment, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al agregar el comentario`});

            res.status(200).json({success:true, data:data});
        })
    });

    //ver todos los comentarios por id rute -> http://localhost:3001/api/getComent/:id
    router.get('/getComent/:id', (req, res) => {
        let id_video = req.params.id;

        Database.comentByIdVideo(id_video, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al agregar el comentario`});
            
            res.status(200).json({success:true, data:data});
        })
    });
    
    //mostrar todos los videos por el nombre de usuario para el buscador http://localhost:3001/api/getVideoName/:id
    router.get('/getVideoName/:id', (req, res) => {
        let nombre = req.params.id;

        Database.videoByNameUser(nombre, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al buscar los videos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //comprobar si 2 usuarios se sigue rute -> http://localhost:3001/api/checkFollow
    router.post('/checkFollow', (req, res) => {
        let idUsuarios = 
            {
                seguido:req.body.seguido,
                seguidor:req.body.seguidor
            };

        Database.checkFollow(idUsuarios, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al comprobar los follow`});

            res.status(200).json({sucess:true, data:data});
        })
    });

    //seguir un usuario a otro rute -> http://localhost:3001/api/follow
    router.post('/follow', (req, res) => {
        let datos = 
            {
                id_usuario_seguido:req.body.seguido,
                id_usuario_seguidor:req.body.seguidor,
                id_seguimiento:''
            };

        Database.follow(datos, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al ingresar los follow`});

            res.status(200).json({success:true, data:data});
        })
    });

    //dejar de seguir rute -> http://localhost:3001/api/unFollow
    router.delete('/unFollow', (req, res) => {
        let datos = 
            {
                seguido:req.body.seguido,
                seguidor:req.body.seguidor
            };

        Database.unFollow(datos, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al ingresar los follow`});

            res.status(200).json({success:true})
        })
    })

    //conseguir todas las personas que un usuario sigue rute -> http://localhost:3001/api/getFolowers/id
    router.get('/getFolowers/:id', (req, res) => {
        let id = req.params.id;

        Database.getFolowers(id, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al recibir los followers`});

            res.status(200).json({success:true, data:data});
        })
    })

    //usuario por id pero limitando los datos  rute -> http://localhost:3001/api/userByIdLimit/id
    router.get('/userByIdLimit/:id', (req, res) => {
        let id = req.params.id;

        Database.userByIdLimit(id, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al recibir los datos`});

            res.status(200).json({success:true, data:data});
        })

    })
}

module.exports = endPoint;