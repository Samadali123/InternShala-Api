const nodemailer = require("nodemailer");
const ErrorHandler = require("./errorHandler");

exports.sendForgotPasswordMail = (req, res, next, url) => {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use secure connection
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    // Mail options
    const mailOptions = {
        from: "Syed's Pvt. Ltd. <samadali0125@gmail.com>",
        to: req.body.email,
        subject: "Password Reset Link",
        html: `
            <h1>Click the link below to reset your password</h1>
            <a href="${url}">Password Reset Link</a>
        `
    };

    // Send mail
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return next(new ErrorHandler(err.message, 500)); // Use a 500 status code for server errors
        }
        return res.status(200).json({ success: true, message: "Mail sent successfully.", url });
    });
};