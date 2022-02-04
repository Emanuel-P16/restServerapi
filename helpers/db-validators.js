const Role = require('../models/role')
const Usuario = require('../models/usuario')
const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({role})

    if( !existeRole ){
        throw new Error(`El rol ${role} no está registrado en la base de datos`)
    }
}

const esMailValido = async( correo = '') => {
    const existeMail = await Usuario.findOne({correo})
    console.log(existeMail)
    if( existeMail ) {
        throw new Error(`El mail ${correo} ya existe en la base de datos`)
    }
}

const existeUsuarioPorId = async (id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error (`El id no existe ${id}`)
    }
}

module.exports = {
    esRoleValido,
    esMailValido,
    existeUsuarioPorId
}