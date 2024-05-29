const express = require("express")
const app = express();
require("dotenv").config({ path: "./.env" })


//logger
const logger = require("morgan")
app.use(logger("tiny"))


//Index Routes
app.use("/", require("./routes/indexRoutes"));



app.listen(process.env.PORT, function() {
    console.log(`Application started running on Port ${process.env.PORT}`);
})