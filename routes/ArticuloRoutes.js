
const router = require('express').Router();

const {
    obtenerLista,
    changeArticle,
    deleteArticle,
    newArticle,
    obtenerOne
} = require('../controllers/ArticuloController.js');

router.get('/', obtenerLista);

router.get('/:title', obtenerOne);

router.post('/', newArticle);

router.put('/:id', changeArticle);

router.delete('/:id', deleteArticle);

module.exports = router;
