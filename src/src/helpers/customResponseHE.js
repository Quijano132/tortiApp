const moment = require('moment');
const fechaNow = moment().format('YYYY-MM-DD HH:mm:ss');

class CustomResponse
{
    isResponseJson(code, status, msg, data = '')
    {
        let response = {
            code: code,
            status: status,
            message: msg,
            data,
        }
        
        return response;
    }

    isResponseLog(status = 'info', codigo, msg = '', data = {})
    {
        let response = {            
            status: status,
            data: data,
            message: msg,
            fecha: codigo,
            timestamp: fechaNow,
        }
        
        return JSON.stringify(response);
    }
}

export default CustomResponse;