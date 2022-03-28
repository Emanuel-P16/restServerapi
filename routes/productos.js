const {Router} = require('express')

const {check} = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/producto');
const { validarJWT, validarCampos } = require('../middlewares');



const router = Router();


router.get('/',obtenerProductos)
router.get('/:id',obtenerProducto)
router.post('/',[
    validarJWT,
    validarCampos
],crearProducto)
router.put('/:id',[
    validarJWT,
    validarCampos
],actualizarProducto)
router.delete('/:id',borrarProducto)

module.exports = router