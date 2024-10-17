const { Router, response } = require('express');

const {existeMaestroPorId,existeMaestroPorIdUser} = require('../helpers/db-validators')
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const {crearMaestros, obtenerMaestros, obtenerMaestro, actualizarMaestro,borrarMaestro,obtenerMaestroIdUser } = require('../controllers/maestros');
const router = Router();



router.get('/', obtenerMaestros );

router.get('/:id',[
    check('id').custom( existeMaestroPorId),
    validarCampos
],obtenerMaestro);

router.get('/user/:id',[
    check('id').custom( existeMaestroPorIdUser),
    validarCampos
],obtenerMaestroIdUser);


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('user_id', 'Las materia son obligatorias').not().isEmpty(),
    check('carrera', 'Las materia son obligatorias').not().isEmpty(),
    validarCampos,

],crearMaestros);

router.put('/:id', [
    validarJWT,
    validarCampos
],actualizarMaestro);



router.delete('/:id',[
    validarJWT,
    validarCampos
], borrarMaestro);






module.exports = router;