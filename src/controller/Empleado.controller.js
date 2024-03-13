import{getConnection} from "../database/database.js";

export const getClients = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM Empleado");
        
        const EmpleadoUnico = {};

        result.forEach(empleado => {
            if (!EmpleadoUnico[empleado.idEmpleado]) {
                EmpleadoUnico[empleado.idEmpleado] = empleado;
            }
        });

        const resultado = Object.values(EmpleadoUnico);

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

       const [result] = await connection.query(`SELECT * FROM empleado WHERE idEmpleado = ${sanitizedId}`,[id]);
        

        if (result.length > 0) {

            res.json(result[0]);

        } else {
        
            res.status(404).json({ message: 'Empleado no encontrado o perdido.' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


export const addClient = async (req, res) => {
    try {
        const { nombreE, apellidoE, numerocelE, apellidoEMaterno} = req.body;

        if (nombreE === undefined || apellidoE === undefined || numerocelE === undefined || apellidoEMaterno== undefined ) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection();
        const escapedValues = [
            connection.escape(nombreE),
            connection.escape(apellidoE),
            connection.escape(numerocelE),
            connection.escape(apellidoEMaterno)
        ];

        const query = `INSERT INTO Empleado (nombreE, apellidoE, numerocelE, apellidoEMaterno) VALUES (${escapedValues.join(', ')})`;

        await connection.query(query);

        res.status(201).json({
            nombreE,
            apellidoE,
            numerocelE,
            apellidoEMaterno,
            message: "Empleado añadido"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreE, apellidoE, numerocelE, apellidoEMaterno} = req.body;

        if (id == undefined || nombreE == undefined || apellidoE == undefined || numerocelE == undefined  || apellidoEMaterno == undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field" });
            return;
        }

        const connection = await getConnection(); // Inicializar la conexión aquí

        // Utilizar escape para cada valor individual
        const escapenombreE = connection.escape(nombreE);
        const escapeapellidoE = connection.escape(apellidoE);
        const escapenumerocelE = connection.escape(numerocelE);
        const escapeapellidoEMaterno =connection.escape(apellidoEMaterno);
        

        const query = `UPDATE empleado SET 
                        nombreE = ${escapenombreE}, 
                        apellidoE = ${escapeapellidoE}, 
                        numerocelE = ${escapenumerocelE},
                        apellidoEMaterno = ${escapeapellidoEMaterno}
                        WHERE idEmpleado = ${id}`;

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

        const query = `DELETE FROM empleado WHERE idEmpleado = ${escapedId}`;
        const result = await connection.query(query);

        if (result.affectedRows > 0) {
            res.json({ message: "Empleado eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Empleado eliminado satisfactoriamente..." });
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