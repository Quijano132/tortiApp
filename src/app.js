const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');

dotenv.config({ path: './env/.env' });
const app = express();

// Importación de rutas
const UsuarioRoutes = require('./routes/Usuario.route');
const productoRoutes = require('./routes/Producto.route');
const empleadoRoutes = require('./routes/Empleado.route');
const ventaRoutes = require('./routes/Venta.route');
const loginRoutes = require('./routes/login.route');
const clienteRoutes = require('./routes/Cliente.route');

// Configuraciones
app.set('port', 4000);
app.set('view engine', 'ejs');

app.use(session({
    secret: '12345678',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.render('index', { msg: 'Mensaje desde node' });
});

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status == 400 && 'body' in err) {
        res.status(400).json({ message: "Algo falló y no sabemos qué fue." });
    }
});

// Rutas
app.use("/api/Usuarios", UsuarioRoutes);
app.use("/api/Producto", productoRoutes);
app.use("/api/Empleados", empleadoRoutes);
app.use('/api/Venta', ventaRoutes);
app.use("/api/login", loginRoutes);
app.use('/api/Cliente', clienteRoutes);

module.exports = app;

