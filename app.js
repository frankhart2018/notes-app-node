const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./utils/dbcon');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Notes App::Home',
        path: '/',
    });
});

mongoConnect.mongoConnect(() => {
    app.listen(8080);
});