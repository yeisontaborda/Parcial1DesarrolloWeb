'use strict';

const peliculas = require('../models/peliculas');
var Peliculas = require('../models/peliculas');

///////////////////////////////////////////Función para listar todas las películas disponibles
async function listarPeliculas(req, res) {
    try {
        // Obtener todas las películas registradas en la base de datos
        const peliculasEncontradas = await peliculas.find({});

        // Verificar si no hay películas almacenadas
        if (!peliculasEncontradas || peliculasEncontradas.length === 0) {
            return res.status(404).send({ message: 'No se han encontrado películas registradas.' });
        }

        // Enviar la lista de películas encontradas
        res.status(200).send({ peliculas: peliculasEncontradas });
    } catch (err) {
        console.error(err); // Registro del error en la consola para depuración
        res.status(500).send({ message: 'Ocurrió un error al intentar listar las películas.' });
    }
}

///////////////////////////////////////////Función para agregar una nueva película (solo administradores)
function crearPelicula(req, res) {
    var datosRecibidos = req.body;
    var usuarioAutenticado = req.usuario; // El usuario autenticado para validar permisos

    // Verificar si el usuario tiene rol de administrador
    if (usuarioAutenticado.role !== 'admin') {
        return res.status(403).send({ message: "Acceso denegado. Solo los administradores pueden agregar películas." });
    }

    // Crear una nueva instancia del modelo de película
    var nuevaPelicula = new peliculas();
    nuevaPelicula.titulo = datosRecibidos.titulo;
    nuevaPelicula.director = datosRecibidos.director;
    nuevaPelicula.añoLanzamiento = datosRecibidos.añoLanzamiento;
    nuevaPelicula.productora = datosRecibidos.productora;
    nuevaPelicula.precio = datosRecibidos.precio;

    // Guardar la nueva película en la base de datos
    nuevaPelicula.save().then(
        (peliculaGuardada) => {
            res.status(200).send({ peliculaGuardada: peliculaGuardada });
        },
        err => {
            console.log(err); // Registro del error en la consola para depuración
            res.status(500).send({ message: "No se pudo registrar la película. Intente nuevamente." });
        }
    );
}

///////////////////////////////////////////Función para filtrar películas por categoría
function buscarPeliculasPorCategoria(req, res) {
    const categoria = req.params.categoria; // Obtener la categoría del parámetro
    const precioMaximo = req.params.precioMaximo; // Obtener el precio máximo del parámetro

    // Convertir el precio a número
    const precio = parseFloat(precioMaximo);

    // Verificar que la categoría sea válida
    if (!categoria) {
        return res.status(400).send({ message: 'Parámetro inválido. Asegúrate de enviar una categoría válida.' });
    }

    // Verificar que el precio sea válido
    if (isNaN(precio)) {
        return res.status(400).send({ message: 'Parámetro inválido. Asegúrate de enviar un precio válido.' });
    }

    // Consultar las películas según la categoría y el precio especificados
    peliculas.find({
        categoria: categoria,          // Filtrar por categoría
        precio: { $lte: precio }      // Precio menor o igual al ingresado
    })
    .then(peliculasEncontradas => {
        // Verificar si se encontraron películas
        if (!peliculasEncontradas || peliculasEncontradas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron películas que cumplan con los criterios.' });
        }

        // Devolver las películas encontradas
        res.status(200).send({ peliculas: peliculasEncontradas });
    })
    .catch(err => {
        console.error(err); // Para depuración
        res.status(500).send({ message: 'Error al obtener las películas.' });
    });
}

///////////////////////////// Exportar las funciones para su uso en otras partes del sistema
module.exports = {
    crearPelicula,
    listarPeliculas,
    buscarPeliculasPorCategoria
}

