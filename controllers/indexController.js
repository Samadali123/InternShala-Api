const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/student.model");
const ErrorHandler = require("../utils/errorHandler");
const { sendForgotPasswordMail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendtoken");




exports.homepage = catchAsyncErrors((req, res, next) => {
    res.json({ message: "Secure Homepage" });

})

exports.currentuser = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    res.json(student)

})


exports.studentsignup = catchAsyncErrors(async(req, res, next) => {
    const student = await new studentModel(req.body).save();
    sendtoken(student, 201, res)
    res.status(201).json(student);
});


exports.studentsignin = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();

    if (!student) {
        return next(new ErrorHandler("User Not found with this Email address", 404))
    }

    const IsMatch = student.comparepassword(req.body.password);
    if (!IsMatch) return next(new ErrorHandler("Wrong credentials", 403));

    sendtoken(student, 201, res)
    res.json(student);

})


exports.studentsignout = catchAsyncErrors(async(req, res, next) => {
    res.clearCookie("token");
    res.status(201).json({ success: true, message: "User Logged out" });
});


exports.studentsendmail = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).exec();
    if (!student) return next(new ErrorHandler("User not found with this email address", 404));

    const url = `${req.protocol}://${req.get("host")}/student/forget-password/${student._id}`
    sendForgotPasswordMail(req, res, next, url);

    res.json({ message: "mail Sent Successfully", url })

});


exports.studentforgetlink = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findById(req.params.id).exec();
    if (!student) return next(new ErrorHandler("User not found !", 404));

    student.password = req.body.password;
    await student.save();
    res.status(200).json({
        message: "Password has Successfully changed"
    })

});