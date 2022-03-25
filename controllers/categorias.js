const { response } = require("express");
const {Categoria} = require('../models');
const { findByIdAndUpdate } = require("../models/categoria");




const obtenerCategorias = async (req,res=response) => {


    const {limite= 0, desde= 0} = req.query;
    const query = {estado:true}


    const [total,categorias] = await Promise.all([
        Categoria.count(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre')
    ])



    res.status(200).json({
        total,
        categorias
    })
}

const obtenerCategoria = async(req,res=response)=>{


    const {id} = req.params

    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    // const usuario = Categoria.populate('usuario','nombre')

    res.status(200).json({
        categoria
    })
}





const crearCategoria = async(req,res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if (categoriaDB){
        return res.status(400).json({
            msg: 'La categoria ya existe'
        })
    }

    // generar data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria (data)

    // guardar Db
    await categoria.save()

    res.status(201).json({
        categoria
    })

}

 const actualizarCategoria = async( req, res=response) => {
     const {id} = req.params

    const {estado,nombre,...data} = req.body

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id; 
    
     const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true})

     res.json({
         categoria
     })
 }

 
    const borrarCategoria = async (req,res=response) => {

        const { id } = req.params

        const {estado,...data} = req.body


        data.estado = false 

        const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true})

        res.json({
            categoria
        })
    }

module.exports = {

    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}