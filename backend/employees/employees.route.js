const express = require("express");
const router = express.Router();
const {
  createEmployee,
  deleteEmployee,
  getEmployeesByRestaurant,
} = require("./employees.controller");

//create employee
router.post("/restaurants/:restaurantId/employees", createEmployee);

//get employee
router.get("/restaurants/:restaurantId/employees", getEmployeesByRestaurant);

//delete employee
router.delete(
  "/restaurants/:restaurantId/employees/:employeeId",
  deleteEmployee
);

module.exports = router;
