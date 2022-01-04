const User = require('../model/user');

let loggedInUser = null;

exports.getIndex = (req, res, next) => {
    if (loggedInUser) {
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
                 "text": "User already exists!", 
            }));
        });
};

exports.getLogin = (req, res, next) => {
    if (loggedInUser) {
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
            loggedInUser = user;
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
            }));
        });
};

exports.getLogout = (req, res, next) => {
    loggedInUser = null;
    res.redirect('/');
};