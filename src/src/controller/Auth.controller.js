const { response, request } = require('express');
const { generarJWT } = require('../helpers/generar-jwt.js');
const { CustomResponse } = require('../helpers/customResponseHE.js');

const responseJson = new CustomResponse();

const login = async(req, res = response ) =>{
    try{
        const token = await generarJWT(req.username);
        console.log("Usuario logeado correctamente");
        res.json(responseJson.isResponseJson(200, true, "Usuario logeado correctamente", token));
    }catch(e){
        console.log("Ha ocurrido un error al logearse");
        res.json(500, responseJson.isResponseJson(500, false, "Ha ocurrido un error al logearse"))
    }
}

module.exports = { login }