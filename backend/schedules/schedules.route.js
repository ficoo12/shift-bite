const express = require("express");
const router = express.Router();
const {
  createShift,
  deleteShift,
  getAllShifts,
  editShift,
} = require("./schedules.controller");

const verifyToken = require("../middleware/verifyToken");

router.post("/shift", verifyToken, createShift);
router.delete("/shift/:id", verifyToken, deleteShift);
router.get("/shift", verifyToken, getAllShifts);
router.put("/shift/:id", verifyToken, editShift);

module.exports = router;
