function log(req, res, next) {
    console.log("Logging....");
    next(); // move to next route or middleware
}

function authenticate(req, res, next) {
    console.log("Authenticate....");
    next();
}

module.exports = {
    log,
    authenticate
};