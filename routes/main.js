module.exports = (app) => {
    app.get('/', (req, res,next) => {
        res.redirect('/pins/index');
    });    
}