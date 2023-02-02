const express = require('express');
const router = express.Router();
const Gimnasio = require('../models/gimnasio');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayGimnasioDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayGimnasio que tenemos EN LA VISTA
        const arrayGimnasioDB = await Gimnasio.find();
        console.log(arrayGimnasioDB);
        res.render("gimnasio", { 
            arrayGimnasio: arrayGimnasioDB
        })
    } catch (error) {
        console.error(error)
    }
})



router.get('/creargimnasio', (req, res) => {
    res.render('creargimnasio'); //nueva vista que llamaremos Crear
 })
 
 
 router.post('/', async (req, res) => {
     const body = req.body //Gracias al body parser, de esta forma
     //podremos recuperar todo lo que viene del body
     console.log(body) //Para comprobarlo por pantalla
     try {
         const gimnasioDB = new Gimnasio(body) //Creamos un nuevo Gimnasio, gracias al modelo
         await gimnasioDB.save() //Lo guardamos con .save(), gracias a Mongoose
         res.redirect('/gimnasio') //Volvemos al listado
     } catch (error) {
         console.log('error', error)
     }
 })
 
 router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "gimnasio.ejs" le pusimos
    //a este campo gimnasio.id, por eso lo llamados con params.id
    try {
        const gimnasioDB = await Gimnasio.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Gimnasio” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(gimnasioDB) //Para probarlo por consola
        res.render('detallegimnasio', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            gimnasio: gimnasioDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detallegimnasio', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Gimnasio no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const gimnasioDB = await Gimnasio.findByIdAndDelete({ _id: id });
        console.log(gimnasioDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/gimnasio') //Esto daría un error, tal y como podemos ver arriba
        if (!gimnasioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el gimnasio.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Gimnasio eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const gimnasioDB = await Gimnasio.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(gimnasioDB)
        res.json({
            estado: true,
            mensaje: 'Gym editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Gym'
        })
    }
})
 
module.exports = router;
