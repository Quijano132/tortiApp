<<<<<<< HEAD
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('b0hqlhkhmg0xm49clruh', 'uaxytqzwqmyzm6ir', 'ONSomhSkiSzjZ0h5ACWX', {
=======
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('b0hqlhkhmg0xm49clruh', 'uaxytqzwqmyzm6ir', 'ONSomhSkiSzjZ0h5ACWX', {
>>>>>>> 791f1267550d3a756e78c5f75b601c1abb24c456
  host: 'b0hqlhkhmg0xm49clruh-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  connectTimeout: 30000,
});

<<<<<<< HEAD
export const getConnection = async () => {
=======
const getConnection = async () => {
>>>>>>> 791f1267550d3a756e78c5f75b601c1abb24c456
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    return sequelize;
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    throw error;
  }
};
<<<<<<< HEAD
=======

module.exports = {getConnection};
>>>>>>> 791f1267550d3a756e78c5f75b601c1abb24c456