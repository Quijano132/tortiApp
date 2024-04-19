const { response, request } = require('express');
const { get_material_model, get_material_centro_model,get_full_price_model, get_url_inventario,get_name_center_model} = require('../models/login_model.js');

const Response = require("../helpers/response.js");
const uuid = require('uuid');
const ssrfFilter = require('ssrf-req-filter');
const { json } = require('body-parser');

/*Obtener productos especificando solamente el producto y su categoría */
const get_material_controller = async (req = request, res = response) => {
    const resp = new Response();
    let data = req.params;
    try {
        /* Obtener odata */
        const result = await get_material_model(data);
         /* Eliminar la metadata */
         for (const json_ of result.d.results) {
            let odata = json_ ;
            /*Obtener nombre del centro*/
            const obtener_centro = await get_name_center_model(odata)
            if (obtener_centro == null || obtener_centro == undefined || obtener_centro == ''){
                odata.centro = "No se encontro centro " + odata.centro;
            }else{
                odata.centro = obtener_centro.descripcion;
            }
            delete odata['__metadata'];
        }
        /* Fin eliminar metadata */
        return res.status(200).json(resp.isResponseJson(200,'MP-CAT-001' ,'success','consulta exitosa', result.d.results));
    } catch (error) {
        return res.status(400).json(resp.isResponseJson(400,'MP-CAT-002','error', error.message,  error.data));
    }
}

/*Obtener productos especificando centro, el producto y su categoría */
const get_material_centro_controller = async (req = request, res = response) => {
    const resp = new Response();
    let data = req.body;
    try {
        /*Obtener odata */
        const result = await get_material_centro_model(data);
        let arrayMaterials = [];
        //console.log("ITEMS:: ",result.d.results," \n")
        // se eliminó petición a endpoint que regresa el precio

        try{
            for (const json_result of result.d.results) {
                //se eliminó for que iteraba resultados para colocar fullPrice
                json_result.fullPrice = json_result.full_price;
                delete json_result['full_price'];
                delete json_result['__metadata'];
                if (json_result.fullPrice > 0) {
                    arrayMaterials.push(json_result);
                }
                
            }
        }catch(e){
            return res.status(400).json(resp.isResponseJson(400,'MP-CAT-002','error', 'full_price',  'No se encontraron productos en el inventario'));
        }
        
        /* Fin eliminar metadata */
        return res.status(200).json(resp.isResponseJson(200,'MP-CAT-001', 'success','consulta exitosa', arrayMaterials));
    } catch (error) {
        return res.status(400).json(resp.isResponseJson(400,'MP-CAT-002','error', error.message,  error.data));
    }
}

module.exports = { 
    get_material_controller,
    get_material_centro_controller
};