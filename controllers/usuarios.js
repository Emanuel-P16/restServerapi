const { response,request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')



const usuariosGet  = async(req = request,res = response)=> {

    // const query = req.query;
    // const { q,nombre = 'no name', page = '1', apikey} = req.query
    const { limite = 5,desde = 0} = req.query;
    const query = { estado: true}
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(query);

    const [total,usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req,res)=>{

    const {id  } = req.params;
    const { _id,password , google, correo, ...resto} = req.body

    // TODO VALIDAR CONTRA BASE DE DATOS
    if ( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt)
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto,{new:true});
    res.json({
        usuario
    })
}
const usuariosPost = async(req = request,res)=>{
    // const body = req.body;
   
    const {nombre,correo,password,role} = req.body
    const usuario = new Usuario({ nombre, correo, password,role})
   
     // verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo})
    // if (existeEmail) {
    //     return  res.status(400).json({
    //         msg: 'ese correo ya está registrado'
    //     })
    // }
     //encriptar la contraseña
        const salt = bcryptjs.genSaltSync() 
        usuario.password = bcryptjs.hashSync(password,salt)
     //guardar en BD
    await usuario.save();
    res.json({
        usuario
    })
}
const usuariosDelete = (req,res)=>{


    res.json({
        ok:true,
        msg: 'DELETE API - controller'
    })
}

const usuariosPatch = (req,res)=>{
    res.json({
        ok:true,
        msg: 'PATCH API - controller'
    })
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}