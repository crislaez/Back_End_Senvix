'use strict';

//para suar dotenv para el archivo .env
require('dotenv').config();
//requerimos express
const express = require('express');
//llamamos a las funciones qeu esten en la carpeta router
const endPoint = require('./Router/Router');

//usamos express en una variable
const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const router = express.Router();
//para poder coger la ruta de la carpeta htt://localhost:3001/video/nombrefoto.jpg
app.use('/video', express.static(__dirname + '/video', {
    maxAge: '12h'
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//activamos la funcion donde estan todas las rutas endpoint
endPoint(app);



app.listen(process.env.PORT, () => {
    console.log(`Api rest corriendo en http://${process.env.SERVIDOR}:${process.env.PORT}`)
})