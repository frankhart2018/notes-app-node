const User = require('../model/user');
const userSession = require('./user-data');

exports.getNotes = (req, res, next) => {
    let user = userSession.getUser();
    user = new User(user.name, user.email, user.password, user.notes);

    user.getAllNotes()
        .then(user => {
            res.render('notes', {
                pageTitle: 'Notes App::Notes',
                path: '/notes',
                js_file: 'notes.js',
                notes: user.notes,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAddNote = (req, res, next) => {
    res.render('add-note', {
        pageTitle: 'Notes App::Add Note',
        path: '/add-note',
        js_file: 'add-note.js',
    });
};

exports.postAddNote = (req, res, next) => {
    const note = req.body.note;

    let user = userSession.getUser();
    user = new User(user.name, user.email, user.password);

    user.
        addNote(note)
        .then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                "icon": "success",
                "title": "Success",
                "text": "Note added successfully!",
                "url": "/notes",
            }));
        })
        .catch(err => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                "icon": "error",
                "title": "Error",
                "text": err,
            }));
        });
};