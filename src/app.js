import express from 'express';
import morgan from 'morgan';
const app = express();
//Routes import
import UsuarioRoutes from "./routes/Usuario.route.js"
import productoRoutes from "./routes/Producto.route.js"
import empleadoRoutes from "./routes/Empleado.route.js"

//settings
app.set('port', 4000)


//Middleware

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((err, req, res, next)=> {
    if (err instanceof SyntaxError && err.status== 400 && 'body' in err){
        res.status(400).json({message: "Algo fallo y no sabemos qué fue."});

    }
});

//Routes
app.use("/api/Usuarios", UsuarioRoutes)
app.use("/api/Producto", productoRoutes)
app.use("/api/Empleados", empleadoRoutes)

export default app;