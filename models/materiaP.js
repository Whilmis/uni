const { Schema, model } = require('mongoose');

const MateriaPSchema = Schema({
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
        default: 'ABIERTA',
        emun: ['ABIERTA','PENDIENTE', 'APROVADA','RECHAZADA','ENCURSO']
    }
    ,
    clave: {
        type: String,
        required: [true, 'La clave es obligatoria']
    },

    carrera: {
        type: Schema.Types.Array,
        required: [true, 'la carrera es obligatoria ']
    }
    

});




module.exports = model( 'MateriaP', MateriaPSchema );