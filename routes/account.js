const express = require('express');

const accountController = require('../controller/account');

const router = express.Router();

router.get('/', accountController.getIndex);

router.post('/register-user', accountController.postRegisterUser);

router.get('/login', accountController.getLogin);

router.post('/login-user', accountController.postLogin);

router.get('/logout', accountController.getLogout);

module.exports = router;