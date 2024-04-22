const { sequelize } = require("./database/database.js");
const app = require("./app.js");
const { port } = require("./environmentVariable.js");

const main = async () => {
    try {
        await sequelize.sync({ force: true }); // Usamos 'await' para asegurarnos de que la sincronización de la base de datos se complete antes de continuar
        app.listen(port, () => {
            console.log(
                `El servidor está escuchando en el puerto: ${port}`,
                "URL: http://localhost:4000/tortiapp"
            );
        });
    } catch (err) {
        console.log(err);
    }
};

main();
