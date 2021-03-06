const { Router } = require('express');
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login )
router.post('/google',[
    check('id_token','el token es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn)


module.exports = router