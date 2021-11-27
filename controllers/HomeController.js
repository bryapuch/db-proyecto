
const Articulo = require('../models/Articulo')

const home = async function (req, res) {

    let datos = await Articulo.find({}).sort([['_id', -1]]).limit(10);
    let articuloId = false;
  
    if (req.query.articuloId) {
      articuloId = req.query.articuloId; }
  
    res.render('index', { title: "Home", datos: datos, articuloId });
  
}

const registrarArticulo = function (req, res, next) {
  
    let created = req.query.created;

    res.render('registrar', { title: "Nuevo Articulo", created });
  
}

const mapReduce = function (req, res, next) {

    res.render('mapReduce', { title: "MapReduce" });
  
}

const detalleArticulo = async function (req, res, next) {

    let articuloID = req.params.id;
    let articulo = await Articulo.find({ id: articuloID });
  
    res.render('articulo', { title: `Articulo ${articuloID  }`, articulos: articulo[0] });
  
}

module.exports = {
    home,
    registrarArticulo,
    mapReduce,
    detalleArticulo,
}
