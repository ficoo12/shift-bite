const Restaurants = require("./restaurants.model");
const Employees = require("../employees/employees.model");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = { ...req.body, owner: req.userId };
    const newRestaurant = new Restaurants(restaurant);
    await newRestaurant.save();
    res.status(200).json(newRestaurant);
  } catch (error) {
    console.error("Error creating restaurant", error);
    res.status(500).send({ message: "Failed to create restaurant" });
  }
};

const getAllRestaurants = async (req, res) => {
  const owner = req.userId;
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

const updateRestaurant = async (req, res) => {
  try {
    const ownerId = req.userId;
    const { id } = req.params;
    const updatedRestaurant = Restaurants.findOneAndUpdate(
      { _id: id, owner: ownerId },
      { ...req.body, owner: ownerId },
      {
        new: true,
      }
    );
    if (!updatedRestaurant) {
      res.status(404).send({ message: "restaurant not found." });
      return;
    }
    res.status(200).send({
      message: "Restaurant updated successfuly",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error("Error updating a restaurant", error);
    res.status(500).send({ message: "Failed to update a resource" });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      await Employees.deleteMany({ restaurant: id });
      const deletedRestaurant = await Restaurants.findOneAndDelete({ _id: id });
      if (!deletedRestaurant) {
        res.status(404).send({ message: "Restaurant not found" });
        return;
      }
      res.status(200).json({
        message: "Restoran uspiješno obrisan",
        deleteRestaurantId: deletedRestaurant._id,
      });
    }
  } catch (error) {
    console.error({ message: "Failed to delete restaurant", error });
    res.status(500).send({ message: "Failed to delete restaurant" });
  }
};

const getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurants.findById(id);

    if (!restaurant) {
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
  updateRestaurant,
  deleteRestaurant,
};
