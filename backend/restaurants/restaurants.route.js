const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
} = require("./restaurants.controller");

router.post("/restaurants", createRestaurant);
router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:id", getSingleRestaurant);

module.exports = router;
