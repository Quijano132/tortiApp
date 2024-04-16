// usuarioRouter.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/login.controller');

// Rutas
router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.crearUsuario);

export default usuarioController;