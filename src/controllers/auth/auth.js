const { response, request } = require('express');
const { generarJWT } = require('../../helpers/auth/generar-jwt.js');
const Response = require("../../helpers/response");

const responseJson = new Response();

const auth = async(req = request, res = response ) =>{
    try{
        const token = await generarJWT(req.username);
        console.log("Usuario logeado correctamente");
        res.json(responseJson.isResponseJson(200, 'MP-CAT-003','success', "Usuario logeado correctamente", token));
    }catch(e){
        console.log("Ha ocurrido un error al logearse");
        res.json(500, responseJson.isResponseJson(500, 'MP-CAT-004','error', "Ha ocurrido un error al logearse"))
    }
}

module.exports = { auth }