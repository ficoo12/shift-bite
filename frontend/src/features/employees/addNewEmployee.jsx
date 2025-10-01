import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  selectAllRestaurants,
} from "../restaurants/restaurantsSlice";
import { fetchRoles, selectAllRoles } from "../roles/rolesSlice";
import { useEffect } from "react";
import { createEmployee } from "./employeesSlice";
export const AddNewEmployee = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectAllRestaurants);
  const roles = useSelector(selectAllRoles);
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const rolesStatus = useSelector((state) => state.restaurants.status);

  useEffect(() => {
    if (rolesStatus == "idle") {
      dispatch(fetchRoles());
    }
  }, [rolesStatus, dispatch]);

  useEffect(() => {
    if (restaurantStatus == "idle") {
      dispatch(fetchRestaurants());
    }
  }, [restaurantStatus, dispatch]);

  const renderResName = restaurants.map((restaurant) => (
    <option value={restaurant._id}>{restaurant.name}</option>
  ));

  const renderRolName = roles.map((role) => (
    <option value={role._id}>{role.name}</option>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.employeeName.value;
    const surname = form.employeeSurname.value;
    const email = form.employeeEmail.value;
    const phone = form.employeePhone.value;
    const password = form.employeePhone.value;
    const role = form.employeeRole.value;
    const restaurant = form.employeeRestaurant.value;

    const newEmployee = {
      name,
      surname,
      email,
      phone,
      password,
      role,
      restaurant,
    };
    dispatch(createEmployee(newEmployee));
    form.reset();
  };

  return (
    <div>
      <h1>Add new employee</h1>
      <form
        className="card px-5 py-5 space-y-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="employeeName">Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            required
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label htmlFor="employeeSurname">Surname</label>
          <input
            type="text"
            id="employeeSurname"
            name="employeeSurname"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="employeeEmail">Email</label>
          <input
            type="text"
            id="employeeEmail"
            name="employeeEmail"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="employeePhone">Phone</label>
          <input
            type="text"
            id="employeePhone"
            name="employeePhone"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="employeePassword">Generate Password</label>
          <input
            type="password"
            id="employeePassword"
            name="employeePassword"
            required
          ></input>
        </div>

        <div>
          <label htmlFor="employeeRole">Pick Role</label>
          <select id="employeeRole" name="employeeRole">
            {renderRolName}
          </select>
        </div>
        <div>
          <label htmlFor="employeeRestaurant">Pick Restaurant</label>
          <select id="employeeRestaurant" name="employeeRestaurant">
            {renderResName}
          </select>
        </div>

        <button className="btnPrimary">Add employee</button>
      </form>
    </div>
  );
};
