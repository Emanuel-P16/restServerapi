
const { response } = require('express')
 
const { Producto } = require('../models')
// const producto = require('../models/producto')



const obtenerProductos = async(req,res=response)=>{
    const {limite=5,desde=0} = req.query
    const query= {estado:true}

    const [total,producto] = await Promise.all([
        Producto.count(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre')
            .populate('categorias','nombre')
    ])

    res.status(200).json({
        total,
        producto
    })
}


const obtenerProducto = async(req,res=response) => {


    const {id} = req.params
    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categorias','nombre')
    res.status(200).json({
        producto
    })
}

const crearProducto = async(req,res=response) => {


    const {estado,usuario,nombre, ...productoBody} = req.body 
    
    const nombreBody = req.body.nombre.toUpperCase()

    const productoDb = await Producto.findOne({ nombre: nombreBody })

    if (productoDb) {
        return res.status(400).json({
            msg: 'Producto ya existente'
        })
    }

    const data = {
        nombre:nombreBody,
        ...productoBody,
        usuario: req.usuario._id
    }


    const producto = new Producto(data)

    await producto.save()

    res.json({
        msg: 'Creado correctamente',
        producto
    })
}

const actualizarProducto = async(req,res=response) => {

    const {id} = req.params

    const {estado,usuario,...productoBody} = req.body


    productoBody.nombre = productoBody.nombre.toUpperCase()
    productoBody.usuario = req.usuario._id;


    const producto = await Producto.findByIdAndUpdate(id,productoBody,{new:true})





    res.json({
        msg: 'Producto actualizado correctamente',
        producto
    })
}

const borrarProducto = async(req,res=response)=>{

    const { id } = req.params

    const {estado,...productoBody} = req.body

    productoBody.estado = false

    const producto = await Producto.findByIdAndUpdate(id,productoBody,{new:true})

    res.json({
        msg: 'Producto borrado correctamente',
        producto
    })
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}



