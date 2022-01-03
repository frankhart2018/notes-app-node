const express = require('express');

const accountController = require('../controller/account');

const router = express.Router();

router.get('/', accountController.getIndex);

module.exports = router;