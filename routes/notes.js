const express = require('express');

const notesController = require('../controller/notes');

const router = express.Router();

router.get('/notes', notesController.getNotes);

module.exports = router;