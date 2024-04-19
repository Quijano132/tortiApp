const { response } = require('express');
const jwt = require('jsonwebtoken');
const Response = require("../helpers/response");



const validarJWT = async(req, res = response, next ) => {
    const auth = req.header('Authorization');
    const responseJson = new Response();
    if(!auth){
        return res.json(responseJson.isResponseJson(401,'MP-CAT-009', 'error', 'no hay token en la petición.', null));
    }

    try{
        const token = auth.substring(7, auth.length);
        const { uid } = jwt.verify(token, process.env.SECRET_TOKEN); //? Verifica el jwt

        const userEnv = process.env.SECRET_LOGIN;

        if(userEnv != uid) {
            return  res.json(401,responseJson.isResponseJson(401,'MP-CAT-010', 'error', 'El usuario actualmente no existe en el .env',null));
        }

        next();
    }catch(e){
        return res.json(401,responseJson.isResponseJson(401, 'MP-CAT-011','error', "Token no válido",null));
    }
}

module.exports = { validarJWT }