const { response } = require("express");


const cargaArchivo = async(req,res=response)=>{



    res.json({
        msg: 'hola mundo'
    })
}

module.exports = {
    cargaArchivo
}