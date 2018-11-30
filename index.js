const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hello World!!!.</h2>');
});

app.get('/api/courses', (req, res) => {
    var courses = [1, 2, 3];
    res.send(courses);
});

app.listen(3000, () => console.log('Listening on port 3000....'));