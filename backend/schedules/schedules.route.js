const express = require("express");
const router = express.Router();
const {
  createShift,
  deleteShift,
  getAllShifts,
} = require("./schedules.controller");

const verifyToken = require("../middleware/verifyToken");

router.post("/shift", verifyToken, createShift);
router.delete("/shift/:id", verifyToken, deleteShift);
router.get("/shift", verifyToken, getAllShifts);

module.exports = router;
