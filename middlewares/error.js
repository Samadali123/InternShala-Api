const { stack } = require("../routes/indexRoutes");

exports.generatedError = (err, req, res, next) => {
    const statuscode = err.statuscode || 500;

    if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
        err.message = "student with this email already Exists"
    }
    res.status(statuscode).json({
        message: err.message,
        errName: err.name,
        // stack: err.stack
    })
}