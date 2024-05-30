const express = require("express")
const router = express.Router();
const {
    homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentuser,
    studentsendmail,
    studentforgetlink
} = require("../controllers/indexController");

const { isAuthenticated } = require("../middlewares/auth");


// Get /
router.get("/", isAuthenticated, homepage)

//Post / student
router.post("/student", isAuthenticated, currentuser)


// Post /student/signup
router.post("/student/signup", studentsignup)


// Post /student/signin
router.post("/student/signin", studentsignin)


// Post /student/signout
router.get("/student/signout", isAuthenticated, studentsignout)


// Post /student/sendmail
router.post("/student/sendmail", studentsendmail)


// Get /student/forget-password/:id
router.get("/student/forget-password/:id", studentforgetlink);


module.exports = router;