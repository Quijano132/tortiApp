const { getConnection } = require('../database/database.js');

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Producto");
        
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

const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sanitizedId = connection.escape(id);
        const idNumber = id.replace(":", "");

       const [result] = await connection.query('SELECT * FROM Producto WHERE idProducto = "'+idNumber+'"');
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

const addProducto = async (req, res) => {
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

        const query = `INSERT INTO Producto (nombreP, precioP, stockP) VALUES (${escapedValues.join(', ')})`;

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

const updateProducto = async (req, res) => {
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
        

        const query = `UPDATE Producto SET 
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

const deleteProducto = async (req, res) => {
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

        const query = `DELETE FROM Producto WHERE idProducto = ${escapedId}`;
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

module.exports = {
    getProductos,
    getProducto,
    addProducto,
    updateProducto,
    deleteProducto
};