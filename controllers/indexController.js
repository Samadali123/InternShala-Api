const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/student.model");
const ErrorHandler = require("../utils/errorHandler");
const { sendForgotPasswordMail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendtoken");

exports.homepage = catchAsyncErrors((req, res, next) => {
    res.json({ message: "Secure Homepage" });
});

exports.currentuser = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    res.json(student);
});

exports.studentsignup = catchAsyncErrors(async(req, res, next) => {
    const student = await new studentModel(req.body).save();
    sendtoken(student, 201, res);
    res.status(201).json(student);
});

exports.studentsignin = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel
        .findOne({ email: req.body.email })
        .select("+password")
        .exec();

    if (!student) {
        return next(
            new ErrorHandler("User Not found with this Email address", 404)
        );
    }

    const IsMatch = student.comparepassword(req.body.password);
    if (!IsMatch) return next(new ErrorHandler("Wrong credentials", 403));

    sendtoken(student, 201, res);
    res.json(student);
});

exports.studentsignout = catchAsyncErrors(async(req, res, next) => {
    res.clearCookie("token");
    res.status(201).json({ success: true, message: "User Logged out" });
});

exports.studentsendmail = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).exec();
    if (!student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        );
    const url = `${req.protocol}://${req.get("host")}/student/forget-password/${
    student._id
  }`;
    sendForgotPasswordMail(req, res, next, url);
    student.resetpasswordtoken = "1";
    await student.save();

    res.json({ message: "mail Sent Successfully", url });
});

exports.studentforgetlink = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findById(req.params.id).exec();
    if (!student) return next(new ErrorHandler("User not found !", 404));

    if (student.resetpasswordtoken === "1") {
        student.password = req.body.password;
        student.resetpasswordtoken = "0";
        await student.save();
    } else {
        return next(
            new ErrorHandler("Invalid Reset Password link,please try again.", 500)
        );
    }
    res.status(200).json({
        message: "Password has Successfully changed",
    });
});

exports.studentresetpassword = catchAsyncErrors(async(req, res, next) => {
    const student = await studentModel.findById(req.id).select("+password").exec();

    if (!student.password) {
        return next(
            new ErrorHandler("Please provide a password for reset it.", 401)
        );
    }

    student.password = req.body.password;
    await student.save();
    // sendtoken(student, 200, res);
    res.status(200).json({
        success: true,
        message: "Password reset successfully...",
    });
});