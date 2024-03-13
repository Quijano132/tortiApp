import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM producto");
        
        const productoUnico = {};

        result.forEach(producto => {
            if (!productoUnico[producto.idProducto]) {
                productoUnico[producto.idProducto] = producto;
            }
        });

        const resultado = Object.values(productoUnico);

        res.status(200).json(resultado); 
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};




export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sanitizedId = connection.escape(id);

       const [result] = await connection.query(`SELECT * FROM producto WHERE idProducto = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreP, precioP, stockP} = req.body;

        if (nombreP === undefined || precioP === undefined || stockP === undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreP),
            connection.escape(precioP),
            connection.escape(stockP)
        ];

        const query = `INSERT INTO producto (nombreP, precioP, stockP) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreP,
            precioP,
            stockP,
            message: "Producto añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreP, precioP, stockP} = req.body;

        if (id == undefined || nombreP == undefined || precioP == undefined || stockP == undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreP = connection.escape(nombreP);
        const escapeprecioP = connection.escape(precioP);
        const escapestockP = connection.escape(stockP);
        

        const query = `UPDATE producto SET 
                        nombreP = ${escapenombreP}, 
                        precioP = ${escapeprecioP}, 
                        stockP = ${escapestockP}
                        WHERE idProducto = ${id}`;

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

        const query = `DELETE FROM producto WHERE idProducto = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Producto eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Producto eliminado satisfactoriamente..." });
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