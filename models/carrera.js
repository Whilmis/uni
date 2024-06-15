const { Schema, model } = require('mongoose');

const CarreraSchema = Schema({
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
    codigo: {
        type: String,
        required: [true, 'El codigo es obligatorio']
    },
    materia: {
        type: Schema.Types.Array,
        required: [true, 'las materias son obligatorias']
    }
    

});




module.exports = model( 'Carrera', CarreraSchema );
