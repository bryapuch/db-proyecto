const { Schema, model } = require('mongoose');


const WikiPediaSchema = Schema({
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

WikiPediaSchema.methods.toJSON = function(){
    const {_id, ...data} = this.toObject();
    return data;
}

module.exports = model( 'WikiPedia', WikiPediaSchema);