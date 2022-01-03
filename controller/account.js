const User = require('../model/user');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Notes App::Home',
        path: '/',
    });
};

exports.postRegisterUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User(name, email, password);
    user
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};