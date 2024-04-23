import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import session from 'express-session';
import { fileURLToPath } from 'url'; // Importa el método fileURLToPath
import path from 'path'; // Importa el módulo path

dotenv.config({ path: './env/.env' });

const app = express();

// Middleware de sesión
app.use(session({
    secret: '12345678',
    resave: true,
    saveUninitialized: true
}));

// Configuración de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Otros middlewares y configuraciones
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Configurar el motor de plantillas EJS
const __filename = fileURLToPath(import.meta.url); // Obtén el nombre del archivo actual
const __dirname = path.dirname(__filename); // Obtén el directorio actual
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta de vistas
app.set('view engine', 'ejs'); // Establece el motor de plantillas

// Rutas
app.get('/', (req, res) => {
    res.render('index', { msg: 'Mensaje desde node' });
});

// Importación de rutas
import UsuarioRoutes from "./routes/Usuario.route.js";
import productoRoutes from "./routes/Producto.route.js";
import empleadoRoutes from "./routes/Empleado.route.js";
import ventaRoutes from './routes/Venta.route.js';
import loginRoutes from './routes/login.route.js';
import clienteRoutes from './routes/Cliente.route.js';

// Uso de las rutas
app.use("/api/Usuarios", UsuarioRoutes);
app.use("/api/Producto", productoRoutes);
app.use("/api/Empleados", empleadoRoutes);
app.use('/api/Venta', ventaRoutes);
app.use("/api/login", loginRoutes);
app.use('/api/Cliente', clienteRoutes);

export default app;


