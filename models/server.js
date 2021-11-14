const express = require('express');
const cors    = require('cors');
var ejs = require('ejs');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.app.set('views','views');
        this.app.set('view engine', 'ejs');

        this.server = require('http').createServer(this.app);

        this.paths = {
            home: '/'
        }


        // Conectar a base de datos
        // this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    // async conectarDB() {
    //     await dbConnection();
    // }


    middlewares() {

        this.app.use(express.urlencoded({ extended: false }));

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.home, require('../routes/home'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}
module.exports = Server;