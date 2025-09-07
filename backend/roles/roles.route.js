const express = require("express");
const router = express.Router();
const { createRole } = require("./roles.controller");
router.post("/role", createRole);
