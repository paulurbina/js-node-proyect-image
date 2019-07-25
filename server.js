const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsmate = require('ejs-mate');
const fileUpload = require('express-fileupload');

// initialize variables
const app = express();
const PORT = process.env.PORT || 4000;
const urlNativeConnection = 'mongodb://localhost:27017/spa-project';

//Database connection.
mongoose.connect(urlNativeConnection, { useNewUrlParser: true}, (err, db) => {
    if(err) {
        throw err;
    } else {
        console.log('>> Database connection'); 
    }
});

//settings
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 
app.engine('.ejs',ejsmate);

// middlewares
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
require('./routes/main')(app);
require('./routes/pins')(app);

//listening server
app.listen(PORT, (err) => {
    if(err) {
        throw err;
    } else {
        console.log(`Server on Port ${PORT}`);
    }
});