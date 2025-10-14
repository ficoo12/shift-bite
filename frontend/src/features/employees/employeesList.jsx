import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmployees, selectAllEmployees } from "./employeesSlice";
import EmployeeItem from "./employeeItem";
import {
  fetchRestaurants,
  selectAllRestaurants,
} from "../restaurants/restaurantsSlice";
import { ConfirmModal } from "./ConfirmModal";

export const EmployeesList = () => {
  const [modal, setModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  //gives us access to the redux store dispatch function
  //we use it to send action to the redux store which then updated the store through reducers
  const dispatch = useDispatch();
  //useSelector allows a component to read data from the Redux store
  const employees = useSelector(selectAllEmployees);
  const restaurants = useSelector(selectAllRestaurants);
  const employeesStatus = useSelector((state) => state.employees.status);
  const restaurantsStatus = useSelector((state) => state.restaurants.status);
  const error = useSelector((state) => state.employees.error);

  const [resId, setResId] = useState();

  useEffect(() => {
    //status is used to keep a track the state of async request
    //idel is initial state
    if (employeesStatus == "idle") {
      dispatch(fetchEmployees());
    }
    console.log(employeesStatus);
    //dependency array of useEffect tells useEffect hook when to re-run the effect, in this case useEffect will re run whenever employeesStatus changes
  }, [employeesStatus, dispatch]);

  useEffect(() => {
    if (restaurantsStatus === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [restaurantsStatus, dispatch]);

  if (employeesStatus === "loading") return <p>Loading...</p>;
  if (employeesStatus === "failed") return <p>{error}</p>;
  console.log(employees);

  const filteredEmployees = resId
    ? employees.filter((employee) => employee.restaurant._id === resId)
    : employees;

  const renderEmployees = employees.map((employee) => (
    <EmployeeItem employee={employee}></EmployeeItem>
  ));

  //filter by restaurant

  return (
    <div>
      <div className="lg:flex lg:justify-between lg:items-center">
        <h1>Employees List</h1>
        <div className="flex gap-4">
          <select
            className="bg-white px-10 py-2.5 rounded-lg"
            onChange={(e) => setResId(e.target.value)}
          >
            <option value="All">All Employees</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <Link className="btnPrimary" to="/addNewEmployee">
            Add employee
          </Link>
        </div>
      </div>
      <table className="tableEmployee">
        <thead>
          <tr>
            <th className="thEmployee">Employee full name</th>
            <th className="thEmployee">Role</th>
            <th className="thEmployee">Email</th>
            <th className="thEmployee">Phone</th>
            <th className="thEmployee">Restaurant</th>
            <th className="thEmployee">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resId === "All"
            ? renderEmployees
            : filteredEmployees.map((employee) => (
                <EmployeeItem
                  key={employee._id}
                  employee={employee}
                  setModal={() => {
                    setModal(true);
                    setSelectedEmployeeId(employee._id);
                  }}
                ></EmployeeItem>
              ))}
        </tbody>
      </table>
      <ConfirmModal
        modal={modal}
        employeeId={selectedEmployeeId}
        close={() => setModal(false)}
      ></ConfirmModal>
    </div>
  );
};
