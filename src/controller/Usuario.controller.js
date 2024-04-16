import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Usuario");

        // Creamos un objeto para almacenar los usuarios únicos
        const usuariosUnicos = {};

        // Iteramos sobre los resultados obtenidos
        result.forEach(usuario => {
            // Si el usuario no existe en el objeto usuariosUnicos, lo añadimos
            if (!usuariosUnicos[usuario.idUsuario]) {
                usuariosUnicos[usuario.idUsuario] = usuario;
            }
        });

        // Convertimos el objeto de usuarios únicos a un array
        const usuarios = Object.values(usuariosUnicos);
        
        res.status(200).json(usuarios); // Enviamos la respuesta con los usuarios únicos
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sanitizedId = connection.escape(id);

       const [result] = await connection.query(`SELECT * FROM Usuario WHERE idUsuario = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreU, apellidoU, correoU, numerocelU, contrasenaU } = req.body;

        if (nombreU === undefined || apellidoU === undefined || correoU === undefined || numerocelU === undefined || contrasenaU === undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreU),
            connection.escape(apellidoU),
            connection.escape(correoU),
            connection.escape(numerocelU),
            connection.escape(contrasenaU)
        ];

        const query = `INSERT INTO Usuario (nombreU, apellidoU, correoU, numerocelU, contrasenaU) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreU,
            apellidoU,
            correoU,
            numerocelU,
            contrasenaU,
            message: "Usuario añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreU, apellidoU, correoU, numerocelU, contrasenaU} = req.body;

        if (id == undefined || nombreU == undefined || apellidoU == undefined || correoU == undefined || numerocelU == undefined || contrasenaU == undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreU = connection.escape(nombreU);
        const escapeApellidoU = connection.escape(apellidoU);
        const escapecorreoU = connection.escape(correoU);
        const escapenumeroU = connection.escape(numerocelU);
        const escapecontrasenaU = connection.escape(contrasenaU);

        const query = `UPDATE Usuario SET 
                        nombreU = ${escapenombreU}, 
                        apellidoU = ${escapeApellidoU}, 
                        correoU = ${escapecorreoU}, 
                        numerocelU = ${escapenumeroU}, 
                        contrasenaU = ${escapecontrasenaU}
                        WHERE idUsuario = ${id}`;

        const result = await connection.query(query);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    
};



export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que id sea un número antes de utilizarlo
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber)) {
            res.status(400).json({ message: "ID no válido" });
            return;
        }

        const connection = await getConnection();

        // Utilizar escape para el valor de id
        const escapedId = connection.escape(idNumber);

        const query = `DELETE FROM Usuario WHERE idUsuario = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Usuario eliminado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const methods={
    getClient,
    getClients,
    addClient,
    updateClient,
    deleteClient
};
