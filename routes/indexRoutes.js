const express = require("express")
const router = express.Router();
const { homepage } = require("../controllers/indexController")


// Get /
router.get("/", homepage)


module.exports = router;