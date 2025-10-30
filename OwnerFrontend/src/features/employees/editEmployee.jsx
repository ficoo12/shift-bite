import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoles, selectAllRoles } from "../roles/rolesSlice";
import {
  fetchRestaurants,
  selectAllRestaurants,
} from "../restaurants/restaurantsSlice";
import {
  resetEmployeesStatu,
  selectSingleEmployee,
  updateEmployeeData,
} from "./employeesSlice";
import client from "../../api/client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector((state) => selectSingleEmployee(state, id));
  const employeeStatus = useSelector((state) => state.employees.status);

  const [employeeReload, setEmployeeReload] = useState(null);

  useEffect(() => {
    if (!employee) {
      const fetchSingleEmployee = async (id) => {
        const response = await client.get(`/employees/${id}`);
        setEmployeeReload(response.data);
        return response.data;
      };

      fetchSingleEmployee(id);
    }
  }, []);

  const employeeData = employee || employeeReload;

  if (employeeStatus === "loading" && !employeeData) return <p>Loading...</p>;

  const restaurants = useSelector(selectAllRestaurants);
  const roles = useSelector(selectAllRoles);
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const rolesStatus = useSelector((state) => state.roles.status);

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
    <option key={restaurant._id} value={restaurant._id}>
      {restaurant.name}
    </option>
  ));

  const renderRolName = roles.map((role) => (
    <option key={role._id} value={role._id}>
      {role.name}
    </option>
  ));

  const handleUpdate = (e) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const name = elements.employeeName.value;
    const surname = elements.employeeSurname.value;
    const email = elements.employeeEmail.value;
    const phone = elements.employeePhone.value;
    const password = elements.employeePassword.value;
    const role = elements.employeeRole.value;
    const restaurant = elements.employeeRestaurant.value;

    dispatch(
      updateEmployeeData({
        _id: employeeData._id,
        name,
        surname,
        email,
        phone,
        password,
        role,
        restaurant,
      })
    );

    dispatch(resetEmployeesStatu());

    navigate("/employees");
  };

  return (
    <section>
      <div className="mb-5 flex gap-4">
        <Link
          to="/employees"
          className="flex bg-white px-4 w-40 items-center gap-4 rounded-sm border border-lightGray hover:bg-lightGray hover:cursor-pointer transition-all duration-200 ease-in"
        >
          <ArrowLeftIcon className="w-5 "></ArrowLeftIcon>
          <p>Go back</p>
        </Link>
        <h1>Edit employee data form</h1>
      </div>

      <form className="card px-5 py-5 space-y-4" onSubmit={handleUpdate}>
        <div>
          <label htmlFor="employeeName">Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            required
            autoComplete="off"
            defaultValue={employeeData?.name}
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
            defaultValue={employeeData?.surname}
          ></input>
        </div>
        <div>
          <label htmlFor="employeeEmail">Email</label>
          <input
            type="text"
            id="employeeEmail"
            name="employeeEmail"
            required
            defaultValue={employeeData?.email}
          ></input>
        </div>
        <div>
          <label htmlFor="employeePhone">Phone</label>
          <input
            type="text"
            id="employeePhone"
            name="employeePhone"
            required
            defaultValue={employeeData?.phone}
          ></input>
        </div>
        <div>
          <label htmlFor="employeePassword">Generate Password</label>
          <input
            type="password"
            id="employeePassword"
            name="employeePassword"
            required
            defaultValue={employeeData?.password}
          ></input>
        </div>

        <div>
          <label htmlFor="employeeRole">Pick Role</label>
          <select
            defaultValue={employeeData?.role._id}
            id="employeeRole"
            name="employeeRole"
          >
            {renderRolName}
          </select>
        </div>
        <div>
          <label htmlFor="employeeRestaurant">Pick Restaurant</label>
          <select
            defaultValue={employeeData?.restaurant._id}
            id="employeeRestaurant"
            name="employeeRestaurant"
          >
            {renderResName}
          </select>
        </div>

        <button className="btnPrimary">Edit employee data</button>
      </form>
    </section>
  );
};
