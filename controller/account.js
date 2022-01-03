exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Notes App::Home',
        path: '/',
    });
};