const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Endpoint para iniciar sesión
app.post('/api/login', (req, res) => {
    const { correoU, contrasenaU } = req.body;

    // Buscar el usuario en la lista de usuarios
    const usuarioEncontrado = usuarios.find(u => u.correoU === correoU && u.contrasenaU === contrasenaU);

    if (usuarioEncontrado) {
        // Si el usuario y la contraseña coinciden, devolver éxito y el usuario
        res.status(200).json({ success: true, usuario: usuarioEncontrado });
    } else {
        // Si el usuario y la contraseña no coinciden, devolver un error
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
});