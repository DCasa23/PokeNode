const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrenadorSchema = new Schema({
    nombre: String,
    tipo: String,
    nivel: String,
    amistad: String
})

//Creamos el modelo
const Entrenador = mongoose.model('dbentrenador', entrenadorSchema, "entrenador");

module.exports = Entrenador;
