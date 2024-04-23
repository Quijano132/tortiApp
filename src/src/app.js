import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import bcryptjs from 'bcryptjs'
import session from 'express-session';


dotenv.config({path: './env/.env'})
const app = express();
//Routes import
import UsuarioRoutes from "./routes/Usuario.route.js"
import productoRoutes from "./routes/Producto.route.js"
import empleadoRoutes from "./routes/Empleado.route.js"
import ventaRoutes from './routes/Venta.route.js'
import loginRoutes from './routes/login.route.js'
import clienteRoutes from './routes/Cliente.route.js'
import routerAuth from './routes/auth.route.js'
import basicAuth from './routes/basicAuth.route.js'
import app from './index.js'
//settings
app.set('port', 4000)
app.set('view engine', 'ejs')

app.use(session({
    secret: '12345678',
    resave: true,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Esto permitirá todas las solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Esto permitirá los métodos HTTP especificados
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Esto permitirá los encabezados especificados
    next();
});


app.get('/', (req, res )=>{
    res.render('index', {msg: 'Mensaje desde node'})
})

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use((err, req, res, next)=> {
    if (err instanceof SyntaxError && err.status== 400 && 'body' in err){
        res.status(400).json({message: "Algo fallo y no sabemos qué fue."});

    }
});

//Routes
app.use("/api/Usuarios", UsuarioRoutes)
app.use("/api/Producto", productoRoutes)
app.use("/api/Empleados", empleadoRoutes)
app.use('/api/Venta',ventaRoutes)
app.use("/api/login",loginRoutes)
app.use('/api/Cliente',clienteRoutes)
app.use('/api/auth', routerAuth);
app.use('/api/basicAuth', basicAuth);


export default app;
