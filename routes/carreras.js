const { Router } = require('express');
const { check } = require('express-validator');
const {existeCarreraPorId} = require('../helpers/db-validators')
const { validarJWT, validarCampos } = require('../middlewares');
const { crearCarrera,obtenerCarreras,obtenerCarrera,actualizarCarrera,borrarCarrera } = require('../controllers/carreras');

const router = Router();



router.get('/', obtenerCarreras);

router.get('/:id',[
   check('id').custom( existeCarreraPorId),
    validarCampos,

   


], obtenerCarrera);


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('materia', 'Las materia son obligatorias').not().isEmpty(),
    validarCampos
],crearCarrera);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCarrera);

router.delete('/:id',[
    validarJWT,
    validarCampos
], borrarCarrera);






module.exports = router;