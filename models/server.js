
const express = require('express');
const cors    = require('cors');
const logger = require('morgan');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        this.app.set('views','views');
        this.app.set('view engine', 'ejs');

        this.server = require('http').createServer(this.app);

        this.paths = {
            home: '/',
            articulos: '/api/articulos'
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
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(logger('dev'));

        this.app.use(express.urlencoded({ extended: false }));

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        
        this.app.use(this.paths.home, require('../routes/HomeRoutes'));
        this.app.use(this.paths.articulos, require('../routes/ArticuloRoutes'));

    }
    
    listen() {
        
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });

    }

}

module.exports = Server;
