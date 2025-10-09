const Employees = require("./employees.model");
const bcrypt = require("bcrypt");
//create employee

const createEmployee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employee = {
      ...req.body,
      password: hashedPassword,
      owner: req.user.sub,
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
    const { employeeId } = req.params;
    const deletedEmployee = await Employees.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Zaposlenik nije pronađen." });
    }
    res.status(200).json({ message: "Zaposlenik uspješno obrisan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all employees

const getAllEmpployees = async (req, res) => {
  const owner = req.user.sub;
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

module.exports = {
  createEmployee,
  deleteEmployee,
  getAllEmpployees,
};
