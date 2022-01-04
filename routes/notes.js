const express = require('express');

const notesController = require('../controller/notes');

const router = express.Router();

router.get('/notes', notesController.getNotes);

router.get('/add-note', notesController.getAddNote);

router.post('/add-note', notesController.postAddNote);

module.exports = router;