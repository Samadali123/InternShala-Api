const mongoose = require("mongoose");

exports.connectdatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error.message);
    }
}