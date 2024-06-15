const { Router, response } = require('express');
/*

const {existeMateriaPorId} = require('../helpers/db-validators')
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const {crearMateria, obtenerMaterias,obtenerMateria, actualizarMateria,borrarMateria } = require('../controllers/materias');*/
const {existeEstudiantePorId} = require('../helpers/db-validators')
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const {crearEstudiante, obtenerEstudiantes, obtenerEstudiante, actualizarEstudiante,borrarEstudiante } = require('../controllers/estudiantes');
const router = Router();



router.get('/', obtenerEstudiantes );

router.get('/:id',[
    check('id').custom( existeEstudiantePorId),
    validarCampos
],obtenerEstudiante);


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('user_id', 'Las materia son obligatorias').not().isEmpty(),
    check('carrera', 'Las materia son obligatorias').not().isEmpty(),
    validarCampos,

],crearEstudiante);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('user_id', 'El user_id es obligatorio').not().isEmpty(),
    validarCampos
],actualizarEstudiante);

router.delete('/:id',[
    validarJWT,
    validarCampos
], borrarEstudiante);






module.exports = router;