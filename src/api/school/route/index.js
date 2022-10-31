const express = require('express')
const router = express.Router();
const SchoolController = require("../controller");
const isAuth = require("../../../middleware/isAuth");



router.route("/").post(isAuth(true),SchoolController.createSchool);
router.route("/").get(isAuth(true),SchoolController.getAll);
router.route("/student").get(isAuth(true),SchoolController.getAllStudent);

module.exports = router;