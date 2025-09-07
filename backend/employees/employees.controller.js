const Employees = require("./employees.model");
const bcrypt = require("bcrypt");
//create employee

const createEmployee = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { restaurantId } = req.params;
  const Employee = new Employees({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    role: req.body.role,
    restaurant: restaurantId,
  });
  try {
    const newEmployee = await Employee.save();
    res.status(201).json(newEmployee);
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

//get employees by restaurant

const getEmployeesByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const employeesByRestaurant = await Employees.find({
      restaurant: restaurantId,
    })
      .populate("role", "name")
      .sort({ createdAt: -1 });

    res.status(201).json(employeesByRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createEmployee,
  deleteEmployee,
  getEmployeesByRestaurant,
};
