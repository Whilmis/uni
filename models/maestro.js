const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
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
    user_id: {
        type: String,
        required: [true, 'El user id es obligatorio']
    },
    carrera: {
        type: Schema.Types.Array,
        required: [true, 'la carrera es obligatoria ']
    },
    materias: {
        type: Schema.Types.Array,
        required: [true, 'las materias son obligatorias ']
    },
    seleccion:{
        type: Boolean,
        default: false,
        required: true

    }
    

});




module.exports = model( 'Maestro', MaestroSchema  );