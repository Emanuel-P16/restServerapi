const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            busqueda: '/api/busqueda',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuariosPath: '/api/usuarios',
            uploads: '/api/uploads'
        }
        // this.usuariosPath = '/api/usuarios'
        // this.authPath = '/api/auth';
        // conectar a base de datos
        this.conectarDB();
        //middlewares
        this.middlewares() 

        // rutas de mi aplicacion
        this.routes()
    }
    
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors())
        // LECTURA Y PARSEO DEL BODY
        this.app.use( express.json())

        // directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.busqueda,require('../routes/busqueda'))
        this.app.use(this.paths.usuariosPath,require('../routes/usuarios'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.uploads,require('../routes/uploads'))

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto',this.port)
        })
    }
}

module.exports = Server