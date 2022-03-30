
const {Router} = require('express')

const {check} = require('express-validator')
const { cargaArchivo } = require('../controllers/uploads')

const router = Router()

router.post('/',[
    
],cargaArchivo)


module.exports = router