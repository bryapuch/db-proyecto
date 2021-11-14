const { Router } = require('express');

const {
    obtenerLista,
    changeArticle,
    deleteArticle,
    newArticle,
    obtenerOne
} = require('../controllers/wikiPediaController.js');

const router = Router();

router.get('/', obtenerLista);

router.get('/:title',obtenerOne);

router.post('/',newArticle);

router.put('/:id', changeArticle);

router.delete('/:id', deleteArticle);

module.exports = router;