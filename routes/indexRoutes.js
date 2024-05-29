const express = require("express")
const router = express.Router();
const {
    homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentuser
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
router.get("/student/signout", studentsignout)
module.exports = router;