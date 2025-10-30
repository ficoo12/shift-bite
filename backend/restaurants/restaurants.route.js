const express = require("express");
const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("./restaurants.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/restaurants", verifyToken, createRestaurant);
router.get("/restaurants", verifyToken, getAllRestaurants);
router.get("/restaurants/:id", verifyToken, getSingleRestaurant);
router.put("/restaurants/:id", verifyToken, updateRestaurant);
router.delete("/restaurants/:id", verifyToken, deleteRestaurant);

module.exports = router;
