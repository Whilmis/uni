const { Router, response } = require('express');
/*
const {existeCarreraPorId} = require('../helpers/db-validators')
const { validarJWT, validarCampos } = require('../middlewares');
const { crearCarrera,obtenerCarreras,obtenerCarrera,actualizarCarrera,borrarCarrera } = require('../controllers/carreras');*/
const {existeMateriaPorId} = require('../helpers/db-validators')
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const {crearMateria, obtenerMaterias,obtenerMateria, actualizarMateria, borrarMateria } = require('../controllers/materias');
const router = Router();



router.get('/', obtenerMaterias );

router.get('/:id',[
    check('id').custom( existeMateriaPorId),
    validarCampos
],obtenerMateria);


router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'Las materia son obligatorias').not().isEmpty(),
    check('carrera', 'Las materia son obligatorias').not().isEmpty(),
    validarCampos,

] ,crearMateria);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'El codigo es obligatorio').not().isEmpty(),
    check('carrera', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos
],actualizarMateria);

router.delete('/:id',[
    validarJWT,
    validarCampos
], borrarMateria);






module.exports = router;