const path = require('path');
// bring Pin model
const Pin = require('../models/Pin');

module.exports = (app) => {
    app.route('/pins/create')
        .get((req, res, next) => {
            //render the model to create pin
            res.render('pins/create');
        })
        .post((req, res, next) => {
            // create new model Pin
            let pin = new Pin();
            // elements Pin
            pin.title = req.body.title;
            pin.desc = req.body.desc;
            pin.username = req.body.username;
            pin.isSave = false;

            if(!req.files) {
                return json('error')
            }

            // check file
            let sampleFile = req.files.sampleFile;
            // add name to file
            let fileName = Math.random().toString(30).slice(2) + '.jpg';
            // check file location local
            let path = './public/files/' + fileName;
            // for the model
            pin.path = '/files/' + fileName;

            // move to local path
            sampleFile.mv(path, (err) => {
                if(err) {
                    return res.status(500).send(err);
                }
            });

            // save pin a db
            pin.save((err) => {
                if(err) throw err;
                res.redirect('/pins/index');
            });

        });
        // search all pins
        app.get('/pins/index', (req, res, next) => {
            Pin.find({}, (err, pins) => {
                // send pins a index template
                res.render('pins/index', { pins })
            });
        });
}