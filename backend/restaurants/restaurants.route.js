const express = require("express");
const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
} = require("./restaurants.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/restaurants", verifyToken, createRestaurant);
router.get("/restaurants", verifyToken, getAllRestaurants);
router.get("/restaurants/:id", verifyToken, getSingleRestaurant);

module.exports = router;
