
const router = require('express').Router();

const homeController = require('../controllers/HomeController');
/**
 * GET - Pagina de inicio
 */
router.get('/', homeController.home);
/**
 * GET - Pagina de registrar
 */
router.get('/registrar', homeController.registrarArticulo);
/**
 * GET - Pagina del map reduce
 */
router.get('/map-reduce', homeController.mapReduce);
/**
 * GET - Pagina del buscador por articulo
 */
router.get('/articulo/:id', homeController.detalleArticulo);

module.exports = router;
