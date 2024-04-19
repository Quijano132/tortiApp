import { request, response, Router } from "express";
import { methods as LoginController } from "../controller/login.controller.js"

const router=Router();



router.post("/login", LoginController.login)

export default router;
