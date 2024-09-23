const { Schema, model } = require('mongoose');

const MateriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true   

    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    tipo: {
        type: String,
        required: true,
        default: 'NO_TOMADA',
        emun: ['NO_TOMADA', 'TOMADA','TOMANDOSE', 'POR_TOMAR']
    }
    ,
    clave: {
        type: String,
        required: [true, 'La clave es obligatoria']
    },
    nota: {
        type: Schema.Types.Array,
        default: [0,0,0,0],
        required: [true, 'la nota es obligatoria ']
    },
    carrera: {
        type: Schema.Types.Array,
        required: [true, 'la carrera es obligatoria ']
    }
    

});




module.exports = model( 'Materia', MateriaSchema );