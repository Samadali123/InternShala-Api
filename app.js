const express = require("express")
const app = express();
require("dotenv").config({ path: "./.env" })


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
app.use(generatedError);


app.listen(process.env.PORT, function() {
    console.log(`Application started running on Port ${process.env.PORT}`);
})