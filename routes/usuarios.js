
const { Router } = require('express');
const { check } = require('express-validator')


const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, esMailValido,existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

    router.get('/', usuariosGet)
    router.put('/:id',[
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('role').custom( esRoleValido),
        validarCampos
    ],usuariosPut)
    router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','el password debe ser mas de 6 letras').isLength({min:6}),
        // check('correo','El correo no es valido').isEmail(),
        // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('role').custom( esRoleValido),
        check('correo').custom(esMailValido),
        validarCampos
    ],usuariosPost)
    router.delete('/:id',[
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(existeUsuarioPorId),
    ],usuariosDelete)
    router.patch('/',usuariosPatch)


module.exports = router