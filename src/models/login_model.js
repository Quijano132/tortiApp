require('dotenv').config();
const { conf_sequelize, url_sap } = require('../database/config.js');

const consultaLogin = async (data) => {
	return new Promise((resolve, reject) => {
            const consulta = "SELECT * FROM Usuario WHERE correoU = '"+ data.usuario +
                                "' AND contrasenaU = '"+ data.contraseña +"'";
			console.log("exito");

			conf_sequelize.query(
				consulta,
				{
					type: conf_sequelize.QueryTypes.select
				}
			).then(result => {
                console.log(result[0][0]);
                resolve(result[0][0])
			}).catch((error) => {
				console.log(error);
                reject(error);
			});
	});
}

module.exports = {
	consultaLogin
};