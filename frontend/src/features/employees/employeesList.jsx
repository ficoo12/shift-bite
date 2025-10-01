import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmployees, selectAllEmployees } from "./employeesSlice";

export const EmployeesList = () => {
  //gives us access to the redux store dispatch function
  //we use it to send action to the redux store which then updated the store through reducers
  const dispatch = useDispatch();
  //useSelector allows a component to read data from the Redux store
  const employees = useSelector(selectAllEmployees);
  const employeesStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    //status is used to keep a track the state of async request
    //idel is initial state
    if (employeesStatus == "idle") {
      dispatch(fetchEmployees());
    }
    console.log(employeesStatus);
    //dependency array of useEffect tells useEffect hook when to re-run the effect, in this case useEffect will re run whenever employeesStatus changes
  }, [employeesStatus, dispatch]);

  if (employeesStatus === "loading") return <p>Loading...</p>;
  if (employeesStatus === "failed") return <p>{error}</p>;
  console.log(employees);

  const renderEmployees = employees.map((employee) => (
    <tr key={employee._id}>
      <td>{employee.name}</td>
      <td>{employee.surname}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.role.name}</td>
      <td>{employee.restaurant.name}</td>
    </tr>
  ));

  return (
    <>
      <div className="lg:flex lg:justify-between lg:items-center">
        <h1>Employees List</h1>
        <div className="max-w-fit">
          <Link className="btnPrimary" to="/addNewEmployee">
            Add employee
          </Link>
        </div>
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Restaurant</th>
        </tr>
        {renderEmployees}
      </table>
    </>
  );
};
