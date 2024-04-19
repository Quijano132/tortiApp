import Router from 'express';
import login from '../controller/auth.controller.js';
import basicAuth from '../index.js';

const routerAuth = Router();
routerAuth.post('/login', basicAuth, login);

export default routerAuth;