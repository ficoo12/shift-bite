const Restaurants = require("./restaurants.model");

//create restaurant
const createRestaurant = async (req, res) => {
  const Restaurant = new Restaurants(req.body);
  try {
    const newRestaurant = await Restaurant.save();
    res.status(200).json(newRestaurant);
  } catch (error) {
    console.error("Error creating resource", error);
    res.status(500).send({ message: "Failed to create restaurant" });
  }
};

//delete restaurant by id

//get all restaurants

const getAllRestaurants = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const restaurants = await Restaurants.find({ ownerId }).sort({
      createdAt: -1,
    });
    res.status(200).send(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants", error);
    res.status(500).send({ message: "Failed to fetch restaurants" });
  }
};

//get single restaurant

const getSingleRestaurant = async (req, res) => {
  const ownerId = req.user.id;
  const id = req.params.id;

  try {
    const restaurant = await Restaurants.find({ id, ownerId });
    if (!restaurant.length) {
      res.status(404).send({ message: "Restaurant not found!" });
    }
    res.status(200).send(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant", error);
    res.status(500).send({ message: "Failed to create restaurant" });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
};
