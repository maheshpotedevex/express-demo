const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Hello World!!!');
    // Use pug template engine. render()
    res.render('index', { title: 'My Express App', message: 'Hello World' });
});

module.exports = router;