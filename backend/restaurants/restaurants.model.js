const mongoose = require("mongoose");
const Employees = require("../employees/employees.model");

const restaurantModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Restaurants = mongoose.model("Restaurant", restaurantModel);
module.exports = Restaurants;
