const { Router } = require('express');

// initialize variables
const router = Router();

app.get('/', (req, res) => {
    res.send('hello');
});


module.exports = router;