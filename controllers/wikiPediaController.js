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

const changeArticle = function(req = request, res = response){
    
    const _id = req.params.id;

    WikiPedia.findOne({id: _id}, function(err,wiki){

        if(err){
            return res.status(500).json({
                message: 'Error when getting article',
                error: err
            });
        }

        if(!wiki){
            return res.status(404).json({
                message: 'No se encontro el articulo'
            });
        }

        wiki.id    = req.body.id    ? req.body.id    : wiki.id;
        wiki.text  = req.body.text  ? req.body.text  : wiki.text;
        wiki.title = req.body.title ? req.body.title : wiki.title;

        wiki.save(function(err, wiki){
            if(err){
                return res.status(500).json({
                    message: 'Error when updating article.',
                    error: err
                });
            }
            return res.json(wiki);
        });
    });
}

const newArticle = function(req=request, res = response ){

    const newWiki = new WikiPedia({
        id: req.body.id,
        text: req.body.text,
        title: req.body.title
    });

    newWiki.save(function(err,wiki){
        if(err){
            return res.status(500).json({
                message: 'Error when creating new Article',
                error: err
            });
        }
        return res.status(201).json(wiki);
    });
}

const deleteArticle = function(req = request, res = response){

    const id = req.params.id;
    
    WikiPedia.findByIdAndRemove(id, function(err,wiki){
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