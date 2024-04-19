require('dotenv').config();
// modificar el nombre del config
const { conf_sequelize, url_sap } = require('../database/config.js');
const Response = require("../helpers/response.js");
const axios = require('axios');
const resp = new Response();
const { consultaLogin} = require('../models/login_model.js');


const consultaDatos = async (req = request, res = response) => {
    const resp = new Response();
    let data = req.body;
    try {
        /* Obtener odata */
        const result = await consultaLogin(data);
       
        return res.status(200).json(resp.isResponseJson(200,'MP-CAT-001' ,'success','Usuario Logeado correctamente', result.idUsuario));
    } catch (error) {
        return res.status(400).json(resp.isResponseJson(400,'MP-CAT-002','error', error.message,  error.data));
    }
}

module.exports = {
    consultaDatos
};