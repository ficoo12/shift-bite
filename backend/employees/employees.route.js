const express = require("express");
const router = express.Router();
const {
  createEmployee,
  deleteEmployee,
  getAllEmpployees,
  updateEmployee,
  getSingleEmployee,
  employeeLogIn,
  checkEmployeeAuth,
  employeeLogOut,
} = require("./employees.controller");
const verifyToken = require("../middleware/verifyToken");

//create employee
router.post("/employees", verifyToken, createEmployee);

//get all employees
router.get("/employees", verifyToken, getAllEmpployees);

//delete employee
router.delete("/employees/:id", verifyToken, deleteEmployee);

//update employee
router.put("/employees/:id", verifyToken, updateEmployee);

//get single employee
router.get("/employees/:id", verifyToken, getSingleEmployee);

//employee log in
router.post("/employeelogin", employeeLogIn);

//check employee auth
router.get("/check-employee-auth", verifyToken, checkEmployeeAuth);

router.post("/employeelogout", employeeLogOut);

module.exports = router;
