const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const Roles = mongoose.model("roles", rolesSchema);
module.exports = Roles;
