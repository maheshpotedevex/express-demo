const Joi = require('joi'); // Input validation.
const express = require('express');

const router = express.Router();
// Courses array
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];

router.get('/', (req, res) => {
    //var courses = [1, 2, 3];
    res.send(courses);
});

// Route Parameter or Get query string parameter
router.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params);
    res.send(req.query);
});

// Handling get request
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given id was not found!");
    res.send(course);
});

// Handling post request. // Create Operation.
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
        name: Joi.string().min(3).required() // validation.
    };
    // Now validate it
    return Joi.validate(course, schema);
}
// Handing delete request
router.delete('/:id', (req, res) => {
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

module.exports = router;