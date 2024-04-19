import { request, response, Router } from "express";
import {login, methods as UsuarioController } from "../controller/Usuario.controller.js"


const router=Router();


router.get("/", UsuarioController.getClients);
router.get("/:id", UsuarioController.getClient);
router.post("/", UsuarioController.addClient);
router.put("/:id", UsuarioController.updateClient);
router.delete("/:id", UsuarioController.deleteClient);


export default router;