const User = require('../model/user');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Notes App::Home',
        path: '/',
        js_file: 'index.js',
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
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                 "icon": "success",
                 "title": "Success",
                 "text": "Registered successfully!", 
            }));
        })
        .catch(err => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                 "icon": "error",
                 "title": "Error",
                 "text": "User already exists!", 
            }));
        });
};

exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Notes App::Login',
        path: '/login',
        js_file: 'login.js',
    });
};