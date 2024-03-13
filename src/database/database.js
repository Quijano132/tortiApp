import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('b0hqlhkhmg0xm49clruh', 'uaxytqzwqmyzm6ir', 'ONSomhSkiSzjZ0h5ACWX.', {
  host: 'b0hqlhkhmg0xm49clruh-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  connectTimeout: 30000,
});

export const getConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    return sequelize;
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    throw error;
  }
};
