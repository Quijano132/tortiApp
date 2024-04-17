import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Cliente");
        
        const ClienteUnico = {};

        result.forEach(cliente => {
            if (!ClienteUnico[cliente.idCliente]) {
                ClienteUnico[cliente.idCliente] = cliente;
            }
        });

        const resultado = Object.values(ClienteUnico);

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

       const [result] = await connection.query(`SELECT * FROM Empleado WHERE idCliente = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Cliente no encontrado o perdido.' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreC, apellido, deuda, idEmpleado} = req.body;

        if (nombreC === undefined || apellido === undefined || deuda === undefined || idEmpleado== undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreC),
            connection.escape(apellido),
            connection.escape(deuda),
            connection.escape(idEmpleado)
        ];

        const query = `INSERT INTO Cliente (nombreC, apellido, deuda, idEmpleado) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreC,
            apellido,
            deuda,
            idEmpleado,
            message: "Cliente añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreC, apellido, deuda, idEmpleado} = req.body;

        if (id == undefined || nombreC == undefined || apellido == undefined || deuda == undefined  || idEmpleado == undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreE = connection.escape(nombreC);
        const escapeapellidoE = connection.escape(apellido);
        const escapenumerocelE = connection.escape(deuda);
        const escapeapellidoEMaterno =connection.escape(idEmpleado);
        

        const query = `UPDATE Empleado SET 
                        nombreC = ${escapenombreE}, 
                        apellido = ${escapeapellidoE}, 
                        deuda = ${escapenumerocelE},
                        idEmpleado = ${escapeapellidoEMaterno}
                        WHERE idCliente = ${id}`;

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

        const query = `DELETE FROM Cliente WHERE idCliente = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Cliente eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Cliente eliminado satisfactoriamente..." });
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