const express = require('express')
const router = express.Router();
const RoleController = require("../controller");
const isAuth = require("../../../middleware/isAuth");


router.route("/").post(isAuth(false),RoleController.createRole);
router.route("/").get(isAuth(true),RoleController.getAll);

module.exports = router;