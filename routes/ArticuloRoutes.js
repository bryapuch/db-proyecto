
const router = require('express').Router();

const {
    obtenerLista,
    changeArticle,
    deleteArticle,
    newArticle,
    obtenerOne
} = require('../controllers/ArticuloController.js');

/**
 * GET - todos los articulos
 */
router.get('/', obtenerLista);
/**
 * GET - un articulo
 */
router.get('/:title', obtenerOne);
/**
 * POST - crea un nuevo articulo
 */
router.post('/', newArticle);
/**
 * PUT - Modifica el articulo
 */
router.put('/:id', changeArticle);
/**
 * DELETE - Elimina el articulo
 */
router.delete('/:id', deleteArticle);

module.exports = router;
