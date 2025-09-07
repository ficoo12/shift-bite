import { Form, Link, NavLink } from "react-router-dom";
import logo from "../../../public/Logo.svg";

const Sidebar = ({ isOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out transform mt-[56px] lg:mt-[0px]
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="p-4 border-b">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="flex flex-col p-4 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "LinkActive" : "Link")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/restaurants"
            className={({ isActive }) => (isActive ? "LinkActive" : "Link")}
          >
            Restaurants
          </NavLink>
          <NavLink
            to="/schedule"
            className={({ isActive }) => (isActive ? "LinkActive" : "Link")}
          >
            Schedule
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) => (isActive ? "LinkActive" : "Link")}
          >
            Employees
          </NavLink>
          <NavLink
            to="/employeerequests"
            className={({ isActive }) => (isActive ? "LinkActive" : "Link")}
          >
            Employee Requests
          </NavLink>

          <Form action="/logout" method="POST">
            <button className="btnPrimary mt-4">LOGOUT</button>
          </Form>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
