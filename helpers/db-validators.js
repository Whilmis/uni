const Role = require('../models/role');
const { Usuario, Categoria, Producto, Materia, Estudiante, Maestro, Carrera } = require('../models');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Categorias
 */
const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Productos
 */
const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeCarreraPorId = async(id) =>{
    const existeCarrera = await Carrera.findById(id);
    if ( !existeCarrera ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeMateriaPorId = async(id) =>{
    const existeMateria = await Materia.findById(id);
    if ( !existeMateria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeEstudiantePorId = async(id) =>{
    const existeEstudiante = await Estudiante.findById(id);
    if ( !existeEstudiante ) {
        throw new Error(`El id no existe ${ id }`);
    }

}
const existeEstudiantePorIdUser = async(id) =>{
    const existeEstudiante = await Estudiante.findOne({user_id: id});
    if ( !existeEstudiante ) {
        throw new Error(`El id estudiante no existe ${ id }`);
    }

}

const existeMaestroPorIdUser = async(id) =>{
    const existeMaestro = await Maestro.findOne({user_id: id});
    if ( !existeMaestro ) {
        throw new Error(`El id maestro no existe ${ id }`);
    }

}

const existeMaestroPorId = async(id) =>{
    const existeMaestro = await Maestro.findById(id);
    if ( !existeMaestro ) {
        throw new Error(`El id no existe ${ id }`);
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeCarreraPorId,
    existeMateriaPorId,
    existeEstudiantePorId,
    existeMaestroPorId,
    existeEstudiantePorIdUser,
    existeMaestroPorIdUser
}

