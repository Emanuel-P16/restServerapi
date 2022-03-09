const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
            const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
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


const googleSignIn = async  (req,res = response) => {

    const { id_token } = req.body

    try{

        const {nombre,correo,img} = await  googleVerify(id_token)

        let usuario = await Usuario.findOne({correo})
         
     
        if ( !usuario ) {
            /// hay que crearlo
            const data =  { 
                nombre,
                correo,
                password: ':P',
                img,
                role: 'USER_ROLE',
                google:true
            }

           
            usuario = new Usuario(data)
            // console.log(usuario)
            await usuario.save()
        }

        /// si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador , usuario bloqueado'
            })
        }

        /// generar el JWT
        const token =  await generarJWT( usuario.id )

        
        res.json({
            usuario,
            token
        })
    }catch{
        return res.status(400).json({
            ok: false,
            msg:'El token no se pudo verificar'
        })
    }
    
}

module.exports = {
    login,
    googleSignIn
}