const Joi = require('joi');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

let courses = [
    { id: 1, name: "course1", code: 123, srno: 7412, author: "Mahesh Pote", mobile: 8087791904, email: "mpote97@gmail.com" },
    { id: 2, name: "course2", code: 456, srno: 8523, author: "SAtish Tarade", mobile: 7020203223, email: "maheshdevex@gmail.com" },
    { id: 3, name: "course3", code: 789, srno: 7492, author: "Jagsidh Jagdale", mobile: 9956325696, email: "lalit89@gmail.com" },
];
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    //var courses = [1, 2, 3];
    res.send(courses);
});

// Route Parameter or Get query string parameter
app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});

// Handling get request
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given id was not found!");
    res.send(course);
});

// Handling post request. // Create Operation.
app.post('/api/courses', (req, res) => {
    // Destructuring syntax    
    const { error } = validateCourse(req.body); //result.error is same as {error}
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    if (!course) res.status(404).send("The course with given id was not found!");
    res.send(course);
});

// Put request
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given id was not found!");

    // Validation or invalid 400- Bad request.
    // Destructuring syntax    
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update Course
    course.name = req.body.name;
    res.send(course);
});

// seperate validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    // Now validate it
    return Joi.validate(course, schema);
}
// Handing delete request
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given id was not found!");

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    // return the same course.
    res.send(course);
});



// Port is dunamically assign from hosting env.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));