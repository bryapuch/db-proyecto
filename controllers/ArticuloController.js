
const Articulo = require('../models/Articulo.js')

const obtenerLista = function(req, res){

    Articulo.find(function(err, articulos){
        if(err){
            return res.status(500).json({
                message: 'Error al obtener el articulo.',
                error: err
            });
        }
        return res.json(articulos);
    });
}

const obtenerOne = function(req, res){

    const OldTitle = req.params.title;

    Articulo.findOne({title:OldTitle}, function(err, articulo){
        if (err) {
            return res.status(500).json({
                message: 'Error when getting Article.',
                error: err
            });
        }
        if(!wiki){
            return res.status(404).json({
                message: 'No such Article'
            });
        }
        return res.json(wiki);
    });
}

const changeArticle = async function(req, res){
    
    const _id = req.params.id;

    let articulo = await Articulo.findOneAndUpdate({id: _id}, {
        
        text: req.body.text,
        title: req.body.title
    
    })
    console.log(articulo);
    res.status(204).send(articulo);


}

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
