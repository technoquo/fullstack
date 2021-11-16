var express = require('express');
var router = express.Router();
var serviciosModel = require('../models/serviciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;





/* GET home page. */
router.get('/', async function(req, res, next) {
//var servicios = await serviciosModel.getServicios()

 var servicios
  if (req.query.q == undefined){
       servicios = await serviciosModel.getServicios()
  } else {
      servicios = await serviciosModel.buscarServicios(req.query.q)
  }

  servicios = servicios.map(servicios =>{
    if (servicios.img_id){
          const imagen = cloudinary.url(servicios.img_id, {
              width:960,
              height:200,
              crop: 'pad'
          });
          return{
             ...servicios,
              imagen
          }
    } else {
         return{
             ...servicios,
             imagen:''
         }
    }


});
  
  res.render('servicios', {// servicios.hbs
     isServicios: true,
     servicios,
     is_search:req.query.q !== undefined,
     q:req.query.q
  }); 
});

module.exports = router;