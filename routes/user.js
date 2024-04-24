var express = require("express");
const UserController = require("../app/controllers/UserController");

var router = express.Router();

router.post("/add", UserController.addUser);

module.exports = router;