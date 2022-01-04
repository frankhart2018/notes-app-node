const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const accountRoutes = require('./routes/account');
const notesRoutes = require('./routes/notes');

const errorController = require('./controller/error');

const mongoConnect = require('./utils/dbcon');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use(accountRoutes);
app.use(notesRoutes);

app.use(errorController.get404);

mongoConnect.mongoConnect(() => {
    app.listen(8080);
});