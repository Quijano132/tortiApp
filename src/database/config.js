const { Sequelize } = require('sequelize');
require('dotenv').config();

const url_sap = process.env.URL_SAP;
// deepcode ignore ServerLeak: en el codigo de abajo ya se mete en un trycatch por si llega a fallar
/*const conf_sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,{
    host:  process.env.SERVER,
    dialect: 'mysql'
});*/

const conf_sequelize = new Sequelize('b0hqlhkhmg0xm49clruh', 'uaxytqzwqmyzm6ir', 'ONSomhSkiSzjZ0h5ACWX',{
    host:  'b0hqlhkhmg0xm49clruh-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

conf_sequelize.authenticate().then(() => {
    console.log('Conexión establecida con la base de datos');
}).catch((error) => {
    console.error('No se puede conectar a la base de datos: ', error);
});

module.exports = {conf_sequelize,url_sap};
