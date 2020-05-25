'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

function endPointVideo(router){
    
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

    //mostrar todos los videos por el nombre de usuario para el buscador http://localhost:3001/api/getVideoName/:id
    router.get('/getVideoName/:id', (req, res) => {
        let id_usuario = req.params.id;

        Database.videoByNameUser(id_usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al buscar los videos`});

            res.status(200).json({success:true, data:data});
        })
    });

}

module.exports = endPointVideo;