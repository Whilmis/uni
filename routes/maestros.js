const { Router, response } = require('express');

const {existeMaestroPorId} = require('../helpers/db-validators')
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const {crearMaestros, obtenerMaestros, obtenerMaestro, actualizarMaestro,borrarMaestro } = require('../controllers/maestros');
const router = Router();



router.get('/', obtenerMaestros );

router.get('/:id',[
    check('id').custom( existeMaestroPorId),
    validarCampos
],obtenerMaestro);


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('user_id', 'Las materia son obligatorias').not().isEmpty(),
    check('carrera', 'Las materia son obligatorias').not().isEmpty(),
    validarCampos,

],crearMaestros);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('user_id', 'El user_id es obligatorio').not().isEmpty(),
    validarCampos
],actualizarMaestro);

router.delete('/:id',[
    validarJWT,
    validarCampos
], borrarMaestro);






module.exports = router;