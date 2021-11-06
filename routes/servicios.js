var express = require('express');
var router = express.Router();
var serviciosModel = require('../models/serviciosModel');



/* GET home page. */
router.get('/', async function(req, res, next) {
  var servicios = await serviciosModel.getServicios()

  res.render('servicios', {
     isServicios: true,
     servicios
  }); // servicios.hbs
});

module.exports = router;