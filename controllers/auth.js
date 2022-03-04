const bcryptjs = require('bcryptjs');
const { response } = require('express')

const Usuario = require('../models/usuario')
const login = async (req,res = response ) =>{

    const { correo, password } = req.body;


    try{

        /// VERIFICAR SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos - correo'
            })
        }
        /// verificar si el usuario está activo

        if ( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }
        //// Verificar la contraseña
            const validPassword = bcryptjs.compareSync( password, usuario.password)
            if(!validPassword){
                return res.status(400).json({
                    msg: 'Password no es correcto'
                })
            }
        /// Generar el JWT


        res.json({
            msg: 'Login ok'
        })
    }catch(error){
        console.log(error)
        return res.status(500).json(
            { 
                msg: 'Hable con el administrador'
            }
        )
    }
}


module.exports = {
    login
}