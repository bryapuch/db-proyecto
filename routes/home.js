const { Router } = require('express');

const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Datos Avanzados' });
});

router.get('/registrar', function (req, res, next) {
  res.render('registrar', { title: 'Datos Avanzados' });
});

router.get('/map-Reduce', function (req, res, next) {
  res.render('mapReduce', { title: 'Datos Avanzados' });
});

module.exports = router;