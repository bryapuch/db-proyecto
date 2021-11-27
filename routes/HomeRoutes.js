
const router = require('express').Router();

const homeController = require('../controllers/HomeController');

router.get('/', homeController.home);

router.get('/registrar', homeController.registrarArticulo);

router.get('/map-reduce', homeController.mapReduce);

router.get('/articulo/:id', homeController.detalleArticulo);

module.exports = router;
