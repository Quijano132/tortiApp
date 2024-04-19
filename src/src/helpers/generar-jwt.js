const jwt = require('jsonwebtoken');

const generarJWT = ( uid = 'sddssdds' ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
    
        jwt.sign( payload, process.env.SECRET_TOKEN, {
            expiresIn: '30m'
        }, (err, token) => err ? reject('No se pudo generar el JWT') : resolve(token))
    }); 
}

module.exports = { generarJWT }