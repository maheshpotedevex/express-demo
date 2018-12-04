const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
// Set View Engine.
app.set('view engine', 'pug'); // Don't have to required module. Internally its loaded.
// Optional setting to store view path.
app.set('views', './views');
// Working with different environment like dev, testing, staging, production etc.
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

// Middleware
app.use(express.json());

// Creating custom middleware
app.use(logger.log);
app.use(logger.authenticate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.

app.use(morgan('tiny')); //HTTP request logger. - Everytime request to the server. It will be logged.

app.use('/', home); // Home router.
app.use('/api/courses', courses); // Courses router
// Configuration
console.log('Applicaton Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    // app.use(morgan('tiny')); 
    // console.log("MOrgan is enable.....");
    startupDebugger("Morgan is enable..");
}
//DbWork...
dbDebugger('Connected to the database....');
// Port is dunamically assign from hosting env.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));