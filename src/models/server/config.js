const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf')

require('dotenv').config();
class Server {
    csrfProtection = csrf({ cookie: true });

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.srv = serverless(this.app);
    }

    middlewares() {
        this.app.use(cors());
        //this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(helmet());
        this.app.use(helmet.crossOriginEmbedderPolicy());
    }

    routes() {
        this.routePath = '/api';
        this.app.use(this.routePath, require('../../routes/routes'));
    }

    returnSrv() {
        return this.srv;
    }

    listen() {
        this.app.listen(3000, () => console.log(`Servidor corriendo en puerto`, 3000));
    }


}

module.exports = Server;