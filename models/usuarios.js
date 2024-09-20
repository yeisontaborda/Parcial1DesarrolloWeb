'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definición del esquema para la colección de usuarios
var UsuarioSchema = new Schema({
    username: { type: String, required: true, unique: true }, // Nombre de usuario único y obligatorio
    password: { type: String, required: true },               // Contraseña del usuario, obligatorio
    role: { type: String, enum: ['admin', 'usuario'], default: 'usuario' } // Rol del usuario, por defecto 'usuario'
});

// Exportar el modelo de usuarios para su uso en otras partes de la aplicación
module.exports = mongoose.model('usuarios', UsuarioSchema);
