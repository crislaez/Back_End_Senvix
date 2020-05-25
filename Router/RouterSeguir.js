'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

function endPointSeguir(router){

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
    });

    //conseguir todas las personas que un usuario sigue rute -> http://localhost:3001/api/getFolowers/id
    router.get('/getFolowers/:id', (req, res) => {
        let id = req.params.id;

        Database.getFolowers(id, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al recibir los followers`});

            res.status(200).json({success:true, data:data});
        })
    });

}

module.exports = endPointSeguir;