var express = require('express');
var router = express.Router();
var serviciosModel = require('../models/serviciosModel');



/* GET home page. */
router.get('/', async function(req, res, next) {
//var servicios = await serviciosModel.getServicios()

 var servicios
  if (req.query.q == undefined){
       servicios = await serviciosModel.getServicios()
  } else {
      servicios = await serviciosModel.buscarServicios(req.query.q)
  }
  
  res.render('servicios', {// servicios.hbs
     isServicios: true,
     servicios,
     is_search:req.query.q !== undefined,
     q:req.query.q
  }); 
});

module.exports = router;