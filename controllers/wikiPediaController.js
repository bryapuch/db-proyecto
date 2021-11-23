const { response, request } = require('express');
const WikiPedia = require('../models/wikiPedia.js')

const obtenerLista = function(req, res = response){

    WikiPedia.find(function(err,wikis){
        if(err){
            return res.status(500).json({
                message: 'Error when getting article.',
                error: err
            });
        }
        return res.json(wikis);
    });
}

const obtenerOne = function(req = request, res = response){

    const OldTitle = req.params.title;

    WikiPedia.findOne({title:OldTitle}, function(err,wiki){
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

const changeArticle = async function(req = request, res = response){
    
    const _id = req.params.id;

    let articulo = await WikiPedia.findOneAndUpdate({id: _id}, {
        
        text: req.body.text,
        title: req.body.title
    
    })
    console.log(articulo);
    res.status(204).send(articulo);


}

const newArticle = function(req=request, res = response ){

    const newWiki = new WikiPedia({
        id      : req.body.idArticulo,
        text    : req.body.textArticulo.trim(),
        title   : req.body.titleArticulo.trim()
    });

    newWiki.save(function(err,wiki){
        if(err){
            return res.status(500).json({
                message: 'Error when creating new Article',
                error: err
            });
        }
        return res.redirect('/registrar?created=true');
    });
}

const deleteArticle = function(req = request, res = response){

    const id = req.params.id;
    
    
    WikiPedia.deleteOne({id}, function(err,wiki){
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