const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadSchema = new Schema({
    nombre: String,
    tienegimnasio: String,
    numerocasas: Number,
    region: String
})

//Creamos el modelo
const Ciudad = mongoose.model('database_ciudad', ciudadSchema, "ciudad");

module.exports = Ciudad;
