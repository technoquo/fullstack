var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contacto', {
        isContacto: true
    }); // contacto.hbs
});

router.post('/', async (req, res, next) => {
   // console.log(req.body);
    var nombre = req.body.nombre; //1
    var email = req.body.email; //2
    var tel = req.body.tel; //3
    var comentarios = req.body.mensaje; //4

    var obj = {
        to: 'lelobo75@gmail.com',
        subject: 'CONTACTO WEB',
        html: nombre + ' se contacto a traves de la página y quiere saber más info a este: ' + email + '.<br/> Además hizo el siguiente comentario: ' + comentarios + '.<br/> Y su tel es ' + tel
    }
    
  
   var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
    }
    })

    var info = await transport.sendMail(obj);

    res.render('contacto', {
        message: 'Mensaje enviado correctamente'
        
    });
});

module.exports = router;