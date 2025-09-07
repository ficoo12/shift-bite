const Roles = require("./roles.model");

//create role

const createRole = async (req, res) => {
  const Role = new Roles({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newRole = await Role.save();
    res.status(201).json(newRole);
  } catch (error) {
    console.error("Eror:" + error);
    res.status(500).send({ message: "Failed to create new role." });
  }
};

module.exports = {
  createRole,
};
