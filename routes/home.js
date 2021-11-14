const { Router } = require('express');

const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Datos Avanzados' });
});

module.exports = router;