const express = require('express')
const router = express.Router();
const StudentController = require("../controller");
const isAuth = require("../../../middleware/isAuth");

router.route("/").post(isAuth(true),StudentController.createStudent);
router.route("/").get(isAuth(true),StudentController.getAll);

module.exports = router;