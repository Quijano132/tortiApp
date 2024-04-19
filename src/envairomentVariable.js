import dotenv  from "dotenv";
dotenv.config({path: './.env'})

export const dbpass = process.env.DB_PASS;
export const port =process.env.PORT || 3306;

// En caso de no funcionar, intentar cambiar el puerto de salida.
