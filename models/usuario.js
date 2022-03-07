

const { Schema, model} = require('mongoose')


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type:String,

    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default: false
    }

})

UsuarioSchema.methods.toJSON = function (){
    const { __v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

// {
//     /// modelo de la base de datos

//     nombre:'',
//     correo:'asdasd@.com',
//     password: '1231231',
//     img: '123123123123',
//     rol:'123123123123,'
//     estado: true, /// false para si esta deshabilitado
//     google: true /// false si fue creado por el google sign in
// }

module.exports = model( 'Usuario', UsuarioSchema );