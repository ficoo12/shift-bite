const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const UsersRoutes = require("./users/users.route");
const EmployeesRoutes = require("./employees/employees.route");
const RestaurantsRoutes = require("./restaurants/restaurants.route");
const RolesRoutes = require("./roles/roles.route");
const loginoutRoutes = require("./login-out/user.route");
const ShiftRoutes = require("./schedules/schedules.route");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

main()
  .then(() => console.log("Mongodb connect successfully."))
  .catch((error) => console.error(error));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.use("/api", UsersRoutes);
app.use("/api", EmployeesRoutes);
app.use("/api", RestaurantsRoutes);
app.use("/api", loginoutRoutes);
app.use("/api", RolesRoutes);
app.use("/api", ShiftRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening for requests on port ${process.env.PORT || 8080}`);
});
