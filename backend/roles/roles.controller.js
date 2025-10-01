const Roles = require("./roles.model");

//fetch roles

const getAllRoles = async (req, res) => {
  const owner = req.user.sub;
  try {
    const roles = await Roles.find({ owner }).sort({
      createdAt: -1,
    });
    res.status(200).send(roles);
    console.log(roles);
  } catch (error) {
    console.error("Error fetching restaurants", error);
    res.status(500).send({ message: "Failed to fetch roles" });
  }
};

//create role

const createRole = async (req, res) => {
  try {
    const role = { ...req.body, owner: req.user.sub };
    const newRole = await Roles(role);
    await newRole.save();
    res.status(200).json(newRole);
  } catch (error) {
    console.error("Eror creating role:", error);
    res.status(500).send({ message: "Failed to create new role." });
  }
};

module.exports = {
  createRole,
  getAllRoles,
};
