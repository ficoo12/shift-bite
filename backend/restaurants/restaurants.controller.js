const Restaurants = require("./restaurants.model");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = { ...req.body, owner: req.user.sub };
    const newRestaurant = new Restaurants(restaurant);
    await newRestaurant.save();
    res.status(200).json(newRestaurant);
  } catch (error) {
    console.error("Error creating restaurant", error);
    res.status(500).send({ message: "Failed to create restaurant" });
  }
};

const getAllRestaurants = async (req, res) => {
  const owner = req.user.sub;
  try {
    const restaurants = await Restaurants.find({ owner }).sort({
      createdAt: 1,
    });
    res.status(200).send(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants", error);
    res.status(500).send({ message: "Failed to fetch restaurants" });
  }
};

const getSingleRestaurant = async (req, res) => {
  const owner = req.user.sub;
  const id = req.params.id;

  try {
    const restaurant = await Restaurants.find({ id, owner });

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
