const express = require('express')
const router = express.Router();
const UserController = require("../controller");
const isAuth = require("../../../middleware/isAuth");

router.route("/signup").post(UserController.createAccount).get((req,res) => res.status(200).send("Only POST Allowed!"));
router.route("/signin").post(UserController.signInAccount).get((req,res) => res.status(200).send("Only POST Allowed!"));;
router.route("/").get(isAuth(true),UserController.getUser);
router.route("/:id").get(isAuth(true),UserController.getUser);
router.route("/status").post(isAuth(false),(req,res) => res.status(200).send("OK"));

module.exports = router;