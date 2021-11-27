
const { Schema, model } = require('mongoose');


const ArticuloSchema = Schema({
    id:{
        type: String,
        unique: true
    },
    text:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    }
});

module.exports = model( 'Articulos', ArticuloSchema);
