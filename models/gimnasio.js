const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gimnasioSchema = new Schema({
    tipo: String,
    nivel: String,
    numeroentrenadores: Number,
    pokemonfamoso: String
})

//Creamos el modelo
const Gimnasio = mongoose.model('dbgimnasio', gimnasioSchema, "gimnasio");

module.exports = Gimnasio;
