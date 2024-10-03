const { Router, response } = require('express');
/*
const {existeCarreraPorId} = require('../helpers/db-validators')
const { validarJWT, validarCampos } = require('../middlewares');
const { crearCarrera,obtenerCarreras,obtenerCarrera,actualizarCarrera,borrarCarrera } = require('../controllers/carreras');*/
const {existeMateriaPorId} = require('../helpers/db-validators')
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const {crearMateriaP, obtenerMateriasP,obtenerMateriaP, actualizarMateriaP, borrarMateriaP } = require('../controllers/materiaPs');
const router = Router();



router.get('/', obtenerMateriasP );

router.get('/:id',[
    check('id').custom( existeMateriaPorId),
    validarCampos
],obtenerMateriaP);


router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clave', 'Las materia son obligatorias').not().isEmpty(),
    check('carrera', 'Las materia son obligatorias').not().isEmpty(),
    validarCampos,

] ,crearMateriaP);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarMateriaP);

router.delete('/:id',[
    validarJWT,
    validarCampos
], borrarMateriaP);






module.exports = router;