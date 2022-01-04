exports.getNotes = (req, res, next) => {
    res.render('notes', {
        pageTitle: 'Notes App::Notes',
        path: '/notes',
        js_file: 'notes.js',
        notes: [],
    });
}