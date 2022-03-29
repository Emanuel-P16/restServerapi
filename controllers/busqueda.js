const { response } = require("express");
const { Usuario,Categoria,Producto } = require("../models");
const { findById } = require("../models/categoria");
const {ObjectId} = require('mongoose').Types


const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
]



const buscarProductos = async(termino = '', res) => {
    const isMongoID = ObjectId.isValid(termino)
    if (isMongoID){
        const producto = await Producto.findById(termino)
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino,'i')

    const productos = await Producto.find({
        nombre: regex, estado:true
    })

    res.json({
        results: productos
    })
}


const buscarCategorias = async (termino = '', res) => {
    const isMongoID = ObjectId.isValid(termino)
    if(isMongoID){
        const categoria = await Categoria.findById(termino)

        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino,'i')

    const categorias = await Categoria.find({
        nombre: regex , estado:true
    })
    res.json({
        results: categorias
    })
}

const buscarUsuarios = async (termino = '', res ) => {
    const isMongoID = ObjectId.isValid(termino)

    if(isMongoID){
        const usuario = await Usuario.findById(termino)

        return res.json({
            results : (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino,'i')

    const usuarios = await Usuario.find({
        $or: [{nombre: regex},{correo: regex}],
        $and: [{estado:true}]
    })

    res.json({
        results: usuarios
    })



}


const buscar = async(req, res = response)=>{

    const {coleccion,termino} = req.params


if (!coleccionesPermitidas.includes(coleccion)){
    return res.status(400).json({
        msg: `Las colecciones permitidas son :${coleccionesPermitidas}`
    })
}

        switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res)
        break;

        case 'categorias':
            buscarCategorias(termino,res)
        break;

        case 'productos':
            buscarProductos(termino,res)
        break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
        break;
    }

//    res.json({
//        coleccion,
//        termino
//    })
}


module.exports = {
    buscar
}