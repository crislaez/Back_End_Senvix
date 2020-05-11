'use strict';

const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

//******** */

function endPoint(app){
    const router = express.Router();

    app.use('/api', router);

    //todos los usuarios http://localhost:3001/api/allUsers
    router.get('/allUsers', (req, res) => {

        Database.allUser( (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `usuarios no encontrados`});

            res.status(200).json({success:true, data:data});
        })
    })
}

module.exports = endPoint;