'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './video'}) // ./video es pa carpeta donde se subira la foto

const Database = require('../Database/Database');

function endPointUsers(router){

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

    //mostrar usuario por id rute -> http://localhost:3001/api/user/:id
    router.get('/user/:id', (req, res) => {
        let id_usuario = req.params.id;

        Database.userById(id_usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al mostrar el usuario`});

            res.status(200).json({sucess:true, data:data});
        })
    });

    //usuario por id pero limitando los datos  rute -> http://localhost:3001/api/userByIdLimit/id
    router.get('/userByIdLimit/:id', (req, res) => {
        let id = req.params.id;

        Database.userByIdLimit(id, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al recibir los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    // conseguir usuarios por nombre rute->http://localhost:3001/api/getUserByName/:id
    router.get('/getUserByName/:id',(req, res) => {
        let name = req.params.id;

        Database.getUserByName(name, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al recuperar el usuario`});

            res.status(200).json({success:true, data:data});
        })
    });

    //modificar foto de perfil y banner rute->http://localhost:3001/api/updateFilesUser/:id
    router.put('/updateFilesUser/:id',multipartMiddleware, (req, res) => {
        let aux = req.files.avatar.path.split('\\');
        let aux2 = req.files.banner.path.split('\\');

        let usuario = 
            {
                id_usuario:req.params.id,
                avatar: 'http://localhost:3001/video/'+aux[1],
                banner: 'http://localhost:3001/video/'+aux2[1],
            };

        Database.updateFilesUser(usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `error al actualiza el usuario`});

            res.status(200).json({success:true});
        })
    })
}

module.exports = endPointUsers;