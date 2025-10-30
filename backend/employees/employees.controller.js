const generateTokenAndSetCookie = require("../helperfunction/generateTokenAndSetCookie");
const Shifts = require("../schedules/schedules.model");
const Employees = require("./employees.model");
const bcrypt = require("bcrypt");
//create employee

const createEmployee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employee = {
      ...req.body,
      password: hashedPassword,
      owner: req.userId,
    };
    const newEmployee = await Employees(employee);
    await newEmployee.save();

    res.status(200).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete employee

const deleteEmployee = async (req, res) => {
  try {
    //it must be id because you sepcified the route like this: "/employees/:id"
    //so when express reads url it will parse it into req.params.id
    const { id } = req.params;

    const deletedEmployee = await Employees.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Zaposlenik nije pronađen." });
    }

    await Shifts.deleteMany({ employee: id });
    res.status(200).json({ message: "Zaposlenik uspješno obrisan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Edit employee data

const updateEmployee = async (req, res) => {
  try {
    const ownerId = req.userId;
    const { id } = req.params;
    const updateEmployee = await Employees.findOneAndUpdate(
      { _id: id, owner: ownerId },
      { ...req.body, owner: ownerId },
      {
        //this teels return updated document after applying the changes
        new: true,
      }
    );
    if (!updateEmployee) {
      res.status(404).send({ message: "Employee not found" });
      return;
    }
    res.status(200).send({
      message: "Employee updated successfully",
      employee: updateEmployee,
    });
  } catch (error) {
    console.error(error);
  }
  {
    console.error("Error updating a employee", error);
    res
      .status(500)
      .send({ message: "Failed to update informations about employee" });
  }
};

//get all employees

const getAllEmpployees = async (req, res) => {
  const owner = req.userId;
  console.log(owner);
  try {
    const employees = await Employees.find({
      owner,
    })
      .populate("role", "name")
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get single employee

const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);
    console.log(employees);

    if (!employees) {
      res.status(404).send({ message: "Employee not found!" });
    }
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employee", error);
    res.status(500).send({ message: "Failed to fetch employee." });
  }
};

//employee logIn

const employeeLogIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const employee = await Employees.findOne({ email });

    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }
    generateTokenAndSetCookie(res, employee._id);

    const employeeShifts = await Shifts.find({ employee: employee._id });

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      employee: {
        ...employee._doc,
        password: undefined,
        shifts: employeeShifts,
      },
    });
  } catch (error) {
    console.error("Eror logging in the employee", error);
    res.status(500).send({ message: "Failed to log in" });
  }
};

//employee logout

const employeeLogOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const checkEmployeeAuth = async (req, res) => {
  try {
    const employee = await Employees.findById(req.userId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error in checkAuth", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEmployee,
  deleteEmployee,
  getAllEmpployees,
  updateEmployee,
  getSingleEmployee,
  employeeLogIn,
  checkEmployeeAuth,
  employeeLogOut,
};
