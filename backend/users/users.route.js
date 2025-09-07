const express = require("express");
const { createUser, getSingleUser } = require("./users.controller");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.route("/users").post(createUser).all(verifyToken);
router.route("/users/:id").get(getSingleUser).all(verifyToken);

module.exports = router;
