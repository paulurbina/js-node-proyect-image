const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejs = require('ejs');
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

// middlewares and template
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '/public')));
app.engine('ejs', engine);
app.set('view engine', ejs); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.send('hello');
});

//listening server
app.listen(PORT, (err) => {
    if(err) {
        throw err;
    } else {
        console.log(`Server on Port ${PORT}`);
    }
});