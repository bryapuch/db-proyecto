
const Articulo = require('../models/Articulo.js')
/**
 * obtenerLista
 * @description :: Esta function retorna los articulos paginados
 */
const obtenerLista = function(req, res){
    let pagina = req.query.page || 1;

    Articulo.find(function(err, articulos){
        if(err){
            return res.status(500).json({
                message: 'Error al obtener el articulo.',
                error: err
            });
        }
        return res.json(articulos);
    }).skip((pagina - 1) * 6).limit(6);
}
/**
 * obtenerOne
 * @description :: Retorna un articulo tomado del response de parametro title.
 */
const obtenerOne = function(req, res){

    const OldTitle = req.params.title;

    Articulo.findOne({title:OldTitle}, function(err, articulo){
        if (err) {
            return res.status(500).json({
                message: 'Error when getting Article.',
                error: err
            });
        }
        if(!articulo){
            return res.status(404).json({
                message: 'No such Article'
            });
        }
        return res.json(articulo);
    });
}
/**
 * changeArticle
 * @description:: funcion que modifica el articulo tomado del request de parametro del id. Se modifica tanto el texto y el titulo del articulo
 */
const changeArticle = async function(req, res){
    
    const _id = req.params.id;

    let articulo = await Articulo.findOneAndUpdate({id: _id}, {
        
        text: req.body.text,
        title: req.body.title
    
    })
    res.status(204).send(articulo);
}
/**
 * newArticle
 * @description:: esta funcion permite crear un articulo nuevo
 */
const newArticle = function(req=request, res = response ){

    const newArticulo = new Articulo({
        id      : req.body.idArticulo,
        text    : req.body.textArticulo.trim(),
        title   : req.body.titleArticulo.trim()
    });

    newArticulo.save(function(err, articulo){
        if(err){
            return res.status(500).json({
                message: 'Error when creating new Article',
                error: err
            });
        }
        return res.redirect('/registrar?created=true');
    });
}
/**
 * deleteArticle
 * @description:: Esta funcion elimina el articulo tomado de responde de parametro por id.
 */
const deleteArticle = function(req, res){

    const id = req.params.id;
    
    
    Articulo.deleteOne({id}, function(err, articulo){
        if(err){
            return res.status(500).json({
                message: 'Error when deleting Article.',
                error: err
            });
        }
        
        return res.status(204).json();
    })
}

module.exports = {
    obtenerLista,
    obtenerOne,
    changeArticle,
    newArticle,
    deleteArticle
}
