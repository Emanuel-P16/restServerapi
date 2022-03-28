const {Router} = require('express')
const {check} = require('express-validator');
const { 
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const {validarCampos, validarJWT, tieneRole} = require('../middlewares')



const router = Router();

// {{url}}/api/categorias

/// obtener todas las categorias -PUBLICO
router.get('/',obtenerCategorias)

/// obtener una categoria - PUBLICO
router.get('/:id',[
    check('id',"No es un id Valido").isMongoId(),
    validarCampos,
    check('id').custom(existeCategoria)
],obtenerCategoria)


//// crear categoria - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearCategoria)

/// actualizar registro por id
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria)

/// borrar categoria - ADMIN
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom(existeCategoria),

],borrarCategoria)


module.exports = router