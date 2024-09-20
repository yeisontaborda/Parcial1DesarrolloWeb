'use strict'

var express = require('express');

var peliculasController = 
require ('../controllers/peliculas');

var authenticationController 
= require("../controllers/autenticacion");

var token = require('../helpers/autenticacion');

///////////////////////////////////////////////////////////////

var routes = express.Router();

routes.post('/api/pelicula',
    token.verificarToken,
    peliculasController.crearPelicula
);


routes.post('/api/usuario',
    authenticationController.registrarUsuario
);

routes.post('/api/login',
    authenticationController.iniciarSesion
);

/////Para consultar todas las peliculas, se pone el token del admin y se consulta mediante get
routes.get('/api/peliculas', token.verificarToken, (req, res, next) => {
    if (req.usuario.role !== 'admin') {
        return res.status(403).send({ message: "No tienes permisos para ver películas." });
    }
    next();
}, peliculasController.listarPeliculas);



//////Para consultar peliculas mayor a x año y menor o igual a x precio
routes.get('/api/consulta/filtrar/:añoLanzamiento/:precioMaximo',token.verificarToken, peliculasController.buscarPeliculasPorCategoria);








module.exports = routes;