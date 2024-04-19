
class Response
{
    
    isResponseJson(code, statusCode,status, msg, data = {})
    {
        let response = {
            statusCode: statusCode,
            code: code,
            status: status,
            message: msg,
            data,
        }
        
        return response;
    }
}
module.exports = Response;
