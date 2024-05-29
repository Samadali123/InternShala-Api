const express = require("express")
const app = express();
require("dotenv").config({ path: "./.env" })


// Db connection
require("./models/database").connectdatabase();


//Body parsers for activate and read form data in a backend
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//logger
const logger = require("morgan");
app.use(logger("tiny"))


//Index Routes
app.use("/", require("./routes/indexRoutes"));

// Error Handling
const ErrorHandler = require("./utils/errorHandler");
const { generatedError } = require("./middlewares/error")

app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Page Not Found ${req.url}`, 404));
})

// middleware for converting a eror into a json message.
app.use(generatedError);


// Server Listening on Port
app.listen(process.env.PORT, function() {
    console.log(`Application started running on Port ${process.env.PORT}`);
})