import{getConnection} from "../database/database.js";

export const login = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        if (!usuario || !contraseña) {
            res.status(400).json({ error: 'Por favor ingresa tu usuario y contraseña' });
            return;
        }
        
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * FROM Usuario WHERE nombreU = ? AND contrasenaU = ?", [usuario, contraseña]);
        
        if (result.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: result[0] });
        } else {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const methods={
    login
};
