// usuarioRouter.js

const express = require('express');
const router = express.Router();
const usuarioController = require('./usuarioController');

// Rutas
router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.crearUsuario);

module.exports = router;
