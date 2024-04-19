const { Router } = require('express');
const { check } = require('express-validator');
const bodyParser = require('body-parser');
const { auth } = require('../controllers/auth/auth.js');
const { consultaDatos } = require('../controllers/login.controller.js');
const { validarCampos,basicAuth, validarJWT } = require('../middlewares/index.js');
//const { get_material_centro_controller } = require('../controllers/material_controller.js');
const router = Router();

const { getVenta,getVentas,addVenta,updateVenta,deleteVenta } = require('../controllers/Venta.controller.js');
const { getUsuario,getUsuarios,addUsuario,updateUsuario,deleteUsuario } = require('../controllers/Usuario.controller.js');
const { getProducto,getProductos,addProducto,updateProducto,deleteProducto } = require('../controllers/Producto.controller.js');
const { getEmpleado,getEmpleados,addEmpleado,updateEmpleado,deleteEmpleado } = require('../controllers/Empleado.controller.js');
const { getCliente,getClientes,addCliente,updateCliente,deleteCliente } = require('../controllers/Cliente.controller.js');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/* Login */
router.post('/auth', basicAuth, auth);
router.post('/login', validarJWT, consultaDatos);

//Rutas de Usuario
router.get("/usuarios", getUsuarios);
router.get("/usuarios:id", getUsuario);
router.post("/usuarios", addUsuario);
router.put("/usuarios:id", updateUsuario);
router.delete("/usuarios:id", deleteUsuario);

//Rutas de ventas
router.get("/ventas", getVentas);
router.get("/ventas:id", getVenta);
router.post("/ventas", addVenta);
router.put("/ventas:id", updateVenta);
router.delete("/ventas:id", deleteVenta);

//Rutas de productos
router.get("/productos", getProductos);
router.get("/productos:id", getProducto);
router.post("/productos", addProducto);
router.put("/productos:id", updateProducto);
router.delete("/productos:id", deleteProducto);

//Rutas de empleados
router.get("/empleados", getEmpleados);
router.get("/empleados:id", getEmpleado);
router.post("/empleados", addEmpleado);
router.put("/empleados:id", updateEmpleado);
router.delete("/empleados:id", deleteEmpleado);

//Rutas de cliente
router.get("/clientes", getClientes);
router.get("/clientes:id", getCliente);
router.post("/clientes", addCliente);
router.put("/clientes:id", updateCliente);
router.delete("/clientes:id", deleteCliente);
    
module.exports = router;