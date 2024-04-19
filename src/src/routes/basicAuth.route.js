const { Router } = require('express');
const { login } = require('../../controllers/auth/auth.js');
const { basicAuth } = require('../../middlewares/index.js');

const routerAuth = Router();
routerAuth.post('/login', basicAuth, login);

export default routerAuth;