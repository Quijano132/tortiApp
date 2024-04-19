require('dotenv').config();

const Server = require('./models/server/config');
const server = new Server();

server.listen();
module.exports.handler = server.returnSrv();

