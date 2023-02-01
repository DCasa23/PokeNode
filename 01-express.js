const express = require('express')
const bodyParser=require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

require('dotenv').config()
const port=process.env.PORT||3005 
/*
//Conexión a la Base de Datos
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { userNewUrlParser: true, useUnifiedTopology: true });

*/
//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
/*const user = 'cursonode';
const password = 'PaYdnnjikcVSCLRz';
const dbname = 'database_pokemon';*/
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.q4mbecl.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


//Motor de Plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Middleware
app.use(express.static(__dirname + '/public'));

//Llamadas a las rutas:
app.use('/', require('./router/rutas.js'));
app.use('/pokemon', require('./router/pokemon.js'));
app.use((req, res) => {

  res.status(404).render("404",
    {
      cabecera: "Error 404",
      tituloError: "ERROR DEL 404",
      descripcion: "Page Not Found, Chiquillo. Ares dejame descansar"
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
