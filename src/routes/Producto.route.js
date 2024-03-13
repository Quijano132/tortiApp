import { request, response, Router } from "express";
import {methods as productoRoutes } from "../controller/Producto.controller.js"


const router=Router();


router.get("/", productoRoutes.getClients);
router.get("/:id", productoRoutes.getClient);
router.post("/", productoRoutes.addClient);
router.put("/:id", productoRoutes.updateClient);
router.delete("/:id", productoRoutes.deleteClient);


export default router;