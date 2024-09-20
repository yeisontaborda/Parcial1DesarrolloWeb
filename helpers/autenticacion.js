'use strict'

const { response } = require("express");
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "yayhaJKAAJJu123!.";

// Función para generar un token para el usuario
function crearTokenUsuario(usuario) {
    var payload = {
        sub: usuario._id,
        username: usuario.username,
        role: usuario.role,
        iat: moment().unix(), // Timestamp de creación del token
        exp: moment().add(15, 'minutes').unix() // Token expira en 15 minutos
    }
    return jwt.encode(payload, secret); // Retorna el token encriptado
}

// Función para validar el token proporcionado por el usuario
function verificarToken(req, resp, next) {
    try {
        var tokenRecibido = req.headers.authorization; // Obtiene el token de la cabecera
        var tokenLimpio = tokenRecibido.replace('Bearer ', ''); // Limpieza del formato del token
        var payload = jwt.decode(tokenLimpio, secret); // Decodifica el token
        req.header.UserId = payload.sub; // Almacena el ID del usuario en el header
        req.usuario = payload; // Añade el objeto completo del usuario a la solicitud

        next(); // Continúa al siguiente middleware
    } catch (ex) {
        resp.status(403).send({ message: "El token proporcionado no es válido." }); // Mensaje de error
    }
}

module.exports = {
    crearTokenUsuario,
    verificarToken
}

