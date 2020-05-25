'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

function endPointComent(router){

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

}

module.exports = endPointComent;