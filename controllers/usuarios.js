const { response,request } = require('express')
const usuariosGet  = (req = request,res = response)=> {

    // const query = req.query;
    const { q,nombre = 'no name', page = '1', apikey} = req.query
    res.json({
        ok:true,
        msg: 'get API - controller',
        q,
        nombre,
        apikey 
    })
}

const usuariosPut = (req,res)=>{

    const id = req.params.id
    res.json({
        ok:true,
        msg: 'PUT API - controller',
        id
    })
}
const usuariosPost = (req = request,res)=>{
    // const body = req.body;
    const { nombre , edad} = req.body

    res.json({
        ok:true,
        msg: 'POST API - controller',
        nombre,
        edad
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