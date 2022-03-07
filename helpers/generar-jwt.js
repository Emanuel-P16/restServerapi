
const jwt = require('jsonwebtoken')



const generarJWT = ( uid ) => {
    return new Promise( (resolve, reject)  => {


        const payload = { uid }; /// en el payload se puede poner lo que se quiera

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'

        } , ( err, token ) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })


    })
}


module.exports = {
    generarJWT
}