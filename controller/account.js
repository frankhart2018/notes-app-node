const User = require('../model/user');
const userSession = require('./user-data');

exports.getIndex = (req, res, next) => {
    if (userSession.getUser()) {
        res.redirect('/notes');
    } else {
        res.render('index', {
            pageTitle: 'Notes App::Home',
            path: '/',
            js_file: 'index.js',
        });
    }
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
                 "text": err, 
            }));
        });
};

exports.getLogin = (req, res, next) => {
    if (userSession.getUser()) {
        res.redirect('/notes');
    } else {
        res.render('login', {
            pageTitle: 'Notes App::Login',
            path: '/login',
            js_file: 'login.js',
        });
    }
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.checkLogin(email, password)
        .then(user => {
            userSession.setUser(user);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                 "icon": "success",
                 "title": "Success",
                 "text": "Login successful!", 
                 "url": "/notes",
            }));
        })
        .catch(err => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                 "icon": "error",
                 "title": "Error",
                 "text": err, 
                 "url": "/login",
            }));
        });
};

exports.getLogout = (req, res, next) => {
    userSession.setUser(null);
    res.redirect('/');
};