'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

function endPointChat(router){

    //agregamos los mensajes del chat rute->http://localhost:3001/api/addChat
    router.post('/addChat', (req, res) => {
        let chat = 
            {   
                id_chat:'',
                id_usuario_uno:req.body.id_usuario_uno,
                id_usuario_dos:req.body.id_usuario_dos,
                mensaje_chat:req.body.mensaje_chat
            };
        
        Database.addChat(chat, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al guardar el mensaje`});

            res.status(200).json({success:true, data:data});
        })
    });

    //mostramos el chat por lños 2 usuarios rute->http://localhost:3001/api/getChatUsers
    router.post('/getChatUsers', (req, res) => {
        let dato = 
            {
                id_usuario_uno:req.body.id_usuario_uno,
                id_usuario_dos:req.body.id_usuario_dos
            };

        Database.getChatUsers(dato, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al recuperar los mensaje`});

            res.status(200).json({success:true, data:data});
        })
    });

    //para borrar los mensajes del chat rute->http://localhost:3001/api/deleteChat/:id
    router.delete('/deleteChat/:id', (req, res) => {
        let id_chat = req.params.id;

        Database.deleteChat(id_chat, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al borrar el mensaje`});

            res.status(200).json({success:true});
        })
    });

    //para saber el ultimo mensaje entre 2 usuarios  rute->http://localhost:3001/api/lastMessageChat
    router.post('/lastMessageChat', (req, res) => {
        let data = 
            {
                id_usuario_uno:req.body.id_usuario_uno,
                id_usuario_dos:req.body.id_usuario_dos
            };

        Database.lastMessageChat(data, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al borrar el mensaje`});

            res.status(200).json({success:true, data:data});
        })
    });

}

module.exports = endPointChat;