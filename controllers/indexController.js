const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/student.model");
const ErrorHandler = require("../utils/errorHandler");

exports.homepage = catchAsyncErrors((req, res, next) => {
    res.json({ message: "Welcome to Homepage" });

})

exports.studentsignup = catchAsyncErrors(async(req, res, next) => {

    const studentcreated = await new studentModel(req.body).save();
    res.status(201).json(studentcreated);
});


exports.studentsignin = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();

    if (!student) {
        return next(new ErrorHandler("User Not found with this Email address", 404))
    }

    const IsMatch = student.comparepassword(req.body.password);
    if (!IsMatch) return next(new ErrorHandler("Wrong credentials", 403));
    res.json(student);
})


exports.studentsignout = catchAsyncErrors(async(req, res, next) => {
    res.json({ message: "Sign out " })
});