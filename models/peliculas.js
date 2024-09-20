'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definición del esquema para la colección de películas
var PeliculasSchema = Schema({
    titulo: { type: String, required: true },        // Título de la película
    director: { type: String, required: true },      // Nombre del director
    duracionHoras: { type: Number, required: true }, // Duración de la película en horas
    añoLanzamiento: { type: Number, required: true },// Año en que se lanzó la película
    productora: { type: String, required: true },    // Nombre de la productora de la película
    precio: { type: Number, required: true },        // Precio de la película
    categoria: { type: String, required: true }      // Categoría de la película (añadido para la nueva funcionalidad)
});

// Exportar el modelo de películas para su uso en otras partes de la aplicación
module.exports = mongoose.model('peliculas', PeliculasSchema);
