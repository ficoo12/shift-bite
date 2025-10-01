const express = require("express");
const router = express.Router();
const {
  createEmployee,
  deleteEmployee,
  // getEmployeesByRestaurant,
  getAllEmpployees,
} = require("./employees.controller");
const verifyToken = require("../middleware/verifyToken");
//create employee
router.post("/employees", verifyToken, createEmployee);

//get employee
// router.get("/employees", verifyToken, getEmployeesByRestaurant);
router.get("/employees", verifyToken, getAllEmpployees);

//delete employee
router.delete("employees/:id", verifyToken, deleteEmployee);

module.exports = router;
