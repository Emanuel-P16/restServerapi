const {Router} = require('express')

const {check} = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/producto');
const { existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');



const router = Router();


router.get('/',obtenerProductos)
router.get('/:id',[
    check('id',"No es un ID valido").isMongoId(),
    validarCampos,
    check('id').custom(existeProducto)
],
obtenerProducto)
router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearProducto)
router.put('/:id',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarProducto)
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id',"No es un id valido").isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],borrarProducto)

module.exports = router