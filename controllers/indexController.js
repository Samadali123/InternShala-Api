const { catchAsyncErrors } = require("../middlewares/catchAsyncError");

exports.homepage = catchAsyncErrors((req, res, next) => {
    res.json({ message: "Welcome to Homepage" });

})