import { request, response, Router } from "express";
import {methods as empleadoController } from "../controller/Empleado.controller.js"


const router=Router();


router.get("/", empleadoController.getClients);
router.get("/:id", empleadoController.getClient);
router.post("/", empleadoController.addClient);
router.put("/:id", empleadoController.updateClient);
router.delete("/:id", empleadoController.deleteClient);


export default router;