const { validationResult } = require('express-validator');
const Response = require("../helpers/response");

const validarCampos = ( req, res, next ) => {
    const resp = new Response();

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(resp.isResponseJson(400,'MP-CAT-008', 'error','Hay errores.', errors));
    }
        next();
}

module.exports = {
    validarCampos
}