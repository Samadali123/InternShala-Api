const express = require("express")
const router = express.Router();
const {
    homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentuser,
    studentsendmail,
    studentforgetlink,
    studentresetpassword
} = require("../controllers/indexController");

const { isAuthenticated } = require("../middlewares/auth");


// Get /
router.get("/", isAuthenticated, homepage)

//Get / student
router.get("/student", isAuthenticated, currentuser)


// Post /student/signup
router.post("/student/signup", studentsignup)


// Post /student/signin
router.post("/student/signin", studentsignin)


// Post /student/signout
router.get("/student/signout", isAuthenticated, studentsignout)


// Post /student/sendmail
router.post("/student/sendmail", studentsendmail)


// Get /student/forget-password/:studentid
router.get("/student/forget-password/:id", studentforgetlink);


// Post /student/reset-password
router.post("/student/reset-password", isAuthenticated, studentresetpassword);


module.exports = router;