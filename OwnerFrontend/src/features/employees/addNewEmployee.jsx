import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  fetchRestaurants,
  resetRestaurantStatus,
  selectAllRestaurants,
} from "../restaurants/restaurantsSlice";
import {
  fetchRoles,
  resetRoleStatus,
  selectAllRoles,
} from "../roles/rolesSlice";
import { useEffect, useState } from "react";
import { createEmployee, resetEmployeesStatu } from "./employeesSlice";
import { Link, useNavigate } from "react-router-dom";
import { BackwardIcon } from "@heroicons/react/24/solid";

export const AddNewEmployee = () => {
  const [addRequestStatus, setAddRequestStatus] = useState();
  const [phoneNumber, setPhoneNumber] = useState("+385");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurants = useSelector(selectAllRestaurants);
  const roles = useSelector(selectAllRoles);
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const rolesStatus = useSelector((state) => state.restaurants.status);

  console.log(addRequestStatus);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = `${form.employeeName.value
      .charAt(0)
      .toUpperCase()}${form.employeeName.value.slice(1)}`;
    const surname = `${form.employeeSurname.value
      .charAt(0)
      .toUpperCase()}${form.employeeSurname.value.slice(1)}`;
    const email = form.employeeEmail.value;
    const phone = phoneNumber;
    const password = form.employeePassword.value;
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
    try {
      await dispatch(createEmployee(newEmployee));
      dispatch(resetEmployeesStatu());
      dispatch(resetRestaurantStatus());
      dispatch(resetRoleStatus());
      form.reset();
      navigate("/employees");
    } catch (err) {
      console.error("Failed to create employee: ", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex hover:bg-gray-200 px-4 py-2 rounded-sm gap-2 duration-300">
          <BackwardIcon className="w-5"></BackwardIcon>
          <Link to="/employees">Back to employees list</Link>
        </div>

        <h1 className="mb-5">Add new employee form</h1>
      </div>
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
            autoCapitalize="off"
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

          <PhoneInput
            id="employeePhone"
            name="employeePhone"
            required
            country="HR"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="HR"
          />
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
