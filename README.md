REST API (Representational State Transfe Application Program Interface)
Methods:
- get()     : Select and get the data
- post()    : Create data
- Put()     : Update data    
- Delete()  : Delete data

1. Use Packages: 
    - joi (Input validation)
    - config 
    - debug
    ----------------------------------
2. Middleware:
    - express.json()
    - express.urlencoded({ extended: true }) (key value pair)
    - express.static('public')
    - helmet()
    - morgan('tiny')
    ----------------------------------
3. Environment:
    - cmd> export NODE_ENV=development
    - app.get('env') === 'development'
    - app.get('env') === 'production'  
    - app.get('env') === 'staging'  
    - app.get('env') === 'testing'
    ----------------------------------
4. Config:
    - cmd> npm i config   
    ----------------------------------
5. Debugging:
    - cmd> npm i debug    
    - cmd> export DEBUG=app:startup
    - cmd> export DEBUG=    (Do not shown Debugging messages.) 
    - cmd> export DEBUG=app:startup,app:db
    - cmd> export DEBUG=app.*   (All debugging message will showing.)
    - cmd> DEBUG=app.db nodemon index.js (Shortcut command)
    - Prefer the debug module to the console.log() statement.
    ----------------------------------
6. Templating Engines:
    Most popular are 
    1. Pug (Generating dynamic HTML)
    2. Mustache
    3. EJS
    ----------------------------------
7. Database Integration:  
8. Authentication:
9. Building Maintanable Routes: 
    - How to properly structure your application.
    1. Every logical part of our application for every api end point. we have       seperate file or seperate module.

