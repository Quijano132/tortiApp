const { validationResult } = require('express-validator');
const { responseLogs } = require('../utils/response/response.js');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        let response = {
            status: false,
            code: 400,
            message: errors.errors[0].msg,
            data: null,
        };

        return res.status(400).json(responseLogs("error", errors.errors[0].msg, {})); 
    }
    
    next();
}

module.exports = {
    validarCampos
}