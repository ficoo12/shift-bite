const express = require("express");
const router = express.Router();
const { createRole, getAllRoles } = require("./roles.controller");
const verifyToken = require("../middleware/verifyToken");
router.post("/roles", verifyToken, createRole);
router.get("/roles", verifyToken, getAllRoles);

module.exports = router;
