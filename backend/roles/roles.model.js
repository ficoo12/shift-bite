const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Roles = mongoose.model("Role", rolesSchema);
module.exports = Roles;
