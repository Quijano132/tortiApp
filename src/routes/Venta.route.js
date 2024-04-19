import { request, response, Router } from "express";
import {methods as ventaController } from "../controller/Venta.controller.js"


const router=Router();


router.get("/", ventaController.getClients);
router.get("/:id", ventaController.getClient);
router.post("/", ventaController.addClient);
router.put("/:id", ventaController.updateClient);
router.delete("/:id", ventaController.deleteClient);


export default router;