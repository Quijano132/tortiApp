const { response } = require('express');
const Response = require("../helpers/response");

const responseJson = new Response();

const basicAuth = async(req, res = response, next ) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.json(401, responseJson.isResponseJson(401,'MP-CAT-005', 'error', "Es obligatoria la autenticación básica", null));
    }

    try{
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const userEnv = process.env.SECRET_LOGIN;
        const passEnv = process.env.SECRET_PWD;

        if(userEnv != username || password != passEnv){
            return res.json(401, responseJson.isResponseJson(401,'MP-CAT-006', 'error', "Usuario/Contraseña incorrectos",null));
        }

        req.username = username;
        next();
    }catch(e){
        return res.json(401,responseJson.isResponseJson(401, 'MP-CAT-007','error', "Token no válido",null));
    }
}

module.exports = { basicAuth }