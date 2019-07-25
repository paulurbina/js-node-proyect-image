module.exports = (app) => {
    app.route('/pins/create')
        .get((req, res, next) => {
            res.render('pins/create');
        });
}