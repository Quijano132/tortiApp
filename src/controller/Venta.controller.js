import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Venta");
        
        const ventaUnica = {};

        result.forEach(venta => {
            if (!ventaUnica[venta.idVenta]) {
                ventaUnica[venta.idVenta] = venta;
            }
        });

        const resultado = Object.values(ventaUnica);

        res.status(200).json(resultado); 
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};




export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sanitizedId = connection.escape(id);

       const [result] = await connection.query(`SELECT * FROM Venta WHERE idVenta = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Venta no encontrado' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const {  idEmpleado, idProducto, precioVenta,cantidadVenta, fechadeVenta} = req.body;

        if ( idEmpleado === undefined || idProducto === undefined, precioVenta === undefined,cantidadVenta === undefined, fechadeVenta === undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(idEmpleado),
            connection.escape(idProducto),
            connection.escape(precioVenta),
            connection.escape(cantidadVenta),
            connection.escape(fechadeVenta)
        ];

        const query = `INSERT INTO Venta (idEmpleado, idProducto, precioVenta,cantidadVenta, fechadeVenta) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            idEmpleado,
            idProducto, 
            precioVenta,
            cantidadVenta,
            fechadeVenta,
            message: "Producto añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { idEmpleado, idProducto, precioVenta,cantidadVenta, fechadeVenta} = req.body;

        if (id == undefined || idEmpleado == undefined || idProducto == undefined || precioVenta == undefined || cantidadVenta == undefined || fechadeVenta == undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreP = connection.escape(nombreP);
        const escapeprecioP = connection.escape(precioP);
        const escapestockP = connection.escape(stockP);
        const eescapefechadeVenta = connection.escape(fechadeVenta)
        

        const query = `UPDATE Venta SET 
                        idEmpleado = ${idEmpleado}, 
                        idProducto = ${idProducto}, 
                        precioVenta = ${precioVenta},
                        cantidadVenta =${cantidadVenta},
                        fechadeVenta = ${fechadeVenta}

                        WHERE idVenta = ${id}`;

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

        const query = `DELETE FROM Venta WHERE idVenta = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Venta eliminda exitosamente" });
        } else {
            res.status(404).json({ message: "Venta eliminada satisfactoriamente..." });
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