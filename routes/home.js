const { Router } = require('express');
const WikiPedia = require('../models/wikiPedia.js')

const router = Router();

/* GET home page. */
router.get('/',async function (req, res) {
  let datos = await WikiPedia.find({}).limit(10);
  let articuloId = false;
  
  if(req.query.articuloId){
    articuloId = req.query.articuloId;
  }
  
  res.render('index', { title: 'Datos Avanzados', datos: datos, articuloId  });
});

router.get('/registrar', function (req, res, next) {
  res.render('registrar', { title: 'Datos Avanzados' });
});

router.get('/map-Reduce', function (req, res, next) {
  res.render('mapReduce', { title: 'Datos Avanzados' });
});

router.get('/articulo/:id', async function (req, res, next) {
  
  let articuloID = req.params.id;
  let articulo = await WikiPedia.find({id: articuloID});

  res.render('articulo', { title: 'Datos Avanzados', articulos:articulo[0]});

});

module.exports = router;