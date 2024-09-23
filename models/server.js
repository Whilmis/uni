const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 300;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            carreras: '/api/carreras',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            materias:   '/api/materias',
            materiaPs:   '/api/materiaPs',
            estudiantes: '/api/estudiantes',
            maestros: '/api/maestros',
            admins: '/api/admins'
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.carreras, require('../routes/carreras'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.materias, require('../routes/materias'));
        this.app.use( this.paths.materiaPs, require('../routes/materiaPs'));
        this.app.use( this.paths.estudiantes, require('../routes/estudiantes'));
        this.app.use( this.paths.maestros, require('../routes/maestros'));
     
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
