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

//settings
app.set('port', 4000)
app.set('view engine', 'ejs')

app.use(session({
    secret: '12345678',
    resave: true,
    saveUninitialized: true
}));

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



export default app;
