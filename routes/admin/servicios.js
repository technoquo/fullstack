var express = require('express');
var router = express.Router();
var serviciosModel = require('../../models/serviciosModel');



router.get('/', async function (req, res, next) {
    var servicios = await serviciosModel.getServicios();

    res.render('admin/servicios', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        servicios
    });
});

router.get('/eliminar/:id',async(req,res,next)=>{

  var id = req.params.id;
  await serviciosModel.deleteSerivcioById(id);
  res.redirect('/admin/servicios');
})

/** para agregar  > formulario  */
  router.get('/agregar', (req,res,next) => {
       res.render('admin/agregar',{
           layout: 'admin/layout'
       });
  });

/** insert > post */

router.post('/agregar', async (req, res, next) => {

    try {
        console.log(req.body);
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await serviciosModel.insertServicios(req.body)
            res.redirect('/admin/servicios')
        } else {
            res.render('admin/agregar',{
                layout:'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error: true,
            message: 'No  se cargo la novedad' 
        })
    }
})


router.get('/modificar/:id',async(req,res,next) =>{
    var id= req.params.id;
    var servicios = await serviciosModel.getServiciosById(id);

    res.render('admin/modificar',{
        layout:'admin/layout',
        servicios
    });

});

  router.post('/modificar', async(req,res,next)=>{
        try{
         var obj ={
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
         }
          console.log(obj);
          await serviciosModel.UpdateServiciosbyId(obj, req.body.id);
          res.redirect('/admin/servicios');

        } catch(error){
            // aca llegamos IMPORTANTE 
        }
        
  });

module.exports = router;